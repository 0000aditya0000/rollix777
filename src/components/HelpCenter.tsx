import React, { useState } from 'react';
import { Search, ArrowLeft, HelpCircle, ChevronRight, MessageCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I get started?",
    answer: "You can get started by creating an account and following our quick start guide.",
    category: "Getting Started"
  },
  {
    question: "How do I reset my password?",
    answer: "Click on the 'Forgot Password' link on the login page and follow the instructions sent to your email.",
    category: "Account"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers.",
    category: "Billing"
  }
];

const categories = [
  { name: "Getting Started", icon: HelpCircle },
  { name: "Account", icon: MessageCircle },
  { name: "Billing", icon: Mail },
  { name: "Technical Support", icon: Phone }
];

export const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0F0F19]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1A1A2E]/95 backdrop-blur-lg border-b border-purple-500/10 z-50">
        <div className="max-w-[1400px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2 rounded-lg bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-white">Help Center</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 pt-24 md:pt-28 pb-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#1A1A2E] to-[#252547] rounded-2xl p-6 md:p-12 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative text-center mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-[2px] mb-8 transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-2xl bg-[#1A1A2E] flex items-center justify-center">
                <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              How can we help you?
            </h1>
            <p className="text-lg md:text-xl text-gray-400">
              Search our help center or browse categories below
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-purple-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-[#252547]/50 backdrop-blur-sm border border-purple-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent text-white placeholder-gray-400 transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#252547] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Categories
              </h2>
              <div className="flex flex-wrap lg:flex-col gap-3">
                {categories.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => setSelectedCategory(name === selectedCategory ? null : name)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                      selectedCategory === name
                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20'
                        : 'hover:bg-[#252547] border border-transparent hover:border-purple-500/20'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      selectedCategory === name ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-400'
                    }`} />
                    <span className={`flex-1 ${
                      selectedCategory === name ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {name}
                    </span>
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${
                      selectedCategory === name ? 'rotate-90 text-purple-400' : 'text-gray-400 group-hover:text-purple-400'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#252547] rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              {filteredFAQs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div
                      key={index}
                      className={`bg-[#252547]/50 backdrop-blur-sm rounded-xl border border-purple-500/10 transition-all duration-300 ${
                        expandedFAQ === index ? 'p-6' : 'p-4 hover:border-purple-500/20'
                      }`}
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <div className="flex items-start gap-4 cursor-pointer">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {faq.question}
                          </h3>
                          <div className={`overflow-hidden transition-all duration-300 ${
                            expandedFAQ === index ? 'max-h-96' : 'max-h-0'
                          }`}>
                            <p className="text-gray-400 mb-4">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-purple-400 transform transition-transform ${
                          expandedFAQ === index ? 'rotate-90' : ''
                        }`} />
                      </div>
                      <div className={`mt-4 ${expandedFAQ === index ? 'block' : 'hidden'}`}>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600/20 text-purple-400">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#252547]/30 rounded-xl border border-purple-500/10">
                  <HelpCircle className="w-12 h-12 text-purple-400/50 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2 text-lg">
                    No matching questions found
                  </p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search or browse different categories
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#252547] rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Still Need Help?
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Our support team is available 24/7 to assist you with any questions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 rounded-xl bg-[#252547]/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                  <MessageCircle className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="block text-white font-medium">Live Chat</span>
                </button>
                <button className="p-4 rounded-xl bg-[#252547]/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                  <Mail className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="block text-white font-medium">Email Support</span>
                </button>
                <button className="p-4 rounded-xl bg-[#252547]/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                  <Phone className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="block text-white font-medium">Phone Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 