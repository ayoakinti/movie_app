import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ECommerce from "./Views/ECommerce";
import Movies from "./Views/Movies";
import Home from "./Views/Home";
import "./App.css";

function App() {
  

  

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/ecommerce">
            <ECommerce />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
