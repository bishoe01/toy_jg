"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/user";
import { API_URL } from "@/type";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("제목을 입력해주세요.")
    .max(15, "최대 15자까지 입력 가능합니다."),
  content: Yup.string()
    .required("내용을 입력해주세요.")
    .min(3, "최소 3자 이상 입력해주세요.")
    .max(200, "최대 2000자까지 입력 가능합니다."),
});

export default function RegisterPage() {
  const router = useRouter();
  const user = useRecoilValue(userState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");
    if (!token || !nickname) {
      Swal.fire({
        title: "유저 정보가 없습니다.",
        text: "로그인 해주세요",
        icon: "warning",
        confirmButtonText: "확인",
        background: "#383838",
        color: "#FBFBFB",
      }).then(() => {
        router.push("/login");
      });
    }
  }, [router]);

  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            `${API_URL}api/posts`,
            {
              title: values.title,
              content: values.content,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          let timerInterval: NodeJS.Timeout;

          Swal.fire({
            title: "게시글 등록 성공!",
            html: "<b></b> 곧 자동으로 닫힙니다.",
            timer: 1000,
            timerProgressBar: true,
            customClass: {
              timerProgressBar: "my-custom-progress-bar",
            },
            background: "#383838",
            color: "#FBFBFB",
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer()?.querySelector("b");
              timerInterval = setInterval(() => {
                if (b) {
                  b.textContent = `${Swal.getTimerLeft()}`;
                }
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              router.push("/"); // 알림창 닫힌 후 홈으로 이동
            }
          });
        } catch (error) {
          console.error("게시글 등록 실패:", error);
          Swal.fire({
            icon: "error",
            title: "게시글 등록 실패",
            text: "다시 시도해 주세요.",
            background: "#383838", // 배경 색상 설정
            color: "#FBFBFB", // 텍스트 색상 설정
          });
        }
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form className="w-full mx-auto py-8 px-8 bg-primary rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            게시글 등록
          </h2>

          <div className="mb-4">
            <label htmlFor="title" className="block text-whiter font-bold mb-2">
              제목
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력하세요"
              className="shadow appearance-none bg-secondary border border-gray-300 rounded w-full py-2 px-3 text-whiter leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="title"
              component="p"
              className="text-red-500 text-xs italic mt-1"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-whiter font-bold mb-2"
            >
              내용
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="내용을 입력하세요" // placeholder 추가
              rows={5} // textarea 높이 조절
              className="shadow appearance-none bg-secondary border border-gray-300 rounded w-full py-2 px-3 text-whiter leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="content"
              component="p"
              className="text-red-500 text-xs italic mt-1" // margin-top 추가
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-secondary hover:bg-secondaryLight text-whiter font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              등록하기
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
