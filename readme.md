# Store API

install and run postgres

## Dev Notes

endpoints which return a percentage, should not have that data stored as a percentage in the db. it should be stored as a float. ie. 10% is 0.1. 100% is 1. we must also be mindful of the difference in X% of something vs. something *growing* by X%. eg. 100% of 15 is 15. but 15 increased by 100% is 30.

to reduce the number of endpoints, endpoints which are for terminal values should have GET and POST options. so to get the circulating supply we send a GET to `/circulating-supply` and to update circulating supply we send a POST to `/circulating-supply`.

## To Do

* add input validation on POST endpoints
* return appropriate error codes + messages
* figure out if floating point is going to cause any errors, whether we can use ints?

### Prod

* add auth
* create script to bootstrap db?

## Setup

```zsh
CREATE DATABASE store_api;
CREATE TABLE values(name text primary key not null, value double precision);
```

```zsh
tsc app.ts
node app.js
```

## server

connect as postgres user

```zsh
sudo -i -u postgres
psql
```

```psql
# CREATE DATABASE store_api;
# \c store_api;
# CREATE TABLE values(name text primary key not null, value double precision);

# CREATE USER store_user WITH PASSWORD 'dbpass';
# GRANT ALL PRIVILEGES ON DATABASE store_api TO store_user;
```

```ts
var connectionString = "postgres://store_user:dbpass@localhost:5432/store_api";
```

install nodejs...

```zsh
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

firewall:

```zsh
ufw allow http
ufw allow proto tcp from any to any port 80,443,3000
ufw enable
```