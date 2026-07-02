# AgriTech - Smart Farming Platform 🌱

> **AgriTech** is a comprehensive, AI-powered agriculture platform designed to provide farmers with actionable insights. The platform features crop disease detection, satellite-based field anomaly analysis, live marketplace price comparisons, and a smart weather alert system.

---

## 🚀 Features

- **🛒 Marketplace Price Comparison**: Live prices on pesticides, fertilizers, seeds & equipment, compared across major platforms (Amazon, Flipkart, IndiaMart, Local).
- **🛰️ Satellite Field Anomaly Detector**: AI-powered vegetation & growth anomaly analysis using real satellite data (NDVI, EVI).
- **🔬 AI Crop Disease Doctor**: Upload a crop photo, and our AI diagnoses diseases, generates a GradCAM heatmap highlighting affected areas, and prescribes treatments.
- **🌩️ Smart Weather Alerts**: Real-time weather monitoring with SMS, WhatsApp, and voice call alerts for crop-critical weather events.

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, Vite, CSS, Leaflet.js
- **Backend**: Python 3.10+, FastAPI, PyTorch
- **Deployment**: Ready for **Render** (via `render.yaml` Infrastructure as Code)

---

## 📂 Project Structure

```text
cdd/
├── backend/                  # Python FastAPI Backend Service
│   ├── app/                  # Application code
│   ├── .env.example          # Template for secret API keys
│   └── requirements.txt      # Python dependencies (PyTorch, FastAPI, etc.)
├── frontend/                 # Vite Node.js Frontend App
│   ├── src/                  # Frontend source code (app.js, styles)
│   ├── index.html            # Main website entry point
│   └── package.json          # Node dependencies
├── render.yaml               # Auto-deployment config for Render
└── README.md                 # You are reading this!
```

---

## ⚙️ Beginner-Friendly Local Setup Instructions

This project is divided into two parts: the **Backend** (Python) and the **Frontend** (JavaScript). 
To run the website on your computer, you must run both parts at the same time in **two separate terminal windows**.

### Step 1: Start the Backend (Terminal 1)

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python Virtual Environment. This keeps your project organized:
   ```bash
   # On Mac/Linux:
   python3 -m venv venv
   source venv/bin/activate
   
   # On Windows:
   python -m venv venv
   venv\Scripts\activate
   ```
   *(You should see `(venv)` appear at the start of your terminal line).*
3. Install the required Python packages (this might take a minute as PyTorch is large):
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up Environment Variables (API Keys):**
   - Create a copy of the `.env.example` file and name it `.env`
     ```bash
     cp .env.example .env
     ```
   - Open the new `.env` file in your code editor (like VS Code). You will see empty keys like `OWM_API_KEY=`. Paste your secret keys directly after the `=` sign with **no spaces and no quotes**.
     *Example: `OWM_API_KEY=12345abcde`*
5. Start the server!
   ```bash
   python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```
   *✅ If you see "Application startup complete", your backend is running successfully on `http://127.0.0.1:8000`.*

### Step 2: Start the Frontend (Terminal 2)

1. Open a **brand new** terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *✅ You will see a local link (usually `http://localhost:5173`). Cmd+Click (or Ctrl+Click) that link to open AgriTech in your browser!*

---

## 🌍 Ready for Production Deployment (Render)

Your project has been fully audited and structured for automatic deployment using **Render**. 
The included `render.yaml` file tells Render exactly how to build and host your app.

### How to Deploy:
1. Push this entire project folder to a repository on **GitHub**.
2. Create a free account at [Render.com](https://render.com).
3. In the Render Dashboard, click **New +** and select **Blueprint**.
4. Connect your GitHub account and select your `cdd` repository.
5. Render will read the `render.yaml` file and automatically create two live services:
   - **agritech-backend**: A Web Service running your Python server.
   - **agritech-frontend**: A Static Site serving your Vite website.
6. **IMPORTANT**: Once the services are created on Render, go to the **Environment** settings of your new `agritech-backend` service on the Render dashboard and paste in your API Keys (for Weather, Twilio, etc.).

---

## 🎯 What to do Next?

Here are your recommended next steps to turn this into a fully functioning startup:

1. **Test the Features Locally**: Log in (using any 10 digit number, it will give you a mock OTP on screen), and explore the Marketplace, Satellite Mapper, and Crop Doctor to ensure you are happy with the UI.
2. **Connect a Real Database**: The login currently saves data temporarily to your browser. The next major technical step is to connect a PostgreSQL or MongoDB database to your FastAPI backend to permanently save user profiles and search history.
3. **Get API Keys**: If you haven't already, sign up for [OpenWeatherMap](https://openweathermap.org/api) (free) and [Twilio](https://www.twilio.com/) (free trial) to get real keys for the `.env` file so the weather and SMS alerts work.
4. **Deploy**: Follow the Deployment instructions above to get your platform live on the internet!
