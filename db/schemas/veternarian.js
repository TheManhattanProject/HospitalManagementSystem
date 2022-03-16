const veternarianschema ={
    type: "object",
    properties: {
        id:{
            type: 'number',
        },
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
        }

    }
}
module.exports = veternarianschema;