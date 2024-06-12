"use client";
import { API_URL } from "@/type";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import * as Yup from "yup";

const validationSchema = Yup.object({
  nickname: Yup.string()
    .required("아이디를 입력해주세요.")
    .max(10, "최대 10자까지 입력 가능합니다.")
    .matches(/^[a-zA-Z0-9]+$/, "아이디는 특수문자 입력이 불가능합니다."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요.")
    .min(6, "비밀번호는 6자 이상이어야 합니다.")
    .max(15, "최대 15자까지 입력 가능합니다."),
  confirmPassword: Yup.string()
    .required("비밀번호를 한번 더 입력해주세요.")
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다."),
});

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-sm p-6 bg-bg rounded-xl shadow-md">
      <button onClick={() => router.push("/")} className="mb-4 text-gray-500 ">
        <FaArrowLeft size={24} />
      </button>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Sign up
      </h2>

      <Formik
        initialValues={{ nickname: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(`${API_URL}api/users`, values);
            // console.log("response:", response);
            // console.log("values:", values);

            Swal.fire({
              title: "회원가입 성공!",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              router.push("/login"); // 로그인 페이지로 이동
            });
          } catch (error) {
            console.error("회원가입 실패:", error);
            Swal.fire({
              title: "회원가입 실패",
              text: "다시 시도해 주세요.",
              icon: "error",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="nickname"
                className="block text-green-500 font-medium"
              >
                ID
              </label>
              <Field
                type="text"
                id="nickname"
                name="nickname"
                placeholder="아이디 입력"
                className="block w-full mt-1 p-2.5 bg-secondary rounded text-white "
              />
              <ErrorMessage
                name="nickname"
                component="p"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-green-500 font-medium"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호 입력"
                className="block w-full mt-1 p-2.5 bg-secondary rounded text-white "
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-green-500 font-medium"
              >
                Password 확인
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                className="block w-full mt-1 p-2.5 bg-secondary rounded text-white "
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={!isValid}
                className="block w-full py-2.5 bg-white text-black font-semibold rounded hover:bg-gray-200 transition disabled:opacity-50"
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
