const settings = {
    secret: 'veryspecial'
};

settings.database = {
    url: 'mongodb://nucci.fritz.box:27017/Cluster0?retryWrites=true&w=majority',
    name: 'auth'
};

module.exports = settings;
