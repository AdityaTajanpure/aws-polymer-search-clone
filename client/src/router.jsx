import Header from "./components/Header";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Query from "./pages/Query";
import chart from "./pages/Chart";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { DataContext } from "./context/context";

export default function Router() {
  const { loading, error } = useContext(DataContext);
  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <div className=" d-flex md">
          <Sidebar />
          <Switch>
            <Route path="/search" component={Query} />
            <Route path="/chart" component={chart} />
            <Route path="/">
              <Redirect to="/search" />
            </Route>
          </Switch>
        </div>
      )}
    </BrowserRouter>
  );
}
