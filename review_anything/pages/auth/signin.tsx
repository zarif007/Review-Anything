import { getProviders, signIn  } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc';
import Header from '../../components/Header';
import  React  from 'react';
import providersInterface from '../../interfaces/SignIn';

const SignIn: React.FC<{providers: providersInterface}> = ({ providers }) => {
  console.log(providers)
  return (
    <div className=''>
      <Header />
      <div className='bg-[#0E0E10] min-h-screen flex justify-center pt-40 lg:pt-72'>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button onClick={() => {
                signIn(provider.id, { callbackUrl: '/' })      
              }} className='hover:bg-[#131313] bg-[#030303] text-white border-2 border-gray-900 p-3 rounded-sm font-semibold flex text-lg space-x-2'>
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
