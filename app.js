const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost/postdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    body: String,
    date: Date
});

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/posts', (req, res) => {
    Post.find().exec((err, posts) => {
        res.json({ posts: posts });
    });
});

app.post('/posts', (req, res) => {
    const post = new Post(req.body);
    post.save();
    res.json(post);
});

app.get('/posts/:id', (req, res) => {
    const post = Post.findById(req.params.id, (err, post) => {
        res.json(post);
    });
});

app.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, post) => {
        res.json(post);
    })
});

app.delete('/posts/:id', (req, res) => {
    Post.findOneAndDelete(req.params.id, (err, post) => {
        res.json(post);
    });
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});