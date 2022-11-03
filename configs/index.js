exports.PORT = process.env.PORT || 5000;
exports.dbSecretFields = ["__v","password"];
exports.DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;
exports.SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
exports.IS_PRODUCTION = process.env.NODE_ENV === 'production';