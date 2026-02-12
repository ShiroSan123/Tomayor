import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2, Newspaper, Calendar, ShoppingBag, Bus, Bell, HelpCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

const quickActions = [
  { icon: Newspaper, label: 'Что нового?', prompt: 'Покажи последние важные новости и кратко расскажи о них' },
  { icon: Calendar, label: 'События', prompt: 'Какие интересные события запланированы на ближайшую неделю?' },
  { icon: Bus, label: 'Транспорт', prompt: 'Какая сейчас загруженность транспорта и очереди на переправах?' },
  { icon: ShoppingBag, label: 'Товары', prompt: 'Порекомендуй свежие местные продукты на рынке' },
  { icon: Bell, label: 'Уведомления', prompt: 'Помоги настроить уведомления — какие есть опции?' },
  { icon: HelpCircle, label: 'Помощь', prompt: 'Что ты умеешь и как можешь помочь?' },
];

export default function AssistantChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && !conversation) {
      initConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const initConversation = async () => {
    const conv = await base44.agents.createConversation({
      agent_name: 'tymer_assistant',
      metadata: { name: 'Чат с ассистентом' }
    });
    setConversation(conv);
  };

  useEffect(() => {
    if (!conversation?.id) return;
    
    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
      const lastMsg = data.messages?.[data.messages.length - 1];
      if (lastMsg?.role === 'assistant' && lastMsg?.content) {
        setIsLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, [conversation?.id]);

  const sendMessage = async (text) => {
    if (!text.trim() || !conversation || isLoading) return;
    
    setInput('');
    setIsLoading(true);
    
    await base44.agents.addMessage(conversation, {
      role: 'user',
      content: text
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (prompt) => {
    sendMessage(prompt);
  };

  const clearChat = async () => {
    setMessages([]);
    setConversation(null);
    await initConversation();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-white rounded-t-[2rem] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">AI-Ассистент</h3>
              <p className="text-xs text-slate-500">Помогу с любым вопросом</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={clearChat} className="rounded-xl">
              <Trash2 className="w-4 h-4 text-slate-400" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">Привет! Я ваш AI-помощник</h4>
                <p className="text-sm text-slate-500">Могу помочь с рекомендациями, прогнозами и объяснениями</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <action.icon className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-slate-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown className="text-sm prose prose-sm prose-slate max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-sm text-slate-500">Думаю...</span>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Спросите что угодно..."
              className="flex-1 h-12 rounded-2xl bg-slate-50 border-0"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}