# Smart Crowd Management System

An integrated, full-stack crowd monitoring and predictive analytics ecosystem designed to manage high-density footfall and ensure devotee safety at public or religious gathering sites.

## System Architecture

The solution is divided into three core components:

* **Perception Layer:** A real-time vision engine built with Python and YOLOv8 that processes live CCTV video feeds to detect individuals and extract spatial XY coordinates.
* **Analytics Backend:** A centralized Node.js application running a Random Forest Regressor to compute historical trends, festival features, and event schedules for a 6-hour look-ahead density forecast.
* **User Interfaces:** A real-time administrative command center utilizing Socket.io to stream live coordinate heatmaps alongside a devotee-facing booking portal that locks over-capacity slots to balance visitor load.

## Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Backend:** Node.js, Express, Socket.io
* **AI & Machine Learning:** Python, YOLOv8 (Ultralytics), Scikit-Learn (Random Forest Regressor), OpenCV
* **Database:** MongoDB

## Prerequisites

Ensure you have the following installed on your system:

* Node.js (v18 or higher)
* Python (3.9 or higher)
* MongoDB

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smart-crowd-management.git
cd smart-crowd-management

```

### 2. Perception Layer Setup (Python)

```bash
cd vision-engine
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python main.py

```

### 3. Backend Analytics Setup (Node.js)

```bash
cd ../backend
npm install
npm start

```

## Features

* **Live AI Heatmaps:** Converts streaming coordinate payloads into a real-time visual grid, highlighting high-density zones in red when safe thresholds are passed.
* **Predictive Load Balancing:** Locks digital entry registration slots automatically when the machine learning engine forecasts upcoming threshold breaches.
* **Low-Latency Pipeline:** Pushes updates from the perception model to the front-end dashboard in less than 200 milliseconds using a persistent WebSocket connection.
