import "./App.scss";
import { loadPyodide } from "pyodide";
import { useEffect, useState, useRef } from "react";
import PyEditor from "./PyEditor";

async function initPyodide() {
  return await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.2/full/",
  });
}

async function pyRunCode(pyodide, code) {
  console.log(`code: ${code}`);
  return pyodide.runPythonAsync(code);
}

function App() {
  const [pyodide, setPyodide] = useState();
  const [codeOut, setCodeOut] = useState("");

  useEffect(() => {
    (async () => {
      setPyodide(await initPyodide());
    })();
  }, []);

  return (
    <div className="App">
      <h1>Interactive Code Tutorial</h1>
      <p>
        Sadly, this project turned out to be larger than initially imagined.
        <br />
        This will only have one challenge just for demonstration purposes.
      </p>
      <br />
      <p>
        Your goal is to write a function that multiplies the input value by
        three and adds two.
        <br />A function that multiplies the input by two is provided for
        reference.
      </p>
      <PyEditor
        py={pyodide}
        demo={`# Replace the code in the
# following function with 
# your solution.
def funnyfunction(a):
  return a * 2`}
        codeRan={(valid) => {
          setCodeOut(
            valid ? "Valid!" : "Invalid :("
          );
        }}
        solutionset={[
          [1, 5],
          [2, 8],
          [3, 11],
          [4, 14],
          [5, 17],
        ]}
      />
      <div className="output-container">
        <p>Output:</p>
        <code>{codeOut}</code>
      </div>
    </div>
  );
}

export default App;
