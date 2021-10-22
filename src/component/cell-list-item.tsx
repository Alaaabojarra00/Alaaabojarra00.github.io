import { Cell } from '../state';
import CodeCell from './codeCell';
import TextEditor from './texrEditor';
import ActionBar from './action-bar';
import './cell-list-item.css';

interface CodeCellProp{
cell:Cell;
}

const CellListItem:React.FC<CodeCellProp> = ({cell})=>{
    let child :JSX.Element;
    if (cell.type==='text'){
      child=  <>
      <ActionBar id={cell.id} />
      <TextEditor cell={cell}/>
</>
    }
    else{
        
      child=
      <>
<div className="action-bar-wrapper">
      <ActionBar id={cell.id} />
      </div>
      <CodeCell cell={cell} />
      </>
    }
return (
    <div className="cell-list-item">
    
    {child}
    </div>
       )
}

export default CellListItem;