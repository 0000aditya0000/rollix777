import axios from 'axios';

const API_BASE_URL = 'http://191.101.81.104:5000/api';

interface DepositRequest {
  userId: number;
  amount: number;
  cryptoname: string;
}

interface DepositResponse {
  message: string;
  userId: number;
  cryptoname: string;
  amount: number;
  isFirstDeposit: boolean;
  commissionsDistributed: boolean;
}

export const depositService = {
  deposit: async (data: DepositRequest): Promise<DepositResponse> => {
    try {
      const response = await axios.post<DepositResponse>(`${API_BASE_URL}/user/deposit`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 