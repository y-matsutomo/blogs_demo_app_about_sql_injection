import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import UserPage from "./components/pages/UserPage";
import UserSecurityHolePage from "./components/pages/UserSecurityHolePage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/users" component={UserPage} exact />
        <Route
          path="/usersecurityhole"
          component={UserSecurityHolePage}
          exact
        />
        <Route path="/" component={HomePage} exact />
      </Switch>
    </Router>
  );
};

export default App;
