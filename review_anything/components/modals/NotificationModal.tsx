import React, { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react';
import { theme } from '../../atoms/themeAtom';
import { notificationModalState } from '../../atoms/notificationModal';
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import NotificationInterface from '../../interfaces/Notification';
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { domain } from '../../domain';


const NotificationModal = () => {

  const [open, setOpen] = useRecoilState<boolean>(notificationModalState);

  const [notifications, setNotifications] = useState<NotificationInterface[]>([]);

  const [isDark] = useRecoilState(theme);

  const { data: session } = useSession();

  const router = useRouter();

  const styles = {
    wrapper: `flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`,
    dialogOverlay: `fixed inset-0 bg-gray-800 opacity-75 transition-opacity`,
    postImgIcon: `rounded-full h-12 w-12 object-contain border ${isDark ? 'border-gray-800' : 'border-blue-100'} p-1 mr-3`,
    notificationsWrapper: `inline-block align-bottom ${isDark ? 'bg-[#131313]' : 'bg-[#FFFAFA]'} rounded-lg px-4 pt-5 pb-4 text-left
      overflow-h           
      notificationidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm md:max-w-lg w-full
      sm:p-6 text-white `,
    notificationWrapper: `flex px-2 py-4 cursor-pointer ${isDark ? 'text-white' : 'text-black'}`,
  }

  // Fetch notifications from DB
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

  const setNotificationRed = (id: string) => {
    updateDoc(doc(db, 'notification', id), {
        status: 'red',
      });
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className='fixed mt-20 z-10 inset-0 overflow-y-auto'
        onClose={() => {
            setOpen(false);
        }}
      >
        <div className={styles.wrapper}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className={styles.dialogOverlay} />
          </Transition.Child>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >

            {/* Post Upload Part   */}
            <div className={styles.notificationsWrapper}>
                <h1 className='font-bold text-lg text-blue-500 px-2 py-4'>Notifications</h1>
                {
                    notifications.map((notification: NotificationInterface) => {
                        return (
                            <div className={styles.notificationWrapper} key={notification.id}
                                onClick={() => {
                                    router.push(`http://localhost:3000/post/${notification.post._id}`)
                                    setOpen(false);
                                    setNotificationRed(notification.id || '');
                                }}>
                                <img src={notification.post.img} className={styles.postImgIcon} />
                                <div>
                                    <h1 className='font-semibold text-md'>
                                        {
                                            notification.message
                                        }
                                    </h1>
                                    <p className='text-gray-600'>
                                        <Moment toNow ago>
                                            {notification.timestamp?.toDate().toISOString()}
                                        </Moment>
                                        <span> ago</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>


  );
}

export default NotificationModal