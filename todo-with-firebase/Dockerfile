FROM node

# create a folder home>app 
RUN mkdir -p /home/app

# install app dependencies
COPY package.json ./home/app
COPY package-lock.json ./home/app

# copy all the files in that home>app
COPY . /home/app

# now all the commands further given will take place in home>app
WORKDIR /home/app

# to install all the dependicies from package.json required to run app
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]