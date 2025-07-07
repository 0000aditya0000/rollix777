import axiosInstance from "../lib/utils/axiosInstance";

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
      const response = await axiosInstance.post<DepositResponse>(
        `/user/deposit`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
