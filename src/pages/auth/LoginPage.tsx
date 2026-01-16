import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Chrome, Apple, Facebook } from 'lucide-react';
import { REGEX } from '../../constants/auth';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // HQ email check logic maintained
    if (data.email.includes('hq')) {
      navigate('/hq/dashboard');
    } else {
      navigate('/franchisee/dashboard');
    }
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0e4d92] to-[#1c5fa8] relative overflow-hidden items-center justify-center p-16">
        <div className="relative z-10 text-center max-w-xl">
          <div className="mb-8">
            <h1 className="text-white text-5xl font-bold mb-4 tracking-tight">Doldari</h1>
            <div className="w-20 h-1 bg-blue-400/50 mx-auto rounded-full"></div>
          </div>
          <h2 className="text-white text-3xl font-semibold mb-4 leading-tight">
            더 투명하고 안전한<br />가맹계약의 시작
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            화상 미팅과 전자계약이 결합된<br />상생 관리 ERP
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50/50 overflow-hidden">
        <div className="w-full max-w-md h-full overflow-y-auto py-8">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-primary text-3xl font-bold">Doldari</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">로그인</h2>
              <p className="text-sm text-gray-500">계정에 로그인하세요</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  이메일 주소
                </label>
                <input
                  {...register('email', {
                    required: '이메일을 입력하세요',
                    pattern: {
                      value: REGEX.EMAIL,
                      message: '올바른 이메일 형식이 아닙니다'
                    }
                  })}
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  비밀번호
                </label>
                <input
                  {...register('password', {
                    required: '비밀번호를 입력하세요'
                  })}
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-600 group-hover:text-gray-900">로그인 상태 유지</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  비밀번호 찾기
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg
                         transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2"
              >
                로그인
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-xs text-gray-500 bg-white">또는 다음으로 로그인</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <SocialButton icon={<Chrome className="w-5 h-5" />} label="Google" />
                <SocialButton icon={<Apple className="w-5 h-5" />} label="Apple" />
                <SocialButton icon={<Facebook className="w-5 h-5 text-blue-600" />} label="Facebook" />
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  무료로 가입하기
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

const SocialButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button
    type="button"
    className="flex flex-col items-center justify-center gap-2 p-3 border border-gray-200 
             rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all group"
  >
    <div className="text-gray-600 group-hover:text-gray-900">{icon}</div>
    <span className="text-xs text-gray-500 group-hover:text-gray-700">{label}</span>
  </button>
);

export default LoginPage;
