const assert = require('assert').strict;

function promiseDemo1({ asyncContextStore, resolveAfter }) {
  asyncContextStore.log('- -- --- promises: demo1 --- -- -');

  asyncContextStore.set('request.id', 42);
  asyncContextStore.logStore();

  return resolveAfter(10, 'timer')
    .then(() => {
      asyncContextStore.logStore();
      assert.strictEqual(42, asyncContextStore.get('request.id'));
      return resolveAfter(10, 'timer');
    })
    .then(() => {
      asyncContextStore.logStore();
      asyncContextStore.disable();
    });
}

module.exports = promiseDemo1;
