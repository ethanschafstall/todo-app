# Stage 1 : Backend
FROM node:20.14 as backend
WORKDIR /backend
COPY backend/package*.json ./
RUN npm install && npm audit fix
COPY backend/. .

# Stage 2 : Frontend
FROM node:20.14 as frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
EXPOSE 5173

# Stage 3 : App
FROM node:20.14 AS app
WORKDIR /app
COPY --from=frontend /frontend ./frontend
COPY --from=backend /backend ./backend

# Copy the run-app.sh script and fix Windows line endings
COPY ./run-app.sh ./
RUN sed -i 's/\r//' run-app.sh

# Make sure the script is executable
RUN chmod +x run-app.sh

# Set the default command to run the script
CMD ["bash", "run-app.sh"]
