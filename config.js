
var appName = process.env.APP_NAME || 'API server';
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
//var emailUser = process.env.EMAIL_USER || 'user@gmail.com';
//var emailPassword = process.env.EMAIL_PASSWORD || 'password';
//var emailPort = process.env.EMAIL_PORT || 587;
//var emailIsSsl = process.env.EMAIL_IS_SSL || true;
var emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
var emailDomain = process.env.EMAIL_DOMAIN || '';
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
            /*module: "simple-parse-smtp-adapter",
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
            }*/
            module: 'parse-server-mailgun',
            options: {
                // The address that your emails come from
                fromAddress: emailFrom,
                // Your domain from mailgun.com
                domain: emailDomain,
                // Mailgun host (default: 'api.mailgun.net'). 
                // When using the EU region, the host should be set to 'api.eu.mailgun.net'
                host: emailHost,
                // Your API key from mailgun.com
                apiKey: emailKey,
                // The template section
                templates: {
                    passwordResetEmail: {
                        subject: 'Reset your password',
                        pathHtml: resolve(__dirname, 'public/password_reset_email.html'),
                    },
                    verificationEmail: {
                        subject: 'Confirm your account',
                        pathHtml: resolve(__dirname, 'public/verification_email.html'),
                    },
                    customEmailAlert: {
                        subject: 'Urgent notification!',
                        pathHtml: resolve(__dirname, 'public/alert.html'),
                    }
                }
            }
        },
        customPages: {
            invalidLink: host +'/public/invalid_link.html',
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
