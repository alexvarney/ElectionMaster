const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
    name: String,
    description: String,
    candidates: [mongoose.Schema.Types.ObjectId],
    issues: [mongoose.Schema.ObjectId],
    default: {type: Boolean, default: false},
});

module.exports = mongoose.model('Contest', ContestSchema);