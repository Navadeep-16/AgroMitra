import React, { useState } from 'react';
import { ExpertConsultation } from '../../types/market';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  MessageSquareText, 
  Send, 
  UploadCloud, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Image as ImageIcon 
} from 'lucide-react';

interface AskExpertViewProps {
  consultations: ExpertConsultation[];
  onAskQuestion: (consultation: ExpertConsultation) => void;
  prefilledCrop?: string;
  prefilledQuestion?: string;
  prefilledImage?: string;
}

export const AskExpertView: React.FC<AskExpertViewProps> = ({
  consultations,
  onAskQuestion,
  prefilledCrop = 'Cotton',
  prefilledQuestion = '',
  prefilledImage
}) => {
  const { t, language } = useLanguage();
  const { showToast } = useNotification();

  const [crop, setCrop] = useState(prefilledCrop);
  const [category, setCategory] = useState<ExpertConsultation['issueCategory']>('Pest / Disease');
  const [question, setQuestion] = useState(prefilledQuestion);
  const [imageUrl, setImageUrl] = useState<string | null>(prefilledImage || null);
  const [selectedConsultation, setSelectedConsultation] = useState<ExpertConsultation>(consultations[0] || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      showToast('error', 'Please enter your question');
      return;
    }

    const newConsultation: ExpertConsultation = {
      id: `consult-${Date.now()}`,
      farmerId: 'user-farmer-1',
      farmerName: 'Ramesh Kumar',
      farmerPhone: '+91 98480 12345',
      farmerLocation: 'Narsampet, Warangal',
      crop,
      cropTe: crop === 'Cotton' ? 'పత్తి' : crop === 'Chilli' ? 'మిరప' : 'వరి',
      issueCategory: category,
      question,
      imageUrl: imageUrl || undefined,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    onAskQuestion(newConsultation);
    showToast('success', 'Consultation Request Sent', 'Submitted to Krishi Vigyan Kendra scientists.');
    setQuestion('');
    setImageUrl(null);
    setSelectedConsultation(newConsultation);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <GraduationCap className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">{t('askExpert')}</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Direct consultation with Ph.D. Agronomists and Krishi Vigyan Kendra (KVK) certified crop scientists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Submission Form */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Submit New Field Query
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Affected Crop
              </label>
              <select
                value={crop}
                onChange={e => setCrop(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl"
              >
                <option value="Cotton">Cotton (Bollgard II)</option>
                <option value="Chilli">Chilli (Teja Hot)</option>
                <option value="Paddy">Paddy / Rice (Samba Masuri)</option>
                <option value="Maize">Maize (Hybrid)</option>
                <option value="Groundnut">Groundnut</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issue Classification
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ExpertConsultation['issueCategory'])}
                className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl"
              >
                <option value="Pest / Disease">Pest Attack / Disease Symptoms</option>
                <option value="Nutrient Deficiency">Nutrient Deficiency / Leaf Yellowing</option>
                <option value="Irrigation / Weather">Irrigation & Weather Stress</option>
                <option value="Yield & Harvesting">Yield Optimization & Harvesting</option>
                <option value="Seed Selection">Seed Variety Selection</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Detailed Observation
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe leaf symptoms, days since sowing, fertilizers applied..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl leading-relaxed"
              />
            </div>

            {/* Optional Image Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Attach Leaf / Crop Photo (Optional)
              </label>
              {imageUrl ? (
                <div className="relative rounded-xl overflow-hidden h-32 border border-slate-300">
                  <img src={imageUrl} alt="Attached" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl(null)}
                    className="absolute top-2 right-2 px-2 py-0.5 text-xs bg-black/70 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition text-center">
                  <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs text-slate-600 font-semibold">Upload Photo</span>
                  <span className="text-[10px] text-slate-400">JPG or PNG</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setImageUrl(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Query to Agronomist</span>
            </button>
          </form>
        </div>

        {/* Right Col: Consultation History & Answers */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Consultation Inquiries & Official Responses
          </h3>

          <div className="space-y-4">
            {consultations.map(consult => (
              <div
                key={consult.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs"
              >
                {/* Query Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {consult.crop}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-600 font-semibold">{consult.issueCategory}</span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium mt-2 leading-relaxed">
                      "{consult.question}"
                    </p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                    consult.status === 'Answered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {consult.status}
                  </span>
                </div>

                {consult.imageUrl && (
                  <img
                    src={consult.imageUrl}
                    alt="Consultation Attachment"
                    className="w-36 h-24 object-cover rounded-xl border border-slate-200"
                  />
                )}

                {/* Expert Official Response */}
                {consult.expertResponse && (
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5 text-xs text-emerald-950">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-700" />
                        <div>
                          <strong className="text-slate-900 block">{consult.expertResponse.expertName}</strong>
                          <span className="text-[10px] text-slate-500">{consult.expertResponse.expertTitle}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(consult.expertResponse.responseDate).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="font-semibold text-slate-800">
                      {consult.expertResponse.diagnosisSummary}
                    </p>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                        Scientific Management Protocol:
                      </span>
                      <ul className="space-y-1 text-slate-700">
                        {consult.expertResponse.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-emerald-100/80 text-[11px] text-emerald-900 italic">
                      Preventive note: {consult.expertResponse.preventiveGuidance}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

