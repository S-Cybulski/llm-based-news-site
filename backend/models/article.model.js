import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
}, {
    timestamps: true //createdAt and updatedAt
});

const Article = mongoose.model('Article', articleSchema);

export default Article;