"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("아이디를 입력해주세요.")
    .max(10, "최대 10자까지 입력 가능합니다.")
    .matches(/^[a-zA-Z0-9]+$/, "아이디는 특수문자 입력이 불가능합니다."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(15, "최대 15자까지 입력 가능합니다."),
});

export default function LoginPage() {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      initialErrors={{
        username: "아이디를 입력해주세요.",
        password: "비밀번호를 입력해주세요.",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // TODO: 로그인 로직?
        console.log(values);
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form className="border-2 w-full border-green-400 max-w-lg mx-auto p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">LOG IN</h2>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              아이디
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="username"
              component="p"
              className="text-red-500 text-xs italic"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              비밀번호
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-xs italic"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={!isValid}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 ${
                !isValid && !isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`} // 초기 비활성화 스타일
            >
              로그인
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
