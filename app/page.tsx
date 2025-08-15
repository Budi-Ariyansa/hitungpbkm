'use client';

import React, { useState } from 'react';
import { Calculator, Send, Users, FileText, Share2, MapPin } from 'lucide-react';
import CalculatorForm from '@/components/CalculatorForm';
import CalculationResultComponent from '@/components/CalculationResult';
import InvitationForm from '@/components/InvitationForm';
import InvitationResult from '@/components/InvitationResult';
import { CalculationData, CalculationResult, InvitationData, AppMode } from '@/types';
import Image from 'next/image';

export default function Home() {
  const [appMode, setAppMode] = useState<AppMode>('calculator');
  const [calculationData, setCalculationData] = useState<CalculationData | null>(null);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);

  const handleCalculate = (data: CalculationData) => {
    // Pastikan semua field yang diperlukan ada
    const completeData: CalculationData = {
      ...data,
      playDate: data.playDate || '',
      playTime: data.playTime || ''
    };

    const courtCost = completeData.hourlyRate * completeData.duration;
    const shuttlecockCost = completeData.shuttlecockPrice * completeData.shuttlecockUsed;
    const totalCost = courtCost + shuttlecockCost;
    const playerCount = completeData.players.filter(p => p.name.trim()).length;
    const costPerPerson = totalCost / playerCount;

    const result: CalculationResult = {
      courtCost,
      shuttlecockCost,
      totalCost,
      playerCount,
      costPerPerson
    };

    setCalculationData(completeData);
    setCalculationResult(result);
  };

  const handleCreateInvitation = (data: InvitationData) => {
    setInvitationData(data);
  };

  const handleResetCalculator = () => {
    setCalculationData(null);
    setCalculationResult(null);
  };

  const handleResetInvitation = () => {
    setInvitationData(null);
  };

  const handleModeChange = (mode: AppMode) => {
    setAppMode(mode);
    // Reset states when changing mode
    setCalculationData(null);
    setCalculationResult(null);
    setInvitationData(null);
  };

  const showResults = (appMode === 'calculator' && calculationResult) || (appMode === 'invitation' && invitationData);

  return (
    <main className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-4xl">
      {!showResults ? (
        <>
          {/* Header dengan Logo */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0">
                <Image
                  src="/logo-pbkm.jpg"
                  alt="PB Kena Mental Logo"
                  fill
                  className="rounded-full object-cover shadow-lg"
                  priority
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="mobile-title">
                  🏸 PB Kena Mental
                </h1>
                <p className="mobile-subtitle mt-1">Badminton Community App</p>
              </div>
            </div>
            <p className="mobile-description max-w-2xl mx-auto px-2">
              Aplikasi lengkap untuk komunitas badminton - Hitung biaya dan buat undangan bermain
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="bg-white rounded-lg p-1.5 md:p-2 shadow-md border w-full max-w-md">
              <div className="flex gap-1 md:gap-2">
                <button
                  onClick={() => handleModeChange('calculator')}
                  className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-md font-medium transition-all text-xs md:text-sm flex-1 ${
                    appMode === 'calculator'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Calculator className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Kalkulator Biaya</span>
                  <span className="sm:hidden">Kalkulator</span>
                </button>
                <button
                  onClick={() => handleModeChange('invitation')}
                  className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-md font-medium transition-all text-xs md:text-sm flex-1 ${
                    appMode === 'invitation'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Buat Undangan</span>
                  <span className="sm:hidden">Undangan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {appMode === 'calculator' ? (
              <>
                <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-primary-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Calculator className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
                  </div>
                  <h3 className="mobile-card-title mb-1 md:mb-2">Perhitungan Akurat</h3>
                  <p className="mobile-card-description">Hitung biaya lapangan dan shuttlecock dengan presisi</p>
                </div>
                <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-success-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-success-600" />
                  </div>
                  <h3 className="mobile-card-title mb-1 md:mb-2">Pembagian Otomatis</h3>
                  <p className="mobile-card-description">Bagi biaya secara adil untuk semua pemain</p>
                </div>
                <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-orange-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <h3 className="mobile-card-title mb-1 md:mb-2">Ringkasan Lengkap</h3>
                  <p className="mobile-card-description">Dapatkan ringkasan yang bisa dibagikan</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-primary-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Send className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
                  </div>
                  <h3 className="mobile-card-title mb-1 md:mb-2">Undangan Mudah</h3>
                  <p className="mobile-card-description">Buat undangan bermain dengan informasi lengkap</p>
                </div>
                <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-success-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-success-600" />
                  </div>
                  <h3 className="mobile-card-title mb-1 md:mb-2">Lokasi & Waktu</h3>
                  <p className="mobile-card-description">Informasi lapangan dan jadwal bermain yang jelas</p>
                </div>
                <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-orange-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Share2 className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <h3 className="mobile-card-title mb-1 md:mb-2">Bagikan Instant</h3>
                  <p className="mobile-card-description">Share undangan ke WhatsApp atau media sosial</p>
                </div>
              </>
            )}
          </div>

          {/* Form */}
          {appMode === 'calculator' ? (
            <CalculatorForm onCalculate={handleCalculate} />
          ) : (
            <InvitationForm onCreateInvitation={handleCreateInvitation} />
          )}
        </>
      ) : (
        <>
          {/* Results */}
          {appMode === 'calculator' && calculationResult && (
            <CalculationResultComponent
              data={calculationData!}
              result={calculationResult}
              onReset={handleResetCalculator}
            />
          )}
          {appMode === 'invitation' && invitationData && (
            <InvitationResult
              data={invitationData}
              onReset={handleResetInvitation}
            />
          )}
        </>
      )}

      {/* Footer */}
      <footer className="mt-12 md:mt-16 text-center text-gray-500 text-xs md:text-sm">
        <p>© 2024 PB Kena Mental. Dibuat dengan ❤️ untuk komunitas badminton.</p>
      </footer>
    </main>
  );
}
