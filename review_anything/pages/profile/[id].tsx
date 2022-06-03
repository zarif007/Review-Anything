import axios from "axios";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { theme } from "../../atoms/themeAtom";
import Header from "../../components/Header";
import NotificationModal from "../../components/modals/NotificationModal";
import PostModal from "../../components/modals/PostModal";
import Post from "../../components/Post";
import { domain } from "../../domain";
import postInterface from "../../interfaces/Post";
import HeaderTags from './../../components/HeaderTags';


export const getServerSideProps: GetServerSideProps = async ( { params } ) => {

    const { data } = await axios.get(`${domain}userspost/${params?.id}`);
  
    return {
      props: { 
        posts: data.data,
       },
    };
  };
  

const Profile: React.FC<{ posts: postInterface[] }> = ( { posts } ) => {

    const [user, setUser] = useState({image: '', name: ''});

    const [isDark] = useRecoilState<boolean>(theme);

    const { query: { id }, } = useRouter();

    const { data: session } = useSession();

    // Getting User 
    const getUser = async () => {
        await axios.get(`${domain}userspost/${id}`)
        .then(res => {
            setUser(res.data.user);
        });
    }

    useEffect(() => {
        getUser();
    }, [session]);

    const styles = {
        wrapper: `min-h-screen ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'}`,
        infoContainer: `container mx-auto flex px-5 py-24 items-center justify-center flex-col ${isDark ? 'text-white' : 'text-black'}`,
        infoWrapper: `p-6 flex flex-col justify-center items-center`,
        infoMain: `font-semibold text-4xl`,
        infoPrimary: `text-gray-500 text-md`,
    }


    return (
        <div className={styles.wrapper}>
            <HeaderTags title={user.name} content={user.name} />

            <Header />

            <main>
                <div className={`${styles.infoContainer}`} id={`${id}`}>
                    <img className="lg:w-1/12 md:w-2/12 w-3/12 mb-10 object-cover object-center rounded-full" alt="dp" src={user?.image || ''} />
                    <h1 className={`${styles.infoMain} pb-2`}>{user?.name}</h1>
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

            <main className='text-white flex mx-auto max-w-6xl justify-center items-center flex-col'>
                {
                    posts.map((post: postInterface) => {
                        return (
                            <section className='sm:w-full md:w-4/6' key={post._id}> 
                                <Post post={post} />
                            </section>
                        )
                    })
                }
            </main>

            <PostModal />
            <NotificationModal />
        </div>
    )
};

export default Profile;
