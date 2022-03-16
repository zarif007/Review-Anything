import Image from "next/image";
import React, { useState } from "react";
import logo from "../images/logo.png";
import sm_logo from "../images/sm_logo.png";
import { IoNotificationsSharp, IoAddCircleSharp, IoLogOut } from "react-icons/io5";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";


const styles = {
  nav: "pt-6 shadow-sm bg-[#060809] sticky top-0 z-50 shadow-[#2b3c53] pb-1",
  wrapper: "flex justify-between max-w-7xl mx-5 lg:mx-auto",
  logo: "relative h-8 w-8 sm:h-12 sm:w-24",
  searchWrapper: "relative text-gray-600 focus-within:text-gray-400",
  searchIcon: "absolute inset-y-0 left-0 flex items-center pl-2",
  searchInput: "py-2 w-32 sm:w-72 xl:w-100 text-large font-semibold text-white bg-[#0c1012] border-2 border-[#2b3c53] rounded-md pl-10 focus:outline-none focus:bg-gray-900",
  iconsWrapper: "text-white flex flex-row space-x-1 md:space-x-4",
  icon: "h-6 w-6 sm:h-8 sm:w-8 text-gray-200 iconAnimation",
  notificationWrapper: "bg-blue-700 text-xs p-1 animate-pulse rounded-md absolute m-3 ml-4",
  userImage: "h-8 sm:h-10 rounded-full cursor-pointer",
}

const Header = () => {

  const [isDark, setIsDark] = useState(true)

  return (
    <div className={styles.nav}>
      <div className={styles.wrapper} >

        {/* Logo  */}
        <div className={styles.logo}>
          <div className="sm:hidden">
            <Image src={sm_logo} objectFit="contain" />
          </div>
          <div className="hidden sm:inline">
            <Image src={logo} objectFit="contain" />
          </div>
        </div>

        {/* Search Field  */}
        <div className="">
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search(D.Trump, Nissan GTR)..."
              autoComplete="off"
            />
          </div>
        </div>

        {/* Icons  */}
        <div className={styles.iconsWrapper}>
          <div onClick={() => setIsDark(!isDark)}>
            {
              isDark ? <FaSun className={styles.icon} /> : <BsFillMoonStarsFill className={styles.icon} />
            }
          
          </div>
          <IoAddCircleSharp className={styles.icon} />
          <div className="flex flex-row mr-3">
            <IoNotificationsSharp className={styles.icon} />
            <span className={styles.notificationWrapper}>10</span>
          </div>
          <IoLogOut className={styles.icon} />
          <img 
            src='https://yt3.ggpht.com/FjeN785fVWx0Pr6xCbwPhhq8hHj_gocc3FygDXYDEQgp2gE_FQzRNsFHFAjQ3oE-VJaeGR1a=s48-c-k-c0x00ffffff-no-rj'
            alt='dp'
            className={styles.userImage}
          />
        </div>

      </div>
    </div>
  );
};

export default Header;
