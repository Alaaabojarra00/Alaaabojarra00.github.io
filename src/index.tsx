import ReactDom from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import {store} from './state';
import CellList from './component/cell-list';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () =>{
 return ( 
     <Provider store={store}>
 <div>
     <CellList />
     {/* <TextEditor /> */}
{/* <CodeCell /> */}
</div>
</Provider> 
 );
 }
ReactDom.render ( <App /> , document.querySelector('#root') );