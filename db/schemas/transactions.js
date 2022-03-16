const transactionSchema = {
    owner: {
        type: Number,
    },
    patient: {
        type: Number,
    },
    type: {
        type: String,
    },
    amount: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
};

module.exports = transactionSchema;