const vaccineSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        datetime : {
            type: "string",
        },
        patient:{
            type: "string",
        }
    }
}

module.exports = vaccineSchema;