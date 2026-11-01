import React, { useState } from 'react';
import { PlantDiseaseDiagnosis } from '../../types/ai';
import { DiseaseDetectionService } from '../../services/aiService';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  ScanLine, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ShieldAlert, 
  MessageSquare, 
  Camera, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface DiseaseDetectionViewProps {
  onEscalateToExpert?: (crop: string, diagnosisName: string, image?: string) => void;
}

export const DiseaseDetectionView: React.FC<DiseaseDetectionViewProps> = ({ onEscalateToExpert }) => {
  const { t, language } = useLanguage();
  const { showToast } = useNotification();
  const [selectedSample, setSelectedSample] = useState<string>('cotton-leaf-curl');
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<PlantDiseaseDiagnosis | null>(null);
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(null);

  const sampleLeaves = [
    { key: 'cotton-leaf-curl', label: 'Cotton Leaf Curl', crop: 'Cotton', img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=300&auto=format&fit=crop&q=80' },
    { key: 'tomato-early-blight', label: 'Tomato Early Blight', crop: 'Tomato', img: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=300&auto=format&fit=crop&q=80' },
    { key: 'paddy-blast', label: 'Paddy Blast Disease', crop: 'Paddy', img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&auto=format&fit=crop&q=80' },
    { key: 'chilli-anthracnose', label: 'Chilli Fruit Rot & Dieback', crop: 'Chilli', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&auto=format&fit=crop&q=80' },
    { key: 'healthy-cotton', label: 'Healthy Cotton Leaf', crop: 'Cotton', img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&auto=format&fit=crop&q=80' },
  ];

  const handleAnalyze = async (sampleKey?: string) => {
    setAnalyzing(true);
    try {
      const result = await DiseaseDetectionService.analyzeImage(sampleKey || selectedSample);
      setDiagnosis(result);
      showToast('success', 'Analysis Completed', `Identified: ${result.diseaseName} (${result.confidenceScore}%)`);
    } catch {
      showToast('error', 'Analysis failed', 'Unable to complete computer vision scan.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImagePreview(reader.result as string);
        setSelectedSample('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <ScanLine className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">{t('diseaseDetection')}</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Deep learning computer vision trained on over 50,000 certified agricultural plant pathology images.
        </p>
      </div>

      {/* Upload Zone & Samples Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upload Dropzone */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border-2 border-dashed border-emerald-300 rounded-3xl p-6 bg-emerald-50/40 text-center hover:bg-emerald-50/70 transition flex flex-col items-center justify-center min-h-[260px] relative">
            {customImagePreview ? (
              <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-md">
                <img src={customImagePreview} alt="Uploaded Leaf" className="w-full h-full object-cover" />
                <button
                  onClick={() => setCustomImagePreview(null)}
                  className="absolute top-2 right-2 px-2.5 py-1 text-xs bg-slate-900/80 text-white rounded-lg hover:bg-slate-900"
                >
                  Change Photo
                </button>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-white text-emerald-700 shadow-md flex items-center justify-center mb-3">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">{t('uploadLeafPhoto')}</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
                  {t('dragDropOrBrowse')} (Supports JPG, PNG, WEBP)
                </p>
                
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition">
                    Browse Files
                    <input type="file" accept="image/*" className="hidden" onChange={handleCustomUpload} />
                  </label>
                  <label className="cursor-pointer px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                    <Camera className="w-3.5 h-3.5" />
                    Open Camera
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCustomUpload} />
                  </label>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={analyzing}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {analyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t('analyzingImage')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Diagnostic AI Assessment</span>
              </>
            )}
          </button>
        </div>

        {/* Sample presets for quick testing */}
        <div className="lg:col-span-6 bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t('trySamplePhotos')}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">1-Click Test</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sampleLeaves.map(sample => {
              const isSelected = selectedSample === sample.key && !customImagePreview;
              return (
                <div
                  key={sample.key}
                  onClick={() => {
                    setCustomImagePreview(null);
                    setSelectedSample(sample.key);
                    handleAnalyze(sample.key);
                  }}
                  className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-white ring-2 ring-emerald-500 shadow-sm'
                      : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <img src={sample.img} alt={sample.label} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-slate-900 block truncate">{sample.label}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Crop: {sample.crop}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Diagnosis Results Card */}
      {diagnosis && (
        <div className="border border-emerald-200 bg-emerald-50/20 rounded-3xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-100">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {t('detectionResults')}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                {language === 'te' ? diagnosis.diseaseNameTe : diagnosis.diseaseName}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Host Plant: <strong className="text-slate-900">{language === 'te' ? diagnosis.cropDetectedTe : diagnosis.cropDetected}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-2xl border border-emerald-200 text-center shadow-xs">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">{t('confidence')}</span>
                <span className="text-xl font-extrabold text-emerald-700 font-mono">
                  {diagnosis.confidenceScore}%
                </span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-emerald-200 text-center shadow-xs">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Severity</span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${
                  diagnosis.severity === 'Severe' ? 'text-rose-700 bg-rose-50' : 'text-amber-700 bg-amber-50'
                }`}>
                  {diagnosis.severity}
                </span>
              </div>
            </div>
          </div>

          {/* Observed Symptoms */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t('symptoms')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              {(language === 'te' ? diagnosis.symptomsTe : diagnosis.symptoms).map((s, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Prevention & Organic Remedies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t('culturalPrevention')}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {(language === 'te' ? diagnosis.culturalPreventionTe : diagnosis.culturalPrevention).map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                {t('organicRemedies')}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {(language === 'te' ? diagnosis.organicRemediesTe : diagnosis.organicRemedies).map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mandatory Responsible Use & Expert Escalation */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold">{t('safetyNotice')}: </span>
                <span className="leading-relaxed">{t('safetyDisclaimer')}</span>
              </div>
            </div>

            {onEscalateToExpert && (
              <button
                onClick={() => onEscalateToExpert(diagnosis.cropDetected, diagnosis.diseaseName, diagnosis.imageUrl)}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('escalateToExpert')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

