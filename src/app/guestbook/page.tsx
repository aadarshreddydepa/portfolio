"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Quote, Send } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

// --- Types ---
interface Message {
  id: string;
  name: string;
  avatar: string; // URL or Initials
  text: string;
  date: string;
  gradient: string;
}

// --- Data ---
const initialMessages: Message[] = [
  {
    id: "1",
    name: "Suhas R G",
    avatar: "https://i.pravatar.cc/150?u=suhas",
    text: "cool af",
    date: "Dec 8 • about 19 h ago",
    gradient: "from-blue-600 to-indigo-900",
  },
  {
    id: "2",
    name: "Waruna Udara",
    avatar: "https://i.pravatar.cc/150?u=waruna",
    text: "Amazing man",
    date: "Dec 6 • 2 d ago",
    gradient: "from-blue-500 to-blue-900",
  },
  {
    id: "3",
    name: "Gaurav Patil",
    avatar: "https://i.pravatar.cc/150?u=gaurav",
    text: "Amazing !! Loved the way you designed & Implemented the website.",
    date: "Dec 5 • 3 d ago",
    gradient: "from-cyan-600 to-teal-800",
  },
  {
    id: "4",
    name: "Krish Bedi",
    avatar: "https://i.pravatar.cc/150?u=krish",
    text: "Best personal website I've ever seen in my life!",
    date: "Dec 2 • 6 d ago",
    gradient: "from-purple-600 to-indigo-900",
  },
  {
    id: "5",
    name: "Maximiliam",
    avatar: "https://i.pravatar.cc/150?u=max",
    text: "Amazing portfolio!",
    date: "Dec 2 • 7 d ago",
    gradient: "from-sky-700 to-blue-900",
  },
];

const gradients = [
  "from-pink-600 to-rose-900",
  "from-purple-600 to-indigo-900",
  "from-blue-600 to-cyan-900",
  "from-emerald-600 to-teal-900",
  "from-orange-600 to-red-900",
];

// --- Components ---

const Tape = () => (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-8 bg-white/10 backdrop-blur-md shadow-sm border-l border-r border-white/20 rotate-[-2deg] z-10" />
);

const MessageCard = ({ msg }: { msg: Message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${msg.gradient} shadow-xl border border-white/10 overflow-hidden min-h-[220px] flex flex-col justify-between group`}
    >
      {/* Tape Effect */}
      <Tape />

      {/* Quote Icon BG */}
      <Quote className="absolute top-4 left-4 text-white/5 w-24 h-24 -z-0 rotate-12" />

      {/* Content */}
      <div className="relative z-10">
        <Quote className="w-6 h-6 text-white/40 mb-2 rotate-180" />
        <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed font-serif">
          {msg.text}
        </p>
      </div>

      {/* User Info */}
      <div className="relative z-10 flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-black/20">
          <Image
            src={msg.avatar}
            alt={msg.name}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{msg.name}</h4>
          <p className="text-[10px] text-white/50">{msg.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

const AddMessageCard = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="relative p-8 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer min-h-[220px] flex flex-col items-center justify-center text-center gap-4 group"
  >
    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
      <Plus className="text-white/60 group-hover:text-white" />
    </div>
    <div>
      <h3 className="text-xl font-serif text-white/80 italic mb-2">
        "Join the wall..."
      </h3>
      <p className="text-xs text-white/40 max-w-[200px] mx-auto">
        Sign in to pin your message to this board forever.
      </p>
    </div>
    <button className="px-6 py-2 bg-white text-black font-semibold text-sm rounded-full mt-2 hover:bg-gray-200 transition-colors flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      Write a message...
    </button>
  </motion.div>
);

const MessageModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string, name: string) => void;
}) => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-serif text-white mb-6">Leave a Message</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">
              Message
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
            />
          </div>

          <button
            onClick={() => onSubmit(text, name)}
            disabled={!text || !name}
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Post Message
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMessage = (text: string, name: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      name: name,
      avatar: `https://i.pravatar.cc/150?u=${name}`, // Generate avatar based on name
      text: text,
      date: "Just now",
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
    };

    // Add to the START of the list
    setMessages([newMessage, ...messages]);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
            The Community Wall
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white">
            Leave{" "}
            <span className="italic bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent px-2">
              Your Mark
            </span>
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Button - Always First */}
          <AddMessageCard onClick={() => setIsModalOpen(true)} />

          {/* Message Cards */}
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <MessageCard key={msg.id} msg={msg} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <MessageModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddMessage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
