const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    name: String,
    description: String,
    tags: [String],
    country: [String],
});

module.exports = mongoose.model('Issue', IssueSchema);