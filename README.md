grpc #12506
===========

https://github.com/grpc/grpc/issues/12506

### Update

After upgrading to grpc 1.8.0, error is no longer triggered, a HTTP2 GOAWAY is now sent by the server :
```bash
test
  ✓ should trigger some policy error        # first run, no bug

1 passing (42ms)

test
  ✓ should trigger some policy error        # first refresh, no bug

1 passing (8ms)

test
  1) should trigger some policy error       # Third run, got HTTP2 GOAWAY

0 passing (7ms)
1 failing

1) test
     should trigger some policy error:
   Uncaught AssertionError: expected [Error: GOAWAY received] to be null
    at Object.client.sayHello [as callback] (test/test.js:40:24)
    at node_modules/grpc/src/client.js:557:12
```


### Trigger "the load balancing policy" error

```bash
$ # install grpc/mocha/chai
$ npm i
$ # run mocha in watch mode
$ npm test
> mocha -w

  test
    ✓ should trigger some policy error        # First run, no bug

  1 passing (33ms)

  test
    ✓ should trigger some policy error        #  First refresh, no bug

  1 passing (6ms)

  test
    1) should trigger some policy error       # Third run, error is triggered

  0 passing (8ms)
  1 failing

  1) test
       should trigger some policy error:
     Uncaught AssertionError: expected [Error: Call dropped by load balancing policy] to be null
      at Object.client.sayHello [as callback] (test/test.js:35:24)
      at node_modules/grpc/src/node/src/client.js:557:12

  test
    1) should trigger some policy error

  0 passing (4ms)
  1 failing

  1) test
       should trigger some policy error:
     Uncaught AssertionError: expected [Error: Call dropped by load balancing policy] to be null
      at Object.client.sayHello [as callback] (test/test.js:35:24)
      at node_modules/grpc/src/node/src/client.js:557:12
```
