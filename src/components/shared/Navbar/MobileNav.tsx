import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { login, logout } from "@/Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ICONS from "@/icons/AllIcons";
import SidebarSlide from "@/components/framer-motion/SidebarSlilde";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AuthItems, NavItems } from "./NavLinks";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

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

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      {/* Background blur */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 block md:hidden"></div>
      )}

      <div className={`fixed z-50 w-full md:hidden bg-primary-100 py-5`}>
        <div className="flex justify-between items-center px-5">
          <Link href="/" title="Home" className="inline-flex items-center">
            {ICONS.stacktwo}
            <span className="ml-2 text-xl font-primary font-bold text-white tracking-wide text-secondary w-[98px]">
              EWN
            </span>
          </Link>
          <div className="flex justify-end">
            <button
              className="w-10 h-6 flex absolute top-6 z-50 flex-col items-center justify-between"
              onClick={toggleMenu}
            >
              <span
                className={`h-1 w-4/5 bg-white rounded-2xl ${
                  isMenuOpen
                    ? "rotate-45 translate-y-2.5 duration-300"
                    : "translate-y-0 duration-300"
                }`}
              ></span>

              <span
                className={`h-1 w-4/5 bg-white rounded-2xl ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>

              <span
                className={`h-1 w-4/5 bg-white rounded-2xl ${
                  isMenuOpen
                    ? "-rotate-45 -translate-y-2.5 duration-300"
                    : "translate-y-0 duration-300"
                }`}
              ></span>
            </button>
          </div>
        </div>

        <SidebarSlide isMenuOpen={isMenuOpen}>
          <div
            key="menu"
            className={`absolute top-5 left-0 z-30 w-1/2 h-screen pb-10 bg-primary-200 overflow-y-auto
             `}
          >
            <div className="shadow-sm hover:text-primary-100 mt-4 pl-5">
              <nav>
                <ul className="flex flex-col space-y-8">
                  {NavItems?.map((item) => {
                    const isSelected = pathname === item?.href;
                    return (
                      <li
                        key={item.id}
                        className={`${
                          isSelected ? "border-b-[3px] w-10 border-primary-300" : ""
                        }`}
                        onClick={()=>setIsMenuOpen(false)}
                      >
                        <Link
                          href={item?.href}
                          className={`font-bold py-2 text-white`}
                        >
                          <div className="cursor-pointer">
                            <span>{item?.label}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                  {user?.email && isLoggedIn ? (
                    <>
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
                    <ul className="flex flex-col space-y-8">
                      {AuthItems?.map((item) => {
                        const isSelected = pathname === item?.href;
                        return (
                          <li
                            key={item.id}
                            className={`${
                              isSelected
                                ? "border-b-[3px] w-10 border-primary-300"
                                : ""
                            }`}
                            onClick={()=>setIsMenuOpen(false)}
                          >
                            <Link
                              href={item?.href}
                              className={`font-bold py-2 text-white`}
                            >
                              <div className="cursor-pointer">
                                <span>{item?.label}</span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </SidebarSlide>
      </div>
    </>
  );
};

export default MobileNav;
