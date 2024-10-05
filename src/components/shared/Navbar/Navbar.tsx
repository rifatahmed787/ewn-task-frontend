"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import ICONS from "@/icons/AllIcons";
import { AuthItems, NavItems } from "./NavLinks";
import { login, logout } from "@/Redux/features/auth/authSlice";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userObject = JSON.parse(userCookie);
      const { user, isLoggedIn } = userObject;
      const accessToken = Cookies.get("token") || null;

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
      <nav className="w-screen fixed z-50 backdrop-blur-sm bg-primary-100 hidden md:block">
        <div className="px-4 py-4 mx-auto max-w-xl md:max-w-full lg:max-w-screen-xl md:px-5 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" title="Home" className="inline-flex items-center">
                {ICONS.stacktwo}
                <span className="ml-2 text-xl font-primary font-bold text-white tracking-wide text-secondary w-[98px]">
                  EWN
                </span>
              </Link>
              <ul className="flex items-center space-x-8">
                {NavItems?.map((item) => {
                  const isSelected = pathname === item?.href;
                  return (
                    <li
                      key={item.id}
                      className={`${
                        isSelected ? "border-b-[3px] border-primary-300" : ""
                      }`}
                    >
                      <Link
                        href={item?.href}
                        className={`font-bold py-2 text-white`}
                      >
                        <div className="flex gap-3 cursor-pointer items-center ">
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

                    <DropdownMenuItem>
                      <button onClick={handleLogout}>Sign Out</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <ul className="flex items-center  space-x-8">
                {AuthItems?.map((item) => {
                  const isSelected = pathname === item?.href;
                  return (
                    <li
                      key={item.id}
                      className={`${
                        isSelected ? "border-b-[3px] border-primary-300" : ""
                      }`}
                    >
                      <Link
                        href={item?.href}
                        className={`font-bold py-2 text-white`}
                      >
                        <div className="flex gap-3 cursor-pointer items-center ">
                          <span>{item?.label}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </nav>
      {/* MOBILE NAVBAR */}
      <MobileNav />
    </>
  );
};

export default Navbar;
