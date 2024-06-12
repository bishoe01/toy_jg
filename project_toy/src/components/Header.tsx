"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");
    if (token && nickname) {
      setIsAuthenticated(true);
      setUsername(nickname);
    } else {
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    setIsAuthenticated(false);
    setUsername(null);
    setIsDropdownOpen(false);
    router.push("/login");
  };

  const titleMap: Record<string, string> = {
    "/": "Home",
    "/register": "Posting",
    "/mypage": "Mypage",
  };

  const title = titleMap[pathname] || "Page";

  const isPostDetail = /^\/posts\/[a-fA-F0-9]{24}$/.test(pathname); // Check if pathname matches /posts/:postId

  return (
    <section className="p-6 py-6 mb-1 bg-bg z-40 flex w-full items-center justify-between absolute top-0 left-0">
      {(pathname === "/register" || isPostDetail) && (
        <Link href={"/"}>
          <FaArrowLeft size={24} color="#B4B4B4" />
        </Link>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      {isAuthenticated ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className="text-lg text-whiter cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {username}
          </div>
          <div
            className={`absolute right-0 mt-2 w-24 rounded-md overflow-hidden transition-all duration-300 ease-in-out transform ${
              isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <button
              onClick={handleLogout}
              className="block w-full p-4 rounded-md text-md bg-secondary text-whiter"
            >
              로그아웃
            </button>
          </div>
        </div>
      ) : (
        <Link href="/login" className="text-lg text-whiter">
          Log In
        </Link>
      )}
    </section>
  );
}

export default Header;
