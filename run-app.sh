#!/bin/bash

# starts backend component of app
(cd backend && npm start) &

# starts frontend component of app
(cd frontend  && npm run dev -- --host 0.0.0.0 --port 5173)

