import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { theme } from "../../atoms/themeAtom";
import Header from "../../components/Header";
import NotificationModal from "../../components/modals/NotificationModal";
import PostModal from "../../components/modals/PostModal";
import { domain } from "../../domain";

const Profile = () => {
    const [isDark] = useRecoilState<boolean>(theme);

    const { query: { id }, } = useRouter();

    const { data: session } = useSession();

    const styles = {
        wrapper: `min-h-screen ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'}`,
        infoContainer: `container mx-auto flex px-5 py-24 items-center justify-center flex-col ${isDark ? 'text-white' : 'text-black'}`,
        infoWrapper: `p-6 flex flex-col justify-center items-center`,
        infoMain: `font-semibold text-4xl`,
        infoPrimary: `text-gray-500 text-md`,
    }

    useEffect(() => {
        axios.get(`${domain}userspost/${id}`)
            .then(res => console.log('oo', res));
    }, [id])


    return (
        <div className={styles.wrapper}>

            <Header />

            <main>
                <div className={`${styles.infoContainer}`}>
                    <img className="lg:w-1/12 md:w-2/12 w-3/12 mb-10 object-cover object-center rounded-full" alt="dp" src={session?.user?.image || ''} />
                    <h1 className={`${styles.infoMain} pb-2`}>{session?.user?.name}</h1>
                    <div className="flex border border-gray-400 rounded-md">
                        <div className={styles.infoWrapper}>
                            <p className={styles.infoPrimary}>Number of Post</p>
                            <h1 className={styles.infoMain}>33</h1>
                        </div>
                        <div className={`${styles.infoWrapper} border-l border-r border-gray-400`}>
                            <p className={styles.infoPrimary}>Total Interactions</p>
                            <h1 className={styles.infoMain}>3.3M</h1>
                        </div>
                        <div className={styles.infoWrapper}>
                            <p className={styles.infoPrimary}>Average Rating</p>
                            <h1 className={styles.infoMain}>3.3</h1>
                        </div>
                    </div>
                </div>
            </main>

            <PostModal />
            <NotificationModal />
        </div>
    )
};

export default Profile;
