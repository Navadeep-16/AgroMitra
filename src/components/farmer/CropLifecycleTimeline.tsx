import React from 'react';
import { Crop, CropGrowthStage } from '../../types/farm';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle2, Clock, Sprout, Flower2, Apple, Scissors, ShieldAlert } from 'lucide-react';

interface CropLifecycleTimelineProps {
  crop: Crop;
}

export const CropLifecycleTimeline: React.FC<CropLifecycleTimelineProps> = ({ crop }) => {
  const { t, language } = useLanguage();

  const stages: { stage: CropGrowthStage; labelEn: string; labelTe: string; dayRange: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { stage: 'Sowing', labelEn: 'Sowing', labelTe: 'విత్తనాలు నాటుట', dayRange: 'Day 0 - 7', icon: Sprout },
    { stage: 'Germination', labelEn: 'Germination', labelTe: 'మొలకెత్తుట', dayRange: 'Day 7 - 15', icon: Sprout },
    { stage: 'Vegetative Growth', labelEn: 'Vegetative Growth', labelTe: 'శాకీయ ఎదుగుదల', dayRange: 'Day 15 - 45', icon: Clock },
    { stage: 'Flowering', labelEn: 'Flowering & Squares', labelTe: 'పూత మరియు పిందె', dayRange: 'Day 45 - 75', icon: Flower2 },
    { stage: 'Fruit Development', labelEn: 'Boll / Fruit Formation', labelTe: 'కాయ ఎదుగుదల', dayRange: 'Day 75 - 110', icon: Apple },
    { stage: 'Harvest', labelEn: 'Picking & Harvest', labelTe: 'పంట కోత', dayRange: 'Day 110 - 145', icon: Scissors },
  ];

  const currentStageIndex = stages.findIndex(s => s.stage === crop.currentStage);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="text-lg font-bold text-slate-900">
              {crop.name} ({crop.variety}) — {language === 'te' ? 'పంట ఎదుగుదల దశల ప్రణాళిక' : 'Crop Phenology Stages'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sown on {crop.sowingDate} • Currently on Day {crop.daysSinceSowing} of {crop.totalDurationDays} • Target: {crop.targetYieldQuintals} Qtl/Acre
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Active: {language === 'te' ? stages[currentStageIndex]?.labelTe : crop.currentStage}
          </span>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            {crop.stageProgressPercent}% Complete
          </span>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-8 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-green-600 h-2.5 rounded-full transition-all duration-700"
          style={{ width: `${Math.round(((crop.daysSinceSowing) / crop.totalDurationDays) * 100)}%` }}
        ></div>
      </div>

      {/* 6 Stage Horizontal Nodes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stages.map((stg, index) => {
          const Icon = stg.icon;
          const isPassed = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isUpcoming = index > currentStageIndex;

          let cardBorder = 'border-slate-200 bg-slate-50 text-slate-400';
          let iconColor = 'text-slate-400 bg-slate-200';

          if (isPassed) {
            cardBorder = 'border-emerald-200 bg-emerald-50/50 text-emerald-950';
            iconColor = 'text-emerald-700 bg-emerald-100';
          } else if (isCurrent) {
            cardBorder = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 shadow-md';
            iconColor = 'text-white bg-emerald-600';
          }

          return (
            <div
              key={stg.stage}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${cardBorder}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${iconColor}`}>
                    {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-slate-500">
                    Step {index + 1}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {language === 'te' ? stg.labelTe : stg.labelEn}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-medium">
                  {stg.dayRange}
                </div>
              </div>

              {/* Status indicator tag */}
              <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] font-semibold">
                {isPassed && <span className="text-emerald-700 flex items-center gap-1">✓ Completed</span>}
                {isCurrent && <span className="text-emerald-800 font-bold flex items-center gap-1 animate-pulse">● Active Now</span>}
                {isUpcoming && <span className="text-slate-400">Scheduled</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advisory card for Current Stage */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
        <Flower2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-emerald-900">
            {language === 'te' ? 'ప్రస్తుత దశ యాజమాన్య సూచన (ఫ్లవరింగ్ & కాయ తొడుగు దశ):' : 'Key Agronomic Focus for Current Stage (Flowering & Square Formation):'}
          </p>
          <p className="text-emerald-800 leading-relaxed">
            {language === 'te' 
              ? 'పూత మరియు పిందె రాలకుండా ఉండటానికి తేమ ఒత్తిడి లేకుండా చూసుకోండి. 19:19:19 లేదా బోరాన్ 1 గ్రాము లీటరు నీటికి కలిపి ఉదయం పూట పిచికారీ చేయండి.'
              : 'Maintain consistent soil moisture through drip. Foliar application of water-soluble 19:19:19 (5g/L) alongside Boron 20% (1g/L) prevents flower square drop and promotes heavy boll setting.'}
          </p>
        </div>
      </div>
    </div>
  );
};

