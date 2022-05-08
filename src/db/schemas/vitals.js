const vitalSchema = {
    type: "object",
    properties: {
        vName: {
            type: "string",
        },
        vValue: {
            type: "string",
        },
        vRemark:{
            type: "string",
        },
        prescription: {
            type: "string",
        },
    }
}

module.exports = vitalSchema;