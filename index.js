require('dotenv').config()
const express = require('express');
const path = require('path');
const multer  = require("multer");
const slugify = require('slugify')
const app = express();
const authRouter = require('./app/routes/auth.routes')
const todosRouter = require('./app/routes/todos.routes')
const uploadRouter = require('./app/routes/upload.routes')
const userRouter = require('./app/routes/users.routes')

let storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const name = slugify(file.originalname, { lower: true })
        cb(null, name)
    },
});

const PORT = process.env.PORT || 5000

app.use(express.static(__dirname));
app.use(multer({storage:storage}).single("filedata"));
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/todos', todosRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/user', userRouter)

/** On Production Load 'build' Folder **/
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'clients', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'clients', 'build', 'index.html'))
    })
}

async function start() {
    try {
        app.listen(PORT, () => console.log(`App has been started on ${PORT}...`));
    } catch (e) {
        console.log('server error', e.message);
        process.exit(1);
    }
}

start();
