# MNM Vehicle System FE

## Installation

Install node packages

```shell
npm install
```

Configure baseurl of backend if it's not running on localhost:8000 in src/config/app.config.js
```js
Restangular.setBaseUrl('http://localhost:8000/api');
```
to
```js
Restangular.setBaseUrl('THE-URL-YOUR-BACKEND-SERVER-RUNS-ON/api');
```

Fire up the node server and watch files
```shell
npm run watch
```

If npm server doesn't boot properly, I have provided another one that you can use
```shell
http-server
```


