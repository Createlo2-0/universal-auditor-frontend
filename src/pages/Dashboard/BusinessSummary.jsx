import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";
import { useLocation } from 'react-router-dom';

const reportData = {
  client: "BramhaCorp",
  businessoverview:
    "BramhaCorp is a real estate company focusing on residential, commercial, and hospitality projects across India. They aim to create landmarks that redefine urban living and business spaces.",
  instagramSummary:
    "BramhaCorp's Instagram presence showcases their projects with visually appealing content, but could benefit from increased engagement through interactive stories and behind-the-scenes glimpses.",
  facebookSummary:
    "Their Facebook page shares project updates and company news; however, there's room to foster a stronger community by initiating conversations and responding more actively to comments.",
  instagramScore: 72,
  facebookScore: 68,
  overallScore: 79,
  businesssummary:
    "BramhaCorp demonstrates a solid foundation on social media but can elevate their performance by prioritizing audience interaction and diversifying content formats. Ignoring these aspects might mean missing out on valuable opportunities to connect with potential clients and build brand loyalty.",
  insights: [
    "Content is visually appealing but lacks a consistent brand voice across platforms.",
    "There's limited use of user-generated content or influencer collaborations to expand reach.",
    "The frequency of posts could be increased to maintain consistent engagement.",
    "Opportunities to leverage targeted advertising based on demographics and interests are being missed.",
    "Competitor analysis reveals gaps in content themes and engagement tactics.",
    "Website integration for social tracking and conversions is not fully optimized.",
  ],
  tips: [
    "Schedule a call within the next 24 hours to discuss a tailored social media strategy.",
    "Request a quote for a targeted ad campaign focusing on high-potential demographics.",
    "Start a test campaign showcasing behind-the-scenes content to boost engagement.",
    "Audit your top three competitors this week and identify quick wins.",
    "Integrate social tracking pixels on your website to measure conversions and ROI.",
    "Launch an interactive contest or giveaway on Instagram to grow your followers.",
    "Implement a customer review and testimonial strategy across social platforms.",
    "Explore micro-influencer collaborations to amplify your brand message.",
  ],
};

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

    // Colors and styles based on your CSS
    const primaryColor = "#38bdf8";
    const secondaryColor = "#0ea5e9";
    const textColor = "#ffffff";
    const backgroundColor = "#0c1323";
    const boxColor = "#0e172f";
    const borderColor = "#1f2e46";
    const footerColor = "#94a3b8";

    // Draw background
    doc.setFillColor(5, 15, 26); // #050f1a
    doc.rect(0, 0, 210, 297, "F"); // Fill entire page

    // Container box
    doc.setFillColor(12, 19, 35); // #0c1323
    doc.roundedRect(10, 10, 190, 277, 5, 5, 'F');

    let y = 20;

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(14, 165, 233); // #0ea5e9
    doc.text("Audit Report", 15, y);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(56, 189, 248); // #38bdf8
    doc.text(`Client: ${reportData.client || "N/A"}`, 15, y);

    y += 8;
    doc.setTextColor(255, 255, 255); // #ffffff
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, y);

    // Section: Business Overview
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(primaryColor);
    doc.text("Business Overview", 15, y);

    y += 5;
    doc.setDrawColor(31, 46, 70); // #1f2e46
    doc.line(15, y, 195, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text(reportData.businessoverview || "No overview provided.", 15, y, { maxWidth: 180 });

    // Section: Social Media Scores
    y += 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(primaryColor);
    doc.text("Social Media Scores", 15, y);

    y += 5;
    doc.line(15, y, 195, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text(`Instagram: ${reportData.instagramScore || "N/A"}%`, 15, y);

    y += 7;
    doc.text(`Facebook: ${reportData.facebookScore || "N/A"}%`, 15, y);

    y += 7;
    doc.text(`Overall Score: ${reportData.overallScore || "N/A"}%`, 15, y);

    // Section: Insights
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(primaryColor);
    doc.text("Insights", 15, y);

    y += 5;
    doc.line(15, y, 195, y);

    y += 8;
    const insights = reportData.insights || ["No insights provided."];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    insights.forEach((insight, index) => {
      doc.text(`• ${insight}`, 20, y + (index * 7), { maxWidth: 180 });
    });

    y += insights.length * 7 + 5;

    // Section: Tips
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(primaryColor);
    doc.text("Tips", 15, y);

    y += 5;
    doc.line(15, y, 195, y);

    y += 8;
    const tips = reportData.tips || ["No tips provided."];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    tips.forEach((tip, index) => {
      doc.text(`• ${tip}`, 20, y + (index * 7), { maxWidth: 180 });
    });

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // #94a3b8
    doc.line(60, 280, 150, 280);
    doc.text(
      "Powered by Universal Auditor AI | Delivered by Createlo",
      105,
      285,
      { align: "center" }
    );

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
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-[#5ad1f3] font-extrabold text-3xl tracking-wide">
            CREATE<span className="text-[#b32cc7]">LO</span>
          </h1>

          <motion.button
            onClick={generatePDF}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-[#4822dd] via-[#8222c2] to-[#ff299c] 
            text-white text-base font-semibold rounded-xl flex items-center justify-center 
            gap-2 transition-all duration-300 ease-in-out shadow-lg cursor-pointer"
          >
            <FiDownload className="text-xl" />
            Download PDF
          </motion.button>
        </header>

        {/* Report Intro */}
        <section className="mb-8">
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
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border border-[#5ad1f3] rounded-xl p-6 flex-1 bg-gradient-to-br from-[#0a142f] to-[#1a2e6a]"
          >
            <h3 className="text-[#5ad1f3] font-semibold uppercase text-sm mb-4">
              Company Overview
            </h3>
            <p className="text-sm leading-relaxed">{reportData.businessoverview}</p>
          </motion.div>

          {/* Social Media Scores */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{ platform: "Instagram", score: reportData.instagramScore, color: "#b32cc7" },
            { platform: "Facebook", score: reportData.facebookScore, color: "#5ad1f3" }]
              .map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  className="border border-[#1a2e6a] rounded-xl p-4 bg-gradient-to-br from-[#0a142f] to-[#1a2e6a]"
                >
                  <p className="text-sm mb-2">{item.platform}</p>
                  <p className="font-bold text-3xl">{item.score}%</p>
                  <div className="h-2 w-full bg-[#1a2e6a] rounded-full mt-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${item.score}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
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
            className="flex-1"
          >
            <h3 className="text-[#5ad1f3] font-semibold uppercase text-sm mb-4">
              Business Summary
            </h3>
            <p className="text-sm leading-relaxed">{reportData.businesssummary}</p>
          </motion.div>
        </section>

        {/* Insights and Tips */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-8 border-t border-[#1a2e6a] pt-8">
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
                  className="p-4 border border-[#1a2e6a] rounded-lg bg-gradient-to-br from-[#0a142f] to-[#1a2e6a] hover:shadow-lg hover:shadow-pink-400/30 transition-shadow duration-300 flex items-start gap-3"
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
      </motion.main>
    </div>
  );
};

export default BusinessSummary;
