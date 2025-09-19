import React, { useState, useEffect } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../lib/utils/axiosInstance";

const KYCVerification: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
const [kycDetails, setKycDetails] = useState<Record<string, unknown> | null>(null);
  const [documents, setDocuments] = useState({
    aadharFront: null as File | null,
    aadharBack: null as File | null,
    panCard: null as File | null,
  });
  const [previews, setPreviews] = useState({
    aadharFront: "",
    aadharBack: "",
    panCard: "",
  });
  const [uploadedUrls, setUploadedUrls] = useState({
    aadharFront: "",
    aadharBack: "",
    panCard: "",
  });

  // Add useEffect to fetch KYC details
  useEffect(() => {
    const fetchKycDetails = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          toast.error("User ID not found. Please login again.");
          navigate("/login");
          return;
        }

        const response = await axiosInstance.get(
          `/api/user/kyc-details/${userId}`
        );

        setKycDetails(response.data.data);
      } catch (error: unknown) {
        console.error("Error fetching KYC details:", error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to fetch KYC details");
        }
      }
    };

    fetchKycDetails();
  }, [navigate]);

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kyc-presets");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwytm0sdm/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        console.error("Cloudinary upload failed:", data);
        return null;
      }
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleFileUpload =
    (type: keyof typeof documents) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size should be less than 5MB");
          return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload only image files");
          return;
        }

        setDocuments((prev) => ({
          ...prev,
          [type]: file,
        }));

        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => ({
            ...prev,
            [type]: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary and console URL
        const uploadedUrl = await uploadToCloudinary(file);
        if (uploadedUrl) {
          console.log(`${type} uploaded to Cloudinary:`, uploadedUrl);
          setUploadedUrls((prev) => ({
            ...prev,
            [type]: uploadedUrl,
          }));
        } else {
          toast.error("Cloudinary upload failed");
        }
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");

      if (!userId) {
        toast.error("User ID not found. Please login again.");
        navigate("/login");
        return;
      }

      // Create FormData
      // const formData = new FormData();

      // Append files
      // if (documents.aadharFront) {
      //   formData.append("aadharFront", documents.aadharFront);
      // }
      // if (documents.aadharBack) {
      //   formData.append("aadharBack", documents.aadharBack);
      // }
      // if (documents.panCard) {
      //   formData.append("panImage", documents.panCard);
      // }

      // Append KYC status
      // formData.append("kycstatus", "0");

      const payload = {
        aadhar_front: uploadedUrls.aadharFront,
        aadhar_back: uploadedUrls.aadharBack,
        pan: uploadedUrls.panCard,
        kycstatus: "0",
      };

      const response = await axiosInstance.put(
        `/api/user/${userId}/kyc`,
        payload
      );

      if (response.data) {
        toast.success("KYC documents submitted successfully!");
        navigate("/account");
      }
    } catch (error: any) {
      console.error("KYC submission error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit KYC documents. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    setDocuments({
      aadharFront: null,
      aadharBack: null,
      panCard: null,
    });
    setPreviews({
      aadharFront: "",
      aadharBack: "",
      panCard: "",
    });
  };

  const hasAnyDocument =
    documents.aadharFront || documents.aadharBack || documents.panCard;

  return (
    <div className="bg-[#0F0F19] min-h-screen w-full px-4 lg:mt-24 my-24">
      <div className="max-w-7xl mx-auto pt-16">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/account"
            className="p-2 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all duration-300 hover:scale-105 transform"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">KYC Verification</h1>
            <p className="text-sm text-purple-300/60 mt-1">
              Complete your identity verification
            </p>
          </div>
        </div>

        {/* Main Content */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Aadhar Front */}
            <div className="bg-[#1A1A2E] rounded-xl p-3">
              <h3 className="text-base font-semibold text-white mb-2">
                Aadhar Front
              </h3>
              <div
                className={`border-2 border-dashed border-purple-500/30 rounded-lg p-2 text-center ${
                  previews.aadharFront ? "h-[120px]" : "h-[90px]"
                } flex items-center justify-center`}
              >
                <input
                  type="file"
                  id="aadharFront"
                  accept="image/*"
                  onChange={handleFileUpload("aadharFront")}
                  className="hidden"
                />
                <label
                  htmlFor="aadharFront"
                  className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
                >
                  {previews.aadharFront ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previews.aadharFront}
                        alt="Aadhar Front Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="text-white bg-purple-500/80 px-3 py-1.5 rounded-lg text-sm">
                          Change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-6 h-6 text-purple-400 mb-1" />
                      <span className="text-gray-400 text-sm">
                        Upload front side
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Aadhar Back */}
            <div className="bg-[#1A1A2E] rounded-xl p-3">
              <h3 className="text-base font-semibold text-white mb-2">
                Aadhar Back
              </h3>
              <div
                className={`border-2 border-dashed border-purple-500/30 rounded-lg p-2 text-center ${
                  previews.aadharBack ? "h-[120px]" : "h-[90px]"
                } flex items-center justify-center`}
              >
                <input
                  type="file"
                  id="aadharBack"
                  accept="image/*"
                  onChange={handleFileUpload("aadharBack")}
                  className="hidden"
                />
                <label
                  htmlFor="aadharBack"
                  className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
                >
                  {previews.aadharBack ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previews.aadharBack}
                        alt="Aadhar Back Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="text-white bg-purple-500/80 px-3 py-1.5 rounded-lg text-sm">
                          Change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-6 h-6 text-purple-400 mb-1" />
                      <span className="text-gray-400 text-sm">
                        Upload back side
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* PAN Card */}
            <div className="bg-[#1A1A2E] rounded-xl p-3">
              <h3 className="text-base font-semibold text-white mb-2">
                PAN Card
              </h3>
              <div
                className={`border-2 border-dashed border-purple-500/30 rounded-lg p-2 text-center ${
                  previews.panCard ? "h-[120px]" : "h-[90px]"
                } flex items-center justify-center`}
              >
                <input
                  type="file"
                  id="panCard"
                  accept="image/*"
                  onChange={handleFileUpload("panCard")}
                  className="hidden"
                />
                <label
                  htmlFor="panCard"
                  className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
                >
                  {previews.panCard ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previews.panCard}
                        alt="PAN Card Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="text-white bg-purple-500/80 px-3 py-1.5 rounded-lg text-sm">
                          Change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-6 h-6 text-purple-400 mb-1" />
                      <span className="text-gray-400 text-sm">
                        Upload PAN card
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-4 lg:mt-10">
            <button
              type="button"
              onClick={handleClearAll}
              disabled={!hasAnyDocument || isLoading}
              className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl font-semibold hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-2 md:order-1"
            >
              Clear All
            </button>
            <button
              type="submit"
              disabled={
                !documents.aadharFront ||
                !documents.aadharBack ||
                !documents.panCard ||
                isLoading
              }
              className="w-full py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors order-1 md:order-2"
            >
              {isLoading ? "Submitting..." : "Submit Documents"}
            </button>
          </div>
        </form>

        {/* Add KYC Details Section */}
        {kycDetails && (
          <div className="mt-8 bg-[#1A1A2E] rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">KYC Details</h2>

            {/* Personal Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0F0F19] p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Username</p>
                  <p className="text-white font-medium">
                    {kycDetails.personal_details.username}
                  </p>
                </div>
                <div className="bg-[#0F0F19] p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white font-medium">
                    {kycDetails.personal_details.name}
                  </p>
                </div>
                <div className="bg-[#0F0F19] p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-medium">
                    {kycDetails.personal_details.email}
                  </p>
                </div>
                <div className="bg-[#0F0F19] p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white font-medium">
                    {kycDetails.personal_details.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* KYC Status */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">
                KYC Status
              </h3>
              <div className="bg-[#0F0F19] p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      kycDetails.kyc_status.code === 0
                        ? "bg-yellow-500"
                        : kycDetails.kyc_status.code === 1
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <p className="text-white font-medium">
                    {kycDetails.kyc_status.text}
                  </p>
                </div>
                {kycDetails.kyc_status.note && (
                  <p className="text-gray-400 text-sm mt-2">
                    {kycDetails.kyc_status.note}
                  </p>
                )}
              </div>
            </div>

            {/* Document Status */}
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">
                Document Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0F0F19] p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Aadhar Card</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        kycDetails.documents.aadhar.submitted
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <p className="text-white">
                      {kycDetails.documents.aadhar.submitted
                        ? "Submitted"
                        : "Not Submitted"}
                    </p>
                  </div>
                </div>
                <div className="bg-[#0F0F19] p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">PAN Card</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        kycDetails.documents.pan.submitted
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <p className="text-white">
                      {kycDetails.documents.pan.submitted
                        ? "Submitted"
                        : "Not Submitted"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerification;
