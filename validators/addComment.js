const Validator = require('fastest-validator');

const v = new Validator();

const schema = {
    comment: {type: "string", min: 1, max: 420},
    confessionID: {type: "string", min: 24, max: 24},
    $$strict: true,
};

const checker=v.compile(schema)

module.exports = checker;