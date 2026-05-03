# CivicsGuideAI: Indian Election Assistant

An interactive, AI-powered assistant designed to help Indian citizens navigate the democratic process, understand voting requirements, and track election timelines with ease.

![CivicsGuideAI Banner](https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=1200)

## 🚀 Overview

CivicsGuideAI addresses the often-complex nature of the Indian electoral system by providing a non-partisan, high-intelligence terminal. Users can ask questions about voter registration (NVSP), search the electoral roll, and understand the EVM/VVPAT process through a stylized, "Bold Typography" interface.

## ✨ Key Features

- **AI Terminal**: Real-time Q&A powered by Google Gemini, specialized in Indian Election Commission (ECI) regulations.
- **Interactive Process Roadmap**: A step-by-step guide to voting with integrated AI support for each stage.
- **Smart Timeline**: Filterable roadmap covering the standard election process, recent results (2024 General Elections), and upcoming cycles (2025-26).
- **Live Dispatch Feed**: A synchronized ticker for official announcements and critical civic news.
- **Voter Checklist**: Targeted documentation requirements (EPIC card, Aadhaar, etc.) with quick-action AI queries.
- **Accessibility First**: Designed with ARIA labels and keyboard-friendly navigation.

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.0 (Custom "Bold Typography" Brutalist Theme)
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React
- **AI Engine**: Google Gemini 1.5 Flash (via `@google/genai`)
- **Build Tool**: Vite

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/civics-guide-ai.git
   cd civics-guide-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🎯 Project Goals

- **Civic Literacy**: Increase understanding of the multi-phase Indian election process.
- **Accessibility**: Provide a single point of truth for often scattered regional voting information.
- **Participation**: Encourage first-time voters (Gen Z) through a modern, engaging interface.

## ⚖️ Disclaimer

CivicsGuideAI is a non-partisan educational resource. While it utilizes AI to provide information based on official ECI guidelines, users should always verify critical registration status and polling locations directly on the [National Voters' Service Portal](https://voters.eci.gov.in).

---
Built with ❤️ for Indian Democracy.
