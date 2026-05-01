"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  {
    icon: <GitHubIcon />,
    label: "GitHub",
    href: "https://github.com/MagizhanGovindharaj",
  },
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/magizhan-govindharaji-2k26/",
  },
  { icon: <XIcon />, label: "", href: "https://x.com/MagizhanGovind" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      suppressHydrationWarning
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      aria-label="Copy"
      className="p-1.5 rounded-lg text-[#4a5580] hover:text-white hover:bg-[#1e2442] transition-all duration-150"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="y" initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
            <Check size={12} className="text-[#4ade80]" />
          </motion.span>
        ) : (
          <motion.span key="n" initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
            <Copy size={12} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle"); // ← replaces `sent`
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );

      if (result.status === 200) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-[#080916] border text-white text-sm placeholder:text-[#2a3050] focus:outline-none transition-all duration-200 ${
      focused === field
        ? "border-[#3b82f6]/60 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
        : "border-[#1e2442] hover:border-[#2a3050]"
    }`;

  // Button config per status
  const btnConfig = {
    idle: {
      cls: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
      icon: <Send size={14} />,
      label: "Send Message",
    },
    sending: {
      cls: "bg-[#3b82f6]/60 text-white cursor-not-allowed",
      icon: <Loader2 size={14} className="animate-spin" />,
      label: "Sending...",
    },
    sent: {
      cls: "bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80]",
      icon: <CheckCircle size={15} />,
      label: "Message Sent!",
    },
    error: {
      cls: "bg-[#f43f5e]/10 border border-[#f43f5e]/30 text-[#f43f5e]",
      icon: <span>✕</span>,
      label: "Failed — Try Again",
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 border-t border-[#1e2442]/40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-6 bg-[#3b82f6]" />
            <span className="text-xs font-semibold text-[#3b82f6] tracking-widest uppercase">
              Let&apos;s Connect
            </span>
          </div>
          <h2
            className="font-display font-bold text-gradient leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
          >
            Get in Touch
          </h2>
          <p className="text-[#8892b0] text-sm mt-2.5 max-w-sm leading-relaxed">
            Open to new opportunities — projects, collaborations, or just a
            hello.
          </p>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid md:grid-cols-[260px_1fr] gap-6 items-start">
          {/* ── LEFT ── */}
          <div className="flex flex-col gap-3">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 150,
              }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#0d1020] border border-[#1e2442]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] flex-shrink-0">
                <Mail size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#4a5580] font-semibold uppercase tracking-wider mb-0.5">
                  Email
                </p>

                <p className="text-xs text-white font-medium truncate">
                  <a
                    href="mailto:magizhan.govindharaji@gmail.com?subject=Hiring Inquiry&body=Hi Magizhan, I would like to discuss an opportunity with you."
                    className="text-xs text-white font-medium truncate"
                  >
                    magizhan.govindharaji@gmail.com
                  </a>
                </p>
              </div>
              <CopyButton text="magizhan.govindharaji@gmail.com" />
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.18,
                type: "spring",
                damping: 25,
                stiffness: 150,
              }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#0d1020] border border-[#1e2442]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#06b6d4] flex-shrink-0">
                <MapPin size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#4a5580] font-semibold uppercase tracking-wider mb-0.5">
                  Location
                </p>
                <p className="text-xs text-white font-medium">
                  Bangalore, India (Remote)
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.15,
              type: "spring",
              damping: 25,
              stiffness: 140,
            }}
            className="p-6 rounded-2xl bg-[#0d1020] border border-[#1e2442]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-[#4a5580] uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    suppressHydrationWarning
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="John Doe"
                    className={inputCls("name")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-[#4a5580] uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    suppressHydrationWarning
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="john@email.com"
                    className={inputCls("email")}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-[#4a5580] uppercase tracking-widest">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  suppressHydrationWarning
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  placeholder="What's this about?"
                  className={inputCls("subject")}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-[#4a5580] uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  suppressHydrationWarning
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project..."
                  className={`${inputCls("message")} resize-none`}
                />
              </div>

              {/* Only the submit button changes: */}
              <motion.button
                type="submit"
                suppressHydrationWarning
                disabled={status === "sending"}
                whileHover={
                  status === "idle"
                    ? {
                        scale: 1.02,
                        boxShadow: "0 0 28px rgba(59,130,246,0.35)",
                      }
                    : {}
                }
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${btnConfig[status].cls}`}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    {btnConfig[status].icon}
                    {btnConfig[status].label}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-6 border-t border-[#1e2442]/40 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-[#2a3050]">
            © 2026 Magizhan Govindharaji. Built with passion.
          </p>

          {/* Social links moved here */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1020] border border-[#1e2442] text-[#4a5580] hover:text-white hover:border-[#3b82f6]/30 transition-all duration-200 text-xs font-medium"
              >
                {s.icon}
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
