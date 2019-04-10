# @micromq/expect

Simple middleware for validate params.

## Install

```sh
$ npm i @micromq/expect
```

## Tests

```sh
$ npm test
```

## Usage

```js
const MicroMQ = require('micromq');
const paramsCollector = require('@micromq/params-collector');
const expect = require('@micromq/expect');

const app = new MicroMQ({
  name: process.env.MICROSERVICE_NAME,
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

app.use(paramsCollector);

app.use(async (req, res, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err.status);    // 400
    console.error(err.message);   // 'city is invalid'
  }
});

app.post(
  '/create',
  expect({
    // required, string type
    name: String,
    
    // required, string/number type, must be greater than 18
    age: {
      // may a string or a number
      type: [String, Number],
      required: true,
      validate: age => +age > 18,
    },
    
    // not required, string type, length must be greater than 10
    city: {
      type: String,
      validate: city => city.length > 10,
    },
  }),
  (req, res) => {
    // creating something good...
  },
);

app.start();
```
