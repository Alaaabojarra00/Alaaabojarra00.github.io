import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";
import './cell-list.css'
const CellList:React.FC = ()=>{
 const cells=useTypedSelector(({cells:{data,order}})=>{
 
const c= order.map((id)=>{
    return data[id];
});
return c;
    });
  const renderCells=cells.map(cell=>(    
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
    <AddCell nextCellId={cell.id} />
    </Fragment>
  ));


    return <div className="cell-list">
        
        <AddCell foceVisible={cells.length===0} nextCellId={null} />
        {renderCells}
    </div>
    }
    
    export default CellList;