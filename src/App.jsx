import { useEffect } from "react";
import "./App.scss";
import { Editor } from "@monaco-editor/react";
import * as mocha from "./monaco-mocha.json";
import palette from "@catppuccin/palette";

function App() {
  return (
    <div className="App">
      <div className="editor-container">
      <Editor
        height="50vh"
        width="50vw"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme="catppuccinmocha"
        loading={<span style={{width: "100%", height: "100%", position: "absolute", backgroundColor: palette.variants.mocha.base}}></span>}
        beforeMount={(monaco) => {
          monaco.editor.defineTheme("catppuccinmocha", mocha)
        }}
      />
      </div>

    </div>
  );
}

export default App;
