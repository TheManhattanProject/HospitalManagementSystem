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
        remarks: {
            type: "string",
        },
    }
}

module.exports = inventorySchema;