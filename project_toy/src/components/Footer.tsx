"use client";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <div className="fixed bottom-0 flex items-center justify-around w-full h-12 bg-bg px-4 z-10">
      <Link href={"/"}>
        {isActive("/") ? <GoHomeFill size={24} /> : <GoHome size={24} />}
      </Link>
      <Link href={"/likes"}>
        {isActive("/likes") ? (
          <IoIosHeart size={24} />
        ) : (
          <IoIosHeartEmpty size={24} />
        )}
      </Link>
      <Link href={"/mypage"}>
        {isActive("/mypage") ? (
          <BsFillPersonFill size={24} />
        ) : (
          <BsPerson size={24} />
        )}
      </Link>
    </div>
  );
}

export default Footer;
