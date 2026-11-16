#!/bin/bash

PORT=5000
SERVER_FILE="server.js"
NODE_CMD="node" # or use "nodemon" if installed and preferred

# Check if port is in use
PID=$(lsof -ti tcp:$PORT)

if [ -z "$PID" ]; then
  echo "✅ Port $PORT is already free."
else
  echo "⚠️ Port $PORT is in use by PID $PID. Killing it..."
  kill -9 $PID
  echo "✅ Port $PORT has been freed."
fi

# Navigate to your server directory if not already there
cd "$(dirname "$0")"

# Start the server
echo "🚀 Starting the server using $NODE_CMD $SERVER_FILE..."
$NODE_CMD $SERVER_FILE
