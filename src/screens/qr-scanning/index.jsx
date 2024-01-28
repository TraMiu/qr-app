import React, { useRef, useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from "axios";

const QRCodeScanner = ({userId}) => {
  const qrRef = useRef(null);
  const successCount = 0;
  const [results, setResults] = useState(null);

  useEffect(() => {
    const html5QrCode = new Html5QrcodeScanner(
      "qr-reader", 
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    const postStatus = async () => {
        
        const POST_STATUS_API = results[0]
        const key = results[1]
        try {
            await axios.post(POST_STATUS_API, {
                params: { secret_key: key, user_id: userId }
            });
            console.log('Student status posted successfully', POST_STATUS_API);
            alert("User id and key", userId, key)
        } catch (error) {
            console.error('Error posting student status:', error);
            alert("Error", POST_STATUS_API)
        }
    };

    const onScanSuccess = (decodedText, decodedResult) => {
      // Handle the scanned code as required.
      successCount++;
      console.log(`Code matched = ${decodedText}`, decodedResult);
      alert(`Code matched = ${decodedText}`)
      alert(`QR Scanned Successfully`); // Alert the user.

      const newResults = decodedText.split("+");
    
      if(successCount == 1) {
        setResults(newResults)
        postStatus()
      }
    
      
      // Stop scanning once code is found
      html5QrCode.stop().then(ignore => {
        // QR Code scanning is stopped.
      }).catch(err => {
        // Stop failed, handle it.
      });
    };

    const onScanFailure = (error) => {
      // Handle scan failure, usually better to ignore and keep scanning.
      console.warn(`Code scan error = ${error}`);
    };

    // Start scanning
    html5QrCode.render(onScanSuccess, onScanFailure);

    // Cleanup
    return () => {
      html5QrCode.clear();
    };
  }, []);

  return (
    <div>
      <div id="qr-reader" ref={qrRef} style={{ width: "500px" }}></div>
      <div id="qr-reader-results"></div>
    </div>
  );
};

export default QRCodeScanner;
