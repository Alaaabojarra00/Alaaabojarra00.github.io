import MDEditor from "@uiw/react-md-editor";
import {useEffect, useState,useRef} from 'react';
import './textEditor.css';
import { Cell } from "../state";
import { useAction } from "../hooks/use-actions";

interface TextEditorProp{
    cell:Cell;
    }


const TextEditor:React.FC<TextEditorProp> =({cell}) =>{
const [editing,setEditing] = useState(false);
// const [value,setValue]= useState(' # Header');
const ref = useRef<HTMLDivElement|null>(null)

const {updateCell}=useAction();
useEffect( ()=>{
    const listener=(event:MouseEvent)=>{
if(ref.current&&event.target&&ref.current.contains(event.target as Node)){
    return;
}
        setEditing(false);
    //     console.log(editing)
    // console.log(event.target)
    }
    document.addEventListener('click',listener,{capture:true});
    
return ()=>{
    document.removeEventListener('click',listener,{capture:true});
}
}

,[])
if(editing){
    
    return(
        <div  className="text-editor" ref={ref}>
            <MDEditor value={cell.content} onChange={(v)=>{updateCell(cell.id,v || '')}} />
        </div>
    )
}
    return (
    <div  className="text-editor card" onClick={()=>setEditing(true)}> 
    <div className="card-content">
    <MDEditor.Markdown source={cell.content || 'click to edite'} />
    </div>
    </div>
    )

}

export default TextEditor;