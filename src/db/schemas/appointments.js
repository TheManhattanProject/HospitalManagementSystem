const appointmentsSchema = {
    type: "object",
    properties: {
        id: {
            type: "number",
        },
        owner: {
            type: "number",
        },
        patient: {
            type: "number",
        },
        veterinarian: {
            type: "number",
        },
        title: {
            type: "string"
        },
        datetime: {
            type: "string"
        }
    }
}

module.exports = appointmentsSchema;