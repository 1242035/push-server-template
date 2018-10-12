
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('getConfig', function(req, res) {
  var config = {
      "appName": 'AppName',
  };
  return config;
});

Parse.Cloud.define('getFirebaseConfig', function(req, res) {
  var config = process.env.FIREBASE_CONFIG_JS || {
      apiKey: "apiKey",
      authDomain: "authDomain",
      databaseURL: "databaseURL",
      projectId: "projectId",
      storageBucket: "storageBucket",
      messagingSenderId: "messagingSenderId"
  };
  return config;
});

