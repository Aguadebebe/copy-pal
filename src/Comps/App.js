 
import React, { useState } from "react";
import UrlInput from "./UrlInput";
import ExtractedTextDisplay from "./ExtractedTextDisplay";
import DownloadButton from "./DownloadButton";
import "../App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [inputFieldData, setInputFieldData] = useState("");
  const [error, setError] = useState(null); // Error state for API failure

  // Function to clean up text (remove non-alphanumeric characters)
  const extractText = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const extractedText = doc.body.innerText;
    return extractedText;
  };

  const fetchExtractedText = async (url) => {
    console.log("Fetching data from backend for URL:", url);
    try {
      const response = await fetch(`http://localhost:5000/api/scrape?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        console.error("Error: Backend returned an error status:", response.status);
        throw new Error("Failed to fetch data from the backend.");
      }

      const data = await response.json();
      console.log("Data from backend:", data); // Check full data to verify structure

      if (data && data.extractedText) {
        // Use extractText function to clean up the raw HTML and get the visible text
        const extractedText = extractText(data.extractedText); 
        setExtractedText(extractedText); // Update state with the extracted text
      } else {
        console.error("No extractedText found in the response data.");
      }

    } catch (error) {
      console.error("Error fetching or parsing content from backend:", error);
    }
  };

  const handleSubmit = () => {
    if (!inputFieldData) {
      setError("URL input is empty!");
      return;
    }

    setUrl(inputFieldData); // Set the URL state before fetching
    fetchExtractedText(inputFieldData); // Call the function to fetch data and extract text
    setInputFieldData(""); // Clear the input field after submission
    setError(null); // Clear any previous errors
  };

  return (
    <div>
      <h1>Copy Pal</h1>
      <div>App - Parent component</div>
      <UrlInput
        inputFieldData={inputFieldData}
        setInputFieldData={setInputFieldData}
        handleSubmit={handleSubmit}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}  
      <ExtractedTextDisplay extractedText={extractedText} url={url} />
      <DownloadButton />
    </div>
  );
};

export default App;
 