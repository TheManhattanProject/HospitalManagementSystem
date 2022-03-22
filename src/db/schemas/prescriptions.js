const prescriptionsSchema = {
    type: "object",
    properties: {
        diagnosis: {
            type: "string",
        },
        investigations: {
            type: "string",
        },
        treatment: {
            type: "string",
        },
        nextAppointment: {
            type: "string",
        },
    }
}

module.exports = prescriptionsSchema;