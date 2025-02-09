import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
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
        type: String
    }
}, {
    timestamps: true 
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
