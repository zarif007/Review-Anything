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

  const [userComment, setUserCommment] = useState<string>('');

  const styles = {
    wrapper: `${
      isDark ? "bg-slate-900 border-gray-900" : "bg-blue-200 border-blue-100"
    } bg-opacity-25 border-2 rounded-sm md:mr-2 h-100 md:h-[728px]  h-fixed`,
    searchWrapper: `text-gray-600 focus-within:text-gray-400`,
    inputWrapper: `pb-0 flex justify-center items-center border ${isDark ? 'bg-slate-900 border-gray-900' : 'bg-blue-200 border-blue-100'} bg-opacity-25`,
    input: `border-none focus:ring-0 w-full ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5] text-gray-900'} mt-0 scrollbar-hide`,
    sendIcon: `text-white h-6 w-6 mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`,
  };

  const handleCommentAdd = async () => {

    const data: commentInterface = {
        user: {
            email: session?.user?.email || '',
            username: session?.user?.name || '',
            image: session?.user?.image || '', 
        },
        comment: userComment,
        postId: id,
        timestamp: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'comment'), data);

    await setUserCommment('');
    console.log(userComment.split('\n'))
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
        <h1 className={`p-1 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Comments</h1>
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

      <section className={styles.inputWrapper}>
        <div className={`${styles.searchWrapper} w-4/5`}>
          <textarea
            rows={2}
            className={styles.input}
            placeholder='Bump Openion Here'
            defaultValue={userComment}
            onChange={e => {
              setUserCommment(e.target.value.trim());
            }}
          />
        </div>

        <button
          disabled={userComment.length === 0}
          className={`w-1/5 flex justify-center items-center cursor-pointer disabled:cursor-not-allowed`}
          onClick={handleCommentAdd}
        >
          <FiSend className={styles.sendIcon} />
        </button>
      </section>
    </main>
  );
};

export default Comments;
