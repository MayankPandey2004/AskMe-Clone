
import React, { useState, useEffect } from 'react';

const Home = () => {

  const [data, setData] = useState(undefined);
  const getApiData = async () => {
    const url = "http://localhost:8080/login";
    let result = await fetch(url);
    result = await result.json();
    setData(result);
  }

  useEffect(() => {
    getApiData();
  }, [])
  console.log(data)
  return (
    <>
      <pre>
        {data ? (
          <div>
            <p style={{ fontSize: '30px' }}>Title: {data.name}</p>
            <span>{data.name}</span>
            <div>
              {data.qanda_bar.map((tabu) => (
                <p>
                  {tabu}
                </p>
              ))}
            </div>
          </div>

        ) : null}
      </pre>
    </>
  );
}

export default Home;








