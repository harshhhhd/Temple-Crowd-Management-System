"""
calibration_tool.py  —  Temple Heatmap Calibration
====================================================
1. Opens the video → click 4 ground-plane landmarks
2. Opens the map image → click the SAME 4 landmarks
3. Saves the result to  calibration.json  (auto-loaded by crowd_detector.py)
"""

import cv2
import numpy as np
import json
import os

# ==================== CONFIGURATION ====================
VIDEO_PATH    = r'D:\PravaahProject(finalai)\pravaah project_till heatmap - Copy\pravaah project_till heatmap\pravaah project\backend\public\assets\crowd1.mp4'
MAP_PATH      = r'D:\PravaahProject(finalai)\pravaah project_till heatmap - Copy\pravaah project_till heatmap\pravaah project\backend\public\assets\temple_1.png'
OUTPUT_FILE   = 'calibration.json'   # <-- auto-loaded by crowd_detector.py

print("=" * 60)
print("  TEMPLE HEATMAP CALIBRATION TOOL")
print("=" * 60)
print(f"\nVideo : {os.path.abspath(VIDEO_PATH)}")
print(f"Map   : {os.path.abspath(MAP_PATH)}")
print(f"Output: {os.path.abspath(OUTPUT_FILE)}")

# ==================== LOAD ASSETS ====================
cap = cv2.VideoCapture(VIDEO_PATH)
if not cap.isOpened():
    print(" Cannot open video! Check VIDEO_PATH.")
    exit(1)

ret, frame = cap.read()
cap.release()
if not ret:
    print(" Cannot read first frame from video!")
    exit(1)

map_img = cv2.imread(MAP_PATH)
if map_img is None:
    print(" Cannot open map image! Check MAP_PATH.")
    exit(1)

MAP_HEIGHT, MAP_WIDTH = map_img.shape[:2]
print(f"\n Map dimensions : {MAP_WIDTH} × {MAP_HEIGHT} px")
print(f" Video frame    : {frame.shape[1]} × {frame.shape[0]} px\n")

# ==================== POINT PICKERS ====================
video_points = []
map_points   = []

frame_copy = frame.copy()
map_copy   = map_img.copy()

def pick_video(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN and len(video_points) < 4:
        video_points.append([x, y])
        n = len(video_points)
        cv2.circle(frame_copy, (x, y), 8, (0, 255, 0), -1)
        cv2.putText(frame_copy, str(n), (x + 10, y + 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
        cv2.imshow('VIDEO — click 4 ground-plane points', frame_copy)
        print(f"  Video point {n}: ({x}, {y})")
        if n == 4:
            print(" 4 video points captured! Now click the map…\n")

def pick_map(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN and len(map_points) < 4:
        map_points.append([x, y])
        n = len(map_points)
        cv2.circle(map_copy, (x, y), 8, (255, 0, 0), -1)
        cv2.putText(map_copy, str(n), (x + 10, y + 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        cv2.imshow('MAP — click the SAME 4 points', map_copy)
        print(f"  Map point {n}: ({x}, {y})")
        if n == 4:
            save_calibration()

# ==================== SAVE ====================
def save_calibration():
    data = {
        "map_width":    MAP_WIDTH,
        "map_height":   MAP_HEIGHT,
        "video_points": video_points,
        "map_points":   map_points
    }
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(data, f, indent=2)

    print("\n" + "=" * 60)
    print(f" Calibration saved - {OUTPUT_FILE}")
    print("  crowd_detector.py will load it automatically.")
    print("=" * 60)

    # Also print for manual reference
    print("\nVIDEO_POINTS = np.float32([")
    for i, pt in enumerate(video_points):
        print(f"    {pt},  # {i+1}")
    print("])\n")
    print("MAP_POINTS = np.float32([")
    for i, pt in enumerate(map_points):
        print(f"    {pt},  # {i+1}")
    print("])\n")

    cv2.waitKey(2000)
    cv2.destroyAllWindows()

# ==================== MAIN ====================
print("INSTRUCTIONS")
print("  1. Click 4 clear GROUND-PLANE landmarks in the VIDEO window")
print("     (e.g. pillar bases, floor tiles, door corners)")
print("  2. Click the SAME 4 landmarks in the MAP window")
print("  3. calibration.json is saved automatically\n")

cv2.namedWindow('VIDEO — click 4 ground-plane points')
cv2.setMouseCallback('VIDEO — click 4 ground-plane points', pick_video)
cv2.imshow('VIDEO — click 4 ground-plane points', frame_copy)

print(" Click 4 ground points on the VIDEO…")
while len(video_points) < 4:
    if cv2.waitKey(50) & 0xFF == 27:
        print("Cancelled.")
        cv2.destroyAllWindows()
        exit(0)

cv2.namedWindow('MAP — click the SAME 4 points')
cv2.setMouseCallback('MAP — click the SAME 4 points', pick_map)
cv2.imshow('MAP — click the SAME 4 points', map_copy)

print(" Click the SAME 4 points on the MAP…")
while len(map_points) < 4:
    if cv2.waitKey(50) & 0xFF == 27:
        print("Cancelled.")
        cv2.destroyAllWindows()
        exit(0)

cv2.waitKey(0)
cv2.destroyAllWindows()
