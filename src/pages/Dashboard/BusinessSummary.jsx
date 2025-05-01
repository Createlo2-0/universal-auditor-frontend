import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { jsPDF } from "jspdf";
import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import Logo from "../../assets/logo.png";

const BusinessSummary = () => {

  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.responseData) {
      setReportData(location.state.responseData);
    } else {
      console.warn("No data received.");
    }
  }, [location.state]);

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftMargin = 20;
    const rightMargin = 20;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    const marginTop = 20;
    const marginBottom = 20;

    const theme = {
      primary: [56, 189, 248],
      secondary: [14, 165, 233],
      text: [255, 255, 255],
      background: [5, 15, 26],
      container: [12, 19, 35],
      border: [31, 46, 70],
      footer: [148, 163, 184],
    };

    let y = marginTop;

    const drawBackground = () => {
      doc.setFillColor(...theme.background);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
      doc.setFillColor(...theme.container);
      doc.roundedRect(leftMargin - 5, 10, contentWidth + 10, pageHeight - 20, 5, 5, "F");
    };

    const addNewPage = () => {
      doc.addPage();
      drawBackground();
      y = marginTop;
    };

    const checkPageSpace = (lines = 1, lineHeight = 7) => {
      const spaceNeeded = lines * lineHeight + 10;
      if (y + spaceNeeded > pageHeight - marginBottom) {
        addNewPage();
      }
    };

    const renderSection = (title, content, isBulleted = false) => {
      const lines = Array.isArray(content) ? content : [content];
      checkPageSpace(lines.length + 3);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(...theme.primary);
      y += 15;
      doc.text(title, leftMargin, y);

      doc.setDrawColor(...theme.border);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(...theme.text);
      y += 8;

      lines.forEach((line) => {
        checkPageSpace(1);
        const bullet = isBulleted ? "• " : "";
        const wrapped = doc.splitTextToSize(`${bullet}${line}`, contentWidth);
        doc.text(wrapped, leftMargin, y);
        y += wrapped.length * 6;
      });

      y += 5;
    };

    drawBackground();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...theme.secondary);
    doc.text("Audit Report", leftMargin, y);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(...theme.primary);
    doc.text(`Client: ${reportData.client || "N/A"}`, leftMargin, y);

    y += 8;
    doc.setTextColor(...theme.text);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, leftMargin, y);

    renderSection("Business Overview", reportData.businessoverview || "No overview provided.");
    renderSection("Social Media Scores", [
      `Instagram: ${reportData.instagramScore || "N/A"}%`,
      `Facebook: ${reportData.facebookScore || "N/A"}%`,
      `Overall Score: ${reportData.overallScore || "N/A"}%`
    ]);

    // Graphical representation of overall score (Horizontal Score Bar)
    const overallScore = reportData.overallScore || 0;
    const barX = leftMargin;
    const barY = y + 20;
    const barWidth = contentWidth;
    const barHeight = 12;

    doc.setTextColor(...theme.primary);
    doc.setFontSize(14);
    y += 15;
    doc.text("Overall Score", leftMargin, y);

    doc.setFillColor(...theme.border);
    doc.roundedRect(barX, barY, barWidth, barHeight, 3, 3, "F");

    const filledWidth = (overallScore / 100) * barWidth;
    doc.setFillColor(...theme.secondary);
    doc.roundedRect(barX, barY, filledWidth, barHeight, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...theme.text);
    const scoreText = `${overallScore}%`;
    const scoreTextWidth = doc.getTextWidth(scoreText);
    const scoreTextX = barX + (barWidth / 2) - (scoreTextWidth / 2);
    const scoreTextY = barY + barHeight - 3;
    doc.text(scoreText, scoreTextX, scoreTextY);

    y = barY + barHeight + 15;

    renderSection("Insights", reportData.insights?.length ? reportData.insights : ["No insights provided."], true);
    renderSection("Tips", reportData.tips?.length ? reportData.tips : ["No tips provided."], true);

    checkPageSpace(2);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...theme.footer);
    doc.line(pageWidth / 3, pageHeight - 17, pageWidth * 2 / 3, pageHeight - 17);
    doc.text("Powered by Universal Auditor AI | Delivered by Createlo", pageWidth / 2, pageHeight - 10, {
      align: "center",
    });

    doc.save("Audit_Report.pdf");
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#0a142f] text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#5ad1f3] mb-4"></div>
        <p className="text-lg font-semibold">Loading Report...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#050c22] via-[#0a142f] to-[#1a2e6a] min-h-screen p-4 md:p-8 flex justify-center items-start">
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#0a142f] w-full max-w-6xl rounded-2xl p-6 md:p-8 text-white shadow-2xl select-none"
      >
        {/* Header */}
        <header className="flex items-center justify-between flex-col sm:flex-row sm:items-center mb-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.2 }}
            className="w-36 cursor-pointer"
          >
            <img src={Logo} loading="lazy" alt="Createlo Logo" className="object-contain scale-110" />
          </motion.div>

          <motion.button
            onClick={generatePDF}
            whileTap={{ scale: 0.97 }}
            className="group w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-[#4822dd] via-[#8222c2] to-[#ff299c] 
  text-white text-base font-semibold rounded-xl flex items-center justify-center 
  gap-2 transition-all duration-300 ease-in-out shadow-lg cursor-pointer mt-2"
          >
            <FiDownload
              className="text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Save This Audit Report (PDF)
            </span>
          </motion.button>
        </header>

        {/* Report Intro */}
        <section className="my-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-transparent bg-clip-text bg-gradient-to-t from-cyan-400 to-pink-500 font-extrabold text-4xl mb-2"
          >
            Auditor Report Summary
          </motion.h2>
          <p className="uppercase text-sm tracking-widest text-[#b0becf] mb-2">
            Universal Auditor AI
          </p>
          <p className="text-lg font-medium">Client: {reportData.client}</p>
        </section>

        {/* Company Overview and Scores */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border border-[#5ad1f3] rounded-xl p-6 flex-1 bg-gradient-to-br from-[#0a142f] to-[#1a2e6a]"
          >
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1, color: "#82e9ff" }}
              className="text-[#5ad1f3] font-semibold uppercase text-sm mb-4 transition-all duration-300"
            >
              Company Overview
            </motion.h3>
            <p className="text-sm cursor-text leading-relaxed">{reportData.businessoverview}</p>
          </motion.div>

          {/* Social Media Scores */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { platform: "Instagram", score: reportData.instagramScore, color: "#b32cc7" },
              { platform: "Facebook", score: reportData.facebookScore, color: "#5ad1f3" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{
                  cursor: "pointer",
                  boxShadow: `0px 0px 6px 2px ${item.color}`,
                }}
                className="border border-[#1a2e6a] rounded-xl p-4 bg-gradient-to-br from-[#0a142f] to-[#1a2e6a] transition-transform duration-300"
              >
                <p className="text-sm mb-2">{item.platform}</p>
                <p className="font-bold text-3xl">{item.score}%</p>
                <div className="h-2 w-full bg-[#1a2e6a] rounded-full mt-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                    whileHover={{
                      backgroundColor: "#ffffff",
                    }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Overall Score and Business Summary */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
          {/* Overall Score Circle */}
          <div className="flex-1 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, rotate: 180 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-44 h-44">
                <svg width="176" height="176" viewBox="0 0 160 160" className="absolute inset-0">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#backgroundGradient)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#progressGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="440"
                    strokeDashoffset={(1 - reportData.overallScore / 100) * 440}
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a2e6a" />
                      <stop offset="100%" stopColor="#0a142f" />
                    </linearGradient>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5ad1f3" />
                      <stop offset="100%" stopColor="#b32cc7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-white font-black text-5xl">{reportData.overallScore}</p>
                  <p className="text-xs tracking-widest text-[#7a8db7] uppercase mt-1">
                    Overall Score
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Business Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex-1 cursor-text mt-4"
          >
            <h3 className="text-[#5ad1f3] font-semibold uppercase text-lg mb-4">
              Business Summary
            </h3>
            <p className="text-sm leading-relaxed">{reportData.businesssummary}</p>
          </motion.div>
        </section>

        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative cursor-pointer w-full h-[42vh] rounded-xl overflow-hidden shadow-lg"
          >
            <video
              src="/bg.mp4"
              autoPlay
              loop
              controls
              className="absolute top-0 left-0 w-full h-full object-cover"
            ></video>
          </motion.div>
        </section>

        {/* Insights and Tips */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-8 border-t border-b border-[#1a2e6a] py-8">
          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex-1"
          >
            <h3 className="text-[#5ad1f3] font-semibold uppercase text-sm sm:text-base mb-4 flex items-center gap-2">
              <span className="text-lg sm:text-xl">💡</span> Insights
            </h3>
            <ul className="space-y-4">
              {reportData.insights.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border cursor-pointer border-[#1a2e6a] rounded-lg bg-gradient-to-br from-[#0a142f] to-[#1a2e6a] hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300 flex items-start gap-3"
                >
                  <span className="text-cyan-400 text-lg sm:text-xl">•</span>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed hover:text-cyan-400 transition-colors duration-300">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex-1"
          >
            <h3 className="text-[#b32cc7] font-semibold uppercase text-sm sm:text-base mb-4 flex items-center gap-2">
              <span className="text-lg sm:text-xl">🚀</span> Tips
            </h3>
            <ul className="space-y-4">
              {reportData.tips.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border cursor-pointer border-[#1a2e6a] rounded-lg bg-gradient-to-br from-[#0a142f] to-[#1a2e6a] hover:shadow-lg hover:shadow-pink-400/30 transition-shadow duration-300 flex items-start gap-3"
                >
                  <span className="text-pink-400 text-lg sm:text-xl">•</span>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed hover:text-pink-400 transition-colors duration-300">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-6">
          <motion.button
            onClick={() => (window.location.href = "https://www.createlo.in/contact-us")}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="group w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-[#4822dd] via-[#8222c2] to-[#ff299c] 
      text-white text-sm sm:text-base font-semibold rounded-xl flex items-center justify-center 
      gap-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-pink-400/30 cursor-pointer"
          >
            <CiBookmark
              className="text-[24px] sm:text-[28px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Schedule My Free Audit Call
            </span>
          </motion.button>

          <motion.button
            onClick={() => (window.location.href = "https://wa.me/message/TAHHTANJL6UGL1")}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="group w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-[#4822dd] via-[#8222c2] to-[#ff299c] 
      text-white text-sm sm:text-base font-semibold rounded-xl flex items-center justify-center 
      gap-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan-400/30 cursor-pointer"
          >
            <FaWhatsapp
              className="text-[24px] sm:text-[28px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Chat Now — Fastest Support!
            </span>
          </motion.button>
        </section>

        <section className="flex flex-col items-center justify-center mt-8 px-4 sm:px-8">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-center">
            💡 What you see here isn’t just data — it’s your brand’s reflection in the digital mirror.
            Even if AI skips a detail or two, this report uncovers what your future customers already perceive — from Instagram impressions to missed SEO signals.
            In today’s AI-first world, your visibility is your credibility. Take this audit as your launchpad — optimize, engage, and own your digital narrative before someone else does.

          </p>
        </section>

        <section className="flex flex-col items-center justify-center mt-6">
          <p className="text-xs sm:text-xl text-gray-400 text-center">
            Powered by <span className="text-white font-semibold">Gemini AI</span> | Delivered by <span className="text-white font-semibold">Createlo</span>
          </p>
        </section>
      </motion.main>
    </div>
  );
};

export default BusinessSummary;
