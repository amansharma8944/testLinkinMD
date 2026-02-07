import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { saveMessage } from '@/actions/chat';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // Save user message
  if (lastMessage?.role === 'user') {
    await saveMessage('user', lastMessage.content);
  }

  const result = await generateText({
    model: google("gemini-2.5-flash"),
    messages,
  });

  // Save assistant response
  await saveMessage('assistant', result.text);

  return Response.json({ text: result.text });
}