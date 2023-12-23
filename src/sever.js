// server.js

const { ImageAnnotatorClient } = require('@google-cloud/vision');

const visionClient = new ImageAnnotatorClient({
  keyFilename: 'D:\downloads\ocrapp-409013-ce026abb2227.json', // Provide the path to your downloaded JSON key file
});

// OCR processing route
app.post('/process', async (req, res) => {
  try {
    const [result] = await visionClient.textDetection(req.body.image);
    const detections = result.textAnnotations;
    const ocrData = detections.map((text) => text.description).join('\n');
    res.json({ ocrData });
  } catch (error) {
    res.status(500).json({ error: 'Error processing image with Google Vision API' });
  }
});
