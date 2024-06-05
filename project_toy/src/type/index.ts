
// 타입 정의
export type Writer = {
  id: string;
};


export type Posts = {
  post_id: number;
  title: string;
  content: string;
  date: string;  // DATE타입에서 -> string타입으로 변경(ISO 포맷)
  writer: Writer;
};
