FROM mhart/alpine-node AS base

WORKDIR /build

COPY package* .

RUN npm install

COPY . .

RUN npm run build

FROM mhart/alpine-node AS runner

WORKDIR /app

COPY --from=base /build/node_modules node_modules/
COPY --from=base /build/package.json .
COPY --from=base /build/pnpm-lock.yaml .
COPY --from=base /build/dist/ dist/

EXPOSE 6969

cmd [ "npm", "start"]
