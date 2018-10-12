
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('getConfig', function(req, res) {
  var config = {
      "appName": 'AppName',
  };
  res.success(config);
});

