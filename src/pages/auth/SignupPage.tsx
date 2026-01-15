import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      <div style={{ 
        flex: 1, 
        backgroundColor: '#00053D', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '4rem',
        color: 'white',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            상생의 파트너십을 위해
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1' }}>
            돌다리(Doldari)와 함께 투명한 프랜차이즈 문화를 만들어가세요.
          </p>
        </div>
      </div>

      <div style={{ 
        width: '500px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '4rem' 
      }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Doldari</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>회원가입</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              {...register('name')}
              type="text" 
              placeholder="이름 / 회사명" 
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
            가입하기
          </button>
        </form>

        <p style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          이미 계정이 있으신가요? <a href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>로그인하기</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
