FROM node:11.8.0

LABEL MAINTAINER Łukasz Błoszyk <rhontorn@wp.pl>

RUN npm install pm2@3.2.2 --global --quiet
# add local user for security
RUN groupadd -r nodejs \
    && useradd -m -r -g nodejs nodejs

USER nodejs

# copy local files into container, set working directory and user
RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app
COPY . /home/nodejs/app

RUN npm install --production --quiet

EXPOSE 5000

CMD ["pm2-runtime", "./config/pm2.json"]