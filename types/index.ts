export interface Bank {
  id: string;
  name: string;
  code: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface Player {
  id: string;
  name: string;
}

export interface Court {
  id: string;
  name: string;
  location: string;
}

export interface PlayerData {
  id: string;
  name: string;
  nickname: string;
}

export interface CalculationData {
  // Informasi Lapangan
  courtName: string;
  hourlyRate: number;
  duration: number;
  
  // Informasi Shuttlecock
  shuttlecockPrice: number;
  shuttlecockUsed: number;
  
  // Informasi Pemain
  players: Player[];
  
  // Informasi Waktu Bermain
  playDate: string;
  playTime: string;
  
  // Informasi Tambahan
  additionalInfo: string;
  
  // Informasi Rekening
  bankAccounts: BankAccount[];
}

export interface CalculationResult {
  courtCost: number;
  shuttlecockCost: number;
  totalCost: number;
  costPerPerson: number;
  playerCount: number;
}

// New Invitation Types
export interface InvitationData {
  // Informasi Lapangan
  courtName: string;
  courtLocation: string; // Google Maps link
  
  // Informasi Waktu
  playDate: string;
  startTime: string;
  endTime: string;
  
  // Media
  image?: File | null;
  imagePreview?: string;
  
  // Informasi Tambahan
  additionalNotes: string;
  
  // Legacy fields (kept for compatibility)
  invitedPlayers: Player[];
  organizer: string;
}

export type AppMode = 'calculator' | 'invitation';
