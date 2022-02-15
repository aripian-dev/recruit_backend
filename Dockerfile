FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
copy . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]