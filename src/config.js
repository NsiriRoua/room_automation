var config = {
development: {
    //url to be used in link generation
    url: 'https://roomautomationcot.me',
    //jwtsecret
    jwtSecret: 'wotproject',
    refreshTokenSecret: 'wotprojectrefreshtoken',

    //mongodb connection settings
    database: {
        mongodb_uri: 'mongodb://35.242.159.197:27017/ionic-jwt',
        port:   '27017',

    },
    ValidityTime : 3600,
    certificate: '/etc/letsencrypt/live/roomautomationcot.me/cert.pem',
    privatekey: '/etc/letsencrypt/live/roomautomationcot.me/privkey.pem',

    refreshTokenLife : 86400,



    //server details
    server: {

        port: '8443'
    }

},
production: {
    //url to be used in link generation
    url: 'https://roomautomationcot.me',
    //jwtsecret
    jwtSecret: 'wotproject',
    //mongodb connection settings
    database: {
        mongodb_uri: 'mongodb://35.242.159.197:27017/WOT_DB',
        port: '27017',

    },

    //server details
    server: {

        port:   '8444'
    }
}
};
module.exports = config;
