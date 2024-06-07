"use client";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
const MENU_STYLE = "text-xs";
function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <div className="fixed bottom-0 left-0 w-full z-10">
      <div className="max-w-xl mx-auto flex items-center justify-around h-18 bg-bg py-4 px-4">
        <Link href={"/"} className="flex flex-col items-center">
          {isActive("/") ? <GoHomeFill size={32} /> : <GoHome size={32} />}
          <span className={`${MENU_STYLE}`}>Home</span>
        </Link>
        <Link href={"/likes"} className="flex flex-col items-center">
          {isActive("/likes") ? (
            <IoIosHeart size={32} />
          ) : (
            <IoIosHeartEmpty size={32} />
          )}
          <span className={`${MENU_STYLE}`}>Likes</span>
        </Link>
        <Link href={"/mypage"} className="flex flex-col items-center">
          {isActive("/mypage") ? (
            <BsFillPersonFill size={32} />
          ) : (
            <BsPerson size={32} />
          )}
          <span className={`${MENU_STYLE}`}>Profile</span>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
