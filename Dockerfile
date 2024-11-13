FROM node:20.14 as backend
WORKDIR /backend
COPY backend/package.json .
RUN npm install && npm audit fix
COPY backend/ ./
EXPOSE 3000
# CMD ["npm", "start"]

FROM node:20.14 as frontend
WORKDIR /frontend
COPY frontend/. ./
RUN npm install
COPY ./frontend .
EXPOSE 5173
# ENTRYPOINT ["npm"] 
# CMD ["run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

FROM node:20.14 AS app
COPY --from=frontend /frontend ./frontend
COPY --from=backend /backend ./backend
COPY ./package.json .
CMD [ "npm", "run", "app"]



