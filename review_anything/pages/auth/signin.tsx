import { getProviders, signIn  } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc';
import Header from '../../components/Header';
import  React  from 'react';
import providersInterface from '../../interfaces/SignIn';
import { theme } from '../../atoms/themeAtom';
import { useRecoilState } from 'recoil';

const SignIn: React.FC<{providers: providersInterface}> = ({ providers }) => {

  const [isDark, setIsDark] = useRecoilState(theme);
  
  const styles = {
    wrapper: `${isDark ? 'bg-[#0E0E10]' : 'bg-[#F9F6EE]'} min-h-screen flex justify-center pt-40 lg:pt-72`,
    provider: `${isDark ? 'hover:bg-[#131313] bg-[#030303] border-gray-900 text-white' : 'hover:bg-[#F9F6EE] bg-[#fefefa] border-gray-200 text-black'} 
            border-2  p-3 rounded-sm font-semibold flex text-lg space-x-2`,
  }

  return (
    <div className=''>
      <Header />
      <div className={styles.wrapper}>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button onClick={() => {
                signIn(provider.id, { callbackUrl: '/' })    
              }} className={styles.provider}>
              <FcGoogle className='h-8 w-8' />
              <span>Sign in with {provider.name}</span>
            </button>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    }
  }
}

export default SignIn
