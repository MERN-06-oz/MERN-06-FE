'use client';

import { sendLoginRequest, sendLogoutRequest } from '@/api/auth';
import FormButton from '@/components/form/FormButton';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninForm, SigninSchema } from '../schemas/SignInSchema';
import { deleteCookie, getCookie } from 'cookies-next';

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = async (data: SigninForm) => {
    setLoading(true);
    setErrorMessages(null);

    const { email, password } = data;
    const response = await sendLoginRequest(email, password);

    if (response.success) {
      console.log('로그인 성공');

      const cookieResponse = await fetch('/api/auth/setToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: response.tokens?.access,
          refreshToken: response.tokens?.refresh,
        }),
      });

      if (cookieResponse.ok) console.log('쿠기 설정 성공');
      else console.error('쿠키 설정 실패');
    } else {
      console.error('로그인 실패:', data);
      setErrorMessages(response.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const refreshToken = await getCookie('refreshToken');

    if (!refreshToken) {
      console.error('로그아웃 실패: refreshToken이 존재하지 않습니다.');
      return;
    }

    try {
      const response = await sendLogoutRequest(refreshToken);

      if (response.success) {
        console.log('로그아웃 성공');
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        window.location.href = '/';
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 요청 오류:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">로그인</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              {...register('email')}
              className="w-full px-4 py-2 mt-2 border focus:outline-none"
            />
          </div>
          {errors.email && <p className="mb-2 text-sm text-red-500">{errors.email.message}</p>}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              {...register('password')}
              className="w-full px-4 py-2 mt-2 border focus:outline-none"
            />
          </div>
          {errors.password && (
            <p className="mb-2 text-sm text-red-500">{errors.password.message}</p>
          )}
          {errorMessages && <p className="mb-2 text-sm text-red-500">{errorMessages}</p>}
          <FormButton>{loading ? '로그인 중...' : '로그인'}</FormButton>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            회원이 아니신가요?{' '}
            <Link href="/auth/signUp" className="border-b-2 border-gray-600">
              회원가입
            </Link>
          </p>
        </div>
        <button className="bg-slate-400" onClick={handleLogout}>
          임시 로그아웃 버튼
        </button>
      </div>
    </div>
  );
};

export default SignIn;
