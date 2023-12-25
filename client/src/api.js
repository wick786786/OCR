import axios from "axios";
import { extractThaiIDCardData } from "./ocrUtils";
export const uploadImage = (e, setImage, setOcrResult, setErrorMessage) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  setImage(selectedFile);
  setOcrResult(null);
  setErrorMessage("");
};

export const processImage = async (image, setOcrResult, setErrorMessage) => {
  if (!image) {
    setErrorMessage("Please upload an image first.");
    return;
  }

  const base64Image = await convertImageToBase64(image);
  try {
    const requestData = {
      requests: [
        {
          image: { content: base64Image },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        },
      ],
    };
    const { data } = await axios.post(
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBGxOf7sgo5ZPoPp4EAP-pic-6x0Nh92gQ",
      requestData
    );
    const extractedData = extractThaiIDCardData(
      data.responses[0].fullTextAnnotation.text
    );
    console.log(extractedData);

    const identificationNoExists = await axios.get(
      `http://localhost:5000/api/idCard/${extractedData.identificationNo}`
    );

    if (!identificationNoExists.data) {
      const resp = await axios.post(
        "http://localhost:5000/api/idCard",
        extractedData
      );
      console.log(resp);
    }

    setOcrResult(extractedData);
    setErrorMessage("");
  } catch (error) {
    console.error(error);
    setErrorMessage("Error processing image.");
  }
};

export const convertImageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(imageFile);
  });
};
