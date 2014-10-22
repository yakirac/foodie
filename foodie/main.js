define(["./messages", "print"], function (messages, print) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    //var messages = require('./messages');

    // Load library/vendor modules using
    // full IDs, like:
    //var print = require('libs/require/print');

    print(messages.getHello());
});
