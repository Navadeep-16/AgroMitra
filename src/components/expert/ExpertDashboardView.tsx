import React, { useState } from 'react';
import { ExpertConsultation } from '../../types/market';
import { storage } from '../../services/storage';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Send, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface ExpertDashboardViewProps {
  consultations: ExpertConsultation[];
  onRefreshData: () => void;
}

export const ExpertDashboardView: React.FC<ExpertDashboardViewProps> = ({ 
  consultations, 
  onRefreshData 
}) => {
  const { t, language } = useLanguage();
  const { showToast } = useNotification();
  const [selectedConsultation, setSelectedConsultation] = useState<ExpertConsultation>(consultations[0] || null);

  // Response form
  const [diagnosisSummary, setDiagnosisSummary] = useState('');
  const [rec1, setRec1] = useState('');
  const [rec2, setRec2] = useState('');
  const [preventiveGuidance, setPreventiveGuidance] = useState('');

  const pendingList = consultations.filter(c => c.status === 'Pending');
  const answeredList = consultations.filter(c => c.status === 'Answered');

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConsultation || !diagnosisSummary.trim()) {
      showToast('error', 'Please provide diagnosis summary');
      return;
    }

    const expertResponse = {
      expertId: 'user-expert-1',
      expertName: 'Dr. K. Srinivas Rao, Ph.D.',
      expertTitle: 'Senior Agronomist, Krishi Vigyan Kendra',
      responseDate: new Date().toISOString(),
      diagnosisSummary,
      recommendations: [rec1 || 'Follow approved pesticide label rates.', rec2 || 'Maintain balanced nutrition.'],
      preventiveGuidance: preventiveGuidance || 'Clear weed hosts around field bunds.'
    };

    storage.answerConsultation(selectedConsultation.id, expertResponse);
    onRefreshData();
    showToast('success', 'Guidance Dispatched', 'Response successfully transmitted to farmer.');
    setDiagnosisSummary('');
    setRec1('');
    setRec2('');
    setPreventiveGuidance('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Dr. K. Srinivas Rao, Ph.D. — Krishi Expert Portal
              </h2>
              <p className="text-xs text-slate-500">
                Senior Agronomist • Krishi Vigyan Kendra (KVK) • Consultations Completed: 438
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800">
            {pendingList.length} Inquiries Pending
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800">
            {answeredList.length} Resolved
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Requests Queue */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Farmer Advisory Queue
          </span>

          <div className="space-y-3">
            {consultations.map(c => {
              const isSelected = selectedConsultation?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedConsultation(c)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{c.farmerName}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      c.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-2">"{c.question}"</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span className="text-emerald-700 font-semibold">{c.crop} • {c.issueCategory}</span>
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Inspection & Scientific Advisory Response */}
        {selectedConsultation && (
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full">
                Case Details
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {selectedConsultation.crop} Consultation — {selectedConsultation.farmerName}
              </h3>
              <p className="text-xs text-slate-500">
                Location: {selectedConsultation.farmerLocation} • Contact: {selectedConsultation.farmerPhone}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Farmer's Query & Observations
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                "{selectedConsultation.question}"
              </p>

              {selectedConsultation.imageUrl && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Uploaded Specimen Photo
                  </span>
                  <img
                    src={selectedConsultation.imageUrl}
                    alt="Field Specimen"
                    className="w-full max-h-60 object-cover rounded-xl border border-slate-200"
                  />
                </div>
              )}
            </div>

            {/* Answer Input or Previous Answer View */}
            {selectedConsultation.status === 'Answered' && selectedConsultation.expertResponse ? (
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-3 text-xs">
                <span className="font-bold text-emerald-950 block text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Official Diagnosis Already Issued
                </span>
                <p className="text-slate-800 font-medium">
                  {selectedConsultation.expertResponse.diagnosisSummary}
                </p>
                <ul className="space-y-1 text-slate-700">
                  {selectedConsultation.expertResponse.recommendations.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <form onSubmit={handleSendResponse} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Issue Official Agronomic Advice
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Diagnostic Pathology / Nutrient Summary
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Sucking pest damage coupled with early fungal leaf spot..."
                    value={diagnosisSummary}
                    onChange={e => setDiagnosisSummary(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Recommended Interventions (Cultural & Spray)
                  </label>
                  <input
                    type="text"
                    placeholder="Step 1: e.g. Yellow sticky traps @ 20/acre"
                    value={rec1}
                    onChange={e => setRec1(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Step 2: e.g. Foliar spray 19:19:19 @ 5g/L early morning"
                    value={rec2}
                    onChange={e => setRec2(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Long-Term Preventive Recommendation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ensure border weed sanitation..."
                    value={preventiveGuidance}
                    onChange={e => setPreventiveGuidance(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Diagnostic Advice to Farmer</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

