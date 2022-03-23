const appointmentsSchema = {
    type: "object",
    properties: {
        owner: {
            type: "number",
        },
        patient: {
            type: "number",
        },
        veterinarian: {
            type: "number",
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