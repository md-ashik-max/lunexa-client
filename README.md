# Lunexa

Welcome to the Lunexa repository! Lunexa is a modern web application designed for task management with user authentication and real-time updates. This guide will walk you through setting up and running the Lunexa frontend locally, as well as how to deploy and contribute to the project.

## Live Demo

Explore the live application at [Lunexa Live](https://lunexa-af8cf.web.app).

## Backend Code

The backend for Lunexa is available at [lunexa-server GitHub Repository](https://github.com/md-ashik-max/lunexa-server). It handles user authentication, task management, and more.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (or [yarn](https://classic.yarnpkg.com/) as an alternative)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/md-ashik-max/lunexa-client.git
# Lunexa Client

This is the frontend for the Lunexa application. Below are the steps to run the project locally.

## Navigate to the Project Directory

```bash
cd lunexa-client
Install Dependencies
npm install
or
yarn install
Configuration
Create a .env File
Create a file named .env in the root of your project directory with the following content:
VITE_apiKey=AIzaSyDsz4ooiCJOkrUrhdfqitVtw6MNmnvSM44
VITE_authDomain=lunexa-af8cf.firebaseapp.com
VITE_projectId=lunexa-af8cf
VITE_storageBucket=lunexa-af8cf.appspot.com
VITE_messagingSenderId=709833853592
VITE_appId=1:709833853592:web:eba20b33448166b4d49eed
VITE_measurementId=G-5EGSFH60Q7

Running the Application
To start the development server and view the application locally:
npm start
