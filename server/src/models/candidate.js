const mongoose = require('mongoose');

// Spouse Schema
const SpouseSchema = new mongoose.Schema({
    name: { type: String },
    dateOfBirth: { type: Date },
    occupation: { type: String }
});

// Child Schema
const ChildSchema = new mongoose.Schema({
    name: { type: String },
    dateOfBirth: { type: Date },
    occupation: { type: String },
    educationalBackground: { type: String }
});

// Sibling Schema
const SiblingSchema = new mongoose.Schema({
    name: { type: String },
    occupation: { type: String },
    politicalAffiliations: { type: String }
});

// Social Media Schema
const SocialMediaSchema = new mongoose.Schema({
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedIn: { type: String }
});

// Address Schema
const AddressSchema = new mongoose.Schema({
    street: { type: String },
    city: { type: String },
    province: { type: String },
    postalCode: { type: String },
    country: { type: String, default: 'Pakistan' }
});

// Occupation History Schema
const OccupationHistorySchema = new mongoose.Schema({
    jobTitle: { type: String },
    employer: { type: String },
    duration: { type: String },
    responsibilities: { type: String }
});

// Academic Achievement Schema
const AcademicAchievementSchema = new mongoose.Schema({
    achievement: { type: String }
});

// Political Position Schema
const PoliticalPositionSchema = new mongoose.Schema({
    positionTitle: { type: String },
    duration: { type: String },
    responsibilities: { type: String }
});

// Legal Case Schema
const LegalCaseSchema = new mongoose.Schema({
    caseName: { type: String },
    status: { type: String }
});

// Financial Information Schema
const FinancialInfoSchema = new mongoose.Schema({
    incomeSources: [String],
    assetOwnership: [String],
    taxPayments: [String],
    otherFinancialInterests: [String],
    financialTransparency: { type: Boolean }
});

// Health Information Schema
const HealthInfoSchema = new mongoose.Schema({
    healthCondition: { type: String },
    physicalDisabilities: { type: Boolean },
    mentalHealthStatus: { type: String }
});

// Main Candidate Schema
const CandidateSchema = new mongoose.Schema({
    // Personal Details
    candidateID: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, default: function () { return `${this.firstName} ${this.lastName}`; } },
    gender: { type: String, enum: ['Male', 'Female', 'Non-binary'] },
    dateOfBirth: { type: Date },
    placeOfBirth: { type: String },
    nationality: { type: String, default: 'Pakistan' },
    religion: { type: String },
    maritalStatus: { type: String },
    spouse: SpouseSchema,
    children: [ChildSchema],
    familyBackground: {
        parentsOccupation: { type: String },
        parentsPoliticalAffiliations: { type: String },
        siblings: [SiblingSchema]
    },
    ethnicBackground: { type: String },

    // Contact Details
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    socialMediaLinks: SocialMediaSchema,
    address: AddressSchema,

    // Professional and Political Details
    occupation: { type: String },
    occupationHistory: [OccupationHistorySchema],
    skills: [String],
    languagesSpoken: [String],
    awardsRecognitions: [String],
    publications: [String],
    professionalMemberships: [String],
    education: {
        highestDegree: { type: String },
        university: { type: String },
        yearOfGraduation: { type: Date },
        academicAchievements: [AcademicAchievementSchema],
        subjectsOfStudy: [String],
        otherCertifications: [String]
    },
    politicalBackground: {
        partyMembership: { type: String },
        politicalPositionsHeld: [PoliticalPositionSchema],
        keyPoliticalStance: [String],
        publicServiceRecord: { type: String }
    },

    // Additional Details
    legalAndCriminalBackground: {
        criminalRecord: { type: Boolean },
        courtCases: [LegalCaseSchema],
        legalIssues: { type: String }
    },
    financialInformation: FinancialInfoSchema,
    healthInformation: HealthInfoSchema,
    personalInterestsAndHobbies: {
        hobbies: [String],
        communityInvolvement: [String]
    },
    miscellaneous: {
        biography: { type: String },
        publicStatements: [String],
        campaignManifesto: { type: String }
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
