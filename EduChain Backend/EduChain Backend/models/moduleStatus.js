const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const moduleStatusSchema = mongoose.Schema({
    moduleId: { type: mongoose.Types.ObjectId, required: [true, 'Please add an moduleId'] },
    moduleNumber:{type:Number, required: [true, 'Please add an moduleNumber']},
    userId: { type: mongoose.Types.ObjectId, required: [true, 'Please add an userId'] },
    chapterStatus: [{
        chapterId: { type: mongoose.Types.ObjectId },
        chapterSequence: { type: Number },
        status: { type: Boolean }
    }],
    enrollmentDate: { type: Date, required: [true, 'Please add an enrollmentDate'] },
    completionDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
    assessmentScore: { type: Number },
}, {
    timestamps: true
})
module.exports = mongoose.model('ModuleStatus', moduleStatusSchema)