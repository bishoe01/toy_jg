"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useSetRecoilState } from "recoil";
import { tokenState, userState } from "@/store/user";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import { API_URL } from "@/type";
import Link from "next/link";

const validationSchema = Yup.object({
  nickname: Yup.string().required("아이디를 입력해주세요."),
  // .max(10, "최대 10자까지 입력 가능합니다.")
  // .matches(/^[a-zA-Z0-9]+$/, "아이디는 특수문자 입력이 불가능합니다."),
  password: Yup.string().required("비밀번호를 입력해주세요."),
  // .min(6, "비밀번호는 6자 이상이어야 합니다.")
  // .max(15, "최대 15자까지 입력 가능합니다."),
});

export default function LoginPage() {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  return (
    <>
      <div className="w-full p-6 bg-bg rounded-xl">
        <button
          onClick={() => router.push("/")}
          className="mb-4 text-gray-500 "
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Log in
        </h2>

        <Formik
          initialValues={{ nickname: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post(
                `${API_URL}api/users/login`,
                values
              );
              localStorage.setItem("token", response.data.token);

              setUser({ nickname: values.nickname, isAuthenticated: true });
              localStorage.setItem("nickname", values.nickname);
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
                <label
                  htmlFor="nickname"
                  className="block text-green-500 font-medium"
                >
                  Nickname
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

              <div className="text-right">
                <Link
                  href="/signup"
                  className="text-sm text-green-400 hover:underline"
                >
                  회원가입
                </Link>
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
    </>
  );
}
