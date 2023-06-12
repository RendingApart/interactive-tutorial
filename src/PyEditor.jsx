import { Editor } from "@monaco-editor/react";
import * as mocha from "./monaco-mocha.json";
import palette from "@catppuccin/palette";
import { useEffect, useState, useRef } from "react";

function PyEditor({demo, py, codeRan, solutionset}) {
    if (py === undefined) return <p style={{color: "red"}}>Missing python runtime.</p>
    const mon = useRef(null);
    // const namespace = useRef(py.toPy(objects))
    const [code, setCode] = useState(demo)

    return (
    <div className="editor-container">
    <Editor
      height="50vh"
      width="50vw"
      defaultLanguage="python"
      value={code}
      defaultValue={demo}
      theme="catppuccinmocha"
      loading={null}
      beforeMount={(mon) => {
        mon.editor.defineTheme("catppuccinmocha", mocha);
      }}
      onChange={(val) => {
        setCode(val)
      }}
    />
    <button id="code-runner" onClick={(evt) => {
      solutionset.forEach(async (sample, i, arr) => {
        let out = await py.runPythonAsync(code + `\nfunnyfunction(${sample[0]})`);
        codeRan(sample[0], sample[1], out == sample[1])
      })
    }}
  >Run!</button>
  </div>
    )

}

export default PyEditor