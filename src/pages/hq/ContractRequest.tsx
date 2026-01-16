import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  AlertTriangle, 
  ShieldCheck, 
  User,
  UserPlus,
  X,
  ChevronLeft,
  Play,
  Calendar,
  Clock,
  Type
} from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';

const steps = ['계약서 업로드', '계약 검토', '회의 정보 입력', '발송 완료'];

const ContractRequest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Meeting Info State
  const [meetingInfo, setMeetingInfo] = useState({
    title: '',
    date: '',
    time: '',
    memo: ''
  });

  const handleNext = () => {
    // Step 2 (Meeting Info) -> Show Confirm Modal
    if (currentStep === 2) {
      if (!meetingInfo.title || !meetingInfo.date || !meetingInfo.time) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
      }
      setShowConfirmModal(true);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleConfirmSend = () => {
    setShowConfirmModal(false);
    setCurrentStep(3); // Move to completion
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const startAIAnalysis = () => {
    setIsAIAnalyzing(true);
    setShowAIPanel(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAIAnalyzing(false);
      setAiResult({
        riskCount: 2,
        safeCount: 15,
        risks: [
          { 
            title: '위약금 과다 산정 가능성', 
            description: '제 15조 2항의 위약금 산정 방식이 최근 판례 기준보다 높게 설정되어 있습니다.', 
            severity: 'medium' 
          },
          { 
            title: '영업지역 침해 모호', 
            description: '영업지역 보호 범위가 구체적인 도면 없이 주소지로만 되어 있어 분쟁 소지가 있습니다.', 
            severity: 'high' 
          }
        ]
      });
    }, 3000);
  };



  return (
    <div className="h-full flex flex-col">
      <ConfirmModal 
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSend}
        title="계약서를 전송하시겠습니까?"
        description={`회의: ${meetingInfo.title}
일시: ${meetingInfo.date} ${meetingInfo.time}
수신자: 홍길동 (점주)

전송 후에는 내용을 수정할 수 없습니다.`}
        confirmText="전송하기"
        cancelText="취소"
        variant="primary"
      />
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">새로운 계약 요청</h1>
        
        {/* Stepper */}
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-2">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'}
                `}>
                  {index < currentStep ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  index === currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 min-w-[40px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        {/* Step 0: Upload */}
        {currentStep === 0 && (
          <div className="p-8 overflow-y-auto">
            {/* File Upload Area */}
            {!uploadedFile ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">계약서(PDF) 업로드</h2>
                <p className="text-gray-600 mb-8">
                  서명이 필요한 계약서 파일을 드래그하여 놓거나 클릭하여 선택하세요.
                </p>
                <label className="inline-block">
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <span className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 
                                 transition-colors cursor-pointer inline-block">
                    파일 선택하기
                  </span>
                </label>
              </div>
            ) : (
              <div className="py-8">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-900">업로드 완료</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Analysis Button - Redesigned */}
            {uploadedFile && !isAIAnalyzing && !aiResult && (
              <div className="mt-8 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-8 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex gap-5 items-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                        AI 법률 위험 분석
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">BETA</span>
                      </h3>
                      <p className="text-gray-600 mb-2">
                        계약서 내의 <span className="font-semibold text-gray-900">독소 조항</span>과 <span className="font-semibold text-gray-900">법적 위험 요소</span>를 AI가 즉시 분석해드립니다.
                      </p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">✨ 30초 만에 분석 완료</span>
                        <span className="flex items-center gap-1">⚖️ 최신 법령 기준</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={startAIAnalysis}
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-sm
                             hover:bg-purple-700 transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    AI 분석 시작
                  </button>
                </div>
              </div>
            )}

            {/* AI Analysis Progress */}
            {isAIAnalyzing && (
              <div className="border-t border-gray-200 pt-8">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">AI 분석 진행 중...</h3>
                      <p className="text-sm text-gray-600">계약서의 조항들을 분석하고 있습니다</p>
                      <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full animate-pulse" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Analysis Complete */}
            {aiResult && (
              <div className="border-t border-gray-200 pt-8">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 text-purple-700 mb-4">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="font-semibold">AI 분석 완료</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-red-600">{aiResult.riskCount}</div>
                      <div className="text-sm text-gray-600">주의 조항</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-green-600">{aiResult.safeCount}</div>
                      <div className="text-sm text-gray-600">안전 조항</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    다음 단계에서 상세한 분석 결과를 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Navigation */}
            {uploadedFile && (
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 
                           transition-colors flex items-center gap-2"
                >
                  다음 단계로
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Contract Review */}
        {currentStep === 1 && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex overflow-hidden">
              {/* Left: Participants */}
              {isLeftPanelOpen && (
                <div className="w-[280px] border-r border-gray-200 bg-white flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-900">참여자 지정</h3>
                    <button onClick={() => setIsLeftPanelOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="p-4 space-y-4 overflow-y-auto">
                    <ParticipantCard 
                      label="작성자 (본사)" 
                      name="김철수" 
                      email="chulsoo@franchise.com" 
                      isMe 
                    />
                    
                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-xs text-gray-500">서명자</span>
                      </div>
                    </div>
                    
                    <ParticipantCard 
                      label="수신자 (점주)" 
                      name="홍길동" 
                      email="hong@gmail.com" 
                    />
                    
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed 
                                     border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 
                                     transition-colors text-sm font-medium">
                      <UserPlus className="w-4 h-4" />
                      참여자 추가
                    </button>
                  </div>

                  {/* Bottom Settings in Left Panel */}
                  <div className="mt-auto p-4 border-t border-gray-200 bg-gray-50">
                     <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">계약 설정</h3>
                     <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-gray-700">화상 미팅 필수</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-gray-700">자동 메일 발송</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </label>
                     </div>
                  </div>
                </div>
              )}

              {/* Left Panel Toggle (When Closed) */}
              {!isLeftPanelOpen && (
                 <div className="w-10 border-r border-gray-200 bg-gray-50 flex flex-col items-center py-4">
                   <button 
                    onClick={() => setIsLeftPanelOpen(true)}
                    className="p-2 hover:bg-gray-200 rounded mb-4"
                    title="참여자 패널 열기"
                  >
                     <ChevronRight className="w-5 h-5 text-gray-600" />
                   </button>
                   <div className="writing-vertical text-xs text-gray-500 font-medium tracking-wider">참여자 및 설정</div>
                 </div>
              )}

              {/* Center: PDF Preview */}
              <div className="flex-1 bg-gray-100 flex flex-col relative overflow-hidden">
                 {/* Toolbar */}
                <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">{uploadedFile?.name || '계약서.pdf'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     {!showAIPanel && aiResult && (
                      <button
                        onClick={() => setShowAIPanel(true)}
                        className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-md font-medium hover:bg-purple-200 transition-colors flex items-center gap-1"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        AI 분석 결과
                      </button>
                    )}
                  </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
                  <div className="bg-white shadow-lg w-full max-w-4xl min-h-[800px] flex items-center justify-center relative">
                    <div className="text-center text-gray-500">
                      <p className="font-medium text-lg">PDF 미리보기</p>
                      <p className="text-sm mt-1">이 영역은 PDF 렌더링 라이브러리로 대체됩니다</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: AI Analysis (Toggleable) */}
              {showAIPanel && (
                <div className="w-[320px] border-l border-gray-200 bg-white flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-700">
                      <ShieldCheck className="w-5 h-5" />
                      <h3 className="font-semibold">AI 법률 위험 분석</h3>
                    </div>
                    <button
                      onClick={() => setShowAIPanel(false)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {aiResult && (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-red-50 rounded-lg p-3 text-center border border-red-100">
                            <div className="text-2xl font-bold text-red-600">{aiResult.riskCount}</div>
                            <div className="text-xs text-red-700 font-medium">주의 조항</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                            <div className="text-2xl font-bold text-green-600">{aiResult.safeCount}</div>
                            <div className="text-xs text-green-700 font-medium">안전 조항</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {aiResult.risks.map((risk: any, i: number) => (
                            <div 
                              key={i} 
                              className={`rounded-lg p-3 border ${
                                risk.severity === 'high' 
                                  ? 'bg-red-50 border-red-200' 
                                  : 'bg-yellow-50 border-yellow-200'
                              }`}
                            >
                              <div className="flex items-start gap-2 mb-1">
                                <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                  risk.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                                }`} />
                                <div className={`text-sm font-bold ${
                                  risk.severity === 'high' ? 'text-red-900' : 'text-yellow-900'
                                }`}>{risk.title}</div>
                              </div>
                              <p className={`text-xs ml-6 ${
                                risk.severity === 'high' ? 'text-red-800' : 'text-yellow-800'
                              }`}>{risk.description}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <p className="text-xs text-blue-800 leading-relaxed">
                            💡 <strong>AI 조언:</strong> 전반적으로 표준 계약서 양식을 따르고 있으나, 위약금 조항 위주로 검토가 필요합니다.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center z-10 flex-shrink-0">
               <button
                  onClick={() => setCurrentStep(0)}
                  className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                >
                  이전 단계
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    참여자 및 계약 내용 설정이 완료되었나요?
                  </span>
                  <button
                    onClick={handleNext}
                    className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 flex items-center gap-2"
                  >
                    다음 단계로
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
            </div>
          </div>
        )}


        {/* Step 2: Meeting Info (NEW) */}
        {currentStep === 2 && (
          <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">회의 정보 입력</h2>
                <p className="text-gray-600 mt-2">
                  점주와 진행할 화상 계약 회의의 상세 정보를 입력해주세요.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    회의 제목
                  </label>
                  <input 
                    type="text" 
                    value={meetingInfo.title}
                    onChange={(e) => setMeetingInfo({...meetingInfo, title: e.target.value})}
                    placeholder="예: 강남역점 가맹 갱신 계약 회의"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      회의 날짜
                    </label>
                    <input 
                      type="date" 
                      value={meetingInfo.date}
                      onChange={(e) => setMeetingInfo({...meetingInfo, date: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      회의 시간
                    </label>
                    <input 
                      type="time" 
                      value={meetingInfo.time}
                      onChange={(e) => setMeetingInfo({...meetingInfo, time: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    메모 (선택사항)
                  </label>
                  <textarea 
                    value={meetingInfo.memo}
                    onChange={(e) => setMeetingInfo({...meetingInfo, memo: e.target.value})}
                    placeholder="회의 관련 전달사항이 있다면 입력해주세요."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  이전 단계
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 
                           transition-colors flex items-center gap-2"
                >
                  전송하기
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {currentStep === 3 && (
          <div className="p-8 flex items-center justify-center flex-1">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">계약서 발송 완료!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                점주에게 계약 참여 링크가 발송되었습니다.<br />
                점주가 링크를 통해 접속하면 미팅을 시작할 수 있습니다.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left max-w-sm mx-auto border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">예약된 회의 정보</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">회의 제목</span>
                    <span className="font-medium text-gray-900">{meetingInfo.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">일시</span>
                    <span className="font-medium text-gray-900">{meetingInfo.date} {meetingInfo.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                  계약 관리로 이동
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                  미팅 링크 복사
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
};

const ParticipantCard = ({ label, name, email, isMe }: any) => (
  <div className={`p-3 rounded-lg border ${isMe ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isMe ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
      }`}>
        <User className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="text-sm font-semibold text-gray-900 truncate">{name}</div>
        <div className="text-xs text-gray-600 truncate">{email}</div>
      </div>
    </div>
  </div>
);

export default ContractRequest;
