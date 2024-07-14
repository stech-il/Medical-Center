
# Queue Management System for Medical Center

## Introduction

This project is a real-time queue management system designed for a medical center. It consists of a Node.js server, a React client, and a MySQL database. The system uses `socket.io` for real-time communication, allowing seamless updates and synchronization of queue information across different components.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time queue updates using `socket.io`
- Doctor interface for updating queue information
- Central monitor displaying real-time queue status
- Room-specific queue management
- Persistent storage of queue data in MySQL database

## Technologies Used

- **Backend:** Node.js, Express, `socket.io`, MySQL
- **Frontend:** React, `socket.io-client`
- **Database:** MySQL

## System Architecture

1. **Node.js Server:**
   - Handles API requests
   - Manages WebSocket connections using `socket.io`
   - Interacts with MySQL database for persistent storage

2. **React Client:**
   - Provides user interface for doctors and central monitor
   - Connects to the server via WebSockets for real-time updates

3. **MySQL Database:**
   - Stores persistent queue data

## Installation

### Prerequisites

- Node.js and npm
- MySQL server
- Git

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/queue-management-system.git
   cd queue-management-system
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```

3. **Frontend Setup:**
   ```bash
   cd client
   npm install
   ```

4. **Database Setup:**
   - Create a MySQL database and import the schema from `server/db/schema.sql`.

## Configuration

### Server

1. **Environment Variables:**
   Create a `.env` file in the `server` directory with the following content:
   ```env
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   ```

### Client

1. **Environment Variables:**
   Create a `.env` file in the `client` directory with the following content:
   ```env
   REACT_APP_SOCKET_SERVER_URL=http://localhost:3001
   ```

## Running the Application

1. **Start the Backend Server:**
   ```bash
   cd server
   npm start
   ```

2. **Start the Frontend Client:**
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the client.

## API Endpoints

### Base URL: `http://localhost:3001/api`

- `GET /queue`: Retrieve the current queue status.
- `POST /queue`: Update the queue status.
- `PUT /queue`: Modify an existing queue entry.
- `DELETE /queue/:id`: Remove a queue entry by ID.

## Socket Events

### Client to Server

- `subscribeToRoom`: Subscribe to a specific room's queue updates.
- `updateQueue`: Update the queue with new patient information.
- `transferPatient`: Transfer a patient from one room to another.

### Server to Client

- `queueUpdate`: Broadcasted when the queue is updated.
- `patientTransfer`: Broadcasted when a patient is transferred to another room.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
