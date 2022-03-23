const prescriptionsSchema = {
    type: "object",
    properties: {
        patient: {
            type: "string",
        },
        veternarian: {
            type: "string",
        },
        nextAppointment: {
            type: "string",
        },
        investigation: {
            type: "string",
        },
        diagnosis: {
            type: "string",
        },
    }
}

module.exports = prescriptionsSchema;