import React from 'react';
import Image from 'next/image';
import { MdLogout } from 'react-icons/md';
import { auth } from '../firebase/apiConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

function Header() {
  const router = useRouter();
  const userID = getCookie('userID');

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
    <header className="h-32 bg-blue-400 fixed w-full px-4">
      <section className="flex items-center justify-between h-full container mx-auto">
        <Link href="/">
          <a>
            <Image src={'/logo.png'} alt="logo" width={80} height={80} />
          </a>
        </Link>
        <div className="text-2xl flex items-center gap-3 ml-2">
          {userID && (
            <p className="text-xl font-semibold">
              {auth.currentUser?.displayName}
            </p>
          )}
          <MdLogout className="cursor-pointer" onClick={logOff} title="Sair" />
        </div>
      </section>
    </header>
  );
}

export default Header;
