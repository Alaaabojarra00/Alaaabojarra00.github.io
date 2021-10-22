
import {useEffect} from 'react';
import CodeEditor from '../component/code-editor';
import Preview from '../component/preview';
import Resizable from './resizable';
import {useAction} from '../hooks/use-actions';
import {Cell} from '../state';
import {useTypedSelector} from '../hooks/use-typed-selector';
import './code-cell.css';
import {useCumulativeCode} from '../hooks/use-cumulative-code';


interface CellListItemprop{
    cell:Cell;
}

const CodeCell:React.FC<CellListItemprop> = ({cell}) => {

//this lines was before use redux now i have to update from local state to globale state useing useAction method
// const [code , setCode] = useState('');
// const [err,setError] = useState('');
// const [input , setInput] = useState('');
const {updateCell, createBundle} = useAction();
 const bundle= useTypedSelector((state)=>state.bundles[cell.id]);
// const [code , setCode] = useState('');

const cumulativeCode=useCumulativeCode(cell.id)
useEffect(() => {
    if (! bundle){
        createBundle(cell.id,cumulativeCode.join('\n'));
        return;
    }
    const timer=setTimeout( async()=>{
        // i am removing the local state becouse the result of bundling proces store in redux store
    // const output = await bundle(cell.content)
    // setCode(output.code);
    // setError(output.err);

    createBundle(cell.id,cumulativeCode.join('\n'));
    }
    ,2000);
    return () => {
        clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [cumulativeCode.join('\n'),cell.id,createBundle]);

// console.log(bundle);

// const onClick = async() =>{

// // const result =await ref.current.transform(input , 
// //     {
// //         loader:'jsx',
// //         target: 'es2015'
// //     })

// // console.log(result);

//     // try {
//     //     // eslint-disable-next-line
//     //  eval(result.outputFiles[0].text);
//     // } catch (error) {
//     //    alert(error); 
//     // }

    
// };
 

    

 return (  
     <Resizable directon="vertical" >
    <div style= {{height:'calc(100% - 10px)' , display:'flex' , flexDirection:'row'}}>
        <Resizable directon='horizantel'>
        <CodeEditor onChange={(value) => updateCell(cell.id,value)} initialValue={cell.content} />
     {/* <textarea value={input} onChange= {e => setInput(e.target.value)}  >

         </textarea> */}
     {/* <div>
         <button onClick ={onClick}>submit</button>
     </div> */}
     </Resizable>
     <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
     {/* <iframe title='code review' ref={iframe} sandbox="allow-scripts" srcDoc={html} /> */}
    </Resizable>
 )

};
export default CodeCell;