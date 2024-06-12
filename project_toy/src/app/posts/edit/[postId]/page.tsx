"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/user";
import { FaArrowLeft } from "react-icons/fa6";
import { API_URL, Posts } from "@/type";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("제목을 입력해주세요.")
    .max(15, "최대 15자까지 입력 가능합니다."),
  content: Yup.string()
    .required("내용을 입력해주세요.")
    .min(3, "내용은 3글자 이상이어야 합니다.")
    .max(200, "최대 200자까지 입력 가능합니다."),
});

type Props = {
  params: {
    postId: string;
  };
};

export default function EditPage({ params }: Props) {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [post, setPost] = useState<Posts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${API_URL}api/posts/${params.postId}`
        );
        setPost(response.data.posts[0]);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.postId]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <ClipLoader color="#4BDF81" loading={isLoading} size={150} />
      </div>
    );
  }

  if (!post) {
    router.push("/not-foundURL");
  }
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
          글 수정
        </h2>
        <Formik
          initialValues={{
            title: post?.title || "",
            content: post?.content || "",
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.patch(
                `${API_URL}api/posts/${params.postId}`,
                {
                  ...values,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              Swal.fire({
                title: "수정 완료!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              }).then(() => {
                router.push("/"); // 홈으로 이동
              });
            } catch (error) {
              console.error("수정 실패:", error);
              Swal.fire({
                title: "수정 실패",
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
                  htmlFor="title"
                  className="block text-green-500 font-medium"
                >
                  제목
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="제목입력"
                  className="block w-full mt-1 p-2.5 bg-secondary rounded text-white "
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-xs italic mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-green-500 font-medium"
                >
                  내용
                </label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  placeholder="내용 입력"
                  className="block w-full mt-1 p-2.5 bg-secondary rounded text-white "
                />
                <ErrorMessage
                  name="content"
                  component="p"
                  className="text-red-500 text-xs italic mt-1"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="block w-full py-2.5 bg-white text-black font-semibold rounded hover:bg-gray-200 transition disabled:opacity-50"
                >
                  수정 완료
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
