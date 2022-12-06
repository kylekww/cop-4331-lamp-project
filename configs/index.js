exports.PORT = process.env.PORT || 3000;
exports.dbSecretFields = ["__v","password"];
exports.confessionSecretFields = ["__v","userID"];
exports.commentSecretFields = ["__v","userID"];
exports.DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;
exports.SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
exports.IS_PRODUCTION = process.env.NODE_ENV === 'production';