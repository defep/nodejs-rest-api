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
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
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

// create post
app.post('/posts', (req, res) => {
    const post = new Post(req.body);
    post.save(err => {
        if (err) {
            res.json({ message: err.message });
        }
        res.json(post);
    });
});

app.get('/posts/:id', (req, res) => {
    const post = Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.json({ message: err.message });
        }
        res.json(post);
    });
});

app.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, (err, post) => {
        if (err) {
            res.json({ message: err.message });
        }

        res.json(post);
    });
});


app.delete('/posts/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err, post) => {
        if (err) {
            res.json({ message: err.message });
        }

        res.json(post);
    });
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});