



import { Redirect, Route, Switch } from 'react-router-dom';
import Initial from './components/Initial';
import Profile from './components/profile/Profile';
import Details from './components/AnimeDetailsPage/Details';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Forgotpassword from './components/Forgotpassword';
function App() {

  return (
   <AuthProvider>
   
    
     <Switch>
    
     <PrivateRoute exact path="/" component={Profile}/>
     <PrivateRoute exact path="/details/:mal_id" component={Details} />
     <PrivateRoute exact path="/search" component={Initial}/>
     
     <Route exact path="/signup" component={Signup}/>
     <Route exact path="/login" component={Login} />
     
     <Route exact path="/forgot-password" component={Forgotpassword}/>
     <Redirect to="/login"/>
     </Switch>
     
  
    </AuthProvider>
   
  );
}

export default App;
