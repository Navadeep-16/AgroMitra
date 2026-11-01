import React, { useState, useRef, useEffect } from 'react';
import { AIChatMessage } from '../../types/ai';
import { AgroMitraAIAssistant } from '../../services/aiService';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  Sparkles, 
  User as UserIcon, 
  ShieldAlert, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';

interface AIAssistantChatProps {
  onNavigateAction?: (actionKey: string) => void;
}

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ onNavigateAction }) => {
  const { t, language } = useLanguage();
  const { showToast } = useNotification();
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: language === 'te' 
        ? 'నమస్కారం! నేను మీ అగ్రోమిత్ర AI సహాయకుడిని. మీ పంటల ఎదుగుదల, చీడపీడలు, ఎరువులు మరియు వాతావరణం గురించి ఏదైనా అడగవచ్చు.'
        : 'Welcome! I am your AgroMitra AI agricultural assistant. How can I help with your crops, pests, fertilizers, soil health, or weather conditions today?',
      timestamp: 'Just now',
      language: language === 'te' ? 'te' : 'en',
      suggestedActions: [
        { label: 'Check Weather Alert', actionKey: 'weather' },
        { label: 'Scan Leaf Photo', actionKey: 'disease' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    language === 'te' ? 'నల్లరేగడి నేలకు ఏ పంటలు అనుకూలం?' : 'What crop is suitable for black soil?',
    language === 'te' ? 'ఆకులు పసుపు రంగులోకి ఎందుకు మారుతున్నాయి?' : 'Why are my leaves turning yellow?',
    language === 'te' ? 'DAP మరియు NPK ఎరువుల మధ్య తేడా ఏమిటి?' : 'What is the difference between DAP and NPK?',
    language === 'te' ? 'నీటి తడులు ఇచ్చే ముందు ఏమి పరిశీలించాలి?' : 'What should I check before irrigation?',
    language === 'te' ? 'భూసారాన్ని ఎలా పెంచుకోవాలి?' : 'How can I improve soil health?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() && !attachedImage) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: language === 'te' ? 'te' : 'en',
      imageAttached: attachedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachedImage(null);

    // AI response simulation with natural cadence
    setTimeout(() => {
      const response = AgroMitraAIAssistant.getResponse(textToSend, language === 'te' ? 'te' : 'en');
      setMessages(prev => [...prev, response]);
    }, 600);
  };

  // Voice Input Simulation / Web Speech API
  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      showToast('info', 'Voice Input Simulation', 'Voice recognition simulated: Asking about crop suitability.');
      setInput(language === 'te' ? 'నల్లరేగడి నేలకు ఏ పంటలు అనుకూలం?' : 'What crop is suitable for black soil?');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
      recognition.interimResults = false;

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        showToast('info', 'Listening...', 'Speak your farming question now.');

        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          setInput(speechResult);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          showToast('error', 'Voice Input Unavailable', 'Please type your question directly.');
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        setIsListening(false);
        recognition.stop();
      }
    } catch {
      setIsListening(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: language === 'te' 
          ? 'చర్చ వివరాలు రీసెట్ చేయబడ్డాయి. కొత్త ప్రశ్న అడగండి.'
          : 'Conversation cleared. How can I assist with your farm today?',
        timestamp: 'Just now',
        language: language === 'te' ? 'te' : 'en'
      }
    ]);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[700px] overflow-hidden">
      {/* Header */}
      <div className="p-4 px-6 border-b border-slate-200 bg-emerald-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center text-white shadow-md">
            <Bot className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <span>🌾 {t('aiAssistantTitle')}</span>
              <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                v2.4 Agronomy
              </span>
            </h3>
            <p className="text-xs text-emerald-200">{t('aiAssistantSubtitle')}</p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800 rounded-xl transition"
          title="Clear Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto whitespace-nowrap flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 pl-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          {t('suggestedQuestions')}:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1 text-xs rounded-full bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-800 hover:bg-emerald-50/50 transition shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isUser ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
              }`}>
                {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-800" />}
              </div>

              {/* Message Bubble */}
              <div className={`space-y-2 ${isUser ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-tr-xs shadow-sm'
                      : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200 shadow-xs'
                  }`}
                >
                  {msg.imageAttached && (
                    <img
                      src={msg.imageAttached}
                      alt="Attached Field"
                      className="w-48 h-32 object-cover rounded-xl mb-2 border border-white/20"
                    />
                  )}
                  <div className="whitespace-pre-line font-normal">{msg.text}</div>
                </div>

                {/* Suggested Action buttons on assistant message */}
                {msg.suggestedActions && onNavigateAction && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => onNavigateAction(act.actionKey)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-semibold bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Safety Notice Footer Strip */}
      <div className="px-4 py-1.5 bg-amber-50/70 border-t border-amber-200 text-[10px] text-amber-900 flex items-center justify-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>AgroMitra AI provides educational guidance. For statutory pesticide advice, consult registered labels & local agronomists.</span>
      </div>

      {/* Input Composer */}
      <div className="p-4 bg-white border-t border-slate-200">
        {attachedImage && (
          <div className="flex items-center gap-2 mb-2 p-2 bg-slate-100 rounded-xl max-w-xs">
            <img src={attachedImage} alt="Attachment" className="w-10 h-10 object-cover rounded-lg" />
            <span className="text-xs text-slate-600 truncate flex-1">Image attached</span>
            <button onClick={() => setAttachedImage(null)} className="text-xs text-red-500 font-bold px-1.5">
              ×
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Attach Image button */}
          <label className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition cursor-pointer" title="Attach Leaf/Field Image">
            <ImageIcon className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setAttachedImage(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>

          {/* Voice input button */}
          <button
            onClick={handleVoiceToggle}
            className={`p-2.5 rounded-xl border transition ${
              isListening
                ? 'bg-rose-100 border-rose-400 text-rose-700 animate-pulse'
                : 'border-slate-200 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
            }`}
            title={t('voiceInput')}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            placeholder={t('typeYourQuestion')}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />

          {/* Send CTA */}
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() && !attachedImage}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition disabled:opacity-40"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

