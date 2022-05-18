import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { theme } from "../atoms/themeAtom";
import Comment from "./Comment";
import { FiSend } from "react-icons/fi";
import { db } from "../firebase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import commentInterface from './../interfaces/Comment';

const Comments: React.FC<{ id: any }> = ({ id }) => {
  const [isDark] = useRecoilState(theme);

  const { data: session } = useSession();

  const [comments, setComments] = useState<commentInterface[]>([]);

  const userComment = useRef<any>('');

  const styles = {
    wrapper: `${
      isDark ? "bg-slate-900 border-gray-900" : "bg-blue-200 border-blue-100"
    } bg-opacity-25 border-2 rounded-sm md:mr-2 h-100 md:h-[680px]  h-fixed`,
    searchWrapper: `text-gray-600 focus-within:text-gray-400`,
    searchInput: `w-full h-16 mb-0 text-large font-semibold ${
      isDark
        ? "text-white bg-[#0c1012] focus:bg-gray-900 border-[#2b3c53]"
        : "text-black bg-[#FAF9F6] focus:bg-gray-100 border-[#a1a1aa]"
    } border`,
    searchIcon: `absolute inset-y-0 left-0 flex items-center pl-2`,
  };

  const handleCommentAdd = async () => {

    const data: commentInterface = {
        user: {
            email: session?.user?.email || '',
            username: session?.user?.name || '',
            image: session?.user?.image || '', 
        },
        comment: userComment?.current?.value || '',
        postId: id,
        timestamp: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'comment'), data);
  };

  useEffect(() => 
    onSnapshot(
      query(collection(db, 'comment'), orderBy('timestamp', 'desc')),
        (snapshot: any) => {
            const arr = snapshot.docs;

            const upDated: commentInterface[] = [];

            arr.map((ar: any) => {
                if(ar.data().postId === id)
                    upDated.push(ar.data());
            })

            setComments(upDated);
        }
    ), [db]);

  return (
    <main className={styles.wrapper}>
      <section className="p-2">
        <h1 className="p-1 text-lg font-semibold">Comments</h1>
      </section>

      <div className="overflow-y-auto h-72 md:h-5/6 scrollbar-hide">
        {
            comments.map((comment: commentInterface) => {
                return (
                    <Comment postComment={comment} />
                )
            })
        }
      </div>

      <section className="pb-0 flex">
        <div className={`${styles.searchWrapper} w-4/5`}>
          <input
            ref={userComment}
            type="search"
            className={styles.searchInput}
            placeholder="Add Comment"
            autoComplete="off"
          />
        </div>
        <div
          className={`${styles.searchInput} w-1/5 flex justify-center items-center cursor-pointer`}
          onClick={handleCommentAdd}
        >
          <FiSend className="text-white h-6 w-6" />
        </div>
      </section>
    </main>
  );
};

export default Comments;
