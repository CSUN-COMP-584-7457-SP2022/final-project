# syntax=docker/dockerfile:1

# node docker tag
FROM node:16

# working dir
WORKDIR /home/node/app

# copy package.json and package-lock.json to working dir
COPY package.json package-lock.json ./

# clean install 
RUN npm ci

# copy rest of the files
COPY . .

# npm run dev
CMD ["npm", "run", "dev", "--", "--port=${PORT}"]