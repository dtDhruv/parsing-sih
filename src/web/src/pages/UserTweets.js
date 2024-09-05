import React, { useState } from 'react';

const UserTweets = () => {
  const [userName, setUserName] = useState('');
  const [numberOfTweets, setNumberOfTweets] = useState('');
  const [resultcomp, setResultComp] = useState(null);

  const postData = async () => {
    const url = 'http://127.0.0.1:8001/api/v1/twitter/usertweets';
    const data = {
      "username": userName,
      "number_of_tweets": Number(numberOfTweets),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      setResultComp(JSON.stringify(result));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    postData();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundImage: `url(${process.env.PUBLIC_URL + '/bg.jpg'})` 
        }}
      >
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

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
      {resultcomp && (
        <div className="result-table-container">
          <h3 style={{ color: 'white', marginBottom: '10px' }}>Fetched Tweets:</h3>
          <table className="result-table">
            <thead>
              <tr>
                <th>Twitter Link</th>
                <th>Text</th>
                <th>Date</th>
                <th>Likes</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {resultcomp.usertweets && 
                Object.keys(resultcomp.usertweets.twitter_link).map((index) => (
                  <tr key={index}>
                    <td>
                      <a href={resultcomp.usertweets.twitter_link[index]} target="_blank" rel="noopener noreferrer">
                        {resultcomp.usertweets.twitter_link[index]}
                      </a>
                    </td>
                    <td>{resultcomp.usertweets.text.key(index)}</td>
                    <td>{resultcomp.usertweets.date.key(index)}</td>
                    <td>{resultcomp.usertweets.likes.key(index)}</td>
                    <td>{resultcomp.usertweets.comments.key(index)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {resultcomp && (
        <div className="raw-data-container" style={{ marginTop: '20px' }}>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>Raw JSON Data:</h3>
          <pre
            className="raw-data"
            style={{
              textAlign: 'left',
              whiteSpace: 'pre-wrap',
              backgroundColor: 'skyblue',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              overflowX: 'auto',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              lineHeight: '1.5',
              color: '#333',
            }}
          >
            {JSON.stringify(JSON.parse(JSON.parse(resultcomp).usertweets), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UserTweets;
