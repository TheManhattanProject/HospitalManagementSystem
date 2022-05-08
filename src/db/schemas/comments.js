const commentSchema = {
    type: "object",
    properties: {
        remarks: {
            type: "string",
        },
        prescription: {
            type: "string",
        },
    }
}

module.exports = commentSchema;