import * as express from "express";
import { renderToString } from "react-dom/server";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as dotenv from "dotenv";

import App from "./components/app";
import { apolloClient } from "./state/apollo-client";
import { htmlTemplate } from "./server/html-template";
import { initializeWebsocket } from "./server/websocket";

const app = express();
dotenv.config();

app.use(express.static("dist"));

app.get("/", (req, res) => {
  apolloClient.writeData({ data: { config: "TestFromServer" } });

  const ServerApp = (
    <ApolloProvider client={apolloClient}>
      <App client={apolloClient} />
    </ApolloProvider>
  );

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    htmlTemplate(renderToString(ServerApp), {
      apolloState: apolloClient.extract()
    })
  );
  res.send();
});

const post = process.env.PORT || 8080;
const server = app.listen(post, function() {
  console.log(`Started server under 'http://localhost:${post}'`);
});

initializeWebsocket(server);
