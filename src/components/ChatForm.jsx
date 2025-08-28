import { useRef, useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false); // prevent duplicate calls

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isGenerating) return; // stop if already waiting for response

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleFormSubmit(e);
    }
  };
  
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Add user message
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    setIsGenerating(true); // lock until response arrives

    setTimeout(() => {
      // Show "Thinking..."
      setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);

      // Call API ONCE
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }
      ]).finally(() => {
        setIsGenerating(false); // unlock after response
      });

    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Write Message..."
        className="message-input"
        required
      />
      <button className="material-symbols-rounded" disabled={isGenerating}>
        send
      </button>
    </form>
  );
};

export default ChatForm;
