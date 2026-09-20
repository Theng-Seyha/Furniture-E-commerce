import { useState } from "react";
import { MapPin, Phone, Clock, Send, CheckCircle2, MessageCircle, ExternalLink, Loader2 } from "lucide-react";
import { sendInquiryToTelegram, TELEGRAM_CONFIG } from "../services/telegramService";
import { useCart } from "../context/CartContext";
export const ContactSection = () => {
  const { showToast } = useCart();
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [subject, setSubject] = useState("Custom Timber Sizing & Swatches");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !emailOrPhone || !message) {
      alert("Please fill in your name, contact information, and inquiry message.");
      return;
    }
    setIsSubmitting(true);
    const res = await sendInquiryToTelegram({
      name,
      emailOrPhone,
      subject,
      message
    });
    setIsSubmitting(false);
    setSubmittedResult(res);
    showToast("Inquiry sent to Theng Seyha via Telegram!");
  };
  return <section id="contact" className="py-16 sm:py-24 bg-[#F5F2EB] dark:bg-[#141211] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {
    /* Header */
  }
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Showroom & Workshop Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Visit Our Studio or Chat on Telegram
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
            Speak directly with our founder and lead craftsman, Theng Seyha. We offer custom timber dimension adjustments, fabric swatch samples, and white-glove delivery across Cambodia and the region.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {
    /* Left Column: Workshop Details & Direct Telegram Bot Card (5 cols) */
  }
          <div className="lg:col-span-5 space-y-6">
            
            {
    /* Telegram Bot Highlight Card */
  }
            <div className="p-6 sm:p-7 rounded-3xl bg-sky-600 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-sky-500/40 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-medium tracking-wide uppercase text-sky-100 block">
                    Official Telegram Channel
                  </span>
                  <h4 className="text-base font-bold">@{TELEGRAM_CONFIG.BOT_USERNAME}</h4>
                </div>
              </div>

              <p className="text-xs text-sky-100 leading-relaxed font-light mb-5">
                Our fastest channel for order questions, real-time photo verification of timber grain, and delivery coordination with <b>{TELEGRAM_CONFIG.OWNER_NAME}</b>.
              </p>

              <a
    href={TELEGRAM_CONFIG.BOT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-white text-sky-700 hover:bg-sky-50 font-semibold text-xs transition-all shadow-md cursor-pointer"
    id="contact-open-telegram-btn"
  >
                <span>Launch Telegram Bot Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {
    /* Studio Information Cards */
  }
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <h5 className="font-bold text-stone-900 dark:text-stone-100 mb-0.5">Showroom & Workshop</h5>
                  <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                    #48 Preah Norodom Blvd, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh, Cambodia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <h5 className="font-bold text-stone-900 dark:text-stone-100 mb-0.5">Showroom Hours</h5>
                  <p className="text-stone-500 dark:text-stone-400">Monday – Saturday: 8:30 AM – 7:00 PM</p>
                  <p className="text-stone-500 dark:text-stone-400">Sunday: 9:00 AM – 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <h5 className="font-bold text-stone-900 dark:text-stone-100 mb-0.5">Phone & WhatsApp</h5>
                  <p className="text-stone-500 dark:text-stone-400">+855 12 345 678 (English / Khmer)</p>
                </div>
              </div>
            </div>

          </div>

          {
    /* Right Column: Direct Telegram Message Form (7 cols) */
  }
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm">
            {submittedResult ? <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Thank You, {name}!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been relayed to Theng Seyha’s Telegram inbox. We will review your specifications and reply promptly.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
    href={submittedResult.telegramUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors shadow-sm"
  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Continue on Telegram</span>
                  </a>
                  <button
    onClick={() => {
      setSubmittedResult(null);
      setMessage("");
    }}
    className="px-5 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 cursor-pointer"
  >
                    Send Another Message
                  </button>
                </div>
              </div> : <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    Send a Message to Our Workshop
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Fill out the form below. Responses are routed straight to our Telegram bot.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="e.g. Sreysros Keo"
    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
  />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Phone Number or Telegram *
                    </label>
                    <input
    type="text"
    required
    value={emailOrPhone}
    onChange={(e) => setEmailOrPhone(e.target.value)}
    placeholder="e.g. +855 12 345 678 or @username"
    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
  />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Subject of Inquiry
                  </label>
                  <select
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-700 cursor-pointer"
  >
                    <option value="Custom Timber Sizing & Swatches">Custom Timber Sizing & Fabric Swatches</option>
                    <option value="Order Tracking & Delivery Slot">Order Tracking & Delivery Slot</option>
                    <option value="Trade & Interior Architect Inquiries">Trade & Interior Architect Inquiries</option>
                    <option value="General Question for Theng Seyha">General Question for Theng Seyha</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Message / Special Requirements *
                  </label>
                  <textarea
    required
    rows={4}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Tell us about your room dimensions, desired wood finish, or any questions..."
    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
  />
                </div>

                <button
    type="submit"
    disabled={isSubmitting}
    className="w-full py-3 px-6 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 font-semibold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
    id="contact-submit-btn"
  >
                  {isSubmitting ? <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending to Telegram...</span>
                    </> : <>
                      <Send className="w-4 h-4" />
                      <span>Send Message Directly to Theng Seyha</span>
                    </>}
                </button>
              </form>}
          </div>

        </div>

      </div>
    </section>;
};
