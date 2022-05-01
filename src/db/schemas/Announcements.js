const announcementSchema={
    type: "object",
    properties: {
        title: {
            type: "string",
        },
        description: {
            type: "string",
        },
        by: {
            type: "string",
        },
    }
}
module.exports=announcementSchema;