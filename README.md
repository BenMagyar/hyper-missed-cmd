# hyper-missed-cmd

Utility function to help match a missed command with the
hyperterm prompt.

## How to use

```
// Detect with a string
const ohno = require('hyper-missed-cmd')(
  'ohno'
  // alternatively use regex-as-a-string or regex
  // 'ohn[o]+'
  // /ohn[p]+/
);

exports.middleware = (store) => (next) => (action) => {
  if(ohno(action)) {
    console.log('ohno was used!');
  }
}
```

## License

MIT
