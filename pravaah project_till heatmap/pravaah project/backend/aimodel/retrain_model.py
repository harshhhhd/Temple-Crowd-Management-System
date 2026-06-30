"""
retrain_model.py  —  Updated for your specific column names.
"""

import os, sys
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

# ── Ensure we are in the correct directory ──────────────────
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# ── Load dataset ──────────────────────────────────────────────
# Update this filename to match your CSV (e.g., "somnath_data.csv")
DATA_FILE = "kedarnath_data.csv" 

if not os.path.exists(DATA_FILE):
    print(f" ❌ Error: {DATA_FILE} not found!")
    sys.exit(1)

df = pd.read_csv(DATA_FILE)
print(f" ✅ Loaded {len(df)} records from {DATA_FILE}")

# ── Feature engineering ───────────────────────────────────────
# 1. Convert 'timestamp' to datetime
df['timestamp']  = pd.to_datetime(df['timestamp'])

# 2. Extract needed date components
df['DayOfMonth'] = df['timestamp'].dt.day
df['Month']      = df['timestamp'].dt.month
df['DayOfYear']  = df['timestamp'].dt.dayofyear

# 3. Handle 'day_of_week' encoding
# Your CSV already has 'day_of_week', but we need to ensure it is in 
# string format (like 'Monday') for the LabelEncoder to match predict.py
le = LabelEncoder()
df['Day_Encoded'] = le.fit_transform(df['day_of_week'])

# 4. Define features and target using your exact headers
# Note: We use the existing columns from your CSV directly
features = ['Day_Encoded', 'hour', 'is_festival', 'DayOfMonth', 'Month', 'DayOfYear']
target   = 'crowd_count'

X = df[features]
y = df[target]

# ── Train / test split ────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

scaler         = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

# ── Train and Evaluate Models ────────────────────────────────
print("\n 🚀 Training models...")
candidates = {
    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, random_state=42),
}

results = {}
for name, mdl in candidates.items():
    mdl.fit(X_train_scaled, y_train)
    y_pred = mdl.predict(X_test_scaled)
    r2 = r2_score(y_test, y_pred)
    results[name] = dict(model=mdl, R2=r2)
    print(f"   {name:25s} | R²: {r2:.4f}")

best_name  = max(results, key=lambda k: results[k]['R2'])
best_model = results[best_name]['model']

# ── Save .pkl files ───────────────────────────────────────────
joblib.dump(best_model, 'crowd_model.pkl')
joblib.dump(scaler,     'scaler.pkl')
joblib.dump(le,         'label_encoder.pkl')

print("\n ✅ Saved successfully.")
print(" 💡 REMEMBER: Rename to somnath_model.pkl (etc.) before running predict.py")