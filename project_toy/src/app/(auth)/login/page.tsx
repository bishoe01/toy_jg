"use client";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import * as Yup from "yup";

const validationSchema = Yup.object({
  id: Yup.string()
    .required("아이디를 입력해주세요.")
    .max(10, "최대 10자까지 입력 가능합니다.")
    .matches(/^[a-zA-Z0-9]+$/, "아이디는 특수문자 입력이 불가능합니다."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(15, "최대 15자까지 입력 가능합니다."),
});

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="w-full max-w-sm p-6 bg-bg rounded-xl shadow-md">
      <button onClick={() => router.push("/")} className="mb-4 text-gray-500 ">
        <FaArrowLeft size={24} />
      </button>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Log in</h2>

      <Formik
        initialValues={{ id: "", password: "" }}
        initialErrors={{
          id: "아이디를 입력해주세요.",
          password: "비밀번호를 입력해주세요.",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post("/api/login", values);
            const { token } = response.data;
            localStorage.setItem("token", token);

            Swal.fire({
              title: "로그인 성공!",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              router.push("/"); // 홈으로 이동
            });
          } catch (error) {
            console.error("로그인 실패:", error);
            Swal.fire({
              title: "로그인 실패",
              text: "아이디 또는 비밀번호를 확인해주세요.",
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
              <label htmlFor="id" className="block text-green-500 font-medium">
                ID
              </label>
              <Field
                type="text"
                id="id"
                name="id"
                placeholder="아이디 입력"
                className="block w-full mt-1 p-2.5 bg-secondary rounded text-white "
              />
              <ErrorMessage
                name="id"
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

            <div className="text-right">
              <a href="#" className="text-sm text-green-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="block w-full py-2.5 bg-white text-black font-semibold rounded hover:bg-gray-200 transition disabled:opacity-50"
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
