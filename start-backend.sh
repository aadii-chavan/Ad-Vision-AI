#!/bin/bash

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Create a virtual environment if it doesn't exist
if [ ! -d "server/venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv server/venv
fi

# Activate the virtual environment
source server/venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r server/requirements.txt

# Start the backend server
echo "Starting backend server..."
python server/app.py
