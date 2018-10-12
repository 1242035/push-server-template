Parse.Cloud.define('getConfig', function(req) {
    var config = {
        "appName": 'AppName',
    };
    return JSON.stringify(config);
});

Parse.Cloud.define('getFirebaseConfig', function(req) {
    var config = process.env.FIREBASE_CONFIG_JS || {
        apiKey: "apiKey",
        authDomain: "authDomain",
        databaseURL: "databaseURL",
        projectId: "projectId",
        storageBucket: "storageBucket",
        messagingSenderId: "messagingSenderId"
    };
    return JSON.stringify(config);
});

