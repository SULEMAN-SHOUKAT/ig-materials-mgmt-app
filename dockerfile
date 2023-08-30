FROM node:18

LABEL image.title="ig-material-mgmt-App" \
    image.description="An node js applciation to manage mateirals"

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm i

ENV PORT=3001

ENTRYPOINT ["npm","run","start:staging"]