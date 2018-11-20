const { logSync, resolveAfter } = require('./helpers');

let requestId = 42;

module.exports = [
  {
    name: 'request-id',
    register(server) {
      server.ext('onRequest', async (request, h) => {
        request.id = requestId;
        requestId += 1;

        logSync(`Executing server.ext.onRequest() -> new request.id=${request.id}`);

        h.asyncContextStore.set('request.id', request.id);
        h.asyncContextStore.set('request.ua', request.headers['user-agent']);

        h.asyncContextStore.logStore();

        return h.continue;
      });
    },
  },
  {
    name: 'pre-fetch',
    register(server) {
      server.ext('onPreHandler', async (request, h) => {
        logSync(`Executing server.ext.onPreHandler(${request.id})...`);

        await resolveAfter(100, `server.ext.onPreHandler(${request.id})`);

        h.asyncContextStore.get('request.id');
        h.asyncContextStore.get('request.ua');

        return h.continue;
      });
    },
  },
];
