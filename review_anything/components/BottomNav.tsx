import React from 'react'
import { IoAddCircleSharp } from 'react-icons/io5'
import { BiTrendingUp } from "react-icons/bi";
import { FaSwimmingPool } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { postModalState } from '../atoms/postModalAtom';
import { useSession } from 'next-auth/react';
import { theme } from '../atoms/themeAtom';
import { poolModalState } from '../atoms/poolModalAtom';
import { trendingModalState } from './../atoms/trendingModalAtom';

const BottomNav: React.FC = () => {

    const [postOpen, setPostOpen] = useRecoilState<boolean>(postModalState);

    const [poolOpen, setPoolOpen] = useRecoilState<boolean>(poolModalState);

    const [trendingOpen, setTrendingOpen] = useRecoilState<boolean>(trendingModalState);

    const [isDark] = useRecoilState<boolean>(theme);

    const { data: session } = useSession();

    const styles = {
        wrapper: `w-full h-24`,
        itemsWrapper: `block fixed inset-x-0 bottom-0 z-50 ${isDark ? 'bg-[#131313] shadow-black border-gray-900' : 'bg-[#fefefa] shadow-gray-200'}  border-2 `,
        iconsWrapper: `w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-1 pb-1`,
        icon: `h-10 w-6 sm:h-12 sm:w-8 ${isDark ? 'text-gray-200' : 'text-gray-800'}  iconAnimation`,
        iconText: `tab tab-home block text-xs ${isDark ? 'text-white' : 'text-black'} font-semibold`,
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <section className={styles.itemsWrapper}>
                    <div className="flex justify-between">
                        <div className={styles.iconsWrapper}>
                            <BiTrendingUp className={styles.icon} onClick={() => setTrendingOpen(true)} />
                            <span className={styles.iconText}>Trending</span>
                        </div>
                        {
                            session?.user && <div className={styles.iconsWrapper} onClick={() => setPostOpen(true)} >
                                <IoAddCircleSharp className={styles.icon} />
                                <span className={styles.iconText}>Add</span>
                            </div> 
                        }
                        <div className={styles.iconsWrapper} onClick={() => setPoolOpen(true)}>
                            <FaSwimmingPool className={styles.icon} />
                            <span className={styles.iconText}>Pool</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BottomNav
