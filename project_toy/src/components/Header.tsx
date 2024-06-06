"use client";
import React from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaRegPenToSquare } from "react-icons/fa6";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/": "Home",
    "/likes": "Likes",
    "/mypage": "Mypage",
  };

  const title = titleMap[pathname] || "Home";

  return (
    <section className="p-4 mb-1 flex justify-between">
      <h1 className="text-xl">{title}</h1>
      <button>
        <FaRegPenToSquare size={24} />
      </button>
    </section>
  );
}

export default Header;
