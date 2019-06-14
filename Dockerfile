FROM node:12
ENV TZ=America/Los_Angeles
RUN yarn global add serve
RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app
WORKDIR /home/app
COPY build/ /home/app
CMD ["serve", "-s", "--listen", "8000"]

