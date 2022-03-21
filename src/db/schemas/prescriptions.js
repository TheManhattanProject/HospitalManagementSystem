const prescriptionsSchema = {
    type: "object",
    properties: {
        diagnosis: {
            type: "string",
        },
        investigations: {
            type: "string",
        },
        Treatment: {
            type: "string",
        },
        nextAppointment: {
            type: "string",
        },
    }
}

module.exports = prescriptionsSchema;