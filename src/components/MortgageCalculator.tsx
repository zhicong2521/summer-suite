import React, { useState, useEffect } from 'react';
import { Calculator, Calendar } from 'lucide-react';

interface MortgageCalculatorProps {
  t: (en: string, zh: string) => string;
}

export default function MortgageCalculator({ t }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(613000);
  const [downpaymentPercent, setDownpaymentPercent] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(4.15);
  const [loanTenure, setLoanTenure] = useState<number>(30);

  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  // rebate rates
  // Type-A: 5% (for prices >= 850,000)
  // Type-B: 7% (for prices 680,000 to < 850,000)
  // Type-C: 3% (for prices < 680,000)
  const getRebatePercent = (price: number): number => {
    if (price >= 850000) return 5;
    if (price >= 680000) return 7;
    return 3;
  };

  const getRebateAmount = (price: number): number => {
    return (price * getRebatePercent(price)) / 100;
  };

  const activeRebatePercent = getRebatePercent(propertyPrice);
  const rebateAmount = (propertyPrice * activeRebatePercent) / 100;
  const netContractPrice = propertyPrice - rebateAmount;

  // Auto calculate when any input changes
  useEffect(() => {
    const activeRebate = getRebatePercent(propertyPrice);
    const rebateAmt = (propertyPrice * activeRebate) / 100;
    const effectivePrice = propertyPrice - rebateAmt;

    const downpaymentVal = (effectivePrice * downpaymentPercent) / 100;
    const principal = effectivePrice - downpaymentVal;
    setLoanAmount(principal);

    const r = interestRate / 100 / 12;
    const n = Math.max(1, loanTenure) * 12;

    if (principal <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    if (r === 0) {
      const payment = principal / n;
      setMonthlyPayment(payment);
      setTotalPayment(principal);
      setTotalInterest(0);
    } else {
      const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(payment);
      const totalPay = payment * n;
      setTotalPayment(totalPay);
      setTotalInterest(totalPay - principal);
    }
  }, [propertyPrice, downpaymentPercent, interestRate, loanTenure]);

  // Format currency
  const formatRM = (val: number) => {
    return 'RM ' + Math.round(val).toLocaleString();
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#cca766]/30 p-8 sm:p-12 relative w-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 blur-xl pointer-events-none"></div>

      <div className="flex items-center gap-5 mb-8 border-b border-[#cca766]/15 pb-6">
        <div className="w-16 h-16 bg-[#111] flex items-center justify-center border border-[#cca766]/40 text-[#d4af37] shadow-lg">
          <Calculator className="w-7 h-7" />
        </div>
        <div>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">{t("Mortgage Calculator", "智能购房还款计算器")}</h4>
          <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase block mt-1">{t("Estimate Your Installment & ROI", "精确规置测算您的首付与按揭月供明细")}</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Preset Layout Buttons */}
        <div>
          <label className="text-xs md:text-sm text-slate-400 font-mono uppercase tracking-wider block mb-3">{t("Select Layout Preset *", "快速对标主力户型价格 *")}</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => { setPropertyPrice(613000); setDownpaymentPercent(10); }}
              className={`py-3 px-2 text-xs md:text-sm font-mono border text-center transition-all ${
                propertyPrice === 613000
                  ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-black text-slate-300 border-slate-800 hover:border-[#cca766]/40'
              }`}
            >
              C (RM 613k)
            </button>
            <button
              type="button"
              onClick={() => { setPropertyPrice(725000); setDownpaymentPercent(10); }}
              className={`py-3 px-2 text-xs md:text-sm font-mono border text-center transition-all ${
                propertyPrice === 725000
                  ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-black text-slate-300 border-slate-800 hover:border-[#cca766]/40'
              }`}
            >
              B (RM 725k)
            </button>
            <button
              type="button"
              onClick={() => { setPropertyPrice(902000); setDownpaymentPercent(10); }}
              className={`py-3 px-2 text-xs md:text-sm font-mono border text-center transition-all ${
                propertyPrice === 902000
                  ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-black text-slate-300 border-slate-800 hover:border-[#cca766]/40'
              }`}
            >
              A (RM 902k)
            </button>
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-6">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm md:text-base font-semibold text-slate-300 uppercase tracking-wider">{t("Property Price (RM) *", "物业总价 (RM) *")}</label>
              <span className="text-base md:text-lg font-mono text-[#d4af37] font-extrabold">{formatRM(propertyPrice)}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min={10000}
                max={10000000}
                step={1000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
                className="w-full bg-black border border-slate-800 text-white p-4 font-mono text-base md:text-lg focus:outline-none focus:border-[#d4af37] pl-14 shadow-inner"
              />
              <span className="absolute left-4 top-4.5 text-slate-500 font-mono text-sm">RM</span>
            </div>
            
            {/* Sales Package Rebate Highlight */}
            <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{t("Sales Promotion Program:", "本户型专属销售特惠：")}<strong className="font-mono text-sm font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-300">{getRebatePercent(propertyPrice)}% {t("Rebate", "折扣减免")}</strong></span>
              </div>
              <div className="text-right font-mono text-emerald-400 font-bold">
                <span className="text-slate-400 font-sans font-light mr-1.5 text-[11px]">{t("Savings Amount:", "立减额:")}</span>
                -{formatRM(getRebateAmount(propertyPrice))}
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center text-xs">
              <span className="text-slate-500">{t("*Calculation utilizes Net Adjusted Price for maximum savings", "*系统已采用折扣配套后「签约净房价」测算按揭负债")}</span>
              <span className="text-slate-400">
                {t("Net Contract Price:", "实付签约价: ")}
                <strong className="text-white font-mono font-bold text-sm ml-1 bg-white/5 px-2 py-0.5 rounded">{formatRM(propertyPrice - getRebateAmount(propertyPrice))}</strong>
              </span>
            </div>
          </div>

          {/* Downpayment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm md:text-base font-semibold text-slate-300 uppercase tracking-wider">{t("Downpayment Ratio *", "自购首付比例 *")}</label>
                <span className="text-xs md:text-sm font-mono text-slate-400 font-medium">{downpaymentPercent}% ({formatRM((netContractPrice * downpaymentPercent) / 100)})</span>
              </div>
              <div className="relative flex gap-2">
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={downpaymentPercent}
                  onChange={(e) => setDownpaymentPercent(Math.min(99, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full bg-black border border-slate-800 text-white p-4 font-mono text-base md:text-lg focus:outline-none focus:border-[#d4af37] pl-12 shadow-inner"
                />
                <span className="absolute left-4 top-4.5 text-slate-500 font-mono text-sm">%</span>
              </div>
            </div>

            <div>
              <label className="text-xs md:text-sm text-slate-400 font-mono uppercase tracking-widest block mb-2">{t("Quick Downpayment presets", "一键自选首付额度")}</label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownpaymentPercent(pct)}
                    className={`py-3 text-xs md:text-sm font-mono border text-center transition-colors ${
                      downpaymentPercent === pct ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10 font-bold' : 'border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interest Rate & Tenure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm md:text-base font-semibold text-slate-300 uppercase tracking-wider">{t("Interest Rate (% p.a.) *", "新马银行首选年利率 (% p.a.) *")}</label>
                <span className="text-base font-mono text-[#d4af37] font-bold">{interestRate}%</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer bg-[#222] h-1.5 rounded-lg"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                <span>1.0%</span>
                <span>4.15% (Avg)</span>
                <span>8.0%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm md:text-base font-semibold text-slate-300 uppercase tracking-wider">{t("Loan Tenure (Years) *", "还款年限（支持手动输入） *")}</label>
                <span className="text-base font-mono text-[#d4af37] font-bold">{loanTenure} {t("Years", "年")}</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={loanTenure || ''}
                  onChange={(e) => setLoanTenure(Math.min(50, Math.max(1, Number(e.target.value) || 0)))}
                  className="w-full bg-black border border-slate-800 text-white p-4 font-mono text-base md:text-lg focus:outline-none focus:border-[#d4af37] pl-12 shadow-inner"
                />
                <span className="absolute left-4 top-4.5 text-slate-500 font-mono text-sm">Yr</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mt-2">
                {[15, 20, 30, 35].map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => setLoanTenure(years)}
                    className={`py-1.5 text-xs font-mono border text-center transition-colors ${
                      loanTenure === years ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10 font-bold' : 'border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {years}Y
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Result Summary Blocks */}
        <div className="bg-[#111] border border-slate-800/90 p-6 sm:p-8 mt-8 relative shadow-2xl">
          <div className="grid grid-cols-2 gap-6 divide-x divide-slate-800/80">
            <div className="text-left">
              <span className="text-slate-500 text-xs uppercase font-mono tracking-wider block mb-1">
                {t("Principal Loan Amount", "申请按揭贷款总额")}
              </span>
              <span className="text-white text-xl sm:text-2xl font-black font-mono tracking-tight">
                {formatRM(loanAmount)}
              </span>
            </div>

            <div className="text-right pl-6">
              <span className="text-[#d4af37] text-xs uppercase font-mono tracking-wider block mb-1">
                {t("Total Downpayment", "约定首付现金流")}
              </span>
              <span className="text-white text-xl sm:text-2xl font-black font-mono tracking-tight">
                {formatRM((netContractPrice * downpaymentPercent) / 100)}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-800/80 my-6 pt-6 text-center">
            <span className="text-[#cca766] text-xs sm:text-sm uppercase font-mono tracking-widest block mb-1.5">
              🚀 {t("ESTIMATED MONTHLY INSTALLMENT", "预估每月按揭本息还款")}
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#d4af37] font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              {formatRM(monthlyPayment)} <span className="text-sm text-slate-400 font-light font-sans tracking-normal">/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 border-t border-slate-800/80 pt-4 font-mono">
            <div>
              {t("Total Interest:", "估算产生负债利息总计:")} <span className="text-slate-300 font-bold">{formatRM(totalInterest)}</span>
            </div>
            <div className="text-right">
              {t("Total Repayment:", "累计本金与利息总支出:")} <span className="text-slate-300 font-bold">{formatRM(totalPayment)}</span>
            </div>
          </div>
        </div>

        {/* Dual key reference */}
        {propertyPrice <= 650000 && (
          <div className="border border-[#d4af37]/20 bg-[#111]/40 p-5 font-light text-sm text-slate-300 flex items-start gap-4">
            <span className="text-[#d4af37] text-xl leading-none">💡</span>
            <div>
              <strong className="text-white font-semibold">{t("ROI Double Coverage Alert:", "双钥匙租务高回报率提示：")}</strong>{' '}
              {t(
                "This layout yields average rental values of ~RM 3,200. The rent perfectly nets off your monthly mortgage, generating positive monthly pocket reserves!",
                "对标全新山同类精装主力双钥匙户型均租：C 户型月租金预期可达约 RM 3,200！扣减此测算月付，不仅完全实现「零月供」，甚至每月坐享持续客观的现金盈余！"
              )}
            </div>
          </div>
        )}

        {/* Special Bank Approval Banner */}
        <div className="mt-6 border border-[#cca766]/30 bg-gradient-to-r from-[#111] to-[#1a1510] p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#d4af37]/5 blur-lg rounded-full pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#cca766]/40 flex items-center justify-center bg-black text-[#d4af37] text-lg font-bold">
                95%
              </div>
              <div className="text-left flex-1">
                <span className="text-[10px] text-[#cca766] font-mono tracking-widest uppercase block">
                  {t("Exclusive Bank Collaboration", "特惠银行专属直通车渠道")}
                </span>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  {t("Special 95% Loan Margin Approval", "特批高达 95% 极高贷款额度保障")}
                </h4>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <span className="bg-black border border-slate-800 text-slate-300 px-3 py-1 text-xs font-mono font-bold tracking-tight">
                {t("Public Bank", "Public Bank")}
              </span>
              <span className="bg-black border border-slate-800 text-slate-300 px-3 py-1 text-xs font-mono font-bold tracking-tight">
                {t("Hong Leong Bank", "Hong Leong Bank")}
              </span>
              <span className="bg-black border border-slate-800 text-slate-300 px-3 py-1 text-xs font-mono font-bold tracking-tight">
                {t("Maybank", "Maybank")}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-light mt-3 leading-relaxed text-left border-t border-slate-800/60 pt-2">
            {t("*Subject to credit profiles & dedicated pre-approval pathways. Pre-packaged fast-track approval slots locked under developers' exclusive allocation.", "*上述主要合作银行尊享 95% 极高房贷成数特批通道，最终还款方案及贷款成数依各行预审评估结论为准。")}
          </p>
        </div>
      </div>
    </div>
  );
}
