import React, { useState, useEffect } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setWallets } from '../../slices/walletSlice';
import { fetchUserWallets } from '../../lib/services/WalletServices.js';
import { depositService } from '../../services/api';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from '../../lib/config/server';
import { fetchUserAllData } from '../../lib/services/userService';
import { getAllTransactions } from '../../lib/services/transactionService';
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
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount1, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('inr');
  const [selectedBankAccount, setSelectedBankAccount] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [errors, setErrors] = useState({
    currency: '',
    amount: '',
    bankAccount: ''
  });

  const cryptoOptions = [
    { value: 'btc', label: 'Bitcoin (BTC)', symbol: '₿', color: 'yellow' },
    { value: 'eth', label: 'Ethereum (ETH)', symbol: 'Ξ', color: 'blue' },
    { value: 'usdt', label: 'USDT', symbol: '₮', color: 'green' },
    { value: 'inr', label: 'INR', symbol: '₹', color: 'orange' }
  ];

  const quickAmounts = ['500', '1000', '2000', '5000', '10000', '20000'];

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
      if (user?.id ) {
        console.log('user?.id',user?.id)
        try {
          const response = await fetchUserAllData(user?.id);
          if (response.success) {
            console.log('data is coming',response.data)
            
            const onlyBankAccounts = response.data.bankAccounts.filter(
              (account: any) => account.network === null
            );
            setBankAccounts(onlyBankAccounts);
            console.log('onlyBankAccounts',onlyBankAccounts)
            
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user?.id]);

  useEffect(() => {
    const uid = localStorage.getItem('userId');
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
    navigator.clipboard.writeText('test@paytm');
    toast.success('UPI ID copied to clipboard');
  };

  const handleRefresh = async () => {
    if (user?.id) {
      try {
        const data = await fetchUserWallets(user.id);
        dispatch(setWallets(data));
        toast.success('Wallet data refreshed successfully');
      } catch (error) {
        console.error("Error refreshing data:", error);
        toast.error('Failed to refresh wallet data');
      }
    }
  };

  const mainBalance = wallets.find(w => w.cryptoname === "INR")?.balance || "0";
  const bonusBalance = wallets.find(w => w.cryptoname === "CP")?.balance || "0";
   
   const launchGateway = () => {
    if (parseFloat(amount1) < 300) {
      toast.error('Minimum amount is 300 INR');
    }
    const uid = localStorage.getItem('userId');
    if(!uid) {
      toast.error('Please login to continue');
      return;
    }
    const amount=parseFloat(amount1);
    const phone=1234567890;
    const url = `https://pay.rollix777.com/index.php?uid=${uid}&amount=${amount}&phone=${phone}`;
    window.location.href = url;

   }

  const handleDeposit = async () => {
    if (!user?.id || !amount1) {
      toast.error('Please enter an amount');
      return;
    }

    setIsLoading(true);
    try {
      const depositData = {
        userId: Number(user.id),
        amount: parseFloat(amount1),
        cryptoname: selectedCurrency.toUpperCase()
      };

      const response = await depositService.deposit(depositData);
      toast.success(response.message || 'Deposit successful');
      
      // Refresh wallet data after successful deposit
      await handleRefresh();
      
      // Clear amount input
      setAmount('');
    } catch (error) {
      console.error('Deposit failed:', error);
      toast.error('Deposit failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Validation function
  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      currency: '',
      amount: '',
      bankAccount: ''
    };

    if (activeTab === 'withdraw') {
      // Currency validation
      if (!selectedCurrency || selectedCurrency === '') {
        newErrors.currency = 'Please select a currency';
        isValid = false;
      }

      // Bank account validation for withdrawal
      if (!selectedBankAccount || selectedBankAccount === '0') {
        newErrors.bankAccount = 'Please select a bank account';
        isValid = false;
      }

      // Amount validation for withdrawal
      if (!amount1) {
        newErrors.amount = 'Amount is required';
        isValid = false;
      } else if (parseFloat(amount1) < 100) {
        newErrors.amount = 'Minimum withdrawal amount is ₹100';
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
    setErrors(prev => ({ ...prev, amount: '' }));
  };

  // Reset form errors when changing tabs
  useEffect(() => {
    setErrors({
      currency: '',
      amount: '',
      bankAccount: ''
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
        userId: user?.id?.toString()
      };

      const response = await axios.post(`${baseUrl}/api/wallet/withdrawl`, withdrawalData);
      
      if (response.data.success) {
        toast.success(response.data.message || 'Withdrawal request created successfully');
        // Reset all form fields
        setAmount('');
        setSelectedBankAccount('0');
        setSelectedCurrency(''); // Reset currency field
        setErrors({
          currency: '',
          amount: '',
          bankAccount: ''
        });
        // Refresh wallet data
        await handleRefresh();
      } else {
        toast.error(response.data.message || 'Withdrawal request failed');
      }
    } catch (error: any) {
      console.error('Withdrawal failed:', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Update the action button to only call handleWithdraw when in withdraw tab
  const handleActionButtonClick = () => {
    if (activeTab === 'deposit') {
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Wallet</h1>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 sm:p-3 mt-4 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            {/* Balance Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Main Balance Card */}
              <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg">
                    <WalletIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold text-white">Available Balance</h2>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">₹{mainBalance}</h2>
                <p className="text-sm text-gray-400">Last updated: 2 mins ago</p>
              </div>

              {/* Quick Stats Card */}
              <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-pink-500/10 rounded-lg">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold text-white">Bonus Balance</h2>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">₹{bonusBalance}</h2>
                <p className="text-sm text-gray-400">Available for use</p>
              </div>
            </div>

            {/* Action Panel for Mobile */}
            <div className="block lg:hidden -mb-1">
              <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20">
                <div className="p-4 sm:p-6 border-b border-purple-500/10">
                  <div className="flex gap-2 bg-[#1A1A2E] p-1 rounded-lg sm:rounded-xl">
                    <button
                      onClick={() => setActiveTab('deposit')}
                      className={`flex-1 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-colors ${
                        activeTab === 'deposit'
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <ArrowDownCircle size={16} />
                      <span className="text-sm sm:text-base">Deposit</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('withdraw')}
                      className={`flex-1 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-colors ${
                        activeTab === 'withdraw'
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <ArrowUpCircle size={16} />
                      <span className="text-sm sm:text-base">Withdraw</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 ">
                  {/* Currency Selector */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-400">Select Currency</label>
                    <div className="relative">
                      <select
                        value={selectedCurrency}
                        onChange={(e) => {
                          setSelectedCurrency(e.target.value);
                          setErrors(prev => ({ ...prev, currency: '' }));
                        }}
                        className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#1A1A2E] border ${
                          errors.currency ? 'border-red-500' : 'border-purple-500/20'
                        } rounded-lg sm:rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-purple-500 appearance-none`}
                      >
                        <option value="" className="bg-[#1A1A2E]">Select Currency</option>
                        {cryptoOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-[#1A1A2E]">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      {errors.currency && (
                        <p className="text-red-500 text-xs mt-1">{errors.currency}</p>
                      )}
                    </div>
                  </div>
                    {/* Bank Account Selector */}
                    {
                  activeTab !== 'deposit' && (
                    <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-400">Select Bank Account</label>
                    <div className="relative">
                      <select
                        value={selectedBankAccount}
                        onChange={(e) => {
                          setSelectedBankAccount(e.target.value);
                          setErrors(prev => ({ ...prev, bankAccount: '' }));
                        }}
                        className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#1A1A2E] border ${
                          errors.bankAccount ? 'border-red-500' : 'border-purple-500/20'
                        } rounded-lg sm:rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-purple-500 appearance-none`}
                      >
                        <option value="0" className="bg-[#1A1A2E]">
                          Select Bank Account
                        </option>
                        {renderBankOptions().map((option) => (
                          <option key={option.value} value={option.value} className="bg-[#1A1A2E]">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      {errors.bankAccount && (
                        <p className="text-red-500 text-xs mt-1">{errors.bankAccount}</p>
                      )}
                    </div>
                  </div>
                  )
                 }

                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-400">Enter Amount</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="text-white text-base sm:text-lg">₹</span>
                      </div>
                      <input
                        type="number"
                        value={amount1}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setErrors(prev => ({ ...prev, amount: '' }));
                        }}
                        className={`w-full py-3 sm:py-4 pl-8 sm:pl-10 pr-4 sm:pr-6 bg-[#1A1A2E] border ${
                          errors.amount ? 'border-red-500' : 'border-purple-500/20'
                        } rounded-lg sm:rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-purple-500`}
                        placeholder="0.00"
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                      )}
                    </div>
                  </div>

                  {/* Quick Amounts */}
                  <div>
                    <label className="text-xs sm:text-sm text-gray-400 block mb-2">Quick Select</label>
                    <div className="grid grid-cols-2 gap-2">
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => handleQuickAmountSelect(amt)}
                          className="py-2 sm:py-3 px-3 sm:px-4 bg-[#1A1A2E] rounded-lg sm:rounded-xl text-sm sm:text-base text-white hover:bg-[#2f2f5a] transition-colors border border-purple-500/20"
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                 

                  {/* Action Button */}
                  <button
                    onClick={handleActionButtonClick}
                    disabled={isLoading}
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl text-white font-medium transition-opacity text-base sm:text-lg ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                  >
                    {isLoading ? 'Processing...' : activeTab === 'deposit' ? 'Deposit Now' : 'Withdraw Now'}
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction Section */}
            <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20">
              <div className="p-4 sm:p-6 border-b border-purple-500/10 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Recent Transactions</h3>
                </div>
                <button className="text-purple-400 hover:text-purple-300 text-xs sm:text-sm">View All</button>
              </div>
              <div className="p-4 sm:p-6 pb-8 space-y-3 sm:space-y-4">
                {transactions && transactions.length > 0 ? (
                  transactions.slice(0, 5).map((txn, index) => {
                    const isDeposit = txn.transaction_type === 'recharge';
                    const isWithdrawal = txn.transaction_type === 'withdraw';
                    const typeLabel = isDeposit ? 'Deposit' : isWithdrawal ? 'Withdrawal' : txn.transaction_type;
                    const iconBg = isDeposit ? 'bg-green-500/10' : 'bg-red-500/10';
                    const icon = isDeposit
                      ? <ArrowDownCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                      : <ArrowUpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />;
                    const amountSign = isDeposit ? '+' : isWithdrawal ? '-' : '';
                    const amountColor = isDeposit ? 'text-green-500' : isWithdrawal ? 'text-red-500' : 'text-white';
                    const statusColor =
                      txn.status.toLowerCase() === 'success'
                        ? 'text-green-500'
                        : txn.status.toLowerCase() === 'failed'
                        ? 'text-red-500'
                        : 'text-yellow-500';

                    return (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between p-3 sm:p-4 bg-[#1A1A2E] rounded-lg sm:rounded-xl hover:bg-[#252547] transition-colors"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${iconBg}`}>
                            {icon}
                          </div>
                          <div>
                            <p className="text-white font-medium text-base sm:text-lg">
                              {typeLabel}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400">{txn.transaction_date}</p>
                            <p className={`text-xs sm:text-sm ${statusColor}`}>{txn.status}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-base sm:text-lg font-semibold ${amountColor}`}>
                            {amountSign}₹{txn.amount}
                          </span>
                          <p className="text-xs sm:text-sm text-gray-400">{txn.order_id}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-gray-400 text-center py-6">No transactions found.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Action Panel for Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20 lg:sticky lg:top-8">
              <div className="p-4 sm:p-6 border-b border-purple-500/10">
                <div className="flex gap-2 bg-[#1A1A2E] p-1 rounded-lg sm:rounded-xl">
                  <button
                    onClick={() => setActiveTab('deposit')}
                    className={`flex-1 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-colors ${
                      activeTab === 'deposit'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ArrowDownCircle size={16} />
                    <span className="text-sm sm:text-base">Deposit</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`flex-1 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-colors ${
                      activeTab === 'withdraw'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ArrowUpCircle size={16} />
                    <span className="text-sm sm:text-base">Withdraw</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 ">
                {/* Currency Selector */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-gray-400">Select Currency</label>
                  <div className="relative">
                    <select
                      value={selectedCurrency}
                      onChange={(e) => {
                        setSelectedCurrency(e.target.value);
                        setErrors(prev => ({ ...prev, currency: '' }));
                      }}
                      className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#1A1A2E] border ${
                        errors.currency ? 'border-red-500' : 'border-purple-500/20'
                      } rounded-lg sm:rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-purple-500 appearance-none`}
                    >
                      <option value="" className="bg-[#1A1A2E]">Select Currency</option>
                      {cryptoOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-[#1A1A2E]">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                    {errors.currency && (
                      <p className="text-red-500 text-xs mt-1">{errors.currency}</p>
                    )}
                  </div>
                </div>
                 {/* Bank Account Selector */}
                 {
                  activeTab !== 'deposit' && (
                    <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-400">Select Bank Account</label>
                    <div className="relative">
                      <select
                        value={selectedBankAccount}
                        onChange={(e) => {
                          setSelectedBankAccount(e.target.value);
                          setErrors(prev => ({ ...prev, bankAccount: '' }));
                        }}
                        className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#1A1A2E] border ${
                          errors.bankAccount ? 'border-red-500' : 'border-purple-500/20'
                        } rounded-lg sm:rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-purple-500 appearance-none`}
                      >
                        <option value="0" className="bg-[#1A1A2E]">
                          Select Bank Account
                        </option>
                        {renderBankOptions().map((option) => (
                          <option key={option.value} value={option.value} className="bg-[#1A1A2E]">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      {errors.bankAccount && (
                        <p className="text-red-500 text-xs mt-1">{errors.bankAccount}</p>
                      )}
                    </div>
                  </div>
                  )
                 }
               

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-gray-400">Enter Amount</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <span className="text-white text-base sm:text-lg">₹</span>
                    </div>
                    <input
                      type="number"
                      value={amount1}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setErrors(prev => ({ ...prev, amount: '' }));
                      }}
                      className={`w-full py-3 sm:py-4 pl-8 sm:pl-10 pr-4 sm:pr-6 bg-[#1A1A2E] border ${
                        errors.amount ? 'border-red-500' : 'border-purple-500/20'
                      } rounded-lg sm:rounded-xl text-base sm:text-lg text-white focus:outline-none focus:border-purple-500`}
                      placeholder="0.00"
                    />
                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                    )}
                  </div>
                </div>

                {/* Quick Amounts */}
                <div>
                  <label className="text-xs sm:text-sm text-gray-400 block mb-2">Quick Select</label>
                  <div className="grid grid-cols-2 gap-2">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handleQuickAmountSelect(amt)}
                        className="py-2 sm:py-3 px-3 sm:px-4 bg-[#1A1A2E] rounded-lg sm:rounded-xl text-sm sm:text-base text-white hover:bg-[#2f2f5a] transition-colors border border-purple-500/20"
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                
                {/* Action Button */}
                <button
                  onClick={handleActionButtonClick}
                  disabled={isLoading}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl text-white font-medium transition-opacity text-base sm:text-lg ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  {isLoading ? 'Processing...' : activeTab === 'deposit' ? 'Deposit Now' : 'Withdraw Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet; 