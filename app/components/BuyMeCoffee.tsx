'use client';

import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import DonationModal from './DonationModal';

const BuyMeCoffee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a
        href="#"
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-[#FFDD00] text-black h-12 w-12 rounded-full shadow-lg hover:bg-[#FFDD00]/90 transition-all duration-200 flex items-center justify-center z-50 group"
        aria-label="Buy me a coffee"
      >
        <Coffee className="w-5 h-5 group-hover:animate-bounce" />
      </a>
      
      <DonationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default BuyMeCoffee; 