import { UserButton } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useSocketStore } from "../lib/socket";
import { useSocketConnection } from "../hooks/useSocketConnection";
import { SparklesIcon, MessageSquareIcon, PlusIcon } from "lucide-react";

import { useChats, useGetOrCreateChat } from "../hooks/useChats";
import { useMessages } from "../hooks/useMessages";
import { ChatListItem } from "../components/ChatListItem";
import { ChatHeader } from "../components/ChatHeader";
import { MessageBubble } from "../components/MessageBubble";
import { ChatInput } from "../components/ChatInput";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { NewChatModal } from "../components/NewChatModal";

// this code can be a lot cleaner, but here we try to keep it simple yet working
// feel free to refactor it as you wish ✨
function ChatPage() {
  const { data: currentUser } = useCurrentUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeChatId = searchParams.get("chat");

  const [messageInput, setMessageInput] = useState("");
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { socket, setTyping, sendMessage } = useSocketStore();

  useSocketConnection();

  const { data: chats = [], isLoading: chatsLoading } = useChats();
  const { data: messages = [], isLoading: messagesLoading } =
    useMessages(activeChatId);
  const startChatMutation = useGetOrCreateChat();

  // scroll to bottom when chat or messages changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, messages]);

  const handleStartChat = (participantId) => {
    startChatMutation.mutate(participantId, {
      onSuccess: (chat) => setSearchParams({ chat: chat._id }),
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatId || !socket || !currentUser)
      return;

    const text = messageInput.trim();
    sendMessage(activeChatId, text, currentUser);
    setMessageInput("");
    setTyping(activeChatId, false);
  };

  const handleTyping = (e) => {
    setMessageInput(e.target.value);
    if (!activeChatId) return;

    setTyping(activeChatId, true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(activeChatId, false);
    }, 2000);
  };

  const activeChat = chats.find((c) => c._id === activeChatId);

  return (
    <div className="flex h-screen bg-base-100 text-base-content">
      {/* Sidebar */}
      <div className="flex flex-col border-r w-80 border-base-300 bg-base-200">
        {/* HEADER */}
        <div className="p-4 border-b border-base-300">
          <div className="flex items-center justify-between mb-4">
            <Link to="/chat" className="flex items-center gap-2">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-amber-400 to-orange-500"
              >
                <SparklesIcon className="w-4 h-4 text-primary-content" />
              </div>
              <span className="font-bold">Whisper</span>
            </Link>
            <UserButton />
          </div>
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="gap-2 border-none btn btn-primary btn-block rounded-xl bg-linear-to-r from-amber-500 to-orange-500"
          >
            <PlusIcon className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* chat list */}
        <div className="flex-1 overflow-y-auto">
          {chatsLoading && (
            <div className="flex items-center justify-center py-8">
              <span className="loading loading-spinner loading-sm text-amber-400" />
            </div>
          )}

          {chats.length === 0 && !chatsLoading && <NoConversationsUI />}

          <div className="flex flex-col gap-1">
            {chats.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                isActive={activeChatId === chat._id}
                onClick={() => setSearchParams({ chat: chat._id })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* main chat area */}
      <div className="flex flex-col flex-1">
        {activeChatId && activeChat ? (
          <>
            <ChatHeader
              participant={activeChat.participant}
              chatId={activeChatId}
            />

            {/* messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {messagesLoading && (
                <div className="flex items-center justify-center h-full">
                  <span className="loading loading-spinner loading-md text-amber-400" />
                </div>
              )}

              {messages.length === 0 && !messagesLoading && <NoMessagesUI />}

              {messages.length > 0 &&
                messages.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    message={msg}
                    currentUser={currentUser}
                  />
                ))}

              <div ref={messagesEndRef} />
            </div>

            <ChatInput
              value={messageInput}
              onChange={handleTyping}
              onSubmit={handleSend}
              disabled={!messageInput.trim()}
            />
          </>
        ) : (
          <NoChatSelectedUI />
        )}
      </div>

      <NewChatModal
        onStartChat={handleStartChat}
        isPending={startChatMutation.isPending}
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
      />
    </div>
  );
}
export default ChatPage;

function NoConversationsUI() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <MessageSquareIcon className="w-10 h-10 mb-3 text-amber-400" />
      <p className="text-sm text-base-content/70">No conversations yet</p>
      <p className="mt-1 text-xs text-base-content/60">
        Start a new chat to begin
      </p>
    </div>
  );
}

function NoMessagesUI() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-base-300/40">
        <MessageSquareIcon className="w-8 h-8 text-base-content/20" />
      </div>
      <p className="text-base-content/70">No messages yet</p>
      <p className="mt-1 text-sm text-base-content/60">
        Send a message to start the conversation
      </p>
    </div>
  );
}

function NoChatSelectedUI() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center">
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-linear-to-br from-amber-500/20 to-orange-500/20">
        <MessageSquareIcon className="w-10 h-10 text-amber-400" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">Welcome to Whisper</h2>
      <p className="max-w-sm text-base-content/70">
        Select a conversation from the sidebar or start a new chat to begin
        messaging
      </p>
    </div>
  );
}
