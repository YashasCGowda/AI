from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/symptom-check")
async def symptom_check(data: dict):
    return {"conditions": ["Possible flu", "Cold"]}

@app.post("/api/image-analysis")
async def image_analysis(file: UploadFile = File(...)):
    try:
        # Get the file extension
        file_extension = os.path.splitext(file.filename)[1].lower()
        image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'}

        # Check if the file is an image based on its extension
        if file_extension not in image_extensions:
            return {
                "diagnosis": f"Non-image file detected ({file_extension}). Image analysis is not applicable.",
                "average_brightness": "Not available"
            }

        # Read the uploaded file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Convert image to grayscale for brightness analysis
        image_gray = image.convert("L")
        
        # Convert image to numpy array to calculate average brightness
        image_array = np.array(image_gray)
        avg_brightness = np.mean(image_array)

        # Simple threshold-based diagnosis
        if avg_brightness < 100:  # Dark image (0-255 scale, lower is darker)
            diagnosis = "Possible dense tissue detected (dark image)"
        else:
            diagnosis = "Normal tissue density (light image)"

        return {"diagnosis": diagnosis, "average_brightness": float(avg_brightness)}
    except Exception as e:
        return {"error": f"Failed to analyze file: {str(e)}"}

@app.post("/api/medication-check")
async def medication_check(data: dict):
    return {"interactions": []}

@app.post("/api/chatbot")
async def chatbot(data: dict):
    return {"response": "I'm here to help. How are you feeling?"}

@app.get("/api/hospital-resources")
async def hospital_resources():
    return {"beds_available": 50, "predicted_need": 60}