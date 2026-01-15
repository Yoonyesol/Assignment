import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Chrome, Apple, Facebook } from 'lucide-react';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    // For prototype, just navigate to hq dashboard
    if (data.email.includes('hq')) {
      navigate('/hq/dashboard');
    } else {
      navigate('/franchisee/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      {/* Left decoration (Zoom style) */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#00053D', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '4rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            더 투명하고 안전한<br />가맹계약의 시작
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', marginBottom: '3rem' }}>
            화상 미팅과 전자계약이 결합된 상생 관리 ERP
          </p>
          <div style={{ 
            width: '100%', 
            maxWidth: '500px', 
            height: '300px', 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4rem'
          }}>
            🤝
          </div>
        </div>
        {/* Decorative blobs */}
        <div style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-10%', 
          width: '400px', 
          height: '400px', 
          background: 'radial-gradient(circle, rgba(11,92,255,0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
      </div>

      {/* Right Login Form */}
      <div style={{ 
        width: '500px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '4rem' 
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ color: 'var(--primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Doldari</h1>
          <p style={{ color: 'var(--text-muted)' }}>가맹계약의 튼튼한 돌다리가 되어드립니다.</p>
        </div>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>로그인</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              {...register('email')}
              type="email" 
              placeholder="이메일 주소" 
              style={{ 
                width: '100%', 
                padding: '0.875rem 1rem 0.875rem 3rem', 
                borderRadius: 'var(--radius)', 
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)'
              }} 
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              {...register('password')}
              type="password" 
              placeholder="비밀번호" 
              style={{ 
                width: '100%', 
                padding: '0.875rem 1rem 0.875rem 3rem', 
                borderRadius: 'var(--radius)', 
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)'
              }} 
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'white', 
              padding: '0.875rem', 
              borderRadius: 'var(--radius)', 
              fontWeight: 600,
              marginTop: '0.5rem'
            }}
          >
            로그인
          </button>
        </form>

        <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>또는</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <SocialButton icon={<Chrome size={20} />} label="Google" />
          <SocialButton icon={<Apple size={20} />} label="Apple" />
          <SocialButton icon={<Facebook size={20} />} label="Facebook" />
        </div>

        <p style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          계정이 없으신가요? <a href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>무료로 가입하기</a>
        </p>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button style={{ 
    width: '3rem', 
    height: '3rem', 
    borderRadius: '50%', 
    border: '1px solid var(--border)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'white'
  }}>
    {icon}
  </button>
);

export default LoginPage;
