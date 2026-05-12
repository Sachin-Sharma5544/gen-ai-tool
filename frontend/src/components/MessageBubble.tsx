// components/MessageBubble.tsx

type Props = {
  message: string;
  isUser?: boolean;
};

const MessageBubble = ({ message, isUser }: Props) => {
  return (
    <div
      className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm
      ${
        isUser
          ? "ml-auto bg-black text-white"
          : "mr-auto bg-gray-200 text-black"
      }`}
    >
      {message}
    </div>
  );
};

export default MessageBubble;