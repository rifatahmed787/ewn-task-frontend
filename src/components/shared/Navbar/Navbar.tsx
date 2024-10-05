"use client";
import React, { useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { login, logout } from "@/redux/features/auth/authSlice";
import ICONS from "@/icons/AllIcons";
import { NavItems } from "./NavLinks";

const Navbar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  // TOGGOLE SIDEBAR
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userObject = JSON.parse(userCookie);
      const { user, isLoggedIn } = userObject;
      const accessToken = Cookies.get("token") || null;
      // Set the role from user object

      dispatch(
        login({
          user,
          isLoggedIn,
          accessToken,
          refreshToken: null,
        })
      );
    }
  }, [dispatch]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <nav className="w-screen md:w-full overflow-hidden py-1 md:py-1.5 sticky left-0 top-0 z-50 transition-all duration-500 backdrop-blur-sm border-b  bg-primary-100">
        <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                title="Company"
                className="inline-flex items-center mr-8"
              >
                {ICONS.stacktwo}
                <span className="ml-2 text-xl font-inter font-medium tracking-wide text-secondary w-[98px]">
                  EWN
                </span>
              </Link>
              <ul className="flex items-center space-x-2 lg:flex">
                {NavItems?.map((item) => {
                  const isSelected = pathname === item?.href;
                  return (
                    <li
                      key={item.id}
                      className={`${
                        isSelected
                          ? "border-b-[3px] border-primary-100 text-primary-100"
                          : "mainNav-hover-effect"
                      }`}
                    >
                      <Link href={item?.href} className={`font-bold py-2 `}>
                        <div className="flex group cursor-pointer items-center">
                          <span>{item?.label}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {user?.email && isLoggedIn ? (
              <>
                {" "}
                {/* BUTTON FOR USER */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <Image
                        src={user?.avatar ?? "/placeholder-user.jpg"}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user?.email && isLoggedIn ? (
                      <DropdownMenuItem>
                        <button onClick={handleLogout}>Sign Out</button>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <Link href="/login">Sign In</Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <ul className="flex items-center  space-x-2 lg:flex">
                <li>
                  <Link
                    href="/signin"
                    title="Sign in"
                    className={`text-base font-medium tracking-wide text-secondary py-2 px-3 hover:bg-hoverbg rounded-md ${
                      pathname === "signin" ? "bg-hoverbg" : ""
                    }`}
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    title="Sign up"
                    className={`text-base font-medium tracking-wide text-secondary py-2 px-3 hover:bg-hoverbg rounded-md ${
                      pathname === "/signup" ? "bg-hoverbg" : ""
                    }`}
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            )}

            {/* HAMBURGER MENU */}
            <div className="block lg:hidden -mt-5 md:-mt-0">
              <div className="flex justify-end relative ml-10">
                <button
                  className="w-10 h-6 absolute right-2 -top-2.5 z-10 flex flex-col justify-between"
                  //   onClick={() => {
                  //     dispatch(showSidebarDrawer());
                  //     toggleSidebar();
                  //   }}
                >
                  {/*hamburger menu span one*/}
                  {/* <span
                    className={`h-1 w-4/5 bg-primary-100 rounded-2xl ${
                      isSidebarOpen
                        ? "rotate-45 translate-y-2.5 duration-300"
                        : "translate-y-0 duration-300"
                    }`}
                  ></span> */}

                  {/*hamburger menu span two*/}
                  {/* <span
                    className={`h-1 w-4/5 bg-primary-100 rounded-2xl ${
                      isSidebarOpen ? "opacity-0" : ""
                    }`}
                  ></span> */}

                  {/*hamburger menu span three*/}
                  {/* <span
                    className={`h-1 w-4/5 bg-primary-100 rounded-2xl ${
                      isSidebarOpen
                        ? "-rotate-45 -translate-y-2.5 duration-300"
                        : "translate-y-0 duration-300"
                    }`}
                  ></span> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <AnimatePresence>{isSidebarOpen && <MobileNav />}</AnimatePresence> */}
    </>
  );
};

export default Navbar;
