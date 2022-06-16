FROM bitnami/node
LABEL maintainer "Krateo <contact@krateoplatformops.io>"

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

RUN apt update && apt install -y openldap*

CMD [ "node", "server.js" ]