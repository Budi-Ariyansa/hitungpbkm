'use client';

import React, { useRef, useState } from 'react';
import { MapPin, Calendar, Clock, Users, Info, Share2, FileText, Image, FileDown, ExternalLink } from 'lucide-react';
import { InvitationData } from '@/types';
import NextImage from 'next/image';

interface InvitationResultProps {
  data: InvitationData;
  onReset: () => void;
}

export default function InvitationResult({ data, onReset }: InvitationResultProps) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const formatDate = () => {
    return new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPlayDate = () => {
    return new Date(data.playDate).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateInvitationText = () => {
    return `
🏸 UNDANGAN BERMAIN BADMINTON 🏸
PB Kena Mental

📍 Tempat: ${data.courtName}
${data.courtLocation ? `🗺️ Lokasi: ${data.courtLocation}` : ''}

📅 Hari/Tanggal: ${formatPlayDate()}
⏰ Waktu: ${data.startTime} - ${data.endTime} WIB

${data.additionalNotes ? `📝 Catatan:\n${data.additionalNotes}\n` : ''}
🙏 Ayo main bareng!

📅 Undangan dibuat: ${formatDate()}
    `.trim();
  };

  const handleShare = async () => {
    const text = generateInvitationText();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Undangan Bermain Badminton - PB Kena Mental',
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
      alert('Undangan berhasil disalin ke clipboard!');
    }).catch(() => {
      alert('Gagal menyalin ke clipboard');
    });
  };

  const handleDownload = () => {
    const text = generateInvitationText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `undangan-badminton-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = async () => {
    if (!summaryRef.current) return;
    
    setIsGenerating(true);
    try {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(summaryRef.current, {
        scale: 2,
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

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `undangan-badminton-${new Date().toISOString().split('T')[0]}.png`;
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
      {/* Summary Content - untuk di-capture sebagai Image */}
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
                🏸 Undangan Bermain Badminton
              </h1>
              <p className="text-gray-600">PB Kena Mental</p>
            </div>
          </div>
          <p className="text-gray-600">{formatDate()}</p>
        </div>

        {/* Gambar Undangan (jika ada) */}
        {data.imagePreview && (
          <div className="mb-6 text-center">
            <img
              src={data.imagePreview}
              alt="Gambar Undangan"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Informasi Lapangan */}
        <div className="card mb-6">
          <h2 className="section-title">
            <MapPin className="w-5 h-5 text-primary-600" />
            Informasi Lapangan
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Nama Lapangan</p>
              <p className="font-semibold text-lg">{data.courtName}</p>
            </div>
            {data.courtLocation && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Lokasi</p>
                <div className="flex items-center gap-2">
                  <a
                    href={data.courtLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    Lihat di Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informasi Waktu */}
        <div className="card mb-6">
          <h2 className="section-title">
            <Calendar className="w-5 h-5 text-primary-600" />
            Waktu Bermain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Hari & Tanggal</p>
              <p className="font-semibold text-lg">{formatPlayDate()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Waktu</p>
              <p className="font-semibold text-lg">{data.startTime} - {data.endTime} WIB</p>
            </div>
          </div>
        </div>

        {/* Catatan Tambahan */}
        {data.additionalNotes && (
          <div className="card mb-6">
            <h2 className="section-title">
              <Info className="w-5 h-5 text-primary-600" />
              Catatan Tambahan
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{data.additionalNotes}</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-6 p-4 bg-success-50 rounded-lg border-2 border-success-200">
          <p className="text-success-800 font-semibold text-lg">
            🙏 Ayo main bareng!
          </p>
        </div>
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
            Bagikan Undangan
          </button>
        </div>

        {/* Download Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Download TXT
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
            Buat Undangan Baru
          </button>
        </div>
      </div>
    </div>
  );
}
