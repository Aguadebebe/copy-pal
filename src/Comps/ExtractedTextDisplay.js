import React, { useEffect, useState } from "react";

const ExtractedTextDisplay = ({ extractedText, url }) => {
  const [formattedText, setFormattedText] = useState("");

  useEffect(() => {
    // Function to manually format the extracted text
    const formatText = (text) => {
      // Replace newlines with <br> to preserve line breaks
      let formatted = text.replace(/\n/g, "<br/>");

      // Example: Wrap paragraphs with <p> tags if not already wrapped
      formatted = formatted.replace(/([^<]*)(\n|$)/g, "<p>$1</p>");

      return formatted;
    };

    // Format the extracted text
    if (extractedText) {
      setFormattedText(formatText(extractedText));
    }
  }, [extractedText]);

  return (
    <div>
      <h3>Extracted Text from URL: {url}</h3>
      <h3>Extracted Text:</h3>
      <div
        dangerouslySetInnerHTML={{ __html: formattedText }} // Render formatted text
      />
    </div>
  );
};

export default ExtractedTextDisplay;


 