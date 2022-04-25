const adminschema={
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        email: {
            type: "string",
        },
        password: {
            type: "string",
        },
        phone: {
            type: "string",
        },
        gender: {
            type: "string",
        },
        dob: {
            type: "string",
        }
    }
}
module.exports=adminschema;