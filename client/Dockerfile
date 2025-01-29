# Étape 1 : Construire l'application Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
# Étape 2 : Servir l'application avec http-server
FROM node:18

RUN npm install -g http-server

# Copier les fichiers générés depuis l'étape de build
COPY --from=build /app/dist/client/browser /app

WORKDIR /app

EXPOSE 4200

CMD ["http-server", "-p", "4200"]

