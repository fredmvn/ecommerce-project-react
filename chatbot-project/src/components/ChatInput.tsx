import { useEffect, useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";

type ChatInputProps = {
  chatMessages: ChatMessages[];
  setChatMessages: (messages: ChatMessages[]) => void;
};

type ChatMessages = {
  id: string;
  message: string;
  sender: "user" | "robot";
  loading?: boolean;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Chatbot.addResponses({
      Hola: "¿Cómo puedo ayudarte hoy? Recuerda que mis respuestas están en su mayoría en inglés.",
      "Qué día es hoy?": "Para saber qué día es hoy, revisa el calendario.",
      Gracias: "De nada. ¡Estoy aquí para ayudar!",
      "Cuanto es 4 + 4": "No soy una calculadora, busca en Google.",
      "Por qué das respuestas tan obvias e inutiles?":
        "Porque fui programado así. Pregunta algo más interesante.",
      "Te reemplazaré por otra IA":
        "¡Buena suerte con eso! Hay muchas IAs por ahí, pero ninguna como yo.",
    });
  }, []);

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText === "" || isLoading) return;

    const newChatMessages: ChatMessages[] = [
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
        size={30}
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
