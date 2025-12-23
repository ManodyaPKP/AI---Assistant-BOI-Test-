import ChatbotIcon from "./ChatbotIcon";
import tailwindConfig from "../../tailwind.config";

const ChatMessage = ({ chat }) => {
  if (chat.hideInChat) return null;
  
  const isBot = chat.role === "model";
  const isError = chat.isError;
  
  return (
    <div className={`flex gap-3 ${isBot ? 'items-start' : 'items-end flex-col'} animate-fadeIn`}>
      {isBot && (
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-2 shadow-lg">
          <ChatbotIcon />
        </div>
      )}
      <div
        className={`max-w-[85%] px-5 py-3 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl ${
          isBot
            ? 'bg-gradient-to-br from-white to-slate-50 text-slate-800 rounded-tl-md border border-slate-100'
            : 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white rounded-br-md ml-auto'
        } ${isError ? 'bg-gradient-to-br from-red-50 to-red-100 text-red-700 border-2 border-red-300' : ''}`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-line">{chat.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;