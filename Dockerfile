FROM node:17
COPY package-lock.json ./
COPY package.json ./
RUN npm install --save-prod
COPY dist ./
CMD npm dist/main.js