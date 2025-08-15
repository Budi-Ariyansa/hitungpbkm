'use client';

import React, { useRef, useState } from 'react';
import { MapPin, Clock, Users, DollarSign, CreditCard, Info, Download, Share2, FileText, Image, FileDown, Calendar, Timer } from 'lucide-react';
import { CalculationData, CalculationResult } from '@/types';
import NextImage from 'next/image';

interface CalculationResultProps {
  data: CalculationData;
  result: CalculationResult;
  onReset: () => void;
}

export default function CalculationResultComponent({ data, result, onReset }: CalculationResultProps) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = () => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date());
  };

  const generateSummaryText = () => {
    const playerNames = data.players.map(p => p.name).filter(name => name.trim()).join(', ');
    const bankInfo = data.bankAccounts.map(acc => 
      `${acc.bankName}: ${acc.accountNumber} a.n. ${acc.accountName}`
    ).join('\n');

    // Format tanggal dan jam bermain
    const playDateTime = data.playDate && data.playTime 
      ? `${new Date(data.playDate).toLocaleDateString('id-ID', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} pukul ${data.playTime}`
      : '';

    return `
🏸 RINGKASAN BIAYA BADMINTON 🏸
PB Kena Mental

📍 Lapangan: ${data.courtName}
📅 Waktu Bermain: ${playDateTime}
⏰ Durasi: ${data.duration} jam
💰 Biaya Lapangan: ${formatCurrency(result.courtCost)}
🏸 Biaya Shuttlecock: ${formatCurrency(result.shuttlecockCost)} (${data.shuttlecockUsed} pcs × ${formatCurrency(data.shuttlecockPrice)})

💵 TOTAL BIAYA: ${formatCurrency(result.totalCost)}
👥 Jumlah Pemain: ${result.playerCount} orang
💸 Biaya per Orang: ${formatCurrency(result.costPerPerson)}

👥 Daftar Pemain:
${playerNames}

${bankInfo ? `🏦 Info Transfer:\n${bankInfo}\n` : ''}
${data.additionalInfo ? `📝 Catatan:\n${data.additionalInfo}\n` : ''}
📅 Dibuat: ${formatDate()}
    `.trim();
  };

  const handleShare = async () => {
    const text = generateSummaryText();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ringkasan Biaya Badminton',
          text: text
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Ringkasan berhasil disalin ke clipboard!');
    }).catch(() => {
      alert('Gagal menyalin ke clipboard');
    });
  };

  const handleDownload = () => {
    const text = generateSummaryText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ringkasan-badminton-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    if (!summaryRef.current) return;
    
    setIsGenerating(true);
    try {
      // Dynamic import untuk mengurangi bundle size
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      // Capture element sebagai canvas dengan pengaturan yang lebih baik
      const canvas = await html2canvas(summaryRef.current, {
        scale: 1.5, // Reduced scale for better performance
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: summaryRef.current.scrollWidth,
        height: summaryRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: summaryRef.current.scrollWidth,
        windowHeight: summaryRef.current.scrollHeight
      });

      // Buat PDF dengan ukuran A4
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Hitung rasio untuk fit ke halaman dengan margin
      const margin = 10;
      const availableWidth = pdfWidth - (margin * 2);
      const availableHeight = pdfHeight - (margin * 2);
      
      const widthRatio = availableWidth / (imgWidth * 0.264583); // Convert px to mm
      const heightRatio = availableHeight / (imgHeight * 0.264583);
      const ratio = Math.min(widthRatio, heightRatio);
      
      const finalWidth = (imgWidth * 0.264583) * ratio;
      const finalHeight = (imgHeight * 0.264583) * ratio;
      
      // Center image di halaman
      const x = (pdfWidth - finalWidth) / 2;
      const y = margin;

      // Jika tinggi melebihi satu halaman, bagi menjadi beberapa halaman
      if (finalHeight > availableHeight) {
        const pageHeight = availableHeight;
        const totalPages = Math.ceil(finalHeight / pageHeight);
        
        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage();
          
          const sourceY = (imgHeight / totalPages) * i;
          const sourceHeight = imgHeight / totalPages;
          
          // Create a temporary canvas for this page
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgWidth;
          pageCanvas.height = sourceHeight;
          const pageCtx = pageCanvas.getContext('2d');
          
          if (pageCtx) {
            pageCtx.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
            const pageImgData = pageCanvas.toDataURL('image/png');
            pdf.addImage(pageImgData, 'PNG', x, y, finalWidth, pageHeight);
          }
        }
      } else {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      }
      
      // Download PDF
      const fileName = `ringkasan-badminton-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!summaryRef.current) return;
    
    setIsGenerating(true);
    try {
      // Dynamic import
      const html2canvas = (await import('html2canvas')).default;

      // Capture element sebagai canvas
      const canvas = await html2canvas(summaryRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: summaryRef.current.scrollWidth,
        height: summaryRef.current.scrollHeight
      });

      // Convert ke blob dan download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ringkasan-badminton-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png', 1.0);
      
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Gagal membuat gambar. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Content - untuk di-capture sebagai PDF/Image */}
      <div ref={summaryRef} className="bg-white p-6 rounded-lg shadow-sm export-content">
        {/* Header dengan Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="relative w-16 h-16">
              <NextImage
                src="/logo-pbkm.jpg"
                alt="PB Kena Mental Logo"
                fill
                className="rounded-full object-cover shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                🏸 Ringkasan Biaya Badminton
              </h1>
              <p className="text-gray-600">PB Kena Mental</p>
            </div>
          </div>
          <p className="text-gray-600">{formatDate()}</p>
        </div>

        {/* Informasi Lapangan */}
        <div className="card mb-6">
          <h2 className="section-title">
            <MapPin className="w-5 h-5 text-primary-600" />
            Informasi Lapangan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Nama Lapangan</p>
              <p className="font-semibold text-lg">{data.courtName}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Biaya per Jam</p>
              <p className="font-semibold text-lg">{formatCurrency(data.hourlyRate)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Durasi Sewa</p>
              <p className="font-semibold text-lg">{data.duration} jam</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Waktu Bermain</p>
              <p className="font-semibold text-sm">
                {data.playDate && new Date(data.playDate).toLocaleDateString('id-ID', { 
                  weekday: 'short', 
                  day: 'numeric', 
                  month: 'short' 
                })}
              </p>
              <p className="font-semibold text-sm">{data.playTime}</p>
            </div>
          </div>
        </div>

        {/* Rincian Biaya */}
        <div className="card mb-6">
          <h2 className="section-title">
            <DollarSign className="w-5 h-5 text-primary-600" />
            Rincian Biaya
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <p className="font-medium">Biaya Sewa Lapangan</p>
                <p className="text-sm text-gray-600">{data.duration} jam × {formatCurrency(data.hourlyRate)}</p>
              </div>
              <p className="font-semibold text-lg">{formatCurrency(result.courtCost)}</p>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <p className="font-medium">Biaya Shuttlecock</p>
                <p className="text-sm text-gray-600">{data.shuttlecockUsed} pcs × {formatCurrency(data.shuttlecockPrice)}</p>
              </div>
              <p className="font-semibold text-lg">{formatCurrency(result.shuttlecockCost)}</p>
            </div>
            
            <div className="flex justify-between items-center py-4 bg-primary-50 px-4 rounded-lg border-2 border-primary-200">
              <div>
                <p className="font-bold text-lg">Total Biaya</p>
              </div>
              <p className="font-bold text-2xl text-primary-700">{formatCurrency(result.totalCost)}</p>
            </div>
          </div>
        </div>

        {/* Pembagian Biaya */}
        <div className="card mb-6">
          <h2 className="section-title">
            <Users className="w-5 h-5 text-primary-600" />
            Pembagian Biaya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-success-50 p-6 rounded-lg border-2 border-success-200">
              <p className="text-success-700 font-medium mb-2">Jumlah Pemain</p>
              <p className="text-3xl font-bold text-success-800">{result.playerCount} orang</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg border-2 border-primary-200">
              <p className="text-primary-700 font-medium mb-2">Biaya per Orang</p>
              <p className="text-3xl font-bold text-primary-800">{formatCurrency(result.costPerPerson)}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Daftar Pemain:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.players.map((player, index) => (
                <div key={player.id} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">{index + 1}. {player.name}</p>
                  <p className="text-sm text-gray-600">{formatCurrency(result.costPerPerson)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Informasi Transfer */}
        <div className="card mb-6">
          <h2 className="section-title">
            <CreditCard className="w-5 h-5 text-primary-600" />
            Informasi Transfer
          </h2>
          <div className="space-y-4">
            {data.bankAccounts.map((account, index) => (
              <div key={account.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">Rekening {index + 1}</h3>
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm font-medium">
                    {account.bankName}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Nomor Rekening</p>
                    <p className="font-mono font-semibold text-lg">{account.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nama Pemilik</p>
                    <p className="font-semibold">{account.accountName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Tambahan */}
        {data.additionalInfo && (
          <div className="card">
            <h2 className="section-title">
              <Info className="w-5 h-5 text-primary-600" />
              Informasi Tambahan
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{data.additionalInfo}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        {/* Share Button */}
        <div className="flex justify-center">
          <button
            onClick={handleShare}
            className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Share2 className="w-4 h-4" />
            Bagikan Ringkasan
          </button>
        </div>

        {/* Download Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Download TXT
          </button>
          
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            {isGenerating ? 'Membuat PDF...' : 'Download PDF'}
          </button>
          
          <button
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Image className="w-4 h-4" />
            {isGenerating ? 'Membuat Gambar...' : 'Download PNG'}
          </button>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <button
            onClick={onReset}
            className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Clock className="w-4 h-4" />
            Hitung Ulang
          </button>
        </div>
      </div>
    </div>
  );
}
