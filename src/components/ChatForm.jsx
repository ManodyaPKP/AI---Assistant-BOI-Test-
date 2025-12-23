import { useRef, useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = () => {
    if (isGenerating) return;

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);
    setIsGenerating(true);

    setTimeout(() => {
      setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }
      ]).finally(() => {
        setIsGenerating(false);
      });
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-slate-50 to-orange-50/30 border-t border-orange-100/50">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        onKeyDown={handleKeyDown}
        className="flex-1 px-5 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-slate-400 hover:bg-white"
        disabled={isGenerating}
      />
      <button
        onClick={handleSubmit}
        disabled={isGenerating}
        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
};

export default ChatForm;