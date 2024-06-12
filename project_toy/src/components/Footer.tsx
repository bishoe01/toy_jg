"use client";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaPenToSquare, FaRegPenToSquare } from "react-icons/fa6";
export const BTN_STYLE =
  "flex flex-col items-center rounded-full p-1 flex-grow";
const MENU_STYLE = "text-xs";
function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <div className="fixed bottom-0 left-0 w-full z-10">
      <div className="max-w-xl mx-auto flex items-center justify-around h-18 bg-bg py-4 px-4 gap-4">
        <Link href={"/"} className={BTN_STYLE}>
          {isActive("/") ? <GoHomeFill size={28} /> : <GoHome size={28} />}
          <span className={`${MENU_STYLE}`}>Home</span>
        </Link>
        <Link href={"/register"} className={`${BTN_STYLE}`}>
          {isActive("/register") ? (
            <FaPenToSquare size={28} />
          ) : (
            <FaRegPenToSquare size={28} />
          )}
          <span className={`${MENU_STYLE}`}>Post</span>
        </Link>
        <Link href={"/mypage"} className={`${BTN_STYLE}`}>
          {isActive("/mypage") ? (
            <BsFillPersonFill size={28} />
          ) : (
            <BsPerson size={28} />
          )}
          <span className={`${MENU_STYLE}`}>Profile</span>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
