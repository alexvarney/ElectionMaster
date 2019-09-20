const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: String,
    state: String,
    dob: Date,
    slogan: String,
    status: {
        type: String,
        default: 'undeclared',
    },
    urlSlug: String,
    country: String,
    image: String,
    description: String,
    website: String,
    websiteDisplay: String,
    partyAffiliation: String,
    netWorth: Number,
    positions: [{
        issue: mongoose.Schema.Types.ObjectId,
        status: String,
        description: String,
        links: [{
            title: String,
            url: String,
        }]
    }],
});

module.exports = mongoose.model('Candidate', CandidateSchema);