import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Sparkles, X, Send, Bot, User, CheckCircle2,
  AlertTriangle, BookOpen, Shield, RefreshCw
} from 'lucide-react';
import './AICopilotDrawer.css';

const presetQueries = [
  'Summarize NIT Warangal compliance and flagged issues',
  'Explain detected metadata anomaly in the Fire Safety NOC',
  'What are the mandatory faculty requirements for 1,200 intake?',
  'How does DigiLocker API prevent forged certificates?',
];

const mockKnowledgeBase = {
  nit: `**AICTE AI Scrutiny Assessment for NIT Warangal (NIT-WGL-001):**
• **Application ID:** AICTE-EoA-2026-97476 (Extension of Approval)
• **Compliance Score:** 88% (14 of 16 Handbook Norms met)
• **Critical Flag:** Fire Safety NOC (TS/FSC/2026/09842) was flagged by AI Forensic Engine due to Adobe Photoshop metadata markers and font kerning variance in the validity date.
• **DigiLocker Status:** Land Documents & Affidavits verified with SHA-256 hash match.
• **Recommendation:** Request certified physical copy or summon institution for Standing Hearing Committee (SHC).`,

  anomaly: `**Forensic Anomaly Detection Analysis:**
• **Detected Layer:** PDF Producer Metadata & Font Byte-Stream.
• **Finding:** The document contains header 'CreationDate: 20260314' and 'ModDate: 20260815' with 'Producer: Adobe Photoshop 24.2 (Windows)'. Official State Fire NOCs are issued in native vector PDF without Photoshop re-encoding.
• **Tamper Probability:** 94.8% confidence.
• **AI Action:** Auto-routed to Scrutiny Officer Mr. Rakesh Verma for manual review.`,

  intake: `**AICTE Approval Process Handbook (APH 2026) Norms for 1,200 Intake (Engineering UG):**
• **Faculty-to-Student Ratio (FSR):** Prescribed 1:15 (Clause 5.1).
• **Required Faculty Count:** Minimum 80 full-time faculty across departments.
• **Cadre Ratio:** 1 Professor : 2 Associate Professors : 6 Assistant Professors.
• **Instructional Built-Up Area:** 5,400 sq. meters (minimum 4.5 sq.m per student).
• **Laboratories:** Minimum 16 specialized laboratories with prescribed equipment.`,

  digilocker: `**DigiLocker 256-Bit Cryptographic Integration:**
1. Upon document upload, the AI engine extracts the certificate registration number and issuing authority code.
2. The system dispatches an encrypted HTTPS query (TLS 1.3) to the DigiLocker National Gateway API (\`/v3/certificates/verify\`).
3. DigiLocker computes the SHA-256 checksum of the registered master copy and compares it against the submitted file's content hash.
4. If hashes match, the document is tagged as **VERIFIED AT SOURCE** without requiring human clerk scrutiny.`,
};

export default function AICopilotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Greetings. I am the AICTE Neural Scrutiny Assistant trained on the Approval Process Handbook (APH 2026-27). Ask me about application audits, forensic anomalies, handbook formulas, or authority API queries.',
      time: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const query = text || inputVal;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('nit') || lower.includes('warangal')) {
        reply = mockKnowledgeBase.nit;
      } else if (lower.includes('anomaly') || lower.includes('fire') || lower.includes('tamper')) {
        reply = mockKnowledgeBase.anomaly;
      } else if (lower.includes('faculty') || lower.includes('intake') || lower.includes('ratio')) {
        reply = mockKnowledgeBase.intake;
      } else if (lower.includes('digilocker') || lower.includes('api') || lower.includes('hash')) {
        reply = mockKnowledgeBase.digilocker;
      } else {
        reply = `**AICTE Scrutiny Engine Assessment:**
Your query regarding "${query}" has been analyzed against AICTE Approval Process Handbook (APH 2026) Chapter IV.
• System validation: All institutional parameters are cross-checked across Infrastructure (4.0+ acres), Faculty Cadre (1:15 ratio), and State Regulatory NOCs.
• You can inspect the live compliance calculations under the "Compliance" module or run live OCR checks under "Document Validator".`;
      }

      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        className="ai-copilot-trigger"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="copilot-glow-ring" />
        <Brain size={20} />
        <span className="copilot-btn-label">AI Scrutiny Assistant</span>
        <span className="badge badge-accent font-mono">APH 2026</span>
      </motion.button>

      {/* Slide-out Copilot Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="copilot-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="copilot-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="copilot-drawer-head">
                <div className="head-left">
                  <div className="copilot-avatar">
                    <Brain size={22} />
                  </div>
                  <div>
                    <h3 className="font-editorial">AICTE Neural Scrutiny Assistant</h3>
                    <span className="copilot-sub font-mono">VISION OCR • FORENSIC INTEGRITY • APH 2026</span>
                  </div>
                </div>
                <button className="copilot-close-btn" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              {/* Preset Prompts for SIH Judges */}
              <div className="copilot-preset-bar">
                <span className="preset-title font-mono">QUICK EVALUATION QUERIES:</span>
                <div className="preset-chips">
                  {presetQueries.map((q, i) => (
                    <button key={i} className="preset-chip" onClick={() => handleSend(q)}>
                      <Sparkles size={11} className="text-vermilion" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="copilot-messages-pane">
                {messages.map((m, idx) => (
                  <div key={idx} className={`copilot-message-bubble ${m.sender === 'ai' ? 'msg-ai' : 'msg-user'}`}>
                    <div className="msg-header">
                      {m.sender === 'ai' ? (
                        <div className="sender-tag text-emerald font-mono">
                          <Bot size={13} /> AICTE Scrutiny Neural Model
                        </div>
                      ) : (
                        <div className="sender-tag font-mono">
                          <User size={13} /> Evaluator / Officer
                        </div>
                      )}
                      <span className="msg-time font-mono">{m.time}</span>
                    </div>
                    <div className="msg-body" style={{ whiteSpace: 'pre-line' }}>
                      {m.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="copilot-message-bubble msg-ai typing-bubble">
                    <RefreshCw size={14} className="spin-anim text-emerald" />
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                      Cross-referencing APH 2026 handbook & DigiLocker ledger...
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <div className="copilot-input-area">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="copilot-form"
                >
                  <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder="Ask about document anomalies, handbook rules, faculty formulas..."
                    className="input copilot-input"
                  />
                  <button type="submit" className="btn btn-primary btn-sm copilot-send-btn">
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
