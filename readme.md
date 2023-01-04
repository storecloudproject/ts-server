# simple js server

install and run postgres

## setup

install postresql and create a table in a database with a single integer in it. for example:

```psql
CREATE TABLE data(a int);
INSERT INTO data(a) VALUES (999)
```

edit your connection string (in app.js) to match your db name. ie. replace "jordan" with your db name. 

compile the typescript to js

```bash
tsc app.ts
```

run the server:

```bash
node app.js
```

## usage

hit the endpoints from insomnia/postman/browser