'use client';

import React, { useState, useRef } from 'react';
import { MapPin, Calendar, Clock, Info, Send, Upload, Image as ImageIcon } from 'lucide-react';
import { InvitationData } from '@/types';

interface InvitationFormProps {
  onCreateInvitation: (data: InvitationData) => void;
}

export default function InvitationForm({ onCreateInvitation }: InvitationFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<InvitationData>({
    courtName: '',
    courtLocation: '',
    playDate: '',
    startTime: '',
    endTime: '',
    invitedPlayers: [],
    image: null,
    imagePreview: '',
    additionalNotes: '',
    organizer: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.courtName.trim()) {
      alert('Nama lapangan harus diisi');
      return;
    }
    
    if (!formData.playDate) {
      alert('Tanggal bermain harus diisi');
      return;
    }

    if (!formData.startTime) {
      alert('Jam mulai harus diisi');
      return;
    }

    if (!formData.endTime) {
      alert('Jam selesai harus diisi');
      return;
    }

    if (formData.startTime >= formData.endTime) {
      alert('Jam selesai harus lebih besar dari jam mulai');
      return;
    }
    
    onCreateInvitation(formData);
  };

  // Get today's date for min date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto p-3 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Informasi Lapangan */}
        <div className="card">
          <h2 className="section-title">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
            Informasi Lapangan
          </h2>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div>
              <label className="block mobile-label mb-2">
                Nama Lapangan *
              </label>
              <input
                type="text"
                value={formData.courtName}
                onChange={(e) => setFormData(prev => ({ ...prev, courtName: e.target.value }))}
                className="input-field"
                placeholder="Contoh: GOR Badminton Sentral"
                required
              />
            </div>
            <div>
              <label className="block mobile-label mb-2">
                Link Google Maps (Opsional)
              </label>
              <input
                type="url"
                value={formData.courtLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, courtLocation: e.target.value }))}
                className="input-field"
                placeholder="https://maps.google.com/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Copy link dari Google Maps untuk memudahkan peserta menemukan lokasi
              </p>
            </div>
          </div>
        </div>

        {/* Informasi Waktu */}
        <div className="card">
          <h2 className="section-title">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
            Waktu Bermain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block mobile-label mb-2">
                Tanggal Bermain *
              </label>
              <input
                type="date"
                value={formData.playDate}
                onChange={(e) => setFormData(prev => ({ ...prev, playDate: e.target.value }))}
                className="input-field"
                min={today}
                required
              />
            </div>
            <div>
              <label className="block mobile-label mb-2">
                Jam Mulai *
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block mobile-label mb-2">
                Jam Selesai *
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="input-field"
                required
              />
            </div>
          </div>
        </div>

        {/* Upload Gambar */}
        <div className="card">
          <h2 className="section-title">
            <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
            Gambar Undangan (Opsional)
          </h2>
          <div className="space-y-4">
            {!formData.imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                <ImageIcon className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Upload gambar untuk undangan (maksimal 5MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary flex items-center gap-2 mx-auto text-sm"
                >
                  <Upload className="w-3 h-3 md:w-4 md:h-4" />
                  Pilih Gambar
                </button>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full max-w-sm md:max-w-md mx-auto rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 md:p-2 hover:bg-red-600"
                >
                  <ImageIcon className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Catatan Tambahan */}
        <div className="card">
          <h2 className="section-title">
            <Info className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
            Catatan Tambahan (Opsional)
          </h2>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
            className="input-field resize-none"
            rows={3}
            placeholder="Catatan khusus, aturan, atau informasi penting lainnya..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn-primary text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2 md:gap-3 mx-auto w-full sm:w-auto"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
            Buat Undangan
          </button>
        </div>
      </form>
    </div>
  );
}
