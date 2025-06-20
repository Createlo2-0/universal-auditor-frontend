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
      console.log(reportData);
    } else {
      console.warn("No data received.");
    }
  }, [location.state]);

 
const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;

    // Updated color palette - changed pink to blue and customized colors
    const colors = {
        background: [5,15,26],       
        container: [14, 23, 47],        
        border: [31, 46, 70],          
        heading: [56, 189, 248],        
        icon: [59, 130, 246],           
        content: [255, 255, 255],       
        facebookBlue: [24, 119, 242],   
        websiteGreen: [40, 167, 69],    
        createloLo: [217, 70, 239],   
        circularChartBorder: [31, 46, 70], 
        circularChartFill: [56, 189, 248]  
    };


    // let y = 20;
 const drawBackground = () => {
        doc.setFillColor(...colors.background);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
    };

    // Draw background for first page
    drawBackground();
    
    // Draw pink container for all content
    const containerMargin = 7;
    const containerWidth = pageWidth - (containerMargin * 2);
    const containerHeight = pageHeight - (containerMargin * 2);
    doc.setFillColor(12, 19, 35); // Pink background
    doc.roundedRect(containerMargin, containerMargin, containerWidth, containerHeight, 1, 1, "FD");

    let y = 20;

    // ## Header Section (Clean - No Background Bar)

    doc.setFont("helvetica", "bold"); 
    doc.setFontSize(28);

 // "CREATELO" with two colors
doc.setTextColor(...colors.heading); 
doc.text("CREATE", 25, y + 5);

const createTextWidth = doc.getTextWidth("CREATE"); 
doc.setTextColor(...colors.createloLo); 
doc.text(" LO", 25 + createTextWidth, y + 5); 

// AUDITOR REPORT SUMMARY with reduced spacing
doc.setFont("helvetica", "bold");
doc.setFontSize(20);
doc.setTextColor(...colors.heading);
doc.text("AUDITOR REPORT SUMMARY", 25, y + 15);

// Universal Auditor AI with reduced spacing
doc.setFont("helvetica", "italic");
doc.setFontSize(15);
doc.setTextColor(...colors.content);
doc.text("Universal Auditor AI", 25, y + 25);

// Client information with reduced spacing
doc.setFont("helvetica", "normal");
doc.setFontSize(14);
doc.setTextColor(...colors.content);
doc.text(`Client: ${reportData.client}`, 25, y + 35);

y += 45; // Reduced from 60 to 45 to decrease gap

// ## Company Overview Section

const margin = 15; 
const companyOverviewRectX = margin;
const companyOverviewRectY = y;
const companyOverviewRectWidth = pageWidth - (margin * 2); 
const companyOverviewRectHeight = 45;
const companyOverviewRectRadius = 6;

// Main background box for overview with dark blue background
doc.setFillColor(14, 23, 47); // #0e172f converted to RGB
doc.roundedRect(companyOverviewRectX, companyOverviewRectY, companyOverviewRectWidth, companyOverviewRectHeight, companyOverviewRectRadius, companyOverviewRectRadius, "F");

// Add thin border to Company Overview section
doc.setLineWidth(0.5);
doc.setDrawColor(...colors.border);
doc.roundedRect(companyOverviewRectX, companyOverviewRectY, companyOverviewRectWidth, companyOverviewRectHeight, companyOverviewRectRadius, companyOverviewRectRadius, "S");

// Company Overview Heading
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.setTextColor(...colors.heading);
doc.text("COMPANY OVERVIEW", margin + 15, companyOverviewRectY + 12); 

let overviewParagraphY = companyOverviewRectY + 20;

doc.setFont("helvetica", "normal");
doc.setFontSize(11);
doc.setTextColor(...colors.content);
const overviewLines = doc.splitTextToSize(reportData.businessoverview, companyOverviewRectWidth - 30); 
const limitedOverviewLines = overviewLines.slice(0, 5);
doc.text(limitedOverviewLines, margin + 15, overviewParagraphY); 

y += companyOverviewRectHeight + 10;
    // ---
    
// ## Circular Chart Section
const circularChartBoxHeight = 90;
const circularChartBoxX = 15;
const circularChartBoxY = y;
const circularChartBoxWidth = pageWidth - 30; 
const circularChartBoxRadius = 6;


// Draw the background box for the circular chart
doc.setFillColor(12, 19, 35); 
doc.roundedRect(circularChartBoxX, circularChartBoxY, circularChartBoxWidth, circularChartBoxHeight, circularChartBoxRadius, circularChartBoxRadius, "F");

// Add thin border to the circular chart section
doc.setLineWidth(0.5);
doc.setDrawColor(...colors.border);
doc.roundedRect(circularChartBoxX, circularChartBoxY, circularChartBoxWidth, circularChartBoxHeight, circularChartBoxRadius, circularChartBoxRadius, "S");

// Circular Chart elements - centered within the container
const circleX = circularChartBoxX + (circularChartBoxWidth / 2); 
const circleY = circularChartBoxY + 30;
const radius = 22;

// Background circle
doc.setFillColor(12, 19, 35);
doc.circle(circleX, circleY, radius, "F");

// Outer border circle - using custom border color
doc.setLineWidth(0.7);
doc.setDrawColor(...colors.circularChartBorder); 
doc.circle(circleX, circleY, radius, "S");

// Progress arc with gradient from blue to light blue
const startAngle = -90;
const endAngle = startAngle + (reportData.overallScore / 100) * 360;
const totalAngleRange = endAngle - startAngle;
doc.setLineWidth(3.5); // Slightly thinner progress arc

const arcX = circleX;
const arcY = circleY;
const progressRadius = radius - 3; 

// Create progress arc with gradient from blue to purple
for (let angle = startAngle; angle < endAngle; angle += 1) {
    // Calculate progress ratio for gradient
    const progress = (angle - startAngle) / totalAngleRange;
    
    // Interpolate between blue #0118D8 (1, 24, 216) and light blue #38bdf8 (56, 189, 248)
    const startColor = [1, 24, 216];
    const endColor = [56, 189, 248];
    
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * progress);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * progress);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * progress);
    
    doc.setDrawColor(r, g, b);
    
    const x1 = arcX + (progressRadius * Math.cos(angle * Math.PI / 180));
    const y1 = arcY + (progressRadius * Math.sin(angle * Math.PI / 180));
    const x2 = arcX + (radius * Math.cos(angle * Math.PI / 180));
    const y2 = arcY + (radius * Math.sin(angle * Math.PI / 180));
    
    doc.line(x1, y1, x2, y2);
}

// Inner border circle - drawn after progress to overlap
const innerRadius = radius - 3;
doc.setLineWidth(0.7);
doc.setDrawColor(...colors.circularChartBorder); 
doc.circle(circleX, circleY, innerRadius, "S");

// Score text
doc.setFont("helvetica", "bold");
doc.setFontSize(24);
doc.setTextColor(...colors.content);
doc.text(`${reportData.overallScore}%`, circleX, circleY + 2, { align: "center" });

// "Out of 100" text - centered within the container
const outOf100Y = circularChartBoxY + circularChartBoxHeight - 22; 
doc.setFont("helvetica", "normal");
doc.setFontSize(14); 
doc.setTextColor(...colors.content);
doc.text("Out of 100", circleX, outOf100Y, { align: "center" });

// --- Evaluation Text ---
const avgSocialScore = (reportData.instagramScore + reportData.facebookScore + reportData.websiteScore) / 3;
let evaluationText = "";

if (avgSocialScore >= 75) {
    evaluationText = "Strong Digital Presence";
} else if (avgSocialScore >= 50) {
    evaluationText = "Good Potential, Room for Growth";
} else {
    evaluationText = "Opportunities for Digital Improvement";
}

const evaluationTextY = circularChartBoxY + circularChartBoxHeight - 8; 
doc.setFont("helvetica", "italic");
doc.setFontSize(11); 
doc.setTextColor(...colors.content);
doc.text(evaluationText, circleX, evaluationTextY, { align: "center" });

y += circularChartBoxHeight + 10;
  
    // ## Social Media Icon Drawing Functions
    
   const drawInstagramIcon = (x, y, size) => {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const cornerRadius = size * 0.2;
    
    // Set pink color for all borders
    doc.setDrawColor(225, 48, 108);
    
    // Scale factor to increase overall icon size
    const scaleFactor = 1.5; 

    // Inner camera frame border - thin
    doc.setLineWidth(size * 0.025 * scaleFactor);
    const frameInset = size * 0.03; // Reduced inset to make frame larger
    const frameCornerRadius = size * 0.06 * scaleFactor;
    doc.roundedRect(
        x + frameInset, 
        y + frameInset, 
        size - (frameInset * 2), 
        size - (frameInset * 2), 
        frameCornerRadius, 
        frameCornerRadius, 
        "S"
    );

    // Main lens outer ring - thin border
    doc.setLineWidth(size * 0.03 * scaleFactor); 
    const outerLensRadius = size * 0.18 * scaleFactor; 
    doc.circle(centerX, centerY, outerLensRadius, "S");

    // Inner lens circle - thin
    doc.setLineWidth(size * 0.025 * scaleFactor);
    const innerLensRadius = size * 0.11 * scaleFactor; 
    doc.circle(centerX, centerY, innerLensRadius, "S");

    // Camera viewfinder - thin circle border
    doc.setLineWidth(size * 0.02 * scaleFactor);
    const viewfinderRadius = size * 0.05 * scaleFactor; 
    const viewfinderX = centerX + size * 0.22 * scaleFactor; 
    const viewfinderY = centerY - size * 0.22 * scaleFactor; 
    doc.circle(viewfinderX, viewfinderY, viewfinderRadius, "S");
};

const drawFacebookIcon = (x, y, size) => {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const circleRadius = size / 2;
    
    // Draw the circular background with Facebook blue
    doc.setFillColor(...colors.facebookBlue);
    doc.circle(centerX, centerY, circleRadius, "F");
    
    // Draw lowercase 'f' using text - properly centered
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size * 2.5);
    doc.setTextColor(255, 255, 255);
    
    // Get the text width and height to center it properly
    const textWidth = doc.getTextWidth("f");
    const textX = centerX - (textWidth / 2);
    const textY = centerY + (size * 0.35); 
    doc.text("f", textX, textY);
};

const drawWebsiteIcon = (x, y, size) => {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const radius = size / 2.2;
    
    doc.setLineWidth(size * 0.045);
    doc.setDrawColor(...colors.websiteGreen);
    
    // Outer circle (globe outline)
    doc.circle(centerX, centerY, radius, "S");
    
    // Set thicker line width for grid lines
    doc.setLineWidth(size * 0.02);
    
    // 3 Latitude lines (horizontal curved lines)
    const drawLatitude = (offsetY, curveIntensity) => {
        const steps = 15;
        
        // Calculate the width at this latitude using circle geometry
        const latitudeRadius = Math.sqrt(Math.max(0, radius * radius - offsetY * offsetY)) * 0.9;
        const actualStartX = centerX - latitudeRadius;
        const actualEndX = centerX + latitudeRadius;
        
        for (let i = 0; i < steps - 1; i++) {
            const t1 = i / (steps - 1);
            const t2 = (i + 1) / (steps - 1);
            
            const x1 = actualStartX + (actualEndX - actualStartX) * t1;
            const x2 = actualStartX + (actualEndX - actualStartX) * t2;
            
            // Calculate curve using sine function for moderate curve
            const curve1 = Math.sin(t1 * Math.PI) * curveIntensity * 1.5;
            const curve2 = Math.sin(t2 * Math.PI) * curveIntensity * 1.5;
            
            const y1 = centerY + offsetY + curve1;
            const y2 = centerY + offsetY + curve2;
            
            doc.line(x1, y1, x2, y2);
        }
    };
    
    // Draw 3 latitude lines
    drawLatitude(0, 0); // Equator (straight)
    drawLatitude(-radius * 0.5, -radius * 0.08); 
    drawLatitude(radius * 0.5, radius * 0.08);   
    
    // 3 Longitude lines (vertical curved lines)
    const drawLongitude = (offsetX, curveIntensity) => {
        const steps = 15;
        const startY = centerY - radius * 0.9;
        const endY = centerY + radius * 0.9;
        
        for (let i = 0; i < steps - 1; i++) {
            const t1 = i / (steps - 1);
            const t2 = (i + 1) / (steps - 1);
            
            const y1 = startY + (endY - startY) * t1;
            const y2 = startY + (endY - startY) * t2;
            
            // Calculate curve using sine function for moderate curve
            const curve1 = Math.sin(t1 * Math.PI) * curveIntensity * 1.8;
            const curve2 = Math.sin(t2 * Math.PI) * curveIntensity * 1.8;
            
            const x1 = centerX + offsetX + curve1;
            const x2 = centerX + offsetX + curve2;
            
            doc.line(x1, y1, x2, y2);
        }
    };
    
    // Draw 3 longitude lines
    drawLongitude(0, 0); 
    drawLongitude(-radius * 0.4, -radius * 0.18); 
    drawLongitude(radius * 0.4, radius * 0.18);   
};


// ## Social Media Cards

const cardWidth = 58;
const cardHeight = 42;
const cardSpacing = 4; 
const shadowOffset = 1.5;

const totalWidth = (cardWidth * 3) + (cardSpacing * 2);
const startX = (pageWidth - totalWidth) / 2;

const iconBaseY = y + 6;
const headingBaseY = y + 25;
const scoreBaseY = y + 35;

const cardColor = { r: 14, g: 23, b: 47 };      
const shadowColor = { r: 5, g: 15, b: 26 };     
// ===== Instagram Card =====
let cardX = startX;

// Shadow
doc.setFillColor(shadowColor.r, shadowColor.g, shadowColor.b);
doc.roundedRect(
  cardX + shadowOffset,
  y + shadowOffset,
  cardWidth,
  cardHeight,
  4,
  4,
  "F"
);

// Card
doc.setFillColor(cardColor.r, cardColor.g, cardColor.b);
doc.roundedRect(cardX, y, cardWidth, cardHeight, 4, 4, "F");

drawInstagramIcon(cardX + 25, iconBaseY, 10);

doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.setTextColor(225, 48, 108);
doc.text("INSTAGRAM", cardX + 29, headingBaseY, { align: "center" });

doc.setFontSize(14);
doc.setFont("helvetica", "normal");
doc.setTextColor(...colors.content);
doc.text(`Score: ${reportData.instagramScore}%`, cardX + 29, scoreBaseY, { align: "center" });


// ===== Facebook Card =====
cardX += cardWidth + cardSpacing;

// Shadow
doc.setFillColor(shadowColor.r, shadowColor.g, shadowColor.b);
doc.roundedRect(
  cardX + shadowOffset,
  y + shadowOffset,
  cardWidth,
  cardHeight,
  4,
  4,
  "F"
);

// Card
doc.setFillColor(cardColor.r, cardColor.g, cardColor.b);
doc.roundedRect(cardX, y, cardWidth, cardHeight, 4, 4, "F");

drawFacebookIcon(cardX + 25, iconBaseY + 1, 10);

doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.setTextColor(...colors.facebookBlue);
doc.text("FACEBOOK", cardX + 29, headingBaseY, { align: "center" });

doc.setFontSize(14);
doc.setFont("helvetica", "normal");
doc.setTextColor(...colors.content);
doc.text(`Score: ${reportData.facebookScore}%`, cardX + 29, scoreBaseY, { align: "center" });


// ===== Website Card =====
cardX += cardWidth + cardSpacing;

// Shadow
doc.setFillColor(shadowColor.r, shadowColor.g, shadowColor.b);
doc.roundedRect(
  cardX + shadowOffset,
  y + shadowOffset,
  cardWidth,
  cardHeight,
  4,
  4,
  "F"
);

// Card
doc.setFillColor(cardColor.r, cardColor.g, cardColor.b);
doc.roundedRect(cardX, y, cardWidth, cardHeight, 4, 4, "F");

drawWebsiteIcon(cardX + 25, iconBaseY, 10);

doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.setTextColor(...colors.websiteGreen);
doc.text("WEBSITE", cardX + 29, headingBaseY, { align: "center" });

doc.setFontSize(14);
doc.setFont("helvetica", "normal");
doc.setTextColor(...colors.content);
doc.text(`Score: ${reportData.websiteScore}%`, cardX + 29, scoreBaseY, { align: "center" });


// ========== PAGE 2: SUMMARY, INSIGHTS, TIPS ==========
const drawSecondPage = (doc, colors, reportData, pageWidth, pageHeight) => {
  const margin = 7; // ~7px ≈ 1.85mm
  const usableWidth = pageWidth - margin * 2;
  const usableHeight = pageHeight - margin * 2;
  const centerX = pageWidth / 2;
  let y = margin + 10;

  doc.addPage();
   doc.setFillColor(5, 15, 26); // #050f1a
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // === Background container with margin ===
  doc.setFillColor(12, 19, 35); // #0c1323
  doc.rect(margin, margin, usableWidth, usableHeight, "F");

  // === Icons ===
 const drawSummaryIcon = (x, y, size) => {
  const lineHeight = size * 0.25;
  const dotRadius = size * 0.08;
  const lineLength = size * 0.6;

  doc.setDrawColor(...colors.heading);
  doc.setLineWidth(0.8);

  for (let i = 0; i < 3; i++) {
    const yOffset = y + i * lineHeight;

    // Draw circle (O)
    doc.circle(x + dotRadius, yOffset + dotRadius, dotRadius, "S");

    // Draw horizontal line (---)
    const lineXStart = x + dotRadius * 2 + 1;
    const lineY = yOffset + dotRadius;
    doc.line(lineXStart, lineY, lineXStart + lineLength, lineY);
  }
};

  const drawInsightIcon = (x, y, size) => {
    const centerX = x + size * 0.4;
    const centerY = y + size * 0.4;
    const radius = size * 0.28;
    doc.setLineWidth(0.8);
    doc.setDrawColor(...colors.heading);
    doc.circle(centerX, centerY, radius, "S");
    const handleStartX = centerX + radius * 0.7;
    const handleStartY = centerY + radius * 0.7;
    doc.setLineWidth(1);
    doc.line(handleStartX, handleStartY, x + size * 0.85, y + size * 0.85);
  };

const drawTipIcon = (x, y, size) => {
  const centerX = x + size / 2;
  const bulbCenterY = y + size * 0.3;
  const bulbRadius = size * 0.2;
  const neckWidth = size * 0.15;
  const neckHeight = size * 0.12;
  const baseHeight = size * 0.18;

  // Set color and stroke style
  doc.setLineWidth(0.8);
  doc.setDrawColor(...colors.heading);

  // Bulb (circle)
  doc.circle(centerX, bulbCenterY, bulbRadius, "S");

  // Neck (rectangle below the bulb)
  const neckX = centerX - neckWidth / 2;
  const neckY = bulbCenterY + bulbRadius;
  doc.roundedRect(neckX, neckY, neckWidth, neckHeight, 0.8, 0.8, "S");

  // Base (3 screw lines)
  const baseY = neckY + neckHeight;
  const screwSpacing = baseHeight / 3;
  for (let i = 0; i < 3; i++) {
    const lineY = baseY + i * screwSpacing;
    doc.line(centerX - neckWidth / 2, lineY, centerX + neckWidth / 2, lineY);
  }

  // Light rays around bulb
  const rayLength = size * 0.12;
  const rayOffset = bulbRadius + 1;
  const angles = [0, 60, 120, 180, 240, 300]; 
  doc.setLineWidth(0.6);
  angles.forEach(angle => {
    const rad = (angle * Math.PI) / 180;
    const startX = centerX + Math.cos(rad) * rayOffset;
    const startY = bulbCenterY + Math.sin(rad) * rayOffset;
    const endX = centerX + Math.cos(rad) * (rayOffset + rayLength);
    const endY = bulbCenterY + Math.sin(rad) * (rayOffset + rayLength);
    doc.line(startX, startY, endX, endY);
  });
};

  const drawSectionHeader = (title, yPos, iconType) => {
    const iconX = margin + 5;
    const iconY = yPos + 2;
    const iconSize = 8;

    if (iconType === 'summary') drawSummaryIcon(iconX, iconY, iconSize);
    if (iconType === 'insights') drawInsightIcon(iconX, iconY, iconSize);
    if (iconType === 'tips') drawTipIcon(iconX, iconY, iconSize);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...colors.heading);
    doc.text(title, margin + 16, yPos + 8);

    doc.setLineWidth(0.5);
    doc.setDrawColor(...colors.border);
    doc.line(margin + 5, yPos + 14, pageWidth - margin - 5, yPos + 14);

    return yPos + 22;
  };

 const drawBulletPoints = (points, startY, maxPoints = null) => {
  let currentY = startY;
  const pointsToShow = maxPoints ? points.slice(0, maxPoints) : points;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  pointsToShow.forEach((point) => {
    doc.setFillColor(...colors.content);
    doc.circle(margin + 10, currentY - 1.5, 1, "F");

    doc.setTextColor(...colors.content);
    const wrappedText = doc.splitTextToSize(point, usableWidth - 20);
    doc.text(wrappedText, margin + 16, currentY);

    const lineHeight = 4.5;
    const additionalSpacing = 3;
    currentY += (wrappedText.length * lineHeight) + additionalSpacing;
  });

  return currentY;
};

// New function to draw paragraph text with line breaks after full stops
const drawParagraphText = (text, startY) => {
  let currentY = startY;
  
  if (!text) return currentY;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...colors.content);
  
  // Split text by full stops and process each sentence
  const sentences = text
    .split('.')
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0)
    .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
  
  sentences.forEach((sentence, index) => {
    // Wrap text to fit within the page width
    const wrappedText = doc.splitTextToSize(sentence, usableWidth);
    
    // Draw the sentence
    doc.text(wrappedText, margin, currentY);
    
    // Calculate the height used by this sentence
    const lineHeight = 4.5;
    const sentenceHeight = wrappedText.length * lineHeight;
    
    // Add spacing between sentences 
    const additionalSpacing = index < sentences.length - 1 ? 6 : 0; 
    currentY += sentenceHeight + additionalSpacing;
  });
  
  return currentY;
};

// Helper function to convert large paragraph into exactly 3 bullet points
const convertToThreeBulletPoints = (text) => {
  if (!text) return [];
  
  // Split by full stops first
  const sentences = text
    .split('.')
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 5); // Remove very short fragments
  
  if (sentences.length <= 3) {
    // If 3 or fewer sentences, use them as is
    return sentences.map(sentence => {
      let cleaned = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      if (!cleaned.match(/[.!?]$/)) {
        cleaned += '.';
      }
      return cleaned;
    });
  } else {
    // If more than 3 sentences, group them into 3 bullet points
    const pointsPerBullet = Math.ceil(sentences.length / 3);
    const bulletPoints = [];
    
    for (let i = 0; i < 3; i++) {
      const startIndex = i * pointsPerBullet;
      const endIndex = Math.min(startIndex + pointsPerBullet, sentences.length);
      const combinedSentences = sentences.slice(startIndex, endIndex);
      
      if (combinedSentences.length > 0) {
        let bulletText = combinedSentences.join('. ');
        bulletText = bulletText.charAt(0).toUpperCase() + bulletText.slice(1);
        if (!bulletText.match(/[.!?]$/)) {
          bulletText += '.';
        }
        bulletPoints.push(bulletText);
      }
    }
    
    return bulletPoints;
  }
};

// Enhanced function to handle different data formats with focus on paragraphs
const processBulletData = (data, forceThreePoints = false) => {
  if (Array.isArray(data)) {
    return data; 
  }
  
  if (typeof data === 'string') {

    if (forceThreePoints) {
      return convertToThreeBulletPoints(data);
    }
    
  
    if (data.includes('.')) {
      return data
        .split('.')
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 5)
        .map(sentence => {
          let cleaned = sentence.charAt(0).toUpperCase() + sentence.slice(1);
          if (!cleaned.match(/[.!?]$/)) {
            cleaned += '.';
          }
          return cleaned;
        });
    } else if (data.includes('\n')) {
      return data.split('\n').map(point => point.trim()).filter(point => point);
    } else if (data.includes(';')) {
      return data.split(';').map(point => point.trim()).filter(point => point);
    } else if (data.includes('|')) {
      return data.split('|').map(point => point.trim()).filter(point => point);
    } else {
      return [data]; 
    }
  }
  
  return [];
};

// === SUMMARY Section ===
y = drawSectionHeader("BUSINESS SUMMARY", y, "summary");

// Convert large paragraph to exactly 3 bullet points
const summaryPoints = processBulletData(reportData.businesssummary, true); // true = force 3 points
y = drawBulletPoints(summaryPoints, y) + 15;

// === INSIGHTS Section ===
y = drawSectionHeader("KEY INSIGHTS", y, "insights");

const insightPoints = processBulletData(reportData.insights);
y = drawBulletPoints(insightPoints, y, 5) + 15;

// === TIPS Section ===
y = drawSectionHeader("ACTIONABLE TIPS", y, "tips");

const tipPoints = processBulletData(reportData.tips);
y = drawBulletPoints(tipPoints, y, 6);

const drawAllSectionsAsParagraphs = () => {
  // === SUMMARY Section ===
  y = drawSectionHeader("BUSINESS SUMMARY", y, "summary");
  y = drawParagraphText(reportData.businesssummary, y) + 15;

  // === INSIGHTS Section ===
  y = drawSectionHeader("KEY INSIGHTS", y, "insights");
  y = drawParagraphText(reportData.insights, y) + 15;

  // === TIPS Section ===
  y = drawSectionHeader("ACTIONABLE TIPS", y, "tips");
  y = drawParagraphText(reportData.tips, y);
};

// Advanced processing for complex data
const advancedProcessBulletData = (data, options = {}) => {
  const {
    maxLength = 100, 
    minLength = 10,  
    customDelimiter = null,
    removeNumbers = false,
    removeBullets = true
  } = options;

  if (Array.isArray(data)) {
    return data.map(point => cleanBulletPoint(point, options));
  }
  
  if (typeof data === 'string') {
    let delimiter = customDelimiter;
    
    if (!delimiter) {
      // Auto-detect delimiter
      const delimiters = ['\n', '.', ';', '|', '•', '-', '*'];
      delimiter = delimiters.find(d => data.split(d).length > 1) || '.';
    }
    
    return data
      .split(delimiter)
      .map(point => cleanBulletPoint(point, options))
      .filter(point => point.length >= minLength && point.length <= maxLength);
  }
  
  return [];
};

const cleanBulletPoint = (point, options = {}) => {
  const { removeNumbers = false, removeBullets = true } = options;
  
  let cleaned = point.trim();
  
  // Remove bullet characters
  if (removeBullets) {
    cleaned = cleaned.replace(/^[•\-\*]\s*/, '');
  }
  
  // Remove numbering
  if (removeNumbers) {
    cleaned = cleaned.replace(/^\d+[\.\)]\s*/, '');
  }
  
  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  
  // Ensure it ends with proper punctuation
  if (cleaned && !cleaned.match(/[.!?]$/)) {
    cleaned += '.';
  }
  
  return cleaned;
};

  // === Footer ===
  const footerY = pageHeight - margin - 10;
  doc.setLineWidth(0.5);
  doc.setDrawColor(255, 255, 255);
  doc.line(margin + 5, footerY - 8, pageWidth - margin - 5, footerY - 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...colors.heading);
  doc.text("POWERED BY CREATELO | AUDITED VIA UNIVERSAL AUDITOR AI", centerX, footerY, { align: "center" });
;
};
drawSecondPage(doc, colors, reportData, pageWidth, pageHeight);

doc.save("Auditor_Report_Visual.pdf");
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
              muted
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
