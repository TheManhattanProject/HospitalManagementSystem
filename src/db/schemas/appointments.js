const appointmentsSchema = {
    type: "object",
    properties: {
        owner: {
            type: "string",
        },
        patient: {
            type: "string",
        },
        veterinarian: {
            type: "string",
        },
        reason: {
            type: "string"
        },
        remarks: {
            type: "string"
        },
        datetime: {
            type: "string"
        },
        prescription: {
            type: "string"
        }
    }
}

module.exports = appointmentsSchema;