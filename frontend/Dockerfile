FROM node:current-alpine3.21 as BASE

WORKDIR /build

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:current-alpine3.21 as RUNNER

WORKDIR /app

COPY --from=base /build/package.json .
COPY --from=base /build/pnpm-lock.yaml .
COPY --from=base /build/dist/ dist/

EXPOSE 5173

RUN npm i -g serve

CMD ["serve","-s", "dist", "-p", "5173"]
