#!/bin/bash

# Start the Flask backend
cd backend
python app.py &

# Start the React frontend
cd 'Manager Side'
npm start
