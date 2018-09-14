import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import App from "./components/app";
import { apolloClient } from "./state/apollo-client";

ReactDOM.hydrate(
  <ApolloProvider client={apolloClient}>
    <App client={apolloClient} />
  </ApolloProvider>,
  document.getElementById("app")
);
