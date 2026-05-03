import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Trash2, Loader2, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { askCivicAssistant } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface CivicChatHandle {
  askQuestion: (question: string) => void;
}

export const CivicChat = React.forwardRef<CivicChatHandle>((_, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'I am the Indian Civic Assistant v1.0. I can help you with NVSP registration, EPIC card queries, or finding your polling booth. How can I help you navigate Indian democracy today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const processQuery = async (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }));
      const response = await askCivicAssistant(query, history);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useImperativeHandle(ref, () => ({
    askQuestion: (question: string) => {
      processQuery(question);
    }
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const query = input;
    setInput('');
    await processQuery(query);
  };

  return (
    <div className="flex flex-col h-[600px] w-full bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="chat-widget">
      {/* Header */}
      <div className="px-6 py-4 bg-black text-white flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-3">
          <div className="p-1 bg-red-600">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-sans font-black uppercase tracking-tighter text-xl italic">AI_TERMINAL</h3>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="hover:text-red-600 transition-colors uppercase text-[10px] font-black tracking-widest border border-white/20 px-2 py-1"
        >
          RESET
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className="shrink-0 pt-1">
                 <span className="font-black text-2xl uppercase">{message.role === 'user' ? 'Q:' : 'A:'}</span>
              </div>
              <div className={`p-5 border-4 border-black ${
                message.role === 'user' 
                ? 'bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-white shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] border-l-8'
              }`}>
                <div className="markdown-body font-bold text-lg leading-tight uppercase tracking-tight">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex gap-4 items-center animate-pulse">
            <span className="font-black text-2xl uppercase">A:</span>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-red-600" />
              <div className="w-4 h-4 bg-black" />
              <div className="w-4 h-4 bg-slate-200" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 border-t-4 border-black bg-slate-50">
        <div className="flex border-4 border-black bg-white group focus-within:ring-4 focus-within:ring-red-600/20 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="INPUT COMMAND OR QUESTION..."
            aria-label="Type your question for the Civic Assistant"
            className="flex-1 p-4 text-xl font-black uppercase placeholder-slate-300 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className={`px-8 font-black text-xl transition-all border-l-4 border-black ${
              input.trim() && !isLoading ? 'bg-black text-white hover:bg-red-600' : 'text-slate-400 bg-slate-100'
            }`}
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
});

