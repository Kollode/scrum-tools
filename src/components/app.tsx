import * as React from "react";
import * as socketClient from "socket.io-client";
import { ApolloClient } from "apollo-boost";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import * as QRCode from "qrcode.react";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const GET_MESSAGES = gql`
  query {
    messages @client
  }
`;

const GET_CONFIG = gql`
  query {
    config @client
  }
`;

export interface AppProps {
  client: ApolloClient<any>;
}

class App extends React.Component<AppProps, {}> {
  private websocket: SocketIOClient.Socket;

  private newMessage: string = "Insert message";

  constructor(props: AppProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public componentDidMount() {
    this.websocket = socketClient();
    this.websocket.on("reciveMessage", (message: string) => {
      const currentMessages: {
        messages: string[];
      } = this.props.client.readQuery({
        query: GET_MESSAGES
      });
      this.props.client.writeData({
        data: { messages: [...currentMessages.messages, message] }
      });
    });

    console.log("Config", this.props.client.readQuery({ query: GET_CONFIG }));
  }

  public render() {
    return (
      <>
        <h1>Start App</h1>
        <QRCode value="http://192.168.39.169:8080" />
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input onChange={this.handleChange} autoFocus={true} />
            <Button type="submit" variant="contained" color="primary">
              Send message
            </Button>
          </form>
        </div>
        Messages:
        <Query query={GET_MESSAGES}>
          {result => {
            return (
              <div>
                {!result.loading &&
                  result.data.messages &&
                  result.data.messages.map((message: string, index: number) => {
                    return (
                      <Paper key={index}>
                        <Typography component="p">{message}</Typography>
                      </Paper>
                    );
                  })}
              </div>
            );
          }}
        </Query>
      </>
    );
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.newMessage = event.currentTarget.value;
  }

  private handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    this.websocket.emit("sendMessage", this.newMessage);
  }
}

export default withApollo(App);
