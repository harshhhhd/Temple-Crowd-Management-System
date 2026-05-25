const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const path    = require('path');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

let latestCrowdData = null;
let peakCount = 0;

// AI Prediction API
app.get('/api/predict', async (req, res) => {
  try {
    const temple = (req.query.temple || 'kedarnath').toLowerCase();

    // Call Python API with the temple name
    const res24h = await fetch(`http://127.0.0.1:5000/predict_24h?temple=${temple}`);
    const res7d  = await fetch(`http://127.0.0.1:5000/predict_7d?temple=${temple}`);

    if (!res24h.ok || !res7d.ok) throw new Error("AI Server Error");

    const data24h = await res24h.json();
    const data7d  = await res7d.json();

    res.json({
      temple,
      source: 'ai_model',
      next24h: data24h.slice(0, 6), // Send next 6 hours to chart
      next7d: data7d.map(d => ({
        day: d.day,
        date: new Date(d.date).toLocaleDateString('en-IN', { month:'short', day:'numeric' }),
        peak_crowd: d.peak_crowd
      }))
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Socket logic for Heatmap (Remains unchanged)
io.on('connection', socket => {
  if (latestCrowdData) socket.emit('initial_data', { crowdData: latestCrowdData, peakCount });
  socket.on('crowd_update', data => {
    latestCrowdData = data;
    if ((data.totalCount || 0) > peakCount) peakCount = data.totalCount;
    io.emit('heatmap_update', { ...data, peakCount });
  });
});

server.listen(3000, () => console.log(`✅ Web Server on http://localhost:3000`));