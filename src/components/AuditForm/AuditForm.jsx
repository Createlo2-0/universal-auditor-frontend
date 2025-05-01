import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import inputFields from "../../config/inputFields.js";
import { toast } from 'react-hot-toast';
import { submitFormData } from '../../api/submitAudit.js';
import { useNavigate } from 'react-router-dom';

const AuditForm = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Form Data:", data);
      const response = await submitFormData(data);
      console.log("Server Response:", response);

      if (response.status === 'success') {
        // localStorage.setItem('isDataSubmitted', 'true');
        toast.success('Your AI Audit Report is now being generated. Sit tight, it’ll be worth it!');

        navigate('/business-summary', {
          state: { responseData: response.data },
        });
        setIsLoading(false);
        return;
      } else {
        // localStorage.setItem('isDataSubmitted', 'false');
        toast.error(`Audit couldn't be completed. Check details or try again in a moment.`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please refresh and try submitting the form again.');
    }
    setIsLoading(false);
    onClose();

  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[999] bg-[#07071f] bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-cyan-400 h-12 w-12 ">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#5ad1f3] mb-4"></div>
          </div>
        </div>
      )}
      <div className="my-6 fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
        <div className="relative w-full max-w-md p-4 sm:p-6 rounded-2xl bg-[#07071f] backdrop-blur-3xl shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:right-5 text-white text-xl sm:text-2xl hover:text-pink-500 transition duration-300"
          >
            &times;
          </button>

          {/* Header Section */}
          <div className="flex flex-col items-center justify-center text-white font-sans">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.2 }}
              className="w-36 cursor-pointer mb-4"
            >
              <img src="/logo.png" loading="lazy" alt="Createlo Logo" className="object-contain scale-110" />
            </motion.div>
            <h2 className="text-lg sm:text-xl text-[#367df8] mt-1 drop-shadow-[0_0_8px_#0ff] font-medium">
              User Input Form
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 drop-shadow-[0_0_8px_#0ff]">
              AI Audit Entry
            </h3>
          </div>

          {/* Form Section */}
          <div className="w-full p-[2px] rounded-2xl bg-[conic-gradient(at_top_left,_cyan,_blue,_pink,_purple)] border border-[#ffffff80]
      shadow-[0_0_18px_rgba(0,255,255,0.25),inset_0_0_10px_rgba(255,0,255,1)] overflow-hidden">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full bg-[#07071f] px-4 sm:px-6 py-4 rounded-2xl max-h-[350px] overflow-y-auto custom-scrollbar"
            >
              {inputFields.map(({ name, placeholder, icon: Icon, type, validation, options }) => (
                <div
                  key={name}
                  className="flex flex-col bg-[#0f172a] border border-[#121960] rounded-lg px-3 py-2 my-3 shadow-sm focus-within:ring-1 focus-within:ring-cyan-400"
                >
                  {errors[name] && (
                    <p className="text-red-500 text-xs mb-1">{errors[name]?.message}</p>
                  )}
                  {type === "select" ? (
                    <div>
                      <label
                        htmlFor={name}
                        className="text-white text-sm font-medium mb-2 block pl-1"
                      >
                        {placeholder}
                      </label>
                      <select
                        id={name}
                        {...register(name, {
                          ...validation,
                          onChange: (e) => {
                            const selectedValue = e.target.value;
                            setValue("categoryHint", selectedValue);
                          },
                        })}
                        defaultValue=""
                        className="bg-[#1e293b] w-full text-white border border-[#121960] rounded-md px-2 py-2 text-sm sm:text-base focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                      >
                        <option value="" disabled>
                          {placeholder}
                        </option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
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

              <input type="hidden" {...register("categoryHint")} />

              {/* Submit Button */}
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[70%] sm:w-[50%] mt-4 py-3 bg-gradient-to-r from-[#4822dd] via-[#8222c2] to-[#ff299c] cursor-pointer
              text-white text-sm sm:text-base font-semibold rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-pink-100/10 transition-all shadow-neon"
                  type="submit"
                >
                  Run My AI Audit Now
                </motion.button>
              </div>
            </form>
          </div>

          {/* Informational Text */}
          <p className="text-xs sm:text-sm text-gray-400 my-4 text-center">
            🧠 AI isn’t perfect — but ignoring your digital presence is worse. <br />
            This audit won’t flatter you; it will show you what your customers already see. <br />
            Enter your details to discover where your brand stands in today’s fast-moving, AI-driven marketplace — before competitors get ahead of the story.
          </p>

          {/* Footer */}
          <p className="text-xs sm:text-lg text-gray-400 mt-4 text-center">
            Powered by <span className="text-white font-semibold">Gemini AI</span> | Delivered by <span className="text-white font-semibold">Createlo</span>
          </p>
        </div>
      </div>
    </>);
};

export default AuditForm;
