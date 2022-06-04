import './App.css';
import React from "react";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./context/AuthProvider";
import AppProvider from "./context/AppProvider";
import AddRoom from "./components/Modals/AddRoom";
import InviteMember from "./components/Modals/InviteMember";

function App() {
  const history = useHistory();
  return (
    <Router history={history}>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route exact component={ChatRoom} path='/' />
            <Route exact component={Login} path='/login' />
          </Switch>
          <AddRoom />
          <InviteMember />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
