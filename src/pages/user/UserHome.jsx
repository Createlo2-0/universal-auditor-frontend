import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/audit-form');
  };

  return (
    <div className="w-full h-full justify-center flex items-center">
      <button
        onClick={handleButtonClick}
        className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[25%] xl:w-[15%] py-3 sm:py-4 md:py-5 bg-gradient-to-r from-[#4822dd] via-[#8222c2] to-[#ff299c]
          text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold rounded-2xl hover:scale-110 hover:shadow-lg hover:shadow-pink-100/20 transition-all shadow-neon cursor-pointer"
      >
        Start From Here
      </button>
    </div>
  );
};

export default UserHome;