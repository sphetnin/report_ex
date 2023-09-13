FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

#RUN npm install -ci
RUN npm i

COPY . .

#RUN npm run build
EXPOSE 5010

CMD ["npm", "run", "dev"]