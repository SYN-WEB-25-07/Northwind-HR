FROM node:18-alpine
WORKDIR /app
COPY packages/backend/package*.json ./
RUN npm install
COPY packages/backend/ .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npx", "tsx", "src/server.ts"]
