import './add-cell.css';
import { useAction } from '../hooks/use-actions';

interface AddCellProps{
    nextCellId:string | null;
    foceVisible?:boolean;
}

const AddCell:React.FC<AddCellProps> = ({foceVisible,nextCellId})=>{
 const {insertCellAfter} = useAction();


    return (
        <div className={`add-cell ${foceVisible &&'force-visible'} `}>
          <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(nextCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(nextCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
            {/* <button onClick={()=>insertCellBefore(nextCellId,'code')}>Code</button>
            <button onClick={()=>insertCellBefore(nextCellId,'text')}>Text</button> */}
            
        </div>
    )
}
export default AddCell;