import { useState, useEffect } from 'react';

const useFetch = (url, hardCodedData) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let result = [];
    const fetchData = async () => {
      try {
        if(url === null){
            result = hardCodedData
        } else{
            const response = await fetch(url);
            result = await response.json();
        }
        setData(result);
      } catch (error) {
        console.log("error while fetching data from url", error)
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
