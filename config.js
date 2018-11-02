
var port = process.env.PORT || 4040;
var host = process.env.HOST || 'http://localhost';
var serverPath = process.env.SERVER_PATH || '/api';
var adminPath = process.env.ADMIN_PATH || '/admin';
var databaseUri = process.env.DATABASE_URL || process.env.MONGODB_URI || '';
var appId =  process.env.APP_ID || 'appId';
var masterKey = process.env.MASTER_KEY || 'masterKey';
var serverURL = ( (process.env.SERVER_URL) || (host + ':' + port) )  + serverPath;;
var cloud = process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js';
var androidKey = process.env.FCM_SERVER_KEY || '';
var user  = process.env.DASHBOARD_USER || 'user';
var password  = process.env.DASHBOARD_PASSWORD || 'password';
var emailUser = process.env.EMAIL_USER || 'user@gmail.com';
var emailPassword = process.env.EMAIL_PASSWORD || 'password';
var emailPort = process.env.EMAIL_PASSWORD || 587;
var emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
var emailIsSsl = process.env.EMAIL_IS_SSL || true;

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
        publicServerURL: serverURL,
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
        },
        emailAdapter: {
            module: "simple-parse-smtp-adapter",
            options: {
                service: 'SMTP', // required
                fromAddress:emailUser,
                user: emailUser,
                password: emailPassword,
                host: emailHost,
                isSSL: emailIsSsl, //True or false if you are using ssl
                port: emailPort, //SSL port or another port
                name: 'API server', //  optional, used for identifying to the server 
                //Somtimes the user email is not in the 'email' field, the email is search first in
                //email field, then in username field, if you have the user email in another field
                //You can specify here
                emailField: 'username',
                templates: {
                    //This template is used only for reset password email
                    resetPassword: {
                        //Path to your template
                        template: __dirname + '/views/email/reset-password',
                        //Subject for this email
                        subject: 'Reset your password'
                    },
                    verifyEmail: {
                        template: __dirname + '/views/email/verify-email',
                        subject: 'Verify Email'
                    }
                }
            }
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
        ],
        users: [{
              user:user,
              pass:password,
            }
        ]
    },
    options: { 
        allowInsecureHTTP: true 
    }
}
