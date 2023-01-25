# random-chat-app
This project is a project built using React.js and Express.js where one can chat in real-time with random people.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Because this project still needs some improvements.

### Prerequisites
What things you need to run this project:
- Node.js (mine v.18.12.1)

### Installing
- git clone https://github.com/salassep/random-chat-app.git

#### Front End (Client)
- cd client
- npm install

#### Back End (Server)
- cd server
- npm install

### Set Environment Variables
To set up the environment variables, create a new file named `.env` in the root directory of the client directory and server directory and add the following variables:

#### Front End Environment Variables
In the **/client**
* REACT_APP_SOCKET_HOST='localhost'
  * is the host of the socket server, default is **localhost**
* REACT_APP_SOCKET_PORT=4000
  * is the port of the socket server, default is **4000**
* PORT=3000
  * is the port for react app, default is **3000**

#### Back End Environment Variables
In the **/server**
* SOCKET_CLIENT='localhost'
  * is the client that will connect to the server, default is **localhost**
* SOCKET_CLIENT_PORT=3000
  * is the client port that will connect to the server, default is **3000**
* PORT=3000
  * is the port for express app, default is **4000**

### Running the Development
#### Front End (Client)
- cd client (from the root directory)
- npm start

#### Back End (Server)
- cd server (from the root directory)
- npm run dev

## Built With

* [Node.js](https://nodejs.org/) - The JavaScript runtime
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Express.js](https://expressjs.com/) - Back end web application framework
* [React.js](https://reactjs.org/) - Front-end JavaScript library
* [Socket.IO](https://socket.io/) - Event-driven library for real-time web applications

## Acknowledgments
* Hat tip to anyone whose code was used


