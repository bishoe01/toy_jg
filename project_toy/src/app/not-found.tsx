import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image
        src="/error_404.png"
        alt="404 Error"
        width={400}
        height={300}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        잘못된 접근입니다.
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        홈으로 이동
      </Link>
    </div>
  );
}
