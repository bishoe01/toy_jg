"use client";
import React from "react";
import { FaArrowLeft, FaRegPenToSquare } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {
  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/": "Home",
    "/likes": "Likes",
    "/mypage": "Mypage",
    "/register": "Posting",
  };

  const title = titleMap[pathname];

  return (
    <section className="p-6 py-6 mb-1 bg-bg z-40 flex w-full items-center justify-between absolute top-0 left-0">
      {pathname === "/register" && (
        <Link href={"/"}>
          <FaArrowLeft size={24} color="#B4B4B4" />
        </Link>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      {pathname !== "/register" && (
        <Link href={"/register"}>
          <FaRegPenToSquare size={24} color="#B4B4B4" />
        </Link>
      )}
      {pathname === "/register" && <div style={{ width: 24 }}></div>}
    </section>
  );
}

export default Header;
