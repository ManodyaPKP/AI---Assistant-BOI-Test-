import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { formattedCompanyInfo } from "./companyinfo";


const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: formattedCompanyInfo
    }
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const clearChatHistory = () => {
    setChatHistory([
      {
        hideInChat: true,
        role: "model",
        text: formattedCompanyInfo  
      }
    ]);
  };

  const generateBotResponse = async (history) => {  
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text, isError }]);
    }

    history = history.map(({role, text}) => ({role, parts: [{text: String(text)}]}));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
      console.error("Error generating bot response:", error);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(prev => !prev)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 flex items-center justify-center z-50 group hover:scale-110 ${
          showChatbot ? 'scale-95' : ''
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-red-600 blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
        {showChatbot ? (
          <svg className="w-7 h-7 relative z-10 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="w-8 h-8 relative z-10">
            <ChatbotIcon />
          </div>
        )}
      </button>

      {/* Chatbot Popup */}
      <div
        className={`fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 z-40 border border-white/20 ${
          showChatbot ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        style={{ transformOrigin: 'bottom right', maxHeight: '650px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-5 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-2 shadow-lg">
              <ChatbotIcon />
            </div>
            <div>
              <h3 className="text-white font-bold text-base tracking-wide">Help Desk Assistant</h3>
              <p className="text-orange-200 text-xs font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Board of Investment Sri Lanka
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={clearChatHistory}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-orange-500/30 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10"
              title="Clear conversation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={() => setShowChatbot(false)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-orange-500/30 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10"
              title="Minimize"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="h-[450px] overflow-y-auto p-5 bg-gradient-to-b from-slate-50 via-white to-orange-50/30 space-y-4"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#f97316 #f1f5f9' }}
        >
          {/* Welcome Message */}
          <div className="flex gap-3 items-start animate-fadeIn">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-2 shadow-lg">
              <ChatbotIcon />
            </div>
            <div className="max-w-[85%] px-5 py-4 bg-gradient-to-br from-white to-orange-50/50 rounded-3xl rounded-tl-md shadow-lg border border-orange-100/50">
              <p className="text-sm text-slate-800 leading-relaxed">
                <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Hello! 👋</span><br />
                <span className="text-slate-700">Welcome to the</span> <strong className="text-slate-900">Board of Investment of Sri Lanka</strong>
              </p>
              <div className="mt-3 pt-3 border-t border-orange-100">
                <p className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">Virtual Help Desk</p>
                <p className="text-xs text-slate-600">How can I assist you today?</p>
              </div>
            </div>
          </div>

          {/* Chat History */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chat Footer */}
        <ChatForm
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          generateBotResponse={generateBotResponse}
        />
      </div>
    </div>
  );
};

export default App;