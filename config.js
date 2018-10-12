
var port = process.env.PORT || 4040;
var host = process.env.HOST || 'http://localhost';
var serverPath = process.env.SERVER_PATH || '/api';
var adminPath = process.env.ADMIN_PATH || '/admin';
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || '';
var appId =  process.env.APP_ID || 'appId';
var masterKey = process.env.MASTER_KEY || 'masterKey';
var serverURL = process.env.SERVER_URL || host + ':' + port + serverPath;
var cloud = process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js';
var androidKey = process.env.FCM_SERVER_KEY || '';

module.exports.config = {
    host:host,
    port:port,
    serverPath:serverPath,
    adminPath:adminPath,
    server:{
        databaseURI: databaseUri,
        cloud: cloud,
        appId: appId,
        masterKey: masterKey,
        serverURL: serverURL,
        liveQuery: {
            classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
        },
        push: {
            android: {
                apiKey: androidKey
            },
            /*ios: {
                pfx: '/file/path/to/XXX.p12',
                passphrase: '', // optional password to your p12/PFX
                bundleId: '',
                production: false
            }*/
        }
    },
    dashboard:{
        apps: [
            {
                serverURL: serverURL,
                appId: appId,
                masterKey: masterKey,
                appName: "Push Server"
            }
        ]
    }
}