import { useEffect } from "react";

import firstCss from "./index.module.css";

import reactLogo from "@/assets/react.svg";

import viteLogo from "/vite.svg";

import { setCount, useFirstState } from "@/stores/first";

function App() {
  const count = useFirstState((state) => state.count);

  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={firstCss.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className={`${firstCss.logo} ${firstCss.react}`}
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={firstCss.card}>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={firstCss["read-the-docs"]}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
