# Flight Tracker - Real-Time Flight Monitoring

This project implements a real-time flight monitoring system using WebSockets with the STOMP protocol. The backend is developed in **Spring Boot**, and the frontend is built with **React**. The system allows users to visualize flight data (latitude, longitude, speed, altitude, course, and flight code) in a dynamic graphical interface.

## Key Features

- **Real-time communication**: Uses WebSockets to maintain bidirectional communication between the client and server.
- **Dynamic visualization**: Displays flight data in a table that updates in real time.
- **Data simulation**: The backend generates random flight data and sends it to subscribed clients.
- **Multiple clients**: Supports multiple clients connected simultaneously, each receiving real-time updates.

## Technologies Used

### Backend
- **Spring Boot 3.2.10**: Framework for building Java applications.
- **WebSockets with STOMP**: Protocol for real-time communication.
- **Java 17**: Programming language.
- **Maven**: Dependency management.

### Frontend
- **React 18.3.1**: Library for building user interfaces.
- **@stomp/stompjs**: Library for handling STOMP connections in the frontend.
- **sockjs-client**: Library for establishing WebSocket connections.
- **@mui/material**: UI component library.

### Development Tools
- **IntelliJ IDEA**: IDE for Java development.
- **Visual Studio Code**: Code editor for React development.
- **Postman**: Tool for API testing.
- **Chrome Developer Tools**: For debugging and network analysis.

## Installation and Setup

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/mono789/web-sockets.git
   cd demows
   ```
2. Install dependencies with Maven:
   ```bash
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The server will be available at http://localhost:8080.

### Frontend
1. Navigate to the frontend directory:
   ```
   cd front-demows
   ```
3. Install dependencies with npm:
   ```
   npm install
   ```
5. Start the React application:
   ```
   npm start
   ```
   The application will be available at http://localhost:3000.

## Project Structure
 ```
project/
├── demows/                  # Backend code in Spring Boot
│   ├── src/                  # Application source code
│   └── pom.xml               # Maven configuration
├── front-demows/                 # Frontend code in React
│   ├── src/                  # Application source code
│   └── package.json          # npm configuration
└── README.md                 # Project documentation
 ```

## Usage

1. Open the application in your browser: ```http://localhost:3000.```
2. You will see a table displaying real-time flight data.
3. The data is automatically updated every 5 seconds.

### Example Flight Data
 ```
{
  "flightCode": "AA586",
  "latitude": 40.70113698509554,
  "longitude": -74.0172555250061,
  "course": 61.212535535130854,
  "speed": 416.13825746673064,
  "altitude": 31598.527060854663,
  "timestamp": "2024-11-22T16:51:09.1636889"
}
 ```
