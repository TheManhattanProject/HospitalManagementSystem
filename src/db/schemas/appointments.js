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
        datetime: {
            type: "string"
        },
        completed: {
            type: "boolean"
        },
        prescription: {
            type: "string"
        }
    }
}

module.exports = appointmentsSchema;