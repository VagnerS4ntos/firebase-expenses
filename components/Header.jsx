import React from 'react';
import Image from 'next/image';
import { MdSettings, MdLogout } from 'react-icons/md';
import { auth } from '../firebase/apiConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const router = useRouter();

  async function logOff() {
    try {
      await signOut(auth);
      removeCookies('userID');
      router.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <header className="h-32 bg-blue-400 fixed w-full">
      <section className="flex items-center justify-between px-2 h-full container mx-auto">
        <Image src={'/logo.png'} alt="logo" width={80} height={80} />
        <div className="text-2xl flex items-center gap-3 ml-2">
          <p className="text-xl font-semibold">
            {auth.currentUser?.displayName}
          </p>
          {/* <MdSettings className="cursor-pointer" /> */}
          <MdLogout className="cursor-pointer" onClick={logOff} />
        </div>
      </section>
    </header>
  );
}

export default Header;
