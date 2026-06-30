import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import matplotlib.pyplot as plt

print("="*60)
print("TRAINING AI CROWD PREDICTION MODEL")
print("="*60)

# Load data
print("\n Loading dataset...")
df = pd.read_csv('somnath_crowd_data.csv')
print(f"Loaded {len(df)} records")

# Convert timestamp to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Extract additional features
print("\n Engineering features...")
df['DayOfMonth'] = df['Timestamp'].dt.day
df['Month'] = df['Timestamp'].dt.month
df['DayOfYear'] = df['Timestamp'].dt.dayofyear

# Encode categorical variables
le = LabelEncoder()
df['Day_Encoded'] = le.fit_transform(df['Day'])

# Feature selection
features = ['Day_Encoded', 'Hour', 'Is_Festival', 'Is_Aarti', 
            'DayOfMonth', 'Month', 'DayOfYear']
target = 'Crowd_Count'

X = df[features]
y = df[target]

print(f" Features: {features}")
print(f" Target: {target}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\n Training set: {len(X_train)} samples")
print(f" Test set: {len(X_test)} samples")

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train multiple models
print("\n Training models...")

models = {
    'Linear Regression': LinearRegression(),
    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, random_state=42)
}

results = {}

for name, model in models.items():
    print(f"\n  Training {name}...")
    model.fit(X_train_scaled, y_train)
    
    # Predictions
    y_pred = model.predict(X_test_scaled)
    
    # Metrics
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    
    results[name] = {
        'model': model,
        'MAE': mae,
        'RMSE': rmse,
        'R2': r2,
        'predictions': y_pred
    }
    
    print(f"    MAE: {mae:.2f}")
    print(f"    RMSE: {rmse:.2f}")
    print(f"    R² Score: {r2:.4f}")

# Select best model
best_model_name = max(results, key=lambda x: results[x]['R2'])
best_model = results[best_model_name]['model']

print(f"\n BEST MODEL: {best_model_name}")
print(f"   R² Score: {results[best_model_name]['R2']:.4f}")
print(f"   MAE: {results[best_model_name]['MAE']:.2f} people")
print(f"   RMSE: {results[best_model_name]['RMSE']:.2f} people")

# Save model and scaler
print("\n Saving model...")
joblib.dump(best_model, 'crowd_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(le, 'label_encoder.pkl')
print(" Model saved as 'crowd_model.pkl'")
print(" Scaler saved as 'scaler.pkl'")

# Feature importance (for Random Forest or Gradient Boosting)
if best_model_name in ['Random Forest', 'Gradient Boosting']:
    feature_importance = pd.DataFrame({
        'feature': features,
        'importance': best_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\n FEATURE IMPORTANCE:")
    print(feature_importance)

# Visualization
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# Plot 1: Actual vs Predicted
y_pred_best = results[best_model_name]['predictions']
axes[0].scatter(y_test, y_pred_best, alpha=0.5)
axes[0].plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
axes[0].set_xlabel('Actual Crowd Count')
axes[0].set_ylabel('Predicted Crowd Count')
axes[0].set_title(f'{best_model_name}: Actual vs Predicted')

# Plot 2: Model comparison
model_names = list(results.keys())
r2_scores = [results[m]['R2'] for m in model_names]
axes[1].bar(model_names, r2_scores, color=['blue', 'green', 'orange'])
axes[1].set_ylabel('R² Score')
axes[1].set_title('Model Comparison')
axes[1].set_ylim([0, 1])

plt.tight_layout()
plt.savefig('model_performance.png', dpi=300, bbox_inches='tight')
print("\n Performance chart saved as 'model_performance.png'")

print("\n" + "="*60)
print(" TRAINING COMPLETE!")
print("="*60)