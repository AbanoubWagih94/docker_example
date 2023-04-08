FROM node:17 as base


FROM base as development

WORKDIR /app

COPY package.json .

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "prod" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi 
RUN npm install

COPY . .

# ENV PORT = 4000

EXPOSE 4000

CMD [ "npm", "run", "start-dev" ]

FROM base as production

WORKDIR /app

COPY package.json .

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "prod" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi 
RUN npm install --only=production

COPY . .

# ENV PORT = 4000

EXPOSE 4000

CMD [ "npm", "start" ]