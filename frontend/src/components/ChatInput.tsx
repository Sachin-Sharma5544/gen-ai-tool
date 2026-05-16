// components/ChatInput.tsx

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

const ChatInput = ({ value, onChange, onSend }: Props) => {
  return (
    <div className="flex gap-2 border-t p-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask anything..."
        className="flex-1 rounded-xl border px-4 py-3 outline-none"
      />

      <button
        onClick={onSend}
        className="rounded-xl bg-black px-5 py-3 text-white"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;