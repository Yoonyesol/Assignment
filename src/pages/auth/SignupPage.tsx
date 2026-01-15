import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0e4d92] to-[#1c5fa8] relative overflow-hidden items-center justify-center p-16">
        <div className="relative z-10 text-center max-w-xl">
          <div className="mb-8">
            <h1 className="text-white text-5xl font-bold mb-4 tracking-tight">Doldari</h1>
            <div className="w-20 h-1 bg-blue-400/50 mx-auto rounded-full"></div>
          </div>
          <h2 className="text-white text-3xl font-semibold mb-4 leading-tight">
            상생의 파트너십을 위해
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            돌다리(Doldari)와 함께<br />투명한 프랜차이즈 문화를 만들어가세요
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50/50">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-primary text-3xl font-bold">Doldari</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">회원가입</h2>
              <p className="text-sm text-gray-500">새로운 계정을 만드세요</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  이름 또는 회사명
                </label>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  이메일 주소
                </label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  비밀번호
                </label>
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400"
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  8자 이상, 영문, 숫자, 특수문자 포함
                </p>
              </div>

              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1.5">
                  비밀번호 확인
                </label>
                <input
                  {...register('passwordConfirm')}
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start cursor-pointer group">
                  <input 
                    type="checkbox" 
                    required
                    className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-xs text-gray-600 group-hover:text-gray-900 leading-relaxed">
                    서비스 이용약관 및 개인정보 처리방침에 동의합니다
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg
                         transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2"
              >
                가입하기
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  로그인하기
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500 space-x-4">
            <a href="#" className="hover:text-gray-700">도움말</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-700">약관</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-700">개인정보 처리방침</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
