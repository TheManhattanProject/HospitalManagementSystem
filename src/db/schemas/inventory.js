const inventorySchema = {
    type: "object",
    properties: {
        category: {
            type: "string",
        },
        name: {
            type: "string",
        },
        quantity: {
            type: "number",
        },
        remark: {
            type: "string",
        },
    }
}

module.exports = inventorySchema;