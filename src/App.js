



import { Route, Switch } from 'react-router-dom';
import Initial from './components/Initial';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import Myanime from './components/Myanime';
import Details from './components/AnimeDetailsPage/Details';
function App() {

  return (
   
    <div>
     
      <Switch>
      <Route exact path="/" component={Initial} />
     <ProtectedRoute exact path="/profile" component={Profile}/>
     <ProtectedRoute exact path="/anime" component={Myanime}/>
     <ProtectedRoute exact path="/details/:mal_id" component={Details}/>
      </Switch>
    </div>
   
  );
}

export default App;
