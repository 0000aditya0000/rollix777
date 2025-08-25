import React, { useState, useEffect } from "react";
import {
  X,
  CreditCard,
  Wallet,
  Bitcoin,
  DollarSign,
  Copy,
  Check,
  IndianRupee,
  AlertCircle,
  ArrowLeft,
  ArrowDownCircle,
  ArrowUpCircle,
  Eye,
  Clock,
} from "lucide-react";
import { depositService } from "../services/api";
import qs from "qs";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setWallets } from "../slices/walletSlice";
import { fetchUserWallets } from "../lib/services/WalletServices";
import { button } from "framer-motion/client";
import { getAllTransactions } from "../lib/services/transactionService";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import axios from "axios";

interface DepositRequest {
  userId: number;
  amount: number;
  cryptoname: string;
}

const DepositPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<"crypto" | "usdt">("crypto");
  const [selectedCrypto, setSelectedCrypto] = useState<
    "btc" | "eth" | "usdt" | "inr"
  >("btc");
  // Update the state type to handle 4 distinct options (removed ipay_qr)
  const [selectedServer, setSelectedServer] = useState<
    "upi_instant" | "upi" | "imps" | "novapay_qr" | "sunpay" | "watchpay"
  >("sunpay");
  const [copied, setCopied] = useState(false);
  const [amount1, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [cardAmount, setCardAmount] = useState<string>("");
  const [cardError, setCardError] = useState<string>("");
  const [transactionFilter, setTransactionFilter] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [sunpayError, setSunpayError] = useState("");

  const navigate = useNavigate();

  // Clear states when modal opens/closes
  // useEffect(() => {
  //   if (!isOpen) {
  //     // Reset all states when modal closes
  //     setAmount("");
  //     setCardAmount("");
  //     setError("");
  //     setCardError("");
  //     setActiveTab("crypto");
  //     setSelectedServer("server1");
  //     setLoading(false);
  //   }
  // }, [isOpen]);

  // Clear states when changing tabs
  useEffect(() => {
    // Reset states specific to each tab
    setAmount("");
    setCardAmount("");
    setError("");
    setCardError("");
  }, [activeTab]);
  const [usdtAmount, setUsdtAmount] = useState<string>("");
  const [usdtLoading, setUsdtLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<"trc20" | "erc20">(
    "trc20"
  );

  // if (!isOpen) return null;

  const cryptoOptions = [
    { value: "inr", label: "INR", symbol: "₹", color: "orange" },
  ];

  const cryptoAddresses = {
    btc: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    eth: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    usdt: "TKrx8cXrpYM1iaVvU3mVMzMUEtXw1Lj8gu",
    inr: "INR34C0532925U3mVMzMUEtXw1Lj8gu",
  };

  const currencySymbols = {
    btc: "₿",
    eth: "Ξ",
    usdt: "$",
    inr: "₹",
  };

  const networkAddresses = {
    trc20: "TKrx8cXrpYM1iaVvU3mVMzMUEtXw1Lj8gu",
    erc20: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cryptoAddresses[selectedCrypto]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // const validateAmount = (value: string, type: "upi" | "card" | "sunpay") => {
  //   const amount = parseFloat(value);
  //   if (!value) {
  //     return type === "upi" ? "Amount is required" : "Card amount is required";
  //   }
  //   if (isNaN(amount) || amount <= 0) {
  //     return "Please enter a valid amount";
  //   }
  //   if (type === "upi" && amount <= 300) {
  //     return "Minimum deposit amount is 300 INR";
  //   }
  //   if (type === "card" && amount < 10) {
  //     return "Minimum deposit amount is 10 USDT";
  //   }
  //   if (type === "sunpay" && amount <= 200) {
  //     return "Minimum deposit amount is 200 INR";
  //   }
  //   return "";
  // };

  const validateAmount = (value: string, server: string) => {
    const amount = parseFloat(value);
    if (!value) {
      return "Amount is required";
    }
    if (isNaN(amount) || amount <= 0) {
      return "Please enter a valid amount";
    }

    // Different minimum amounts based on server
    if (server === "sunpay" && amount < 100) {
      return "Minimum deposit amount is 100 INR";
    }
    if (server === "watchpay" && amount < 100) {
      return "Minimum deposit amount is 100 INR";
    }
    if (server === "watchpay" && amount > 50000) {
      return "Maximum deposit amount is 50,000 INR for Watchpay";
    }
    if (
      (server === "upi_instant" || server === "upi" || server === "imps") &&
      amount < 300
    ) {
      return "Minimum deposit amount is 300 INR";
    }
    if (server === "novapay_qr" && amount <= 100) {
      return "Minimum deposit amount is 100 INR";
    }

    return "";
  };

  // const handleAmountChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   type: "upi" | "card" | "sunpay"
  // ) => {
  //   const value = e.target.value;
  //   if (type === "upi") {
  //     setAmount(value);
  //     setError(validateAmount(value, "upi"));
  //   }
  //   if (type === "card") {
  //     setCardAmount(value);
  //     setCardError(validateAmount(value, "card"));
  //   }
  //   if (type === "sunpay") {
  //     // setCardAmount(value);
  //     setSunpayError(validateAmount(value, "sunpay"));
  //   }
  // };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setError(validateAmount(value, selectedServer));
  };

  const handleTabChange = (tab: "crypto" | "usdt") => {
    setActiveTab(tab);
  };

  const handleDeposit = async () => {
    if (!amount1 || isNaN(Number(amount1))) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      // Convert amount to number and ensure it's a valid number
      const numericAmount = parseFloat(amount1);
      if (isNaN(numericAmount)) {
        toast.error("Invalid amount");
        return;
      }

      // Get the correct cryptoname mapping
      const cryptoMapping: { [key: string]: string } = {
        btc: "BTC",
        eth: "ETH",
        usdt: "USDT",
        inr: "INR",
      };
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID not found");
        return;
      }

      const requestData: DepositRequest = {
        userId: parseInt(userId),
        amount: numericAmount,
        cryptoname:
          cryptoMapping[selectedCrypto] || selectedCrypto.toUpperCase(),
      };

      console.log("Sending deposit request:", requestData);
      const response = await depositService.deposit(requestData);

      // Refresh wallet data after successful deposit
      const updatedWallets = await fetchUserWallets(parseInt(userId));
      dispatch(setWallets(updatedWallets));

      console.log("Deposit response:", response);
      toast.success(response.message || "Deposit processed successfully");
      // onClose();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to process deposit. Please try again.";
      toast.error(errorMessage);
      console.error("Deposit error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update the launchGateway function to handle different payment systems
  const launchGateway = async () => {
    const validationError = validateAmount(amount1, selectedServer);
    if (validationError) {
      setError(validationError);
      return;
    }

    const uid = localStorage.getItem("userId");
    if (!uid) {
      toast.error("Please Login First");
      return;
    }

    try {
      setLoading(true);
      const amount = parseFloat(amount1);
      const phone = 1234567890; // Default phone number

      // Check if it's a QR payment option (Novapay only now)
      if (selectedServer === "novapay_qr") {
        // Direct redirect for QR payments
        const serverUrls = {
          novapay_qr: `https://pay.rollix777.com/novapay.php?uid=${uid}&amount=${amount}&phone=${phone}&tyid=1`,
        };

        window.location.href = serverUrls[selectedServer];
        return;
      }

      if (selectedServer === "sunpay") {
        const validationError = validateAmount(amount1, "sunpay");
        if (validationError) {
          setError(validationError);
          return;
        }

        const amt = parseFloat(amount1);
        if (amt < 100 || amt > 100000) {
          toast.error(
            "Amount must be between ₹100 and ₹100,000 for Sunpay."
          );
          return;
        }

        const uid = localStorage.getItem("userId");
        if (!uid) {
          toast.error("Please Login First");
          return;
        }

        const phone = "8574657463"; // static or from user profile
        window.location.href = `https://sunpay.rollix777.com/?uid=${uid}&amount=${amt}&phone=${phone}`;
        return;
      }

      if (selectedServer === "watchpay") {
        const validationError = validateAmount(amount1, "watchpay");
        if (validationError) {
          setError(validationError);
          return;
        }

        const amt = parseFloat(amount1);
        if (amt < 100 || amt > 50000) {
          toast.error(
            "Amount must be between ₹100 and ₹50,000 for Watchpay."
          );
          return;
        }

        const uid = localStorage.getItem("userId");
        if (!uid) {
          toast.error("Please Login First");
          return;
        }

        const phone = "9876543210"; // static phone number for watchpay
        window.location.href = `https://sunpay.rollix777.com/watch.php?uid=${uid}&phone=${phone}&amount=${amt}`;
        return;
      }

      // For UPI and IMPS options, make API call
      const paymentSystemMap = {
        upi_instant: "inr_p2c",
        upi: "inr_p2p",
        imps: "imps",
        watchpay: "watchpay",
      };

      // Prepare the data and stringify it using qs
      const data = {
        userid: uid,
        amount,
        paySys: paymentSystemMap[selectedServer],
      };

      const queryString = qs.stringify(data);

      // Make API call to get the payment URL
      const response = await axios.post(
        "https://payapy.rollix777.com",
        queryString,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success && response.data.url) {
        // Redirect to the payment URL
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to generate payment link. Please try again.");
      }
    } catch (error) {
      console.error("Error calling payment API:", error);
      toast.error("Failed to process payment request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleModalClose = () => {
  //   // Reset all states before closing
  //   setAmount("");
  //   setCardAmount("");
  //   setError("");
  //   setCardError("");
  //   setActiveTab("crypto");
  //   setSelectedServer("server1");
  //   setLoading(false);
  //   onClose();
  // };

  const handleUsdtDeposit = () => {
    if (!usdtAmount || isNaN(Number(usdtAmount))) {
      toast.error("Please enter a valid amount");
      return;
    }

    const amount = parseFloat(usdtAmount);
    if (amount < 10) {
      toast.error("Minimum deposit amount is 10 USDT");
      return;
    }

    const uid = localStorage.getItem("userId");
    if (!uid) {
      toast.error("Please Login First");
      return;
    }

    // tyid: 1 for TRC20, 2 for ERC20
    const tyid = selectedNetwork === "trc20" ? 1 : 2;

    // Redirect to the USDT payment gateway
    window.location.href = `https://cryptousdt.rollix777.com/?uid=${uid}&amount=${amount}&tyid=${tyid}`;
  };

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

  return (
    <div className="flex flex-col gap-4 mt-6 lg:flex-row w-full max-w-7xl mx-auto min-h-screen overflow-y-auto bg-gradient-to-b from-[#252547] to-[#1A1A2E] px-4 py-8 pt-16 sm:pt-20">
      {/* Left: Deposit Section */}
      <div className="w-full lg:w-1/2 bg-[#1A1A2E] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-green-500/10">
          <h2 className="text-xl font-bold text-white">Deposit Funds</h2>
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A2E] text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-green-500/10">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "crypto"
                ? "text-white border-b-2 border-green-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => handleTabChange("crypto")}
          >
            <div className="flex items-center justify-center gap-2">
              <IndianRupee size={18} />
              <span>UPI</span>
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "usdt"
                ? "text-white border-b-2 border-green-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => handleTabChange("usdt")}
          >
            <div className="flex items-center justify-center gap-2">
              <DollarSign size={18} />
              <span>USDT</span>
            </div>
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {activeTab === "crypto" ? (
            <div className="space-y-4 ">
              {/* Server Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <button
                  onClick={() => setSelectedServer("sunpay")}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedServer === "sunpay"
                      ? "bg-green-500/20 border-green-500 text-white"
                      : "bg-[#1A1A2E] border-green-500/20 text-gray-400 hover:border-green-500/40"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">Sunpay (UPI Instant)</span>
                    <span className="text-xs">Recommended</span>
                    <span className="text-xs">₹100 - ₹100K</span>
                    <span className="text-xs text-green-400">
                      Instant processing
                    </span>
                  </div>
                </button>
                
                <button
                  onClick={() => setSelectedServer("watchpay")}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedServer === "watchpay"
                      ? "bg-green-500/20 border-green-500 text-white"
                      : "bg-[#1A1A2E] border-green-500/20 text-gray-400 hover:border-green-500/40"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">Watchpay (UPI)</span>
                   
                    <span className="text-xs">₹100 - ₹50K</span>
                    <span className="text-xs text-green-400">
                    Fast processing
                    </span>
                  </div>
                </button>
              </div>

              {/* Existing crypto selection */}
              <div className="relative">
                <select
                  value={selectedCrypto}
                  onChange={(e) =>
                    setSelectedCrypto(
                      e.target.value as "btc" | "eth" | "usdt" | "inr"
                    )
                  }
                  className="w-full py-3 px-4 bg-[#1A1A2E] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500 appearance-none cursor-pointer"
                >
                  {cryptoOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-[#1A1A2E]"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div
                    className={`w-6 h-6 rounded-full bg-${
                      cryptoOptions.find((opt) => opt.value === selectedCrypto)
                        ?.color
                    }-500 flex items-center justify-center text-white font-bold text-xs`}
                  >
                   
                  </div>
                </div>
              </div>

              {/* Amount input */}
              <div className="p-4 bg-[#1A1A2E] rounded-lg border border-green-500/20">
                <div className="mt-4">
                  <label className="text-sm text-gray-400 mb-2 block">
                    Amount (INR)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-green-400 font-medium">₹</span>
                    </div>
                    <input
                      type="text"
                      value={amount1}
                      onChange={handleAmountChange}
                      className={`w-full py-3 pl-8 pr-4 bg-[#252547] border ${
                        error ? "border-red-500" : "border-green-500/20"
                      } rounded-lg text-white focus:outline-none focus:border-green-500`}
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={launchGateway}
                  disabled={loading || !!error}
                  className={`w-full mt-4 py-3 px-4 rounded-lg text-white font-medium transition-all ${
                    loading || !!error
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90"
                  }`}
                >
                  {loading
                    ? "Processing..."
                    : `Deposit via ${selectedServer
                        .replace("_", " ")
                        .toUpperCase()}`}
                </button>
              </div>

              {/* Important notes */}
              <div className="p-4 bg-[#1A1A2E] rounded-lg border border-green-500/20 text-sm text-gray-400">
                <p className="mb-2">Important:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedServer === "upi_instant" && (
                    <>
                      <li>Send only via UPI Instant Method</li>
                      <li>Minimum deposit: ₹300 INR</li>
                      <li>Maximum deposit: ₹20,000 INR</li>
                      <li>Deposits are credited instantly</li>
                      <li>Recommended for fast transactions</li>
                    </>
                  )}
                  {selectedServer === "upi" && (
                    <>
                      <li>Send only via UPI Standard Method</li>
                      <li>Minimum deposit: ₹300 INR</li>
                      <li>Maximum deposit: ₹20,000 INR</li>
                      <li>Deposits are credited instantly</li>
                      <li>Standard transfer option</li>
                    </>
                  )}
                  {selectedServer === "imps" && (
                    <>
                      <li>Send only via IMPS Method</li>
                      <li>Minimum deposit: ₹300 INR</li>
                      <li>Maximum deposit: ₹20,000 INR</li>
                      <li>Deposits are credited instantly</li>
                      <li>Fast transfer option</li>
                    </>
                  )}
                  {selectedServer === "novapay_qr" && (
                    <>
                      <li>Scan QR code to pay via Novapay</li>
                      <li>Minimum deposit: ₹100 INR</li>
                      <li>Maximum deposit: ₹20,000 INR</li>
                      <li>Deposits are credited instantly</li>
                      <li>QR payment method</li>
                    </>
                  )}
                  {selectedServer === "sunpay" && (
                    <>
                      <li>Use Sunpay for high-value deposits only</li>
                      <li>Minimum deposit: ₹100</li>
                      <li>Maximum deposit: ₹100,000</li>
                      <li>Deposits are credited instantly</li>
                      <li>Ensure your bank supports large transactions</li>
                    </>
                  )}
                  {selectedServer === "watchpay" && (
                    <>
                      <li>Use Watchpay for secure deposits</li>
                      <li>Minimum deposit: ₹100</li>
                      <li>Maximum deposit: ₹50,000</li>
                      <li>Deposits are credited instantly</li>
                      <li>Secure payment gateway</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4  ">
              {/* Network Selection */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => setSelectedNetwork("trc20")}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedNetwork === "trc20"
                      ? "bg-green-500/20 border-green-500 text-white"
                      : "bg-[#1A1A2E] border-green-500/20 text-gray-400 hover:border-green-500/40"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">TRC20</span>
                    <span className="text-xs">Recommended</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedNetwork("erc20")}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedNetwork === "erc20"
                      ? "bg-green-500/20 border-green-500 text-white"
                      : "bg-[#1A1A2E] border-green-500/20 text-gray-400 hover:border-green-500/40"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">ERC20</span>
                    <span className="text-xs">Alternative</span>
                  </div>
                </button>
              </div>

              {/* USDT Amount Input */}
              <div className="p-4 bg-[#1A1A2E] rounded-lg border border-green-500/20">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Amount (USDT)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign className="w-5 h-5 text-green-400" />
                      </div>
                      <input
                        type="number"
                        value={usdtAmount}
                        onChange={(e) => setUsdtAmount(e.target.value)}
                        className="w-full py-3 pl-10 pr-4 bg-[#252547] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500"
                        placeholder="Enter amount in USDT"
                        min="10"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleUsdtDeposit}
                    disabled={usdtLoading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
                      usdtLoading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90"
                    }`}
                  >
                    {usdtLoading
                      ? "Processing..."
                      : `Deposit via ${selectedNetwork.toUpperCase()}`}
                  </button>
                </div>
                {cardError && (
                  <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{cardError}</span>
                  </div>
                )}
              </div>

              {/* Important notes for USDT */}
              <div className="p-4 bg-[#1A1A2E] rounded-lg border border-green-500/20 text-sm text-gray-400">
                <p className="mb-2">Important:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Minimum deposit: 10 USDT</li>
                  <li>Deposits are credited instantly</li>
                  <li>Make sure to send the exact amount</li>
                  <li>Double-check the network before sending</li>
                  <li>TRC20 has lower fees than ERC20</li>
                  <li>Send only USDT tokens</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Transaction Section */}
      <div className="w-full lg:w-1/2">
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

          {/* Transaction List */}
          <div className="p-4 sm:p-6">
            <div className="max-h-screen lg:max-h-[600px] overflow-y-auto">
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
                                  // onClick={() => handleViewRejection(txn)}
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
  );
};

export default DepositPage;