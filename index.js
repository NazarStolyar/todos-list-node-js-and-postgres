const express = require('express');
const path = require('path');
const app = express();
const authRouter = require('./app/routes/auth.routes')
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use('/api/user', authRouter)

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
