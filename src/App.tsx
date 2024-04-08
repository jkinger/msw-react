// Packages
import { FC, useEffect, useState } from "react";

interface IAppProps {}

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 10);
  });
};

const App: FC<IAppProps> = ({}) => {
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState("");

  const handleFetchProductClick = () => {
    if (!fetching) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (fetching === true) {
      if ("serviceWorker" in navigator) {
        // Manually Activate the MSW again
        navigator.serviceWorker.controller?.postMessage("MOCK_ACTIVATE");

        // Quick pause for changes to propagate
        delay().then(() => {
          fetch("/api/product")
            .then(async (res) => {
              const resObj = await res.json();
              setResults(resObj.name);
            })
            .catch((err) => {
              setResults(err.message);
            })
            .finally(() => {
              setFetching(false);
            });
        });
      }
    }
  }, [fetching]);

  return (
    <>
      <h1>React + MSW Testing</h1>
      <hr />
      <div className="card">
        <button onClick={handleFetchProductClick}>Fetch Product</button>
      </div>
      <h2>Results</h2>
      <p>{results}</p>
    </>
  );
};

export default App;
