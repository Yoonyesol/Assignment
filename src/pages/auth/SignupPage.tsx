import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, XCircle } from 'lucide-react';
import { AUTH_CONSTANTS, REGEX } from '../../constants/auth';

interface SignupFormData {
  businessRegistration: FileList;
  franchiseName: string;
  logo: FileList;
  companyPhone: string;
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
  terms: boolean;
}

const SignupPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const navigate = useNavigate();
  
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const logo = watch('logo');

  // Email verification timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Logo preview
  useEffect(() => {
    if (logo && logo[0]) {
      const file = logo[0];
      if (AUTH_CONSTANTS.ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [logo]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendVerification = () => {
    // TODO: API call to send verification code
    setIsVerificationSent(true);
    setTimer(AUTH_CONSTANTS.EMAIL_VERIFICATION_TIME);
    console.log('Verification code sent');
  };

  const handleVerifyCode = () => {
    // TODO: API call to verify code
    setIsVerified(true);
    setTimer(0);
    console.log('Email verified');
  };

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup data:', data);
    navigate('/login');
  };

  const validatePassword = (value: string) => {
    if (!REGEX.PASSWORD.test(value)) {
      return '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다';
    }
    return true;
  };

  const validatePasswordConfirm = (value: string) => {
    if (value !== password) {
      return '비밀번호가 일치하지 않습니다';
    }
    return true;
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
            프랜차이즈 관리의<br />새로운 기준
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            투명하고 안전한 가맹 계약으로<br />상생의 파트너십을 시작하세요
          </p>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50/50 overflow-hidden">
        <div className="w-full max-w-2xl h-full overflow-y-auto py-8 px-4">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-primary text-3xl font-bold">Doldari</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">가맹본부 등록</h2>
              <p className="text-sm text-gray-500">프랜차이즈 정보를 입력해주세요</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Business Registration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  사업자등록증 <span className="text-gray-400">(선택)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <label className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">파일을 선택하거나 드래그하세요</span>
                    <span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (최대 5MB)</span>
                    <input
                      {...register('businessRegistration')}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Franchise Name */}
                <div>
                  <label htmlFor="franchiseName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    프랜차이즈명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('franchiseName', { required: '프랜차이즈명을 입력하세요' })}
                    id="franchiseName"
                    type="text"
                    placeholder="예: BHC, BBQ"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all placeholder:text-gray-400"
                  />
                  {errors.franchiseName && (
                    <p className="mt-1 text-xs text-red-600">{errors.franchiseName.message}</p>
                  )}
                </div>

                {/* Company Phone */}
                <div>
                  <label htmlFor="companyPhone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    회사 대표 번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('companyPhone', { 
                      required: '전화번호를 입력하세요',
                      pattern: {
                        value: REGEX.PHONE,
                        message: '올바른 전화번호 형식이 아닙니다'
                      }
                    })}
                    id="companyPhone"
                    type="tel"
                    placeholder="02-1234-5678"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all placeholder:text-gray-400"
                  />
                  {errors.companyPhone && (
                    <p className="mt-1 text-xs text-red-600">{errors.companyPhone.message}</p>
                  )}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  로고 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                      <label className="flex flex-col items-center cursor-pointer">
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-600">PNG, JPG만 가능</span>
                        <input
                          {...register('logo', { 
                            required: '로고를 업로드하세요',
                            validate: (files) => {
                              if (files && files[0]) {
                                const file = files[0];
                                if (!AUTH_CONSTANTS.ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
                                  return 'PNG 또는 JPG 파일만 업로드 가능합니다';
                                }
                              }
                              return true;
                            }
                          })}
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  {logoPreview && (
                    <div className="w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
                      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
                {errors.logo && (
                  <p className="mt-1 text-xs text-red-600">{errors.logo.message}</p>
                )}
              </div>

              {/* Email with Verification */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  관리자 이메일 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
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
                    placeholder="admin@company.com"
                    disabled={isVerified}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all placeholder:text-gray-400 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleSendVerification}
                    disabled={isVerified || timer > 0}
                    className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg
                             hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed
                             transition-colors whitespace-nowrap"
                  >
                    {isVerified ? '인증완료' : timer > 0 ? formatTime(timer) : '인증요청'}
                  </button>
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Verification Code */}
              {isVerificationSent && !isVerified && (
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1.5">
                    인증번호
                  </label>
                  <div className="flex gap-2">
                    <input
                      {...register('verificationCode')}
                      id="verificationCode"
                      type="text"
                      placeholder="6자리 인증번호 입력"
                      maxLength={6}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg
                               hover:bg-green-700 transition-colors whitespace-nowrap"
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('password', { 
                    required: '비밀번호를 입력하세요',
                    validate: validatePassword
                  })}
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400"
                />
                {password && !errors.password && REGEX.PASSWORD.test(password) && (
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>안전한 비밀번호입니다</span>
                  </div>
                )}
                {errors.password && (
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <XCircle className="w-3 h-3" />
                    <span>{errors.password.message}</span>
                  </div>
                )}
                {!errors.password && password && !REGEX.PASSWORD.test(password) && (
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <XCircle className="w-3 h-3" />
                    <span>비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다</span>
                  </div>
                )}
              </div>

              {/* Password Confirm */}
              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1.5">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('passwordConfirm', { 
                    required: '비밀번호 확인을 입력하세요',
                    validate: validatePasswordConfirm
                  })}
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all placeholder:text-gray-400"
                />
                {passwordConfirm && !errors.passwordConfirm && password === passwordConfirm && (
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>비밀번호가 일치합니다</span>
                  </div>
                )}
                {errors.passwordConfirm && (
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <XCircle className="w-3 h-3" />
                    <span>{errors.passwordConfirm.message}</span>
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="pt-2">
                <label className="flex items-start cursor-pointer group">
                  <input 
                    {...register('terms', { required: true })}
                    type="checkbox" 
                    className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-xs text-gray-600 group-hover:text-gray-900 leading-relaxed">
                    서비스 이용약관 및 개인정보 처리방침에 동의합니다
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg
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
