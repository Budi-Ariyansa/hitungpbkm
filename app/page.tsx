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
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {!showResults ? (
        <>
          {/* Header dengan Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/logo-pbkm.jpg"
                  alt="PB Kena Mental Logo"
                  fill
                  className="rounded-full object-cover shadow-lg"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                  🏸 PB Kena Mental
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">Badminton Community App</p>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aplikasi lengkap untuk komunitas badminton - Hitung biaya dan buat undangan bermain
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-2 shadow-md border">
              <div className="flex gap-2">
                <button
                  onClick={() => handleModeChange('calculator')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    appMode === 'calculator'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Calculator className="w-5 h-5" />
                  Kalkulator Biaya
                </button>
                <button
                  onClick={() => handleModeChange('invitation')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    appMode === 'invitation'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  Buat Undangan
                </button>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {appMode === 'calculator' ? (
              <>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Perhitungan Akurat</h3>
                  <p className="text-sm text-gray-600">Hitung biaya lapangan dan shuttlecock dengan presisi</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-success-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-success-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Pembagian Otomatis</h3>
                  <p className="text-sm text-gray-600">Bagi biaya secara adil untuk semua pemain</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Ringkasan Lengkap</h3>
                  <p className="text-sm text-gray-600">Dapatkan ringkasan yang bisa dibagikan</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Undangan Mudah</h3>
                  <p className="text-sm text-gray-600">Buat undangan bermain dengan informasi lengkap</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-success-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-success-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Lokasi & Waktu</h3>
                  <p className="text-sm text-gray-600">Informasi lapangan dan jadwal bermain yang jelas</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share2 className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Bagikan Instant</h3>
                  <p className="text-sm text-gray-600">Share undangan ke WhatsApp atau media sosial</p>
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
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© 2024 PB Kena Mental. Dibuat dengan ❤️ untuk komunitas badminton.</p>
      </footer>
    </main>
  );
}
