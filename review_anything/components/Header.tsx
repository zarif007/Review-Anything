import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import sm_logo from "../images/sm_logo.png";
import { IoNotificationsSharp, IoAddCircleSharp, IoLogOut } from "react-icons/io5";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useSession, signIn, signOut } from "next-auth/react";
import { GoSignIn } from "react-icons/go";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { postModalState } from '../atoms/postModalAtom';
import { theme } from './../atoms/themeAtom';
import { selectedGenre } from "../atoms/genreAtom";
import axios from "axios";
import { domain } from "../domain";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import NotificationInterface from "../interfaces/Notification";
import { notificationModalState } from "../atoms/notificationModal";
import { currentUser } from "../atoms/currentUserAtom";



const Header: React.FC = () => {

  const { data: session } = useSession();

  const [user, setUser] = useRecoilState(currentUser);

  const [openPostModal, setOpenPostModal] = useRecoilState(postModalState);

  const [openNotificationModal, setOpenNotificationModal] = useRecoilState(notificationModalState);

  const [currentGenre, setCurrentGenre] = useRecoilState<string>(selectedGenre);

  const [notifications, setNotifications] = useState<NotificationInterface[]>([]);

  const [isDark, setIsDark] = useRecoilState(theme);

  const router = useRouter();

  // Getting User 
  const getUser = async () => {
    await axios.get(`${domain}users/${session?.user?.email}`)
      .then(res => {
        setUser(res.data.data[0]);
      });
  }

  useEffect(() => {
    getUser();
  }, [session]);

  useEffect(() => {
    if(user !== undefined) {
      setIsDark(user.theme);
    }
  }, [user]);

  const setTheme = () => {
    setIsDark(!isDark);

    let updatedUser = {
      _id: user._id,
      email: user.email || '',
      image: user.image,
      name: user.name,
      preference: user.preference,
      theme: user.theme,
    };
    updatedUser.theme = !isDark;
    
    axios.put(`${domain}users/${session?.user?.email}`, updatedUser);
  } 

  useEffect(() => 
    onSnapshot(
      query(collection(db, 'notification'), orderBy('timestamp', 'desc')),
        (snapshot: any) => {
            const arr = snapshot.docs;
            const updated: NotificationInterface[] = []
            arr.map((ar: any) => {
              if(ar.data().post.user.email === session?.user?.email && ar.data().status === 'unread'){
                const obj: NotificationInterface = ar.data();
                obj.id = ar.id;
                updated.push(obj);
              }
            })
            setNotifications(updated)
        }
    ), [db, session]);
  
  const styles = {
    nav: `pt-3 shadow-sm ${isDark ? 'bg-[#131313] shadow-black' : 'bg-[#FFFAFA] shadow-gray-200'}  sticky top-0 z-50 pb-2`,
    wrapper: `flex justify-between max-w-6xl mx-5 lg:mx-auto`,
    logo: `relative h-8 w-8 sm:h-12 sm:w-24 cursor-pointer pt-1`,
    searchWrapper: `relative text-gray-600 focus-within:text-gray-400`,
    searchIcon: `absolute inset-y-0 left-0 flex items-center pl-2`,
    searchInput: `py-2 w-32 sm:w-72 xl:w-100 text-large font-semibold ${isDark ? 'text-white bg-[#0c1012] focus:bg-gray-900 border-[#2b3c53]' : 'text-black bg-[#FAF9F6] focus:bg-gray-100 border-[#a1a1aa]'} border-2  rounded-md pl-10 focus:outline-none`,
    iconsWrapper: `text-white flex flex-row space-x-2 md:space-x-4`,
    icon: `h-10 w-6 sm:h-12 sm:w-8  ${isDark ? 'text-gray-200' : 'text-gray-700'} iconAnimation`,
    notificationWrapper: `bg-blue-700 text-xs p-1 animate-pulse rounded-md absolute m-4 ml-3 mt-5`,
    userImage: `h-8 sm:h-10 rounded-full cursor-pointer pt-2`,
    buttons: `bg-blue-700 hover:bg-blue-800 text-white rounded-sm font-bold px-3 items-center`,
  }

  return (
    <div className={styles.nav}>
      <div className={styles.wrapper} >

        {/* Logo  */}
        <div className={styles.logo} onClick={() => {
          setCurrentGenre('');
          router.push('/');
        }}>
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
                strokeLinecap="round"
                strokeLinejoin="round"
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
        {
        session?.user ? 
          <div className={styles.iconsWrapper}>
            <div onClick={setTheme}>
              {
                isDark ? <FaSun className={styles.icon} /> : <BsFillMoonStarsFill className={styles.icon} />
              }
            </div>           
            <button className={`${styles.buttons} hidden md:flex`}
              onClick={() => setOpenPostModal(true)}>
              <IoAddCircleSharp 
                className="h-10 w-6 sm:h-12 sm:w-8 pr-2" 
              />ADD
            </button>
            <div className="flex flex-row mr-3 cursor-pointer"
              onClick={() => setOpenNotificationModal(true)}>
              <IoNotificationsSharp className={styles.icon} />
              {
                notifications.length > 0 &&
                <span className={styles.notificationWrapper}>{notifications.length}</span>
              }
            </div>
            <IoLogOut className={styles.icon} onClick={() => signOut()} />
            <img 
              src={session?.user?.image || ''}
              alt='dp'
              className={styles.userImage}
              onClick={() => router.push(`http://localhost:3000/profile/${user._id}`)}
            />
          </div> : <div className={styles.iconsWrapper}>
            <button className={`${styles.buttons} flex`} onClick={() => signIn()} >
              <GoSignIn className="h-10 w-6 sm:h-12 sm:w-8 pr-2" />Sign In
            </button>
          </div>
        } 
      </div>
    </div>
  );
};

export default Header;
