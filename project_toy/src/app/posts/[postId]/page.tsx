"use client";

import { Formik } from "formik";
import * as Yup from "yup";
type Props = {
  params: {
    postId: string;
  };
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("제목을 입력해주세요.")
    .max(25, "최대 25자까지 입력 가능합니다.")
    .min(10, "최소 5자 이상 입력해주세요."),
  content: Yup.string()
    .required("내용을 입력해주세요.")
    .min(10, "최소 10자 이상 입력해주세요.")
    .max(1000, "최대 1000자까지 입력 가능합니다."),
});

function PostDetailPage({ params }: Props) {
  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isValid, isSubmitting }) => (
        <form>
          <div>
            <label htmlFor="title">제목</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea />
          </div>
          <button type="submit">저장</button>
        </form>
      )}
    </Formik>
  );
}
export default PostDetailPage;

//  <button
//    onClick={() => {
//      addPost({
//        post_id: 4,
//        title: "제목4",
//        content: "내용4",
//        date: new Date().toISOString(),
//        writer: {
//          id: 4,
//          name: "작성자4",
//        },
//      });
//    }}
//  >
//    ADD
//  </button>;
