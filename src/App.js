import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import {AuthProvider} from './Context/AuthContext';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Feed from './Components/Feed';

// import {makeStyles} from '@material-ui/styles'



function App() {

  return (
    
      <>
        <BrowserRouter>
          <AuthProvider>
            <Switch>
            <Route path="/Login" component={Login}></Route>
            <Route path="/SignUp" component={SignUp}></Route>
            <PrivateRoute path = "/" component={Feed}></PrivateRoute>
            </Switch>
          </AuthProvider>

          {/* We all know that when we have a non-self closing functional component then all the other components that come in between its start tag and close tag are considered as its children and can be passed through props to other components 
          The <AuthProvider> component encloses the Login and the Sign Up components. Now, these components are considered as the children of the <AuthProvider> component. So in our <AuthProvider> functional component, we will take children as an argument.*/}


        </BrowserRouter>
      </>
  
  );
}


export default App;
