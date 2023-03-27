import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


export default function Code() {
  return (
    <div>
        <AceEditor
            mode="java"
            theme="github"
            // onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
        />

    </div>
  )
}
