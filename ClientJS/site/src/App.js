import { BrowserRouter as Switch, Route } from "react-router-dom";
import "./App.css";
import Users from "./Pages/Users";
import UserForm from "./Pages/UserForm";
import CalcForm from "./Pages/CalcForm";
import CPFForm from "./Pages/CPFForm";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/user-form/:id" exact>
          <UserForm />
        </Route>
        <Route path="/user-form" exact>
          <UserForm />
        </Route>
        <Route path="/calc-form" exact>
          <CalcForm />
        </Route>
        <Route path="/cpf-form" exact>
          <CPFForm />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
