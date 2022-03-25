const ownerschema={
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        email: {
            type: "string",
        },
        phone: {
            type: "string",
        },
        password: {
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
module.exports=ownerschema;