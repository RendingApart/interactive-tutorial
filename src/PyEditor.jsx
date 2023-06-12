import { Editor } from "@monaco-editor/react";
import * as mocha from "./monaco-mocha.json";
import palette from "@catppuccin/palette";
import { useEffect, useState, useRef } from "react";

function PyEditor({py, codeRan, objects}) {
    if (py === undefined) return <p style={{color: "red"}}>Missing python runtime.</p>
    const mon = useRef(null);
    // const namespace = useRef(py.toPy(objects))
    const [code, setCode] = useState("# example")

    return (
    <div className="editor-container">
    <Editor
      height="50vh"
      width="50vw"
      defaultLanguage="python"
      value={code}
      defaultValue="# example"
      theme="catppuccinmocha"
      loading={null}
      beforeMount={(mon) => {
        mon.editor.defineTheme("catppuccinmocha", mocha);
      }}
      onChange={(val) => {
        setCode(val)
      }}
    />
    <button id="code-runner" onClick={async (evt) => {
      let namespace = py.toPy(objects)
      let out = await py.runPythonAsync(code, namespace);
      codeRan(out)
    }}
  >Run!</button>
  </div>
    )

}

export default PyEditor