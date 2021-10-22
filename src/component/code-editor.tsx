import MonacoEditor ,{EditorDidMount} from '@monaco-editor/react';
import Prettier from 'prettier';
import parser from 'prettier/parser-babel';
import {useRef} from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './code-editor.css';
import Highlighter from 'monaco-jsx-highlighter';
import codeshift from 'jscodeshift';
import './syntax.css';

interface CodeEditorProps{
initialValue:string;
onChange (value :string):void;
}

const CodeEditor:React.FC<CodeEditorProps> = ({onChange,initialValue}) =>{
    const editorRef = useRef<any>();
const onEditorDidMount:EditorDidMount = (getValue: ()=> string , monacoEditor) =>{
// console.log(getValue());
editorRef.current=monacoEditor;
monacoEditor.onDidChangeModelContent( () => {
   onChange(getValue()) 
})
monacoEditor.getModel()?.updateOptions({tabSize:3})
const highlighter=new Highlighter(
    // @ts-ignore
window.monaco,
codeshift,
monacoEditor
)
highlighter.highLightOnDidChangeModelContent(
    () => {},
    () => {},
    undefined,
    () => {}
  );

// const babelParse = (code:string) => parse(code, {
//     sourceType: "module",
//     plugins: ["jsx"]
//  });
//  const defaultOptions = {
//     parser: 'babel', // for reference only, only babel is supported right now
//     isHighlightGlyph: false, // if JSX elements should decorate the line number gutter
//     iShowHover: false, // if JSX types should  tooltip with their type info
//     isUseSeparateElementStyles: false, // if opening elements and closing elements have different styling
//     isThrowJSXParseErrors: false, // Only JSX Syntax Errors are not thrown by default when parsing, true will throw like any other parsign error
//   };
//  const highlighter = new  Highlighter(
//      //@ts-ignore
//     window.monaco,  babelParse, traverse ,monacoEditor, defaultOptions
//  );
//  // Activate highlighting (debounceTime default: 100ms)
//  highlighter.highlightOnDidChangeModelContent(100);
    

}


const onFormatClick = ()=>{
//get the current value from editor
const unFormatted =editorRef.current.getModel().getValue();
//format that value
const formatted= Prettier.format(unFormatted ,{
    parser : 'babel',
    plugins: [parser],
    useTabs:false,
    semi:true,
    singleQuote:true

}).replace(/\n$/,"");
//set the formatted value back in the editor
editorRef.current.setValue(formatted)
}

return (
<div className="editor-wrapper">
    <button  className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
<MonacoEditor
editorDidMount={onEditorDidMount}
value={initialValue}
theme="dark"
language="javascript"
height="100%"
options={
    {
        wordWrap:"on" ,
        minimap: {
            enabled:false
        },
        showUnused:false,
        folding:false,
        lineNumbersMinChars:3,
        fontSize:16,
        scrollBeyondLastLine:false,
        automaticLayout:true
    
    }
}


/>
</div>
)
};


export default CodeEditor;