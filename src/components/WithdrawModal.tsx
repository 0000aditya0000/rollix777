import React, { useState, useEffect } from "react";
import {
  X,
  Wallet,
  Bitcoin,
  DollarSign,
  CreditCard,
  ArrowDown,
  ChevronDown,
  IndianRupee,
  AlertCircle,
  Hexagon,
  Gem,
  CodeSquare,
} from "lucide-react";
import { fetchUserAllData } from "../lib/services/userService";
import toast from "react-hot-toast";
import axiosInstance from "../lib/utils/axiosInstance";

interface BankAccount {
  id: number;
  accountname: string;
  accountnumber: string;
  ifsccode: string;
  branch: string;
  status: number;
  usdt?: string;
}

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  mainBalance: number;
  fetchData: () => void;
}

interface WithdrawPayload {
  currency: string;
  amount: string;
  bankname?: string;
  network?: string;
  walletAddress?: string;
  userId: string | null;
}

interface ValidationErrors {
  currency?: string;
  amount?: string;
  bankname?: string;
  walletAddress?: string;
}

const initialPayload: WithdrawPayload = {
  currency: "",
  amount: "",
  bankname: "",
  network: "trc20",
  walletAddress: "",
  userId: null,
};

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  mainBalance,
  fetchData,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<"trc20" | "erc20">(
    "trc20"
  );
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [payload, setPayload] = useState<WithdrawPayload>(initialPayload);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const userId = localStorage.getItem("userId");

  // Reset states when modal closes
  const handleClose = () => {
    setPayload({
      ...initialPayload,
      userId: localStorage.getItem("userId"),
    });
    setErrors({});
    setApiError("");
    setSelectedNetwork("trc20");
    setUsdtBalance(0);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setPayload((prev) => ({
        ...prev,
        amount: "",
      }));
      setErrors({});
      setApiError("");
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && isOpen) {
        try {
          const response = await fetchUserAllData(userId);
          if (response.success) {
            setBankAccounts(response.data.bankAccounts);
            const usdtAccount = response.data.bankAccounts.find(
              (account: any) => account.usdt
            );
            if (usdtAccount) {
              setPayload((prev) => ({
                ...prev,
                walletAddress: usdtAccount.usdt,
                userId,
              }));
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId, isOpen]);

  const validateFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    const amount = Number(payload.amount.replace(/,/g, ""));

    if (!payload.currency) {
      newErrors.currency = "Please select a currency";
    }

    if (!payload.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    } else if (payload.currency === "inr" && amount > mainBalance) {
      newErrors.amount = "Amount cannot exceed available balance";
    } else if (payload.currency === "usdt" && amount > usdtBalance) {
      newErrors.amount = "Amount cannot exceed available balance";
    } else if (payload.currency === "inr" && amount < 200) {
      newErrors.amount = "Minimum withdrawal amount is ₹200";
    } else if (payload.currency === "usdt" && amount < 10) {
      newErrors.amount = "Minimum withdrawal amount is 10 USDT";
    }

    if (payload.currency === "inr" && !payload.bankname) {
      newErrors.bankname = "Please select a bank account";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "currency") {
      // Reset amount and errors when currency changes
      setPayload((prev) => ({
        ...initialPayload,
        currency: value,
        userId: localStorage.getItem("userId"),
        walletAddress: prev.walletAddress, // Keep wallet address for USDT
      }));
      setErrors({});
      setApiError("");

      if (value === "usdt") {
        fetchRates();
      }
      return;
    }

    if (name === "amount" && !/^\d*\.?\d{0,2}$/.test(value.replace(/,/g, "")))
      return;

    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMaxAmount = () => {
    const maxAmount = Number(
      payload.currency === "usdt" ? usdtBalance : mainBalance
    ).toLocaleString("en-IN", { maximumFractionDigits: 2 });
    setPayload((prev) => ({
      ...prev,
      amount: maxAmount.replace(/,/g, ""),
    }));
  };

  const handleWithdraw = async () => {
    if (isLoading) return; // Prevent multiple submissions

    if (!validateFields()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setIsLoading(true);
    try {
      let finalAmount = payload.amount.replace(/,/g, "");

      // If USDT, convert to INR before sending
      if (payload.currency === "usdt") {
        const data = await fetch(
          "https://api.rollix777.com/api/rates/conversion-rate/INR_USDT"
        );
        const newdata = await data.json();
        const conversionrate = newdata.rate;
        finalAmount = (Number(finalAmount) * Number(conversionrate)).toString();
      }

      // Clean up payload based on currency
      const cleanPayload = {
        userId: localStorage.getItem("userId"),
        currency: payload.currency,
        amount: finalAmount,
        ...(payload.currency === "inr"
          ? { bankname: payload.bankname }
          : {
              walletAddress: payload.walletAddress,
              network: selectedNetwork,
            }),
      };

      console.log("Sending payload:", cleanPayload);
      const response = await axiosInstance.post(
        "/api/wallet/withdrawl",
        cleanPayload
      );
      if (response.data.success) {
        toast.success("Withdrawal request successful!");
        fetchData();
        handleClose();
      } else {
        toast.error(response.data.message || "Withdrawal request failed.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRates = async () => {
    try {
      const data = await fetch(
        "https://api.rollix777.com/api/rates/conversion-rate/INR_USDT"
      );
      const newdata = await data.json();
      const conversionrate = newdata.rate;
      const updatedBalance = Number(mainBalance / Number(conversionrate));
      setUsdtBalance(updatedBalance);
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-2xl overflow-hidden animate-fadeIn">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-purple-500/10">
          <h2 className="text-xl font-bold text-white">Withdraw Funds</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A2E] text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="space-y-3">
            {/* Currency Selector */}
            <div className="space-y-1 -mt-2">
              <label className="text-xs sm:text-sm text-gray-400">
                Select Currency
              </label>
              <div className="relative">
                <select
                  value={payload.currency}
                  onChange={handleChange}
                  name="currency"
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#1A1A2E] border ${
                    errors.currency ? "border-red-500" : "border-purple-500/20"
                  } rounded-lg sm:rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-purple-500 appearance-none`}
                >
                  <option value="">Select Currency</option>
                  <option value="inr">INR</option>
                  <option value="usdt">USDT</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.currency && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.currency}</span>
                </div>
              )}
            </div>

            {/* Bank Account Selector for INR */}
            {payload.currency === "inr" && (
              <div className="space-y-1">
                <label className="text-xs sm:text-sm text-gray-400">
                  Select Bank Account
                </label>
                <div className="relative">
                  <select
                    value={payload.bankname}
                    onChange={handleChange}
                    name="bankname"
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#1A1A2E] border ${
                      errors.bankname
                        ? "border-red-500"
                        : "border-purple-500/20"
                    } rounded-lg sm:rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-purple-500 appearance-none`}
                  >
                    <option value="">Select a bank account</option>
                    {bankAccounts.map((account) => (
                      <option
                        key={account.id}
                        value={account.id}
                        className="bg-[#1A1A2E]"
                      >
                        {account.accountname} - {account.accountnumber}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                {errors.bankname && (
                  <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.bankname}</span>
                  </div>
                )}
              </div>
            )}

            {/* Network Selection and Wallet Address for USDT */}
            {payload.currency === "usdt" && (
              <>
                <div className="flex gap-2 mt-3">
                  <button
                    className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 ${
                      selectedNetwork === "trc20"
                        ? "bg-purple-500/20 border border-purple-500/30 text-white"
                        : "bg-[#1A1A2E] border border-gray-700 text-gray-400 hover:border-purple-500/30"
                    }`}
                    onClick={() => setSelectedNetwork("trc20")}
                  >
                    <Hexagon className="w-4 h-4" />
                    <span>TRC20</span>
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 ${
                      selectedNetwork === "erc20"
                        ? "bg-purple-500/20 border border-purple-500/30 text-white"
                        : "bg-[#1A1A2E] border border-gray-700 text-gray-400 hover:border-purple-500/30"
                    }`}
                    onClick={() => setSelectedNetwork("erc20")}
                  >
                    <Gem className="w-4 h-4" />
                    <span>ERC20</span>
                  </button>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    value={payload.walletAddress}
                    readOnly
                    className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white opacity-70 cursor-not-allowed"
                  />
                </div>
              </>
            )}

            {/* Amount Field */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">
                Amount ({payload.currency === "usdt" ? "USDT" : "INR"})
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {payload.currency === "usdt" ? (
                    <DollarSign className="w-5 h-5 text-purple-400" />
                  ) : (
                    <IndianRupee className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  className={`w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border ${
                    errors.amount ? "border-red-500" : "border-purple-500/20"
                  } rounded-lg text-white focus:outline-none focus:border-purple-500`}
                  placeholder={payload.currency === "usdt" ? "10.00" : "200.00"}
                  value={payload.amount}
                  onChange={handleChange}
                  name="amount"
                />
              </div>
              {errors.amount && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.amount}</span>
                </div>
              )}
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-400">
                  Available:{" "}
                  {payload.currency === "usdt"
                    ? `${usdtBalance.toFixed(2)} USDT`
                    : `₹${mainBalance}`}
                </span>
                <button className="text-purple-400" onClick={handleMaxAmount}>
                  MAX
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Fee:</span>
                <span className="text-white">₹0.00</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">You will receive:</span>
                <span className="text-white">
                  {payload.currency === "usdt"
                    ? `${usdtBalance.toFixed(2)} USDT`
                    : `₹${mainBalance}`}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {apiError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                  <span>{apiError}</span>
                </div>
              </div>
            )}

            {/* Withdraw Button */}
            <button
              onClick={handleWithdraw}
              disabled={isLoading}
              type="button"
              className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium 
                ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90"
                } transition-opacity`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Withdraw Now"
              )}
            </button>

            {/* Important Notes */}
            <div className="text-sm text-gray-400">
              <p className="mb-2">Important:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Minimum withdrawal:{" "}
                  {payload.currency === "usdt" ? "10.00 USDT" : "₹200.00"}
                </li>
                <li>Processing time: 1-3 business days</li>
                <li>Bank transfer fees may apply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
