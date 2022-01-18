FROM node:17
COPY package-lock.json ./
COPY package.json ./
RUN npm install --only=prod
COPY dist ./
CMD npm dist/main.js