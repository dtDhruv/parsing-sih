import React, { useState } from 'react';

const GenerateReport = () => {
    const [userName, setUserName] = useState('');
    const [numberOfTweets, setNumberOfTweets] = useState('');
    const [reportLink, setReportLink] = useState(null);
    const [fileName, setFileName] = useState('');

  const postData = async () => {
    const url = 'http://127.0.0.1:8001/api/v1/twitter/generatereport';
    const data = {
        "username": userName,
        "number_of_tweets": Number(numberOfTweets),
      };

    try {
      const response = await fetch(url, {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is JSON
        },
        body: JSON.stringify(data), // Convert data to JSON
      });

      const result = await response.json(); // Parse the response as JSON
      const filename = result.user_reports; // Assume the API returns the file name

      console.log(filename);
      setFileName(fileName);
      console(fileName);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    await postData();
    const pdfUrl = "../../"+fileName;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
                <div style={{ marginBottom: '15px' }}>
          <label
            htmlFor="userName"
            style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold',color:'white' }}
          >
            User Name:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label
            htmlFor="numberOfTweets"
            style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold',color:'white' }}
          >
            Number of Tweets:
          </label>
          <input
            type="number"
            id="numberOfTweets"
            value={numberOfTweets}
            onChange={(e) => setNumberOfTweets(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>
      <form onSubmit={handleSubmit}>
        <h3 style={{color:'wheat'}}>
            Click on below button to download PDF
            file
        </h3>
        <button type="submit">Generate Report</button>
      </form>

    </div>
  );
};

export default GenerateReport;
