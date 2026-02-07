import { getChatHistory } from "@/actions/chat";
import Chat from "@/components/chat/Chat";

export default async function ChatPage() {
  const initialMessages = await getChatHistory();

  return <Chat initialMessages={initialMessages} />;
}
