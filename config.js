const resolve = require('path').resolve;
require('dotenv').config();


var appName = process.env.APP_NAME || 'API server';
var port = process.env.PORT || 4040;
var host = process.env.HOST || 'http://localhost';
var serverPath = process.env.SERVER_PATH || '/api';
var adminPath = process.env.ADMIN_PATH || '/admin';
var databaseUri = process.env.DATABASE_URL || process.env.MONGODB_URI || '';
var appId =  process.env.APP_ID || 'appId';
var masterKey = process.env.MASTER_KEY || 'masterKey';
var serverURL = ( (process.env.SERVER_URL) || (host + ':' + port) )  + serverPath;
var cloud = process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js';
var androidKey = process.env.FCM_SERVER_KEY || '';
var user  = process.env.DASHBOARD_USER || 'user';
var password  = process.env.DASHBOARD_PASSWORD || 'password';
var emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
var emailDomain = process.env.EMAIL_DOMAIN || 'mailgun.org';
var emailKey = process.env.EMAIL_KEY || '';
var emailFrom = process.env.EMAIL_FROM || 'YourApp <noreply@yourapp.com>';

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
        verifyUserEmails: false,
        publicServerURL: host,
        appName: appName,
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
            module: 'parse-server-mailgun',
            options: {
                fromAddress: emailFrom,// The address that your emails come from
                domain: emailDomain,// Your domain from mailgun.com
                host: emailHost,// Mailgun host (default: 'api.mailgun.net'). 
                apiKey: emailKey,// Your API key from mailgun.com
                // The template section
                templates: {
                    passwordResetEmail: {
                        subject: 'Reset your password',
                        pathPlainText: resolve(__dirname, 'public/password_reset_email.txt'),
                        pathHtml: resolve(__dirname, 'public/password_reset_email.html'),
                    },
                    verificationEmail: {
                        subject: 'Confirm your account',
                        pathPlainText: resolve(__dirname, 'public/verification_email.txt'),
                        pathHtml: resolve(__dirname, 'public/verification_email.html'),
                    },
                    customEmailAlert: {
                        subject: 'Urgent notification!',
                        pathPlainText: resolve(__dirname, 'public/alert.txt'),
                        pathHtml: resolve(__dirname, '/public/alert.html'),
                    }
                }
            }
        },
        customPages: {
            invalidLink: host + '/public/invalid_link.html',
            verifyEmailSuccess: host + '/public/email_verification.html',
            choosePassword: host + '/public/choose_password.html',
            passwordResetSuccess: host + '/public/password_updated.html'
        }
    },
    dashboard:{
        apps: [
            {
                serverURL: serverURL,
                appId: appId,
                masterKey: masterKey,
                appName: appName
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
