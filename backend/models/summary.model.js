import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    urlToImage:{
        type: String,
    },
    url:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;