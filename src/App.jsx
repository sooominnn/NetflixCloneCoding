import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const f = async () => {
      const data = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing',
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
          },
        }
      );

      console.log(data.data);
      setResults(data.data.results);
      return data;
    };

    f();
  }, []);

  return (
    <div>
      {results.map((result) => {
        console.log(result);
        return (
          <>
            <div key={result.id}>{result.title}</div>
            <img
              src={`https://image.tmdb.org/t/p/w440_and_h660_face/${result.backdrop_path}`}
              alt=''
            />
          </>
        );
      })}
    </div>
  );
};

export default App;
