from flask import Flask, jsonify, request
import numpy as np
import joblib
from datetime import datetime, timedelta
import os

app = Flask(__name__)

# Dictionary to hold different AI models in memory
models = {}

def load_models():
    """Load models for both temples at startup."""
    for temple in ['kedarnath', 'somnath']:
        try:
            # Looks for temple-specific files renamed previously
            models[temple] = {
                'model': joblib.load(f'{temple}_model.pkl'),
                'scaler': joblib.load(f'{temple}_scaler.pkl'),
                'encoder': joblib.load(f'{temple}_encoder.pkl')
            }
            print(f"✅ Loaded AI models for {temple.upper()}")
        except FileNotFoundError:
            print(f"⚠️ Warning: AI files for {temple.upper()} not found in the directory.")

# Initial load of models
load_models()

def predict_crowd(temple, date_str, hour, is_festival=0, is_aarti=0):
    """Predicts crowd count based on temple-specific model and temporal features."""
    # Logic to select the correct model assets
    if temple not in models:
        temple = 'kedarnath'
    
    if temple not in models:
        return 300 # Baseline fallback if no models are available

    assets = models[temple]
    
    # Parse the date and extract components
    date = datetime.strptime(date_str, '%Y-%m-%d')
    day_name = date.strftime('%A') # e.g., 'Tuesday'
    
    try:
        # Fixed: Ensure string conversion before encoding to avoid ValueError
        day_encoded = assets['encoder'].transform([str(day_name)])[0]
    except Exception as e:
        print(f"⚠️ Encoding error for {day_name}: {e}. Defaulting to 0.")
        day_encoded = 0

    day_of_month = date.day
    month = date.month
    day_of_year = date.timetuple().tm_yday
    
    # Create feature array with explicit floats to ensure scikit-learn compatibility
    features = np.array([[
        float(day_encoded), 
        float(hour), 
        float(is_festival), 
        float(is_aarti), 
        float(day_of_month), 
        float(month), 
        float(day_of_year)
    ]])
    
    # Scale features and run prediction
    features_scaled = assets['scaler'].transform(features)
    prediction = assets['model'].predict(features_scaled)[0]
    
    return int(max(0, prediction))

@app.route('/predict_24h', methods=['GET'])
def predict_next_24_hours():
    """API endpoint to get the next 24 hourly predictions."""
    temple = request.args.get('temple', 'kedarnath').lower()
    now = datetime.now()
    predictions = []
    
    for i in range(24):
        future_time = now + timedelta(hours=i)
        date_str = future_time.strftime('%Y-%m-%d')
        hour = future_time.hour
        # Simple Aarti time logic
        is_aarti = 1 if hour in [6, 7, 18, 19] else 0
        
        crowd = predict_crowd(temple, date_str, hour, 0, is_aarti)
        predictions.append({
            'timestamp': future_time.strftime('%Y-%m-%dT%H:00:00.000Z'),
            'hour': hour,
            'predicted_crowd': crowd
        })
    return jsonify(predictions)

@app.route('/predict_7d', methods=['GET'])
def predict_next_7_days():
    """API endpoint to get the peak crowd for the next 7 days."""
    temple = request.args.get('temple', 'kedarnath').lower()
    now = datetime.now()
    predictions = []
    
    for i in range(7):
        future_date = now + timedelta(days=i)
        date_str = future_date.strftime('%Y-%m-%d')
        
        daily_predictions = []
        for hour in range(24):
            is_aarti = 1 if hour in [6, 7, 18, 19] else 0
            crowd = predict_crowd(temple, date_str, hour, 0, is_aarti)
            daily_predictions.append(crowd)
        
        predictions.append({
            'date': date_str,
            'day': future_date.strftime('%A'),
            'peak_crowd': int(np.max(daily_predictions))
        })
    return jsonify(predictions)

if __name__ == "__main__":
    print("🚀 AI Prediction Server starting on http://127.0.0.1:5000")
    app.run(port=5000, debug=False)