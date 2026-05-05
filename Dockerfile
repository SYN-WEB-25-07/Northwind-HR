FROM node:18-alpine
WORKDIR /app
COPY . .
WORKDIR /app/packages/backend
RUN npm install
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npx", "tsx", "src/server.ts"]
