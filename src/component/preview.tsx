import React from "react";
import {useEffect,useRef} from 'react';
import './preview.css';

interface previewProp{
 code:string;
 err:string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
    const handleError =(err)=>{
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      console.error(err);
    }
    window.addEventListener('error',(event)=>{
   handleError(event.error);
    })
      window.addEventListener('message', (event) => {
        try {
            eval(event.data);
          } catch (err) {
          handleError(err);
          }
      }, false);
    </script>
  </body>
</html>
`;

const Preview:React.FC<previewProp> = ({code,err}) =>{
    const iframe = useRef<any>();
    
    useEffect( () => {
        iframe.current.srcDoc=html;
        setTimeout(()=>{
          iframe.current.contentWindow.postMessage(code , '*');
        }
        ,50)
        
    },[code]);
return( <div className="preview-wrapper">
  <iframe style={{backgroundColor:'white'}} title='code review' ref={iframe} sandbox="allow-scripts" srcDoc={html} /> 
  {err&&<div className="preview-error">{err}</div>}
  </div>
  )
}

export default Preview;