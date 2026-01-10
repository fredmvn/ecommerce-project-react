import { useEffect, useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Chatbot.addResponses({
      "how tall are you": "It's none of your business.",
      "why are you so mean": "Oh, I can't?",
      "fuck you": "You more.",
      "Cheap ass cleverbot": "Then talk to it, fucking idiot.",
    });
  }, []);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText === "" || isLoading) return;

    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
    ];

    setChatMessages(newChatMessages);

    clearText();

    setChatMessages([
      ...newChatMessages,
      {
        message: "",
        sender: "robot",
        id: crypto.randomUUID(),
        loading: true,
      },
    ]);

    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(inputText);
    setIsLoading(false);

    setChatMessages([
      ...newChatMessages,
      { message: response, sender: "robot", id: crypto.randomUUID() },
    ]);
  }

  function clearText() {
    setInputText("");
  }

  function handleKeyDown(e) {
    const { key } = e;
    if (key === "Enter") sendMessage();
    if (key === "Escape") clearText();
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button className="clear-button" onClick={clearMessages}>
        Clear
      </button>
    </div>
  );
}
