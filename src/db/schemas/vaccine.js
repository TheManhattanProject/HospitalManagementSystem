const vaccineSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        datetime : {
            type: "string",
        },
        boostername: {
            type: 'string',
        },
        boosterdatetime : {
            type: "string",
        },
        patient:{
            type: "string",
        }
    }
}

module.exports = vaccineSchema;