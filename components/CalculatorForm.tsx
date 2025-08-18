'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, MapPin, Clock, Users, DollarSign, CreditCard, Info, Calculator, Calendar, Timer, Check } from 'lucide-react';
import { CalculationData, Player, BankAccount, Court, PlayerData, Bank } from '@/types';

interface CalculatorFormProps {
  onCalculate: (data: CalculationData) => void;
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<PlayerData[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerData[]>([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
  const [playerSearchTerm, setPlayerSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<CalculationData>({
    courtName: '',
    hourlyRate: 0,
    duration: 0,
    shuttlecockPrice: 0,
    shuttlecockUsed: 0,
    players: [],
    playDate: '',
    playTime: '',
    additionalInfo: '',
    bankAccounts: []
  });

  // Load courts, banks, and players data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load courts data
        const courtsResponse = await fetch('/data/courts.json');
        const courtsData = await courtsResponse.json();
        setCourts(courtsData);

        // Load banks data
        const banksResponse = await fetch('/data/banks.json');
        const banksData = await banksResponse.json();
        setBanks(banksData);

        // Load players data
        const playersResponse = await fetch('/data/players.json');
        const playersData = await playersResponse.json();
        setAvailablePlayers(playersData);
        setFilteredPlayers(playersData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Filter players based on search term
  useEffect(() => {
    if (!playerSearchTerm.trim()) {
      setFilteredPlayers(availablePlayers);
    } else {
      const filtered = availablePlayers.filter(player =>
        player.name.toLowerCase().includes(playerSearchTerm.toLowerCase()) ||
        player.nickname.toLowerCase().includes(playerSearchTerm.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }
  }, [playerSearchTerm, availablePlayers]);

  // Handle court selection
  const handleCourtChange = (courtId: string) => {
    const selectedCourt = courts.find(court => court.id === courtId);
    if (selectedCourt) {
      setFormData(prev => ({
        ...prev,
        courtName: selectedCourt.name
      }));
    }
  };

  // Handle bank selection
  const handleBankChange = (accountId: string, bankId: string) => {
    const selectedBank = banks.find(bank => bank.id === bankId);
    if (selectedBank) {
      setFormData(prev => ({
        ...prev,
        bankAccounts: prev.bankAccounts.map(account =>
          account.id === accountId ? { ...account, bankName: selectedBank.name } : account
        )
      }));
    }
  };

  // Handle player selection
  const togglePlayerSelection = (playerId: string) => {
    setSelectedPlayerIds(prev => {
      const newSelection = prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId];
      
      // Update formData players
      const selectedPlayers = availablePlayers
        .filter(player => newSelection.includes(player.id))
        .map(player => ({ id: player.id, name: player.name }));
      
      setFormData(prevFormData => ({
        ...prevFormData,
        players: selectedPlayers
      }));
      
      return newSelection;
    });
  };

  // Select all filtered players
  const selectAllPlayers = () => {
    const allFilteredIds = filteredPlayers.map(player => player.id);
    const uniqueIds = new Set([...selectedPlayerIds, ...allFilteredIds]);
    const newSelection = Array.from(uniqueIds);
    
    setSelectedPlayerIds(newSelection);
    
    const selectedPlayers = availablePlayers
      .filter(player => newSelection.includes(player.id))
      .map(player => ({ id: player.id, name: player.name }));
    
    setFormData(prev => ({
      ...prev,
      players: selectedPlayers
    }));
  };

  // Clear all selected players
  const clearAllPlayers = () => {
    setSelectedPlayerIds([]);
    setFormData(prev => ({
      ...prev,
      players: []
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
      alert('Lapangan harus dipilih');
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
    
    if (formData.players.length === 0) {
      alert('Minimal harus ada 1 pemain yang dipilih');
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
    
    onCalculate(formData);
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block mobile-label mb-2">
                Pilih Lapangan *
              </label>
              <select
                value={courts.find(court => court.name === formData.courtName)?.id || ''}
                onChange={(e) => handleCourtChange(e.target.value)}
                className="input-field"
                required
              >
                <option value="">-- Pilih Lapangan --</option>
                {courts.map((court) => (
                  <option key={court.id} value={court.id}>
                    {court.name} - {court.location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mobile-label mb-2">
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
              <label className="block mobile-label mb-2">
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
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
            Waktu Bermain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
            Informasi Shuttlecock
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block mobile-label mb-2">
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
              <label className="block mobile-label mb-2">
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <h2 className="section-title mb-0">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
              <span className="text-sm md:text-lg">Pilih Pemain ({selectedPlayerIds.length} orang)</span>
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllPlayers}
                className="btn-secondary text-xs px-2 py-1"
                disabled={filteredPlayers.length === 0}
              >
                Pilih Semua
              </button>
              <button
                type="button"
                onClick={clearAllPlayers}
                className="btn-secondary text-xs px-2 py-1 text-red-600 hover:bg-red-50"
                disabled={selectedPlayerIds.length === 0}
              >
                Hapus Semua
              </button>
            </div>
          </div>
          
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              value={playerSearchTerm}
              onChange={(e) => setPlayerSearchTerm(e.target.value)}
              className="input-field"
              placeholder="Cari pemain berdasarkan nama atau nickname..."
            />
          </div>
          
          {availablePlayers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Memuat data pemain...</p>
            </div>
          ) : filteredPlayers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Tidak ada pemain yang sesuai dengan pencarian "{playerSearchTerm}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
              {filteredPlayers.map((player) => (
                <button
                  key={player.id}
                  type="button"
                  onClick={() => togglePlayerSelection(player.id)}
                  className={`
                    relative p-3 rounded-lg border-2 transition-all duration-200 text-left
                    ${selectedPlayerIds.includes(player.id)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm font-medium truncate">
                        {player.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {player.nickname}
                      </div>
                    </div>
                    {selectedPlayerIds.includes(player.id) && (
                      <Check className="w-4 h-4 text-primary-600 flex-shrink-0 ml-1" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {selectedPlayerIds.length === 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Pilih minimal 1 pemain untuk melanjutkan perhitungan
              </p>
            </div>
          )}
          
          {/* Selected Players Summary */}
          {selectedPlayerIds.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm font-medium mb-2">
                Pemain yang dipilih ({selectedPlayerIds.length} orang):
              </p>
              <div className="flex flex-wrap gap-1">
                {selectedPlayerIds.map(playerId => {
                  const player = availablePlayers.find(p => p.id === playerId);
                  return player ? (
                    <span
                      key={playerId}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                    >
                      {player.nickname}
                      <button
                        type="button"
                        onClick={() => togglePlayerSelection(playerId)}
                        className="hover:bg-green-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Informasi Rekening */}
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <h2 className="section-title mb-0">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
              <span className="text-sm md:text-lg">Informasi Rekening Transfer (Opsional)</span>
            </h2>
            <button
              type="button"
              onClick={addBankAccount}
              className="btn-secondary flex items-center justify-center gap-2 text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 w-full sm:w-auto"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              Tambah Rekening
            </button>
          </div>
          {formData.bankAccounts.length === 0 ? (
            <p className="text-gray-500 text-center py-4 text-sm">
              Belum ada rekening ditambahkan. Klik "Tambah Rekening" untuk menambah informasi transfer.
            </p>
          ) : (
            <div className="space-y-4">
              {formData.bankAccounts.map((account, index) => (
                <div key={account.id} className="border border-gray-200 rounded-lg p-3 md:p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="mobile-card-title">Rekening {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeBankAccount(account.id)}
                      className="text-red-600 hover:bg-red-100 p-1 rounded"
                    >
                      <X className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    <div>
                      <label className="block mobile-label mb-1">
                        Nama Bank
                      </label>
                      <select
                        value={banks.find(bank => bank.name === account.bankName)?.id || ''}
                        onChange={(e) => handleBankChange(account.id, e.target.value)}
                        className="input-field"
                      >
                        <option value="">-- Pilih Bank --</option>
                        {banks.map((bank) => (
                          <option key={bank.id} value={bank.id}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mobile-label mb-1">
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
                      <label className="block mobile-label mb-1">
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
            <Info className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
            Informasi Tambahan (Opsional)
          </h2>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
            className="input-field resize-none"
            rows={3}
            placeholder="Catatan tambahan, aturan main, meeting point, dll..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn-primary text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2 md:gap-3 mx-auto w-full sm:w-auto"
          >
            <Calculator className="w-4 h-4 md:w-5 md:h-5" />
            Hitung Biaya Badminton
          </button>
        </div>
      </form>
    </div>
  );
}
