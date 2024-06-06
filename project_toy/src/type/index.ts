
// 타입 정의
export type Writer = {
  id: string;
};


export type Posts = {
   _id?: string;
  title: string;
  content: string;
  date: string;  // DATE타입에서 -> string타입으로 변경(ISO 포맷)
  writer: Writer;
};
