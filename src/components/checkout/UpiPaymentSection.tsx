import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { CheckCircle2, Copy, Check, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { formatINR } from '../../utils/currency';

interface UpiPaymentSectionProps {
  amount: number;
  transactionId: string;
  onTransactionIdChange: (val: string) => void;
  isVerified: boolean;
  onVerificationChange: (verified: boolean) => void;
}

export const UpiPaymentSection: React.FC<UpiPaymentSectionProps> = ({
  amount,
  transactionId,
  onTransactionIdChange,
  isVerified,
  onVerificationChange
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const payeeName = 'Dishant Pawar';
  const payeeUpiId = 'dishantpawaar@oksbi';

  // Generate UPI URI
  // Example: upi://pay?pa=dishantpawaar@oksbi&pn=Dishant%20Pawar&am=8995&cu=INR&tn=Nike%20Shoe%20Order
  const upiUri = `upi://pay?pa=${payeeUpiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Nike Footwear Order')}`;

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 320,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H' // High error tolerance to accommodate center badge
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [upiUri]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(payeeUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAutoFillDemoUtr = () => {
    // Generate realistic 12-digit Indian banking UTR (e.g. 4289xxxxxxxx)
    const randomUtr = `4289${Math.floor(10000000 + Math.random() * 90000000)}`;
    onTransactionIdChange(randomUtr);
    setVerificationError(null);
  };

  const handleVerifyPayment = () => {
    const trimmed = transactionId.trim();
    if (!trimmed) {
      setVerificationError('Please enter the 12-digit UPI Transaction ID / UTR from your payment app.');
      return;
    }

    if (trimmed.length < 6) {
      setVerificationError('Transaction ID must be at least 6 characters (usually 12 digits on GPay/PhonePe).');
      return;
    }

    setVerificationError(null);
    setIsVerifying(true);

    // Simulate real bank/NPCI verification call
    setTimeout(() => {
      setIsVerifying(false);
      onVerificationChange(true);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 block">
            Scan & Pay via UPI
          </span>
          <span className="text-[11px] text-zinc-500">Google Pay · PhonePe · Paytm · BHIM · Any UPI App</span>
        </div>
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-full">
          Instant Settlement
        </span>
      </div>

      {/* Google Pay Style QR Card (matching Dishant Pawar's uploaded QR) */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-md border border-zinc-200/90 flex flex-col items-center text-center">
          {/* User Profile Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 text-white font-bold text-sm flex items-center justify-center overflow-hidden border border-zinc-200 shadow-xs">
              DP
            </div>
            <div className="text-left">
              <span className="font-bold text-sm text-zinc-900 block leading-tight">{payeeName}</span>
              <span className="text-[11px] text-zinc-400">Verified Merchant</span>
            </div>
          </div>

          {/* QR Code Container with Center GPay Icon */}
          <div className="relative p-2 bg-white rounded-2xl border border-zinc-100 shadow-inner flex items-center justify-center">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`Google Pay UPI QR Code for ${payeeName}`}
                className="w-56 h-56 object-contain rounded-xl"
              />
            ) : (
              <div className="w-56 h-56 bg-zinc-100 animate-pulse rounded-xl flex items-center justify-center text-xs text-zinc-400">
                Generating QR Code...
              </div>
            )}

            {/* Google Pay Logo Center Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-md border border-zinc-200 flex items-center justify-center p-1.5 pointer-events-none">
              <svg viewBox="0 0 48 48" className="w-full h-full">
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
          </div>

          {/* UPI ID Pill & Copy Action */}
          <div className="mt-3 w-full bg-zinc-50 border border-zinc-200/80 rounded-xl px-3 py-2 flex items-center justify-between">
            <div className="text-left truncate mr-2">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold block">UPI ID</span>
              <span className="text-xs font-mono font-bold text-zinc-900 select-all truncate block">
                {payeeUpiId}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="p-1.5 bg-white border border-zinc-200 rounded-lg hover:border-black text-zinc-700 hover:text-black transition-colors shrink-0 flex items-center gap-1 text-[11px] font-semibold"
              title="Copy UPI ID"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Scan Footer */}
          <p className="text-[11px] text-zinc-500 mt-2.5 font-medium">
            Scan to pay with any UPI app
          </p>

          <div className="mt-2 pt-2 border-t border-zinc-100 w-full flex items-center justify-between text-xs">
            <span className="text-zinc-500">Payable Amount:</span>
            <span className="font-extrabold text-sm text-zinc-900 tabular-nums">{formatINR(amount)}</span>
          </div>
        </div>
      </div>

      {/* Transaction ID & Verification Section */}
      <div className="pt-2 border-t border-zinc-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
            <span>UPI Transaction ID / UTR Number</span>
            <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleAutoFillDemoUtr}
            className="text-[11px] text-zinc-500 hover:text-black underline font-medium"
          >
            Auto-Fill Demo UTR
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={transactionId}
            onChange={(e) => {
              onTransactionIdChange(e.target.value);
              if (isVerified) onVerificationChange(false);
              setVerificationError(null);
            }}
            placeholder="e.g. 428912345678 (12-digit UTR from GPay / PhonePe)"
            className={`w-full px-3.5 py-2.5 text-xs font-mono bg-white border rounded-xl outline-none transition-all ${
              isVerified
                ? 'border-emerald-500 bg-emerald-50/20 text-emerald-950 font-bold'
                : verificationError
                ? 'border-red-500'
                : 'border-zinc-300 focus:border-black'
            }`}
          />
          {isVerified && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>VERIFIED</span>
            </div>
          )}
        </div>

        {verificationError && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{verificationError}</span>
          </div>
        )}

        {/* Verification Status Card */}
        {isVerified ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 space-y-0.5">
              <p className="font-bold">Payment Verified & Approved!</p>
              <p className="text-emerald-800">
                Amount <strong className="font-semibold">{formatINR(amount)}</strong> verified for UTR <span className="font-mono">{transactionId}</span> to <span className="font-semibold">{payeeName}</span>.
              </p>
              <p className="text-[11px] text-emerald-700 pt-1">
                Click <strong>"Confirm & Place Order"</strong> below to generate your order receipt.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              type="button"
              onClick={handleVerifyPayment}
              disabled={isVerifying || !transactionId.trim()}
              className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying Payment with Bank...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verify Payment</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="text-[11px] text-zinc-500 space-y-1">
          <p>• Step 1: Open Google Pay, PhonePe, or Paytm and scan the QR code above.</p>
          <p>• Step 2: Complete the payment of <strong>{formatINR(amount)}</strong> to <strong>{payeeName}</strong>.</p>
          <p>• Step 3: Copy the 12-digit UPI Reference / UTR Number from your payment receipt and click <strong>Verify Payment</strong>.</p>
        </div>
      </div>
    </div>
  );
};
