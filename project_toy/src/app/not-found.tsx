import Link from "next/link";
import Image from "next/image";
import { ANI_BASE } from "@/style/animation";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0E10] absolute top-0 left-0 w-full h-[100vh] z-50 overflow-hidden touch-none">
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
        className={`border-green-400 border-2 text-green-400
          font-bold py-2 px-4 rounded-md ${ANI_BASE}`}
      >
        메인 페이지로 돌아가기
      </Link>
    </div>
  );
}
