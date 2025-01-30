import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
}, {
    timestamps: true //createdAt and updatedAt
});

const Article = mongoose.model('Article', articleSchema);

export default Article;