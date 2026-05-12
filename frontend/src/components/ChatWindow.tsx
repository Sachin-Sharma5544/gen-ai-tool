// components/ChatWindow.tsx

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

type Message = {
  text: string;
  isUser: boolean;
};

const ChatWindow = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello 👋",
      isUser: false,
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        text: input,
        isUser: true,
      },
      {
        text: "AI response placeholder",
        isUser: false,
      },
    ]);

    setInput("");
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg.text}
            isUser={msg.isUser}
          />
        ))}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatWindow;