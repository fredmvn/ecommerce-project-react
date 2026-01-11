import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/pfp.jpg";
import LoadingMessageGif from "../assets/loading-spinner.gif";
import dayjs from "dayjs";
import "./ChatMessage.css";

type ChatMessageProps = {
  sender: "user" | "robot";
  message: string;
  loading?: boolean;
};

export function ChatMessage({ sender, message, loading }: ChatMessageProps) {
  const time = dayjs().valueOf();
  const formattedTime = dayjs(time).format("h:mma");

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
        {loading && <img src={LoadingMessageGif} className="loading-gif" />}
        {!loading && <span className="chat-message-time">{formattedTime}</span>}
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
