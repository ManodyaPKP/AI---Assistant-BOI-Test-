import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { formattedCompanyInfo } from "./companyinfo";


// Main App Component
const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: formattedCompanyInfo
    }
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatTheme, setChatTheme] = useState("default"); // NEW state
  const chatBodyRef = useRef();

  // Clear chat history
  const clearChatHistory = () => {
    setChatHistory([
      {
        hideInChat: true,
        role: "model",
        text: formattedCompanyInfo  
      }
    ]);
  };

  const toggleTheme = () => {
    setChatTheme(prev => (prev === "default" ? "dark" : "default"));
  };

  const generateBotResponse = async (history) => {  
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text, isError }]);
    };

    history = history.map(({role, text}) => ({role, parts: [{text: String(text)}]}));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    };

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
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [chatHistory]);

  return (
   <div className={`container ${showChatbot ? "show-chatbot" : ""} ${chatTheme}`}>
    <button
      onClick={() => {
        if (showChatbot) {
          clearChatHistory();
        }
        setShowChatbot(prev => !prev);
      }}
      id="chatbot-toggler"
    >
      <span className="material-symbols-rounded">mode_comment</span>
      <span className="material-symbols-rounded">close</span>
    </button>
    
    <div className="chatbot-popup"> 
      {/* Chatbot Header */}
      <div className="chat-header">
        <div className="header-info">
          <ChatbotIcon />
          <h2 className="logo-text">𝙃𝙚𝙡𝙥 𝘿𝙚𝙨𝙠-Assistant</h2>
        </div>
        <div className="header-actions">
          {/* Clear chat history */}
          <button 
            onClick={clearChatHistory}
            className="material-symbols-rounded clear-btn" 
            title="Clear conversation" 
          >
            delete
          </button>

          {/* Toggle Theme Button (NEW) */}
          <button
            onClick={toggleTheme}
            className="material-symbols-rounded theme-btn"
            title="Change theme"
          >
            palette
          </button>

          <button 
            onClick={() => setShowChatbot(prev => !prev)}
            className="material-symbols-rounded"
            title="Hide conversation" 
          >  
            keyboard_arrow_down
          </button> 
        </div>
      </div>

      {/* Chatbot Body */}
      <div ref={chatBodyRef} className="chat-body">
        <div className="message bot-message">
          <ChatbotIcon />
          <p className="message-text">
          𝙃𝙚𝙡𝙡𝙤❗<br /> 𝙒𝙚𝙡𝙘𝙤𝙢𝙚 𝙩𝙤 𝘽𝙤𝙖𝙧𝙙 𝙤𝙛 𝙄𝙣𝙫𝙚𝙨𝙩𝙢𝙚𝙣𝙩 𝙤𝙛 𝙎𝙧𝙞 𝙇𝙖𝙣𝙠𝙖 <br /> <font color ="#E1712B">𝙑𝙞𝙧𝙩𝙪𝙖𝙡 𝙃𝙚𝙡𝙥 𝘿𝙚𝙨𝙠*</font> <br /> <br /> 𝙃𝙤𝙬 𝘾𝙖𝙣 𝙄 𝘼𝙨𝙨𝙞𝙨𝙩 𝙔𝙤𝙪 𝙏𝙤𝙙𝙖𝙮?
          </p>
        </div>

        {/* Render chat history */}
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
         ))}
      </div>

      {/* Chatbot Footer */}
      <div className="chat-footer">
       <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
      </div>
    </div>
  </div>
  );
};

export default App;
