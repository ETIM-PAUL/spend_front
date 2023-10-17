'use client'
import { AiOutlineClose } from 'react-icons/ai'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from './auth/Context';

const Home = () => {
  const { createWallet, isLoading, isConnected } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/home");
    }
  }, [isConnected])
  return (
    <div className="">
      <section className="w-[50%] h-[400px] bg-[#D2E9FF] mx-auto rounded-[40px] mt-[150px]">
        <div className="">
          <div className="w-[90%] mx-auto flex justify-end pt-5">
            <div className="bg-[white] w-[36px] h-[36px] rounded-full flex items-center justify-center ">
              <AiOutlineClose size={24} />
            </div>
          </div>

          <div className="w-[90%] mx-auto mt-6">
            <h2 className='font-bold text-[20px] leading-8 text-[#000000] head1 text-center'>A New Way to Log in</h2>
            <p className="font-normal text-[17px] leading-6 tracking-[0.5%] head2 w-[80%] mx-auto text-center mt-4 ">
              Instead of creating new accounts and passwords on every website, just click on connect. Each Browser holds your Account details
            </p>
            <div className="flex justify-center mt-8">

              <button onClick={createWallet} className='font-bold text-[17px] text-white leading-6 tracking-[1.5%] py-[8px] px-[16px] bg-[#0F4880] rounded-lg  '>Connect</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;