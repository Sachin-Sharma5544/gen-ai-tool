// components/ChatWindow.tsx

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import axios from "axios"

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

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = input;

  setMessages((prev) => [
    ...prev,
    {
      text: userMessage,
      isUser: true,
    },
  ]);

  setInput("");

  try {
    const response = await axios.post(
      "http://localhost:3001/chat",
      {
        message: userMessage,
      }
    );

    setMessages((prev) => [
      ...prev,
      {
        text: response.data.data,
        isUser: false,
      },
    ]);
  } catch (error) {
    console.error(error);
  }
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