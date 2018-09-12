import * as React from 'react';
import * as socketClient from 'socket.io-client';

export interface AppState {

    messages: string[];
    newMessage: string
}

export class App extends React.Component<{}, AppState> {

    private websocket: SocketIOClient.Socket;

    private newMessage: string = 'Insert message';

    constructor(props: object) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public componentDidMount() {
        this.websocket = socketClient({ transports: ['websocket'], upgrade: false });
        this.websocket.on("reciveMessage", (message: string) => {
            this.setState((prevState, ) => ({ ...prevState, messages: [...this.state.messages, message] }));
        });
    };

    public render() {
        return (
            <>
                <h1>Start App</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input value={this.newMessage} type="text" onChange={this.handleChange} />
                        <input type="submit" value="Send message" />
                    </form>
                </div>
                Messages:
                <div>
                    {this.state.messages.map((message, index) => {
                        return (<>
                            Message {index}: {message}<br />
                        </>);
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
        this.websocket.emit('sendMessage', this.newMessage);
    }
};