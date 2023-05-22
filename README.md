# Chat Service.

This Chat Service is built with demonstrate the practicality of using NestJs to build a feature rich Chat Application's backend.

## Setup.

Since this service uses a database to persist the messages sent across its lifecycle. You will need to have a supabase account with that gives you access to a postgres DB instance to work with. Grab the database connection details during the setup or from the Supabase settings panel and fill to a `.env` file, an example `.env` file is included to make things easy.

Start your server in dev mode 
```npm run start:dev```

Postman is a good choice for testing Websocket connections.
- Start your postman client 
- Create a new request, choose a websocket request, socket.io option.
- Connect the server through `ws://localhost:3000`
- Register your client events on the event panel
    - Client Events: These are events the connected client listens to from our Websocket gateway.

        1. `recMessage` - used to recieve message sent through `privateMessage` event.
        2. `announcement` - used to recieve message broadcasted through `publicMessage` event.
        3. `userConnected` - used to recieve information about a new client connection.
        4. `userDisconnected` - used to recieve information about a connected client closing a connection
- Connect the client to the webscoket connection.
- To send a private message: choose the message type as JSON; sample payload
    ```
    {
        "text": "Hello Sinia_dev"
        "to": "socketidofanotherclientconnection"
    }
    ```
    - You can get `to` by copy pasting a socketid from `userConnected` event

- To send a public message: choose the message type as JSON
    sample payload
    ```
    {
        "text": "sinia_dev said Hi"
    }
    ```

Server Events: These are events emitted from the service itself programmatically based on some predifined actions.

1. `connection` - adds a user to a users map when the client connects to the gateway.
2. `publicMessage` - used to broadcast messages to all connected clients
3. `privateMessage` - used to mimic one-to-one messaging 
4. `disconnect` - when a client closes their connection.

This discovery demonstrates how a chat service is primarily built and the core underlying technology that can support such implementation. More features can be built on top of this structure based on the requirements.

Happy Hacking :)


