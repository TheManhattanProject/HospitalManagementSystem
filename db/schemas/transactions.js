const transactionSchema = {
    type: 'object',
    properties: {
        patient: {
            type: "number",
        },
        title: {
            type: "string",
        },
        amount: {
            type: "number",
        },
        datetime: {
            type: "string"
        }
    }
};

module.exports = transactionSchema;