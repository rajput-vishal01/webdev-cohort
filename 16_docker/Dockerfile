# lighter version for nodejs file -alpine
FROM node:22-alpine

# creates working dir in container
WORKDIR /app

# copies all the file form this folder (.) over to working dir (.)
COPY . .

#runs when you are creating the image
RUN npm install
RUN npm run build
RUN npx prisma generate

EXPOSE 3000

#runs when you are starting the container
CMD ["node","dist/index.js"]

# run in terminal
# docker build -t backendimg .
# docker run -p 3000:3000 backendimg