const veternarianschema ={
    type: "object",
    properties: {
        name: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        phone: {
            type: 'string',
        },
        qualification: {
            type: 'string',
        },
        experience: {
            type: 'string',
        },
        speciality: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    }
}
module.exports = veternarianschema;