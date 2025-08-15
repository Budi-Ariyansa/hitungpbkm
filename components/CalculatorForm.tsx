'use client';

import React, { useState } from 'react';
import { Plus, X, MapPin, Clock, Users, DollarSign, CreditCard, Info, Calculator, Calendar, Timer } from 'lucide-react';
import { CalculationData, Player, BankAccount } from '@/types';

interface CalculatorFormProps {
  onCalculate: (data: CalculationData) => void;
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [formData, setFormData] = useState<CalculationData>({
    courtName: '',
    hourlyRate: 0,
    duration: 0,
    shuttlecockPrice: 0,
    shuttlecockUsed: 0,
    players: [{ id: '1', name: '' }],
    playDate: '',
    playTime: '',
    additionalInfo: '',
    bankAccounts: []
  });

  const addPlayer = () => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: ''
    };
    setFormData(prev => ({
      ...prev,
      players: [...prev.players, newPlayer]
    }));
  };

  const removePlayer = (id: string) => {
    if (formData.players.length > 1) {
      setFormData(prev => ({
        ...prev,
        players: prev.players.filter(player => player.id !== id)
      }));
    }
  };

  const updatePlayer = (id: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      players: prev.players.map(player =>
        player.id === id ? { ...player, name } : player
      )
    }));
  };

  const addBankAccount = () => {
    const newAccount: BankAccount = {
      id: Date.now().toString(),
      bankName: '',
      accountNumber: '',
      accountName: ''
    };
    setFormData(prev => ({
      ...prev,
      bankAccounts: [...prev.bankAccounts, newAccount]
    }));
  };

  const removeBankAccount = (id: string) => {
    setFormData(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter(account => account.id !== id)
    }));
  };

  const updateBankAccount = (id: string, field: keyof BankAccount, value: string) => {
    setFormData(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.map(account =>
        account.id === id ? { ...account, [field]: value } : account
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.courtName.trim()) {
      alert('Nama lapangan harus diisi');
      return;
    }
    
    if (formData.hourlyRate <= 0) {
      alert('Biaya sewa per jam harus lebih dari 0');
      return;
    }
    
    if (formData.duration <= 0) {
      alert('Lama sewa harus lebih dari 0');
      return;
    }
    
    if (formData.shuttlecockPrice <= 0) {
      alert('Biaya shuttlecock harus lebih dari 0');
      return;
    }
    
    if (formData.shuttlecockUsed <= 0) {
      alert('Jumlah shuttlecock harus lebih dari 0');
      return;
    }
    
    const validPlayers = formData.players.filter(player => player.name.trim());
    if (validPlayers.length === 0) {
      alert('Minimal harus ada 1 pemain');
      return;
    }

    if (!formData.playDate) {
      alert('Tanggal bermain harus diisi');
      return;
    }

    if (!formData.playTime) {
      alert('Jam bermain harus diisi');
      return;
    }
    
    onCalculate({
      ...formData,
      players: validPlayers
    });
  };

  // Get today's date for min date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informasi Lapangan */}
        <div className="card">
          <h2 className="section-title">
            <MapPin className="w-5 h-5 text-primary-600" />
            Informasi Lapangan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biaya Sewa per Jam (Rp) *
              </label>
              <input
                type="number"
                value={formData.hourlyRate || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                className="input-field"
                placeholder="50000"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lama Sewa (Jam) *
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.duration || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                className="input-field"
                placeholder="2"
                min="0.5"
                required
              />
            </div>
          </div>
        </div>

        {/* Informasi Waktu Bermain */}
        <div className="card">
          <h2 className="section-title">
            <Calendar className="w-5 h-5 text-primary-600" />
            Waktu Bermain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jam Bermain *
              </label>
              <input
                type="time"
                value={formData.playTime}
                onChange={(e) => setFormData(prev => ({ ...prev, playTime: e.target.value }))}
                className="input-field"
                required
              />
            </div>
          </div>
        </div>

        {/* Informasi Shuttlecock */}
        <div className="card">
          <h2 className="section-title">
            <DollarSign className="w-5 h-5 text-primary-600" />
            Informasi Shuttlecock
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biaya per Shuttlecock (Rp) *
              </label>
              <input
                type="number"
                value={formData.shuttlecockPrice || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, shuttlecockPrice: Number(e.target.value) }))}
                className="input-field"
                placeholder="5000"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Shuttlecock Habis (pcs) *
              </label>
              <input
                type="number"
                value={formData.shuttlecockUsed || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, shuttlecockUsed: Number(e.target.value) }))}
                className="input-field"
                placeholder="6"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Informasi Pemain */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title mb-0">
              <Users className="w-5 h-5 text-primary-600" />
              Daftar Pemain ({formData.players.length} orang)
            </h2>
            <button
              type="button"
              onClick={addPlayer}
              className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
            >
              <Plus className="w-4 h-4" />
              Tambah Pemain
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.players.map((player, index) => (
              <div key={player.id} className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayer(player.id, e.target.value)}
                    className="input-field"
                    placeholder={`Nama Pemain ${index + 1}`}
                  />
                </div>
                {formData.players.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlayer(player.id)}
                    className="btn-secondary px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Rekening */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title mb-0">
              <CreditCard className="w-5 h-5 text-primary-600" />
              Informasi Rekening Transfer (Opsional)
            </h2>
            <button
              type="button"
              onClick={addBankAccount}
              className="btn-secondary flex items-center gap-2 text-sm py-2 px-4"
            >
              <Plus className="w-4 h-4" />
              Tambah Rekening
            </button>
          </div>
          {formData.bankAccounts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Belum ada rekening ditambahkan. Klik "Tambah Rekening" untuk menambah informasi transfer.
            </p>
          ) : (
            <div className="space-y-4">
              {formData.bankAccounts.map((account, index) => (
                <div key={account.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-800">Rekening {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeBankAccount(account.id)}
                      className="text-red-600 hover:bg-red-100 p-1 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Bank
                      </label>
                      <input
                        type="text"
                        value={account.bankName}
                        onChange={(e) => updateBankAccount(account.id, 'bankName', e.target.value)}
                        className="input-field"
                        placeholder="BCA, Mandiri, BRI, dll"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Rekening
                      </label>
                      <input
                        type="text"
                        value={account.accountNumber}
                        onChange={(e) => updateBankAccount(account.id, 'accountNumber', e.target.value)}
                        className="input-field"
                        placeholder="1234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Pemilik
                      </label>
                      <input
                        type="text"
                        value={account.accountName}
                        onChange={(e) => updateBankAccount(account.id, 'accountName', e.target.value)}
                        className="input-field"
                        placeholder="Nama sesuai rekening"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informasi Tambahan */}
        <div className="card">
          <h2 className="section-title">
            <Info className="w-5 h-5 text-primary-600" />
            Informasi Tambahan (Opsional)
          </h2>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
            className="input-field resize-none"
            rows={4}
            placeholder="Catatan tambahan, aturan main, meeting point, dll..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto"
          >
            <Calculator className="w-5 h-5" />
            Hitung Biaya Badminton
          </button>
        </div>
      </form>
    </div>
  );
}
