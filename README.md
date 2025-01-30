# BOARDING GATE

## Overview
This is a messaging application to monitor real-time boarding gate information at an airport (GateBoard), that uses WebSockets with STOMP protocol.

## Features
- Real-time flight status tracking
- Passenger boarding management
- Gate assignment automation

## Prerequisites
- Node.js 14.x or higher
- PostgreSQL 12+
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/mono789/web-sockets.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
PORT=3000
JWT_SECRET=your_jwt_secret
```
## Running the Application

Development mode:
```bash
npm run dev
```
Production mode:
```bash
npm run build
npm start
```
