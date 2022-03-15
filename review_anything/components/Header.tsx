import Image from "next/image";
import React from "react";
import logo from "../images/logo.png";
import { IoNotificationsSharp, IoAddCircleSharp } from "react-icons/io5";


const styles = {
  wrapper: "flex justify-between max-w-6xl mx-5 lg:mx-auto",
  logo: "relative h-24 w-24",
  searchWrapper: "relative text-gray-600 focus-within:text-gray-400",
  searchIcon: "absolute inset-y-0 left-0 flex items-center pl-2",
  searchInput: "py-2 w-32 md:w-72 xl:w-100 text-large font-semibold text-white bg-[#0c1012] border-2 border-[#1f2937] rounded-md pl-10 focus:outline-none focus:bg-gray-900",
  iconsWrapper: "text-white flex flex-row",
  icon: "h-7 w-7 text-gray-200",
  notificationWrapper: "bg-blue-700 text-xs p-1 rounded-md absolute m-3 ml-4",
}

const Header = () => {
  return (
    <div className="pt-3">
      <div className={styles.wrapper} >

        {/* Logo  */}
        <div className={styles.logo}>
          <Image src={logo} objectFit="contain" />
        </div>

        {/* Search Field  */}
        <div className="mt-1">
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
              name="q"
              className={styles.searchInput}
              placeholder="Search..."
              autoComplete="off"
            />
          </div>
        </div>

        {/* Icons  */}
        <div className={styles.iconsWrapper}>
          <IoAddCircleSharp className={styles.icon} />
          <div className="flex flex-row">
            <IoNotificationsSharp className={styles.icon} />
            <span className={styles.notificationWrapper}>10</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
