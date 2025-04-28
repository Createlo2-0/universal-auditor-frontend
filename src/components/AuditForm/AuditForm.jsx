import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import inputFields from "../../config/inputFields.js";

const AuditForm = ({ onClose }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      console.log("Submitting:", formData);

      const response = await fetch('https://backend-testing-qgcx.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          business_url: formData.business_url,
          business_email: formData.business_email,
          business_phone: formData.business_phone,
          categoryHint: formData.categoryHint
        }),
        credentials: 'include',
        mode: 'cors'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      const data = await response.json();
      toast.success('Analysis complete! Redirecting...');
      
      // Open result in same tab (maintaining session context)
      window.location.href = `https://backend-testing-qgcx.onrender.com${data.redirect_url}`;
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit form');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="relative w-full max-w-md p-4 sm:p-6 rounded-2xl bg-[#07071f] backdrop-blur-3xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:right-5 text-white text-xl sm:text-2xl hover:text-pink-500 transition"
        >
          &times;
        </button>

        <div className="flex flex-col items-center justify-center text-white font-sans">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_35px_rgba(0,255,255,0.7)]">
            CREATE<span className="text-pink-500">LO</span>
          </h1>
          <h2 className="text-lg sm:text-xl text-[#367df8] mt-1 drop-shadow-[0_0_8px_#0ff]">User Input Form</h2>
          <h3 className="text-2xl sm:text-3xl font-semibold mb-2 drop-shadow-[0_0_8px_#0ff]">AI Audit Entry</h3>

          <div className="w-full p-[2px] rounded-2xl bg-[conic-gradient(at_top_left,_cyan,_blue,_pink,_purple)] border border-[#ffffff80] shadow-[0_0_18px_rgba(0,255,255,0.25),inset_0_0_10px_rgba(255,0,255,1)] overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-[#07071f] px-4 sm:px-6 py-3 rounded-2xl max-h-[400px] overflow-y-auto custom-scrollbar">
              {inputFields.map(({ name, placeholder, icon: Icon, type, validation, options }) => (
                <div key={name} className="flex flex-col bg-[#0f172a] border border-[#121960] rounded-lg px-3 py-2 my-3 shadow-sm focus-within:ring-1 focus-within:ring-cyan-400">
                  {errors[name] && (
                    <p className="text-red-500 text-xs mb-1">{errors[name]?.message}</p>
                  )}
                  {type === "select" ? (
                    <div>
                      <label htmlFor={name} className="text-white text-sm font-medium mb-2 block pl-1">
                        {placeholder}
                      </label>
                      <select
                        id={name}
                        {...register(name, validation)}
                        defaultValue=""
                        className="bg-[#1e293b] w-full text-white border border-[#121960] rounded-md px-2 py-2 text-sm sm:text-base focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        onChange={(e) => setValue("categoryHint", e.target.value)}
                      >
                        <option value="" disabled>{placeholder}</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Icon className="mr-3 text-cyan-400 text-lg sm:text-xl" />
                      <input
                        type={type}
                        {...register(name, validation)}
                        placeholder={placeholder}
                        className="bg-transparent outline-none text-white placeholder-gray-400 flex-1 text-sm sm:text-base"
                      />
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`w-[70%] sm:w-[50%] mt-3 py-2 bg-gradient-to-r from-[#4822dd] via-[#8222c2] to-[#ff299c]
                  text-white text-sm sm:text-base rounded-xl transition-all shadow-neon
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:shadow-pink-100/10'}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Run Free Audit'}
                </button>
              </div>
            </form>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 mt-4">
            Powered by <span className="text-white">Gemini AI</span> and Createlo
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditForm;
