import React from 'react';
import { Gift, FileSignature, CheckCircle2, Percent } from 'lucide-react';

interface IncentivesSectionProps {
  t: (en: string, zh: string) => string;
}

export default function IncentivesSection({ t }: IncentivesSectionProps) {
  return (
    <section className="py-28 bg-[#050505] relative overflow-hidden border-y border-[#cca766]/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d190f] via-[#050505] to-[#050505] opacity-80"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-[#d4af37] font-semibold tracking-[0.25em] uppercase text-xs mb-3 block">{t("Early-Bird Capital Assistance", "早鸟置业大额扶助")}</span>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6">{t("Exclusive High-Value ", "极尊超凡价值")}<span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b58b38] to-[#fcf0b1]">{t("Early-Bird Incentives", "早鸟认购特惠")}</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base font-light">
            {t("Decrease your capital requirements to a minimum with low upfront fees. Move-in or begin renting immediately with luxury partial furnishing and fully absorbed legal costs.", "最大限度降低初始认购门槛与税费冗杂！全区豪华厨卫部分软装就位、全屋大师级预置，更由开发商提供罕见的全套法务过户费用全额免收，直达交钥匙交房起航。")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Sales Incentives Package Card */}
          <div className="bg-[#0a0a0a] border border-[#cca766]/40 p-8 sm:p-10 hover:border-[#d4af37] transition-all duration-500 group relative shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 blur-xl"></div>
            
            <div className="flex items-center gap-5 mb-8 border-b border-[#cca766]/15 pb-6">
              <div className="w-14 h-14 bg-[#111] flex items-center justify-center border border-[#cca766]/40 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{t("Sales Promo", "专属特惠")}</h3>
                <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase">{t("Special Rebate Packages", "全系首发认购销售配套")}</span>
              </div>
            </div>

            <ul className="space-y-6">
              <li className="border-b border-slate-800/80 pb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-white font-bold font-mono text-sm uppercase">{t("Type C (599 sqft)", "Type C 独立双套房")}</span>
                  <span className="text-emerald-400 font-mono text-lg font-black bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">3% OFF</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{t("Starting RM 613,000", "置业原价从 RM 613,000")}</span>
                  <span className="text-slate-300 font-bold">{t("Save RM 18,390", "立省约 RM 18,390")}</span>
                </div>
              </li>

              <li className="border-b border-slate-800/80 pb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-white font-bold font-mono text-sm uppercase">{t("Type B (808 sqft)", "Type B 舒适2+1卧")}</span>
                  <span className="text-emerald-400 font-mono text-lg font-black bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">7% OFF</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{t("Starting RM 725,000", "置业原价从 RM 725,000")}</span>
                  <span className="text-slate-300 font-bold">{t("Save RM 50,750", "立省约 RM 50,750")}</span>
                </div>
              </li>

              <li>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-white font-bold font-mono text-sm uppercase">{t("Type A (912 sqft)", "Type A 传世三房")}</span>
                  <span className="text-emerald-400 font-mono text-lg font-black bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">5% OFF</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{t("Starting RM 902,000", "置业原价从 RM 902,000")}</span>
                  <span className="text-slate-300 font-bold">{t("Save RM 45,100", "立省约 RM 45,100")}</span>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-[#111] border border-[#d4af37]/35 text-center shadow-inner">
              <span className="text-[#cca766] font-mono text-[10px] tracking-widest uppercase block mb-1">{t("Instant Net-Effective Deductions", "购楼合同直接做减法")}</span>
              <span className="text-white text-xs sm:text-sm font-semibold">{t("Double-key options yield positive yields", "直接冲抵首期或扣减贷款基数")}</span>
            </div>
          </div>

          {/* Furnishing Card */}
          <div className="bg-[#0a0a0a] border border-[#cca766]/30 p-8 sm:p-10 hover:border-[#d4af37] transition-all duration-500 group relative shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 blur-lg"></div>
            
            <div className="flex items-center gap-5 mb-8 border-b border-[#cca766]/15 pb-6">
              <div className="w-14 h-14 bg-[#111] flex items-center justify-center border border-[#cca766]/40 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{t("Premium Partial", "精雅尊奢豪华")}</h3>
                <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase">{t("Furnishing Package", "硬装与软装附送大礼包")}</span>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-light">
                  <strong className="text-white font-semibold">{t("FREE", "全免费")}</strong> {t("Digital Door Lock Set (Highly Secure Multi-Access Model)", "指纹智能安全门锁系统一对（极高防盗标准）")}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-light">
                  <strong className="text-white font-semibold">{t("FREE", "全免费")}</strong> {t("High-Efficiency Aircon systems pre-installed", "高能效静音变频分体式空调全屋预装")}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-light">
                  <strong className="text-white font-semibold">{t("FREE", "全免费")}</strong> {t("Instant Heating Water Reservoirs (Premium spec)", "即热型安全独立恒温热水器全卫到位")}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-light">
                  <strong className="text-white font-semibold">{t("FREE", "全免费")}</strong> {t("Professional Kitchen Cooking Hob & Hood exhaust extractor", "主厨级专业无烟吸油烟机与大火力钢化燃气灶两件套")}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-light">
                  <strong className="text-white font-semibold">{t("FREE", "全免费")}</strong> {t("Built-In Elegant Master Kitchen Cabinets", "高定环保实木烤漆整体欧式橱柜")}
                </span>
              </li>
            </ul>
            
            <div className="mt-8 pt-6 border-t border-[#cca766]/10 text-[10px] text-slate-500 font-mono tracking-wider text-right">
              {t("*Pre-arranged directly with development builders", "*在交付时通水通电可即刻投入租约。")}
            </div>
          </div>

          {/* Legal / Absorption Card */}
          <div className="bg-[#0a0a0a] border border-[#cca766]/30 p-8 sm:p-10 hover:border-[#d4af37] transition-all duration-500 group relative shadow-2xl">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#d4af37]/5 blur-lg"></div>

            <div className="flex items-center gap-5 mb-8 border-b border-[#cca766]/15 pb-6">
              <div className="w-14 h-14 bg-[#111] flex items-center justify-center border border-[#cca766]/40 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                <FileSignature className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{t("Low Upfront Fee", "极低准入门槛资本")}</h3>
                <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase">{t("Legal Absorption", "官方豁免法务税费")}</span>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#cca766] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-light">
                  <strong className="text-white font-semibold">{t("FREE", "全免除")}</strong> {t("Legal Fee on SPA (Sale and Purchase Agreement legalities absorbed)", "开发商全额吸纳代办买卖契约门槛")}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#cca766] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-light">
                  <strong className="text-white font-semibold">{t("FREE", "全免除")}</strong> {t("Legal Fee on Loan Agreements (Fully offset by development fund)", "开发商全额报销银行贷款合同律师费")}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#cca766] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs sm:text-sm font-light">
                  <strong className="text-white font-semibold">{t("FREE", "全免除")}</strong> {t("Stamp Duty Fees on Loan Documentation", "免贷款基本印花税、代办盖章费等杂项支出")}
                </span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-[#111] border border-[#d4af37]/35 text-center shadow-inner">
              <span className="text-[#cca766] font-mono text-[10px] tracking-widest uppercase block mb-1">{t("Instant Purchaser Savings Value", "置业者立享节省现金估值测算")}</span>
              <span className="text-white text-xs sm:text-sm font-bold">{t("Estimated Savings: RM 24,000 to RM 38,000+", "预计即刻节省现金流：约 RM 24,000 - RM 38,000+")}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
