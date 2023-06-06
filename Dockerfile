FROM node:latest

WORKDIR /blueprint

COPY ./package.json ./

RUN npm install 

COPY ./ .

RUN npm run build

ENV NODE_ENV=production
ENV DATABASE_URL=file:./prod.db
ENV PORT=3000

RUN npx prisma generate

RUN npx prisma db push 

RUN npx prisma db seed

EXPOSE 3000

CMD ["npm", "start"]