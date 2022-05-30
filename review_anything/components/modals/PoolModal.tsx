import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { RiHeartAddFill } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../../atoms/genreAtom';
import { genrePreference } from '../../atoms/genrePreferenceModalAtom';
import { poolModalState } from '../../atoms/poolModalAtom';
import { theme } from '../../atoms/themeAtom';
import { domain } from '../../domain';
import { genres } from '../../genres';

const PoolModal = () => {
  const { data: session } = useSession();

  const [isDark] = useRecoilState<boolean>(theme);

  const [user, setUser] = useState({preference: [{label: '', value: ''}]});

  const [open, setOpen] = useRecoilState<boolean>(poolModalState);

  const [currentGenre, setCurrentGenre] = useRecoilState<string>(selectedGenre);

  const [genrePreferenceOpen, setGenrePreferenceOpen] = useRecoilState<boolean>(genrePreference);

  const [gns, setGns] = useState<{ value: string, label: string }[]>(genres);

  const [userPreferedGenres, setUserPreferedGenres] = useState<{ value: string, label: string }[]>([]);

  const [searchText, setSearchText] = useState<string>('');

  const styles = {
    wrapper: `flex items-center justify-center min-h-screen sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`,
    dialogOverlay: `fixed inset-0 bg-gray-800 opacity-75 transition-opacity`,
    genreWrapper: `inline-block align-bottom ${isDark ? 'bg-[#0E0E10]' : 'bg-[#FFFAFA]'} rounded-lg text-left
        overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm md:max-w-lg w-full
        text-white `,
    secondWrapper: `${isDark ? 'bg-gray-900 border-blue-900' : 'bg-blue-100 border-blue-800'}  border bg-opacity-75 rounded-lg px-4 pt-5 pb-4 sm:p-6 `,
    objWrapper: `flex flex-wrap p-1`,
    object: `bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white`,
    preferenceTexts: `p-1 font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`,
    input: `p-1 w-full focus:outline-none ${isDark ? 'bg-black text-white' : 'bg-gray-100 text-black'} rounded-sm font-semibold`
  }

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
      setUserPreferedGenres(user.preference);
    }
  }, [user]);

  const handleSearch = (e: any) => {
    setGns([]);
    
    setSearchText(e.target.value);

    const updatedObjs = genres.filter(g => g.value.toLowerCase().includes(e.target.value.toLowerCase()));

    setGns(updatedObjs);
  }

  useEffect(() => {
    if(user){
      let updatedUser = user;
      updatedUser.preference = userPreferedGenres;

      axios.put(`${domain}users/${session?.user?.email}`, updatedUser);
    }
  }, [userPreferedGenres, user])

  return (
    <Transition.Root show={open || genrePreferenceOpen} as={Fragment}>
      <Dialog
        as="div"
        className='fixed mt-20 mb-20 md:mb-2 z-10 inset-0 overflow-y-auto'
        onClose={open ? setOpen : setGenrePreferenceOpen}
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

            {/* Genre Upload Part   */}
            <div className={styles.genreWrapper}>
              <div className={styles.secondWrapper}>
                <div className='mx-auto p-2'>
                  <input 
                    className={styles.input}
                    placeholder='Search...' 
                    onChange={handleSearch}  
                    defaultValue={searchText}
                  />
                </div>
                {
                  genrePreferenceOpen ? 
                    <div>
                      {
                        (userPreferedGenres.length > 0 || userPreferedGenres[0].label !== '') && 
                        <h3 className={styles.preferenceTexts}>
                          Selected Genres
                        </h3>
                      }

                      <div className={styles.objWrapper}>
                        {
                          userPreferedGenres.map((obj, index) => {
                            return (
                              <div
                                className={styles.object}
                                key={index}
                                onClick={() => {
                                  const up = userPreferedGenres.filter(x => x.value !== obj.value)
                                  setUserPreferedGenres(up);
                                }}
                              >
                                {obj.value}
                              </div>
                            )
                          })
                        }
                      </div>

                      <h3 className={styles.preferenceTexts}>
                        Pick Genres
                      </h3>

                      <div className={styles.objWrapper}>
                        {
                          gns.map((obj, index) => {
                            return (
                              <div
                                className={styles.object}
                                key={index}
                                onClick={() => setUserPreferedGenres([...userPreferedGenres , obj])}
                              >
                                {obj.value}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div> :

                    <>
                      <h3 className='md:hidden flex justify-center m-2 cursor-pointer'>
                        <RiHeartAddFill className='ml-2 w-6 h-6 text-red-500'
                          onClick={() => {
                            setOpen(false);
                            setGenrePreferenceOpen(true);
                          }} />
                      </h3>
                      <div className={styles.objWrapper}>
                        {
                          gns.map((obj, index) => {
                            return (
                              <div
                                className={styles.object}
                                key={index}
                                onClick={() => {
                                  setCurrentGenre(obj.value)
                                  setOpen(false);
                                }}
                              >
                                {obj.value}
                              </div>
                            )
                          })
                        }
                      </div>
                    </>
                }
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default PoolModal
