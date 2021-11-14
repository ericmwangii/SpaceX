import "./App.css";
import logo from "./logo.png";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Launches from "./Components/Launches";
import MissionKeys from "./Components/MissionKeys";
import Launch from "./Components/Launch";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={logo}
            alt="SpaceX"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <h1 className="display-4 my-3">Launches</h1>
          <MissionKeys />
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:id" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
