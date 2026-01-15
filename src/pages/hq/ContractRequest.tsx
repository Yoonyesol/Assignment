import React, { useState } from 'react';
import { Upload, UserPlus, FileText, CheckCircle2, ChevronRight, AlertTriangle, ShieldCheck, User } from 'lucide-react';

const steps = ['문서 업로드', '참여자 지정', '설정 및 분석', '발송 완료'];

const ContractRequest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleNext = () => {
    if (currentStep === 1) {
      startAIAnalysis();
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const startAIAnalysis = () => {
    setIsAIAnalyzing(true);
    setTimeout(() => {
      setIsAIAnalyzing(false);
      setAiResult({
        riskCount: 2,
        safeCount: 15,
        risks: [
          { title: '위약금 과다 산정 가능성', description: '제 15조 2항의 위약금 산정 방식이 최근 판례 기준보다 높게 설정되어 있습니다.', severity: 'medium' },
          { title: '영업지역 침해 모호', description: '영업지역 보호 범위가 구체적인 도면 없이 주소지로만 되어 있어 분쟁 소지가 있습니다.', severity: 'high' }
        ]
      });
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', marginBottom: '1.5rem' }}>새로운 계약 요청</h1>
        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  backgroundColor: index <= currentStep ? 'var(--primary)' : 'var(--border)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {index < currentStep ? <CheckCircle2 size={16} /> : index + 1}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: index === currentStep ? 600 : 400, color: index <= currentStep ? 'var(--text-main)' : 'var(--text-muted)' }}>{step}</span>
              </div>
              {index < steps.length - 1 && <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)', minWidth: '40px' }} />}
            </React.Fragment>
          ))}
        </div>
      </header>

      <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', minHeight: '500px' }}>
        {currentStep === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
              <Upload size={32} />
            </div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>계약서(PDF) 업로드</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>서명이 필요한 계약서 파일을 드래그하여 놓거나 클릭하여 선택하세요.</p>
            <button 
              onClick={handleNext}
              style={{ padding: '0.875rem 2.5rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600 }}
            >
              파일 선택하기
            </button>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>참여자 정보 입력</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <SignerInput label="작성자 (본사)" name="김철수" email="chulsoo@franchise.com" isMe />
              <div style={{ height: '20px', position: 'relative', margin: '0.5rem 0' }}>
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '50%', backgroundColor: 'var(--surface)', padding: '0 1rem', zIndex: 1, fontSize: '0.75rem', color: 'var(--text-muted)' }}>서명 참여자 추가</div>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--border)' }} />
              </div>
              <SignerInput label="수신자 (점주)" name="홍길동" email="hong@gmail.com" />
              <button style={{ alignSelf: 'center', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', backgroundColor: 'transparent' }}>
                <UserPlus size={18} />
                <span>참여자 추가하기</span>
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
              <button onClick={handleNext} style={{ padding: '0.875rem 2.5rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600 }}>
                다음 단계로
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--background)', borderRadius: 'var(--radius)', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>계약서 미리보기 영역</p>
                <p style={{ fontSize: '0.875rem' }}>(서명 위치 지정 가능)</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid rgba(11,92,255,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                  <ShieldCheck size={20} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>AI 법률 위험 분석</h3>
                </div>
                {isAIAnalyzing ? (
                  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div style={{ border: '2px solid var(--primary)', borderTopColor: 'transparent', width: '24px', height: '24px', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
                    <p style={{ fontSize: '0.875rem' }}>계약 조항 분석 중...</p>
                  </div>
                ) : aiResult ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ flex: 1, backgroundColor: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--danger)' }}>{aiResult.riskCount}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>주의 조항</div>
                      </div>
                      <div style={{ flex: 1, backgroundColor: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>{aiResult.safeCount}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>안전 조항</div>
                      </div>
                    </div>
                    {aiResult.risks.map((risk: any, i: number) => (
                      <div key={i} style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${risk.severity === 'high' ? 'var(--danger)' : 'var(--warning)'}` }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <AlertTriangle size={14} color={risk.severity === 'high' ? 'var(--danger)' : 'var(--warning)'} />
                          {risk.title}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{risk.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>최종 설정</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>화상 미팅 필수</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div style={{ fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>서명 후 자동 메일 발송</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleNext}
                style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                계약서 전송하기
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--success)' }}>
              <CheckCircle2 size={40} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>계약서 발송 완료!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
              점주에게 계약 참여 링크가 발송되었습니다.<br />
              점주가 링크를 통해 접속하면 미팅을 시작할 수 있습니다.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button style={{ padding: '0.875rem 2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', backgroundColor: 'white', fontWeight: 600 }}>계약 관리로 이동</button>
              <button style={{ padding: '0.875rem 2rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600 }}>미팅 링크 복사</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const SignerInput = ({ label, name, email, isMe }: any) => (
  <div style={{ padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: isMe ? 'var(--primary-light)' : 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <User size={20} color={isMe ? 'var(--primary)' : 'var(--text-muted)'} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input type="text" defaultValue={name} style={{ border: 'none', borderBottom: '1px solid var(--border)', padding: '0.25rem 0', fontWeight: 600, width: '150px' }} />
        <input type="email" defaultValue={email} style={{ border: 'none', borderBottom: '1px solid var(--border)', padding: '0.25rem 0', color: 'var(--text-muted)', flex: 1 }} />
      </div>
    </div>
  </div>
);

export default ContractRequest;
