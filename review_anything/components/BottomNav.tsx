import React from 'react'
import { IoAddCircleSharp } from 'react-icons/io5'
import { BiTrendingUp } from "react-icons/bi";
import { FaSwimmingPool } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { postModalState } from '../atoms/postModalAtom';

const BottomNav: React.FC = () => {

    const [open, setOpen] = useRecoilState(postModalState)

    const styles = {
        wrapper: `w-full h-24`,
        itemsWrapper: `block fixed inset-x-0 bottom-0 z-50 bg-[#131313] shadow-black border-2 border-gray-900`,
        iconsWrapper: `w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-1 pb-1`,
        icon: `h-10 w-6 sm:h-12 sm:w-8 text-gray-200  iconAnimation`,
        iconText: `tab tab-home block text-xs text-white font-semibold`,
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <section className={styles.itemsWrapper}>
                    <div className="flex justify-between">
                        <div className={styles.iconsWrapper}>
                            <BiTrendingUp className={styles.icon} />
                            <span className={styles.iconText}>Trending</span>
                        </div>

                        <div className={styles.iconsWrapper} onClick={() => setOpen(true)} >
                            <IoAddCircleSharp className={styles.icon} />
                            <span className={styles.iconText}>Add</span>
                        </div>
                        <div className={styles.iconsWrapper}>
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
