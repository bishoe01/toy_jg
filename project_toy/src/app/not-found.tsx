import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0E10] absolute top-0 w-full h-[100vh] z-20">
      <Image
        src="/error_404.png"
        alt="404 Error"
        width={300}
        height={200}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold text-whiter mb-4">404 NOT FOUND</h1>
      <p className="text-lg text-gray-200 mb-8">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="bg-primary 
         text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        메인 페이지로 돌아가기
      </Link>
    </div>
  );
}
