import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load dataset
df = pd.read_csv('somnath_data.csv')

print("="*60)
print("📊 SOMNATH CROWD DATA ANALYSIS")
print("="*60)

# Basic info
print("\n1. DATASET OVERVIEW")
print(f"Total Records: {len(df)}")
print(f"Date Range: {df['Timestamp'].min()} to {df['Timestamp'].max()}")
print(f"\nColumn Types:")
print(df.dtypes)

# Statistical summary
print("\n2. CROWD STATISTICS")
print(df.describe())

# Check missing values
print("\n3. MISSING VALUES")
print(df.isnull().sum())

# Day-wise analysis
print("\n4. DAY-WISE AVERAGE CROWD")
day_avg = df.groupby('Day')['Crowd_Count'].mean().sort_values(ascending=False)
print(day_avg)

# Hour-wise analysis
print("\n5. HOUR-WISE AVERAGE CROWD")
hour_avg = df.groupby('Hour')['Crowd_Count'].mean().sort_values(ascending=False)
print(hour_avg.head(10))

# Festival impact
print("\n6. FESTIVAL IMPACT")
print(f"Normal Days Avg: {df[df['Is_Festival']==0]['Crowd_Count'].mean():.0f}")
print(f"Festival Days Avg: {df[df['Is_Festival']==1]['Crowd_Count'].mean():.0f}")
print(f"Increase: {((df[df['Is_Festival']==1]['Crowd_Count'].mean() / df[df['Is_Festival']==0]['Crowd_Count'].mean() - 1) * 100):.1f}%")

# Aarti impact
print("\n7. AARTI TIME IMPACT")
print(f"Non-Aarti Avg: {df[df['Is_Aarti']==0]['Crowd_Count'].mean():.0f}")
print(f"Aarti Time Avg: {df[df['Is_Aarti']==1]['Crowd_Count'].mean():.0f}")

# Peak hours
print("\n8. TOP 5 PEAK HOURS")
peak_hours = df.groupby('Hour').agg({
    'Crowd_Count': 'mean',
    'Wait_Time_Minutes': 'mean'
}).sort_values('Crowd_Count', ascending=False).head(5)
print(peak_hours)

# Visualizations
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# Plot 1: Hour-wise crowd
df.groupby('Hour')['Crowd_Count'].mean().plot(kind='bar', ax=axes[0,0], color='skyblue')
axes[0,0].set_title('Average Crowd by Hour of Day')
axes[0,0].set_xlabel('Hour')
axes[0,0].set_ylabel('Average Crowd Count')

# Plot 2: Day-wise crowd
df.groupby('Day')['Crowd_Count'].mean().plot(kind='bar', ax=axes[0,1], color='coral')
axes[0,1].set_title('Average Crowd by Day of Week')
axes[0,1].set_xlabel('Day')
axes[0,1].set_ylabel('Average Crowd Count')

# Plot 3: Festival vs Normal
festival_data = df.groupby('Is_Festival')['Crowd_Count'].mean()
axes[1,0].bar(['Normal', 'Festival'], festival_data, color=['green', 'red'])
axes[1,0].set_title('Festival Impact on Crowd')
axes[1,0].set_ylabel('Average Crowd Count')

# Plot 4: Crowd distribution
axes[1,1].hist(df['Crowd_Count'], bins=30, color='purple', alpha=0.7)
axes[1,1].set_title('Crowd Count Distribution')
axes[1,1].set_xlabel('Crowd Count')
axes[1,1].set_ylabel('Frequency')

plt.tight_layout()
plt.savefig('data_analysis.png', dpi=300, bbox_inches='tight')
print("\n✅ Visualization saved as 'data_analysis.png'")
print("="*60)