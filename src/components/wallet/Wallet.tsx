import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Wallet as WalletIcon,
  Plus,
  ArrowDownCircle,
  ArrowUpCircle,
  Copy,
  RefreshCw,
  Clock,
  CreditCard,
  ChevronDown,
  Eye,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setWallets } from "../../slices/walletSlice";
import { fetchUserWallets } from "../../lib/services/WalletServices.js";
import { depositService } from "../../services/api.js";
import { toast } from "react-hot-toast";
import { fetchUserAllData } from "../../lib/services/userService";
import { getAllTransactions } from "../../lib/services/transactionService";
import axiosInstance from "../../lib/utils/axiosInstance";

interface BankAccount {
  id: number;
  userId: number;
  accountname: string | null;
  accountnumber: string | null;
  ifsccode: string | null;
  branch: string | null;
  status: number;
  network: string | null;
  usdt: string | null;
}

const Wallet: React.FC = () => {
  const dispatch = useDispatch();
  const { wallets } = useSelector((state: RootState) => state.wallet);
  const { user } = useSelector((state: RootState) => state.auth);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount1, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("inr");
  const [selectedBankAccount, setSelectedBankAccount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [errors, setErrors] = useState({
    currency: "",
    amount: "",
    bankAccount: "",
  });
  const [transactionFilter, setTransactionFilter] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const cryptoOptions = [
    { value: "btc", label: "Bitcoin (BTC)", symbol: "₿", color: "yellow" },
    { value: "eth", label: "Ethereum (ETH)", symbol: "Ξ", color: "blue" },
    { value: "usdt", label: "USDT", symbol: "₮", color: "green" },
    { value: "inr", label: "INR", symbol: "₹", color: "orange" },
  ];

  const quickAmounts = ["500", "1000", "2000", "5000", "10000", "20000"];

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        try {
          const data = await fetchUserWallets(user.id);
          dispatch(setWallets(data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
  }, [user?.id]);

  // fetch bank accounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        console.log("user?.id", user?.id);
        try {
          const response = await fetchUserAllData(user?.id);
          if (response.success) {
            console.log("data is coming", response.data);

            const onlyBankAccounts = response.data.bankAccounts.filter(
              (account: any) => account.network === null
            );
            setBankAccounts(onlyBankAccounts);
            console.log("onlyBankAccounts", onlyBankAccounts);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user?.id]);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions(uid);
        setTransactions(data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [user?.id]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("test@paytm");
    toast.success("UPI ID copied to clipboard");
  };

  const handleRefresh = async () => {
    if (user?.id) {
      try {
        const data = await fetchUserWallets(user.id);
        dispatch(setWallets(data));

        const transactionData = await getAllTransactions(user.id);
        setTransactions(transactionData.transactions || []);

        toast.success("Wallet data  & transactions refreshed successfully");
      } catch (error) {
        console.error("Error refreshing data:", error);
        toast.error("Failed to refresh wallet data");
      }
    }
  };

  const mainBalance =
    wallets.find((w) => w.cryptoname === "INR")?.balance || "0";
  const bonusBalance =
    wallets.find((w) => w.cryptoname === "CP")?.balance || "0";

  const launchGateway = () => {
    if (parseFloat(amount1) < 300) {
      toast.error("Minimum amount is 300 INR");
    }
    const uid = localStorage.getItem("userId");
    if (!uid) {
      toast.error("Please login to continue");
      return;
    }
    const amount = parseFloat(amount1);
    const phone = 1234567890;
    const url = `https://pay.rollix777.com/index.php?uid=${uid}&amount=${amount}&phone=${phone}`;
    window.location.href = url;
  };

  const handleDeposit = async () => {
    if (!user?.id || !amount1) {
      toast.error("Please enter an amount");
      return;
    }

    setIsLoading(true);
    try {
      const depositData = {
        userId: Number(user.id),
        amount: parseFloat(amount1),
        cryptoname: selectedCurrency.toUpperCase(),
      };

      const response = await depositService.deposit(depositData);
      toast.success(response.message || "Deposit successful");

      // Refresh wallet data after successful deposit
      await handleRefresh();

      // Clear amount input
      setAmount("");
    } catch (error) {
      console.error("Deposit failed:", error);
      toast.error("Deposit failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Validation function
  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      currency: "",
      amount: "",
      bankAccount: "",
    };

    if (activeTab === "withdraw") {
      // Currency validation
      if (!selectedCurrency || selectedCurrency === "") {
        newErrors.currency = "Please select a currency";
        isValid = false;
      }

      // Bank account validation for withdrawal
      if (!selectedBankAccount || selectedBankAccount === "0") {
        newErrors.bankAccount = "Please select a bank account";
        isValid = false;
      }

      // Amount validation for withdrawal
      if (!amount1) {
        newErrors.amount = "Amount is required";
        isValid = false;
      } else if (parseFloat(amount1) < 100) {
        newErrors.amount = "Minimum withdrawal amount is ₹100";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Quick amount selection handler
  const handleQuickAmountSelect = (amt: string) => {
    setAmount(amt);
    // Clear amount error when quick amount is selected
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  // Reset form errors when changing tabs
  useEffect(() => {
    setErrors({
      currency: "",
      amount: "",
      bankAccount: "",
    });
  }, [activeTab]);

  const handleWithdraw = async () => {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);
    try {
      const withdrawalData = {
        type: "bank",
        bankname: selectedBankAccount,
        currency: selectedCurrency.toLowerCase(),
        balance: amount1,
        userId: user?.id?.toString(),
      };

      const response = await axiosInstance.post(
        `/api/wallet/withdrawl`,
        withdrawalData
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Withdrawal request created successfully"
        );
        // Reset all form fields
        setAmount("");
        setSelectedBankAccount("0");
        setSelectedCurrency(""); // Reset currency field
        setErrors({
          currency: "",
          amount: "",
          bankAccount: "",
        });
        // Refresh wallet data
        await handleRefresh();
      } else {
        toast.error(response.data.message || "Withdrawal request failed");
      }
    } catch (error: any) {
      console.error("Withdrawal failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Update the action button to only call handleWithdraw when in withdraw tab
  const handleActionButtonClick = () => {
    if (activeTab === "deposit") {
      launchGateway();
    } else {
      handleWithdraw();
    }
  };

  // Replace the BankOptions array with the dynamic bank accounts
  const renderBankOptions = () => {
    return bankAccounts.map((account) => ({
      value: account.id.toString(),
      label: `${account.accountname} - ${account.accountnumber}`,
    }));
  };

  const getFilteredTransactions = () => {
    if (transactionFilter === "all") {
      return transactions;
    }
    return transactions.filter((txn) => {
      switch (transactionFilter) {
        case "approved":
          return txn.status.toLowerCase() === "approved";
        case "pending":
          return txn.status.toLowerCase() === "pending";
        case "rejected":
          return txn.status.toLowerCase() === "rejected";
        default:
          return true;
      }
    });
  };

  // Add function to handle viewing rejection note
  const handleViewRejection = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowRejectionModal(true);
  };

  // Add function to close rejection modal
  const handleCloseRejectionModal = () => {
    setShowRejectionModal(false);
    setSelectedTransaction(null);
  };

  // Add the rejection modal component
  const renderRejectionModal = () => {
    if (!showRejectionModal || !selectedTransaction) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleCloseRejectionModal}
        ></div>

        <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-2xl overflow-hidden animate-fadeIn">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-purple-500/10">
            <h2 className="text-lg font-bold text-white">Rejection Details</h2>
            <button
              onClick={handleCloseRejectionModal}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A2E] text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                Transaction Details
              </h3>
              <div className="bg-[#1A1A2E] p-3 rounded-lg">
                <p className="text-white mb-2">
                  Amount: ₹{selectedTransaction.amount}
                </p>
                <p className="text-gray-400 text-sm">
                  Order ID: {selectedTransaction.order_id}
                </p>
                <p className="text-gray-400 text-sm">
                  Date: {selectedTransaction.transaction_date}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                Rejection Note
              </h3>
              <div className="bg-[#1A1A2E] p-3 rounded-lg">
                <p className="text-white">
                  {selectedTransaction.note || "No rejection note available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0F19] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto pb-28 sm:pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mt-10 mb-6 sm:mb-8">
          <div className="flex mt-4 sm:mt-10 items-center gap-3 sm:gap-4">
            <Link
              to="/account"
              className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              My Wallet
            </h1>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 sm:p-3 mt-4 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Balance Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Main Balance Card */}
            <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg">
                  <WalletIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  Available Balance
                </h2>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                ₹{mainBalance}
              </h2>
              <p className="text-sm text-gray-400">Last updated: 2 mins ago</p>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-pink-500/10 rounded-lg">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  Bonus Balance
                </h2>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                ₹{bonusBalance}
              </h2>
              <p className="text-sm text-gray-400">Available for use</p>
            </div>
          </div>

          {/* Transaction Section */}
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20">
            <div className="p-4 sm:p-6 border-b border-purple-500/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    Recent Transactions
                  </h3>
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setTransactionFilter("all")}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      transactionFilter === "all"
                        ? "bg-purple-600 text-white"
                        : "bg-[#1A1A2E] text-gray-400 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setTransactionFilter("approved")}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      transactionFilter === "approved"
                        ? "bg-green-600 text-white"
                        : "bg-[#1A1A2E] text-gray-400 hover:text-white"
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setTransactionFilter("pending")}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      transactionFilter === "pending"
                        ? "bg-yellow-600 text-white"
                        : "bg-[#1A1A2E] text-gray-400 hover:text-white"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setTransactionFilter("rejected")}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      transactionFilter === "rejected"
                        ? "bg-red-600 text-white"
                        : "bg-[#1A1A2E] text-gray-400 hover:text-white"
                    }`}
                  >
                    Rejected
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction List with Scroll */}
            <div className="p-4 sm:p-6">
              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                <div className="space-y-3 sm:space-y-4">
                  {getFilteredTransactions().length > 0 ? (
                    getFilteredTransactions().map((txn) => {
                      const isDeposit = txn.transaction_type === "recharge";
                      const isWithdrawal = txn.transaction_type === "withdraw";
                      const typeLabel = isDeposit
                        ? "Deposit"
                        : isWithdrawal
                        ? "Withdrawal"
                        : txn.transaction_type;
                      const iconBg = isDeposit
                        ? "bg-green-500/10"
                        : "bg-red-500/10";
                      const icon = isDeposit ? (
                        <ArrowDownCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                      ) : (
                        <ArrowUpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                      );
                      const amountSign = isDeposit
                        ? "+"
                        : isWithdrawal
                        ? "-"
                        : "";

                      // Update amount color based on status
                      const amountColor =
                        txn.status.toLowerCase() === "approved"
                          ? "text-green-500"
                          : txn.status.toLowerCase() === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500";

                      const statusColor =
                        txn.status.toLowerCase() === "approved"
                          ? "text-green-500"
                          : txn.status.toLowerCase() === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500";

                      return (
                        <div
                          key={txn.id}
                          className="flex items-center justify-between p-3 sm:p-4 bg-[#1A1A2E] rounded-lg sm:rounded-xl hover:bg-[#252547] transition-colors"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${iconBg}`}
                            >
                              {icon}
                            </div>
                            <div>
                              <p className="text-white font-medium text-base sm:text-lg">
                                {typeLabel}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-400">
                                {txn.transaction_date}
                              </p>
                              <div className="flex items-center gap-2">
                                <p
                                  className={`text-xs sm:text-sm ${statusColor}`}
                                >
                                  {txn.status}
                                </p>
                                {txn.status.toLowerCase() === "rejected" && (
                                  <button
                                    onClick={() => handleViewRejection(txn)}
                                    className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                                    title="View rejection details"
                                  >
                                    <Eye size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-base sm:text-lg font-semibold ${amountColor}`}
                            >
                              {amountSign}₹{txn.amount}
                            </span>
                            <p className="text-xs sm:text-sm text-gray-400">
                              {txn.order_id}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-400 text-center py-6">
                      No transactions found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the rejection modal */}
      {renderRejectionModal()}
    </div>
  );
};

export default Wallet;

<style jsx>{`
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(139, 92, 246, 0.3);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 92, 246, 0.5);
  }
`}</style>;
