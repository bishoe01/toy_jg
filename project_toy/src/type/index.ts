export type Posts = {
   _id?: string;
  title: string;
  content: string;
  nickname: string;
  date?: Date;
};

export type User = {
    nickname : string;
    password : string;
}
export type Comment ={
    _id : string;
    postId : string;
    content : string;
    nickname : string;
    date : Date;
    
}


export const API_URL = 'http://15.165.26.9:8080/';
