import React from 'react'
import { useRecoilState } from 'recoil';
import { theme } from '../atoms/themeAtom';

const Comments = () => {
  const [isDark] = useRecoilState(theme);

  const styles = {
    wrapper: `${isDark ? 'bg-slate-900 border-gray-900' : 'bg-blue-200 border-blue-100'} bg-opacity-25 border-2 rounded-sm md:mr-2 h-100 md:h-3/5`,

    searchWrapper: `text-gray-600 focus-within:text-gray-400`,
    searchInput: `w-full h-16 mb-0 text-large font-semibold ${isDark ? 'text-white bg-[#0c1012] focus:bg-gray-900 border-[#2b3c53]' : 'text-black bg-[#FAF9F6] focus:bg-gray-100 border-[#a1a1aa]'} border rounded`,
  }
  return (
    <main className={styles.wrapper}>
        <section className="p-2">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>

      <div className="overflow-y-auto h-72 md:h-5/6 scrollbar-hide">
        
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
        <section className="p-1">
          <h1 className="p-1 text-lg font-semibold">Comments</h1>
        </section>
      </div>

      <section className="pb-0">
        <div className={styles.searchWrapper}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Add Comment"
            autoComplete="off"
          />
        </div>
      </section>

    </main>
  );
}

export default Comments
