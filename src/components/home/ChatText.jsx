import React from 'react';
import Testimoni1 from "../../assets/home/Testimoni1.png";
import Send from "../../assets/home/send-one.svg"

export default function ChatText({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[90%] sm:w-100 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-70 flex flex-col border border-gray-100 animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Orange Header Strip */}
      <div className="h-6 bg-orange-400 w-full"></div>
      
      {/* Header Info */}
      <div className="p-5 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={Testimoni1} alt="Admin" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h4 className="font-bold text-xl text-[#0B0909]">Ghaluh Wizard</h4>
            <p className="text-brand-orange text-sm font-semibold mt-0.5">Admin Support</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors p-2">
          X
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 space-y-6 max-h-112.5 overflow-y-auto bg-white">
        {/* Message Received */}
        <div className="flex gap-3 max-w-[90%]">
          <img src={Testimoni1} alt="Admin avatar" className="w-8 h-8 rounded-full object-cover shrink-0 self-start mt-1" />
          <div className="bg-[#F5F5F5] p-4 rounded-2xl rounded-tl-none text-[15px] text-[#4F5665] leading-relaxed shadow-sm">
            Halo, Ada yang bisa kami bantu?
          </div>
        </div>

        {/* Message Sent */}
        <div className="flex justify-end">
          <div className="bg-[#F8F8F8] p-4 rounded-2xl rounded-tr-none text-[15px] text-[#4F5665] leading-relaxed shadow-sm max-w-[85%] border border-gray-100">
            Saya kesulitan mencari kopi
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-50 flex items-center gap-4">
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Masukan Pesan Anda" 
            className="w-full bg-white border border-gray rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-brand-orange/10 border-gray-100 transition-all placeholder:text-gray-400"
          />
        </div>
        <button className="bg-brand-orange p-3.5 rounded-xl shadow-lg shadow-brand-orange/30 hover:scale-105 active:scale-95 transition-all group shrink-0">
         <img src={Send} alt="Send Icon" />
        </button>
      </div>
    </div>
  );
}
