import {Routes,Route,BrowserRouter} from 'react-router-dom';

import Register from '../src/pages/register';
import Login  from '../src/pages/login';
import Dashboard from '../src/pages/Dashboard';
import Todo from '../src/components/Todo';
import Kanban from '../src/components/Kanban';
import event_sch from '../src/pages/event_sch';
function App() {
  

  return (
    <>
      
      <BrowserRouter>
      
      <Routes>
        
        <Route path="/register" Component={Register}></Route>
        <Route path="/login" Component={Login}></Route>
        {/* <Route path="/Dashboard" Component={Dashboard}></Route> */}
        <Route path="/login/:username/Dashboard" Component={Dashboard}></Route>
        <Route path="/login/:username/Dashboard/todos" Component={Todo}></Route>
        <Route path="/login/:username/Dashboard/Kanban" Component={Kanban}></Route>
        <Route path="/login/:username/Dashboard/Event_schduler" Component={event_sch}></Route>
      </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
