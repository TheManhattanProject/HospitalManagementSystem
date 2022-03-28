const veternarianschema ={
    type: "object",
    properties: {
        name: {
            type: 'string',
        },
        gender:{
            type: 'string'
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
        speciality: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        experience: {
            type: 'string',
        },
        dob: {
            type: 'string',
        }
    }
}
module.exports = veternarianschema;