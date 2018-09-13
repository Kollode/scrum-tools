import * as React from "react";
import * as socketClient from "socket.io-client";

import * as QRCode from "qrcode.react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export interface AppState {
  messages: string[];
  newMessage: string;
}

export class App extends React.Component<{}, AppState> {
  private websocket: SocketIOClient.Socket;

  private newMessage: string = "Insert message";

  constructor(props: object) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public componentDidMount() {
    this.websocket = socketClient();
    this.websocket.on("reciveMessage", (message: string) => {
      this.setState(prevState => ({
        ...prevState,
        messages: [...this.state.messages, message]
      }));
    });
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
        <div>
          {this.state.messages.map((message, index) => {
            return (
              <Paper>
                <Typography component="p">{message}</Typography>
              </Paper>
            );
          })}
        </div>
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
