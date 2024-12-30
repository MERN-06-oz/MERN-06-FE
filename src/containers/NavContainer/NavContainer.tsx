'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';
import { Menu } from 'lucide-react';

const NavContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();

  const handleChatClick = () => {
    if (isAuthenticated) {
      router.push('/chat');
    } else {
      router.push('/auth/signIn');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleMyPageClick = () => {
    if (isAuthenticated) {
      router.push('/mypage');
    } else {
      router.push('/auth/signIn');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="fixed w-full bg-white z-40 shadow-md">
        <nav className="flex items-center justify-between h-[80px] md:px-10 px-8">
          <div className="mr-10 text-kick text-2xl font-bold">
            <Link href={'/'} onClick={closeModal}>
              채우다 로고
            </Link>
          </div>
          <ul className="flex md:space-x-8 space-x-5">
            <li className="hover:text-kick">
              <Link href={'/'} onClick={closeModal}>
                지도 보기
              </Link>
            </li>
            <li className="hover:text-kick">
              <Link href={'/search'} onClick={closeModal}>
                매물 보기
              </Link>
            </li>
            <li className="hover:text-kick">
              <Link href={'/create'} onClick={closeModal}>
                매물 올리기
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <button onClick={handleChatClick} className="hover:text-kick">
              채팅
            </button>
            <span className="text-gray-500">|</span>
            {isAuthenticated ? (
              <div className="items-center space-x-4 ml-auto">
                <button onClick={handleMyPageClick} className="hover:text-kick">
                  마이페이지
                </button>
                <span className="text-gray-500">|</span>
                <button onClick={handleLogout} className="hover:text-kick">
                  로그아웃
                </button>
              </div>
            ) : (
              <button className="hover:text-kick">
                <Link href={'/auth/signIn'}>로그인/회원가입</Link>
              </button>
            )}
          </div>

          <button
            className="md:hidden flex items-center text-2xl text-kick ml-auto"
            onClick={toggleModal}
          >
            <Menu />
          </button>
        </nav>
      </header>

      {isModalOpen && (
        <div className="fixed right-0 md:hidden z-50 top-[80px] bg-gray-50 w-[200px] p-6 shadow-md">
          <button className="absolute top-4 right-4 text-gray-700" onClick={toggleModal}>
            ✕
          </button>
          <ul className="space-y-4">
            <li className="hover:text-kick">
              <Link href={'/chat'} onClick={toggleModal}>
                채팅
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="hover:text-kick">
                  <button onClick={handleMyPageClick} className="w-full text-left">
                    마이페이지
                  </button>
                </li>
                <li className="hover:text-kick">
                  <button onClick={handleLogout} className="w-full text-left">
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <li className="hover:text-kick">
                <Link href={'/auth/signIn'} onClick={toggleModal}>
                  로그인/회원가입
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavContainer;
