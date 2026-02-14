import React from "react";
import ChatIcon from "../../assets/home/ChatCircleDots.png";
import ChatText from "./ChatText";

const ChatFeature = () => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <>
      <div className="fixed right-6 bottom-6 z-60">
        <img
          src={ChatIcon}
          alt="Chat Icon"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`h-12 w-12 cursor-pointer rounded-full border-2 border-orange-400 bg-orange-400 p-3 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 sm:h-14 sm:w-14 lg:h-16 lg:w-16`}
        />
      </div>
      <ChatText isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatFeature;
