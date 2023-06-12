import "./App.scss";
import { loadPyodide } from "pyodide";
import { useEffect, useState, useRef } from "react";
import PyEditor from "./PyEditor";

async function initPyodide() {
  return await loadPyodide({
    indexURL : "https://cdn.jsdelivr.net/pyodide/v0.23.2/full/"
  });
}

async function pyRunCode(pyodide, code) {
  console.log(`code: ${code}`)
  return pyodide.runPythonAsync(code);
}

function App() {
  const [pyodide, setPyodide] = useState()
  const [codeOut, setCodeOut] = useState("");

  useEffect(() => {
    (async ()=>{
      setPyodide(await initPyodide())
    })()
  }, [])

  return (
    <div className="App">
      <h1>Interactive Code Tutorial</h1>
      <div className="output-container">
        <p>Output</p>
        <code>
        {codeOut} 
        </code>
      </div>
      <PyEditor py={ pyodide } namespace={{x: 64}} codeRan={(out) => {
        setCodeOut(out)
      }} />
    </div>
  );
}

export default App;
