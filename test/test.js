const expect = require('chai').expect;
const grpc = require('grpc');
const join = require('path').join;

const filename = join(__dirname, '..', 'proto', 'helloworld.proto');
const proto = grpc.load(filename);

const greeter = proto.helloworld.Greeter;

const methods =  {
  SayHello: function(call, callback) {
    callback(null, { message: `Hello ${call.request.name} !` });
  }
}

describe('test', function () {
  let server, client;

  before(() => {
    server = new grpc.Server();
    server.addService(proto.helloworld.Greeter.service, methods);
    server.bind('0.0.0.0:50000', grpc.ServerCredentials.createInsecure());
    server.start();

    client = new proto.helloworld.Greeter('0.0.0.0:50000', grpc.credentials.createInsecure());

  });

  after(() => {
    server.forceShutdown();
  });

  it(`should trigger some policy error`, done => {
    client.sayHello({ name: 'test' }, (err, response) => {
      expect(err).to.be.null;
      expect(response.message).to.equal('Hello test !');
      done();
    });
  });
});
