const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path'); //built-in node module
const multer = require('multer');
const port = process.env.PORT || 5000;

const app = express();

////######### HBS SETUP ############/////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

// GET
app.get('/', (req, res) => {
    res.render('home')
});

app.post('/api/uploads',(req, res) =>{

    const upload = multer({ 
        dest: 'uploads/',
        limits: { fileSize: 5000000 }, 
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            ext === '.png' || ext === '.jpg' ? cb(null, true) : cb(res.status(400).end('only png and jpg are allowed'), false);
        }
    }).fields([
        { name: 'image', maxCount: 2 },
        { name: 'image2', maxCount: 10 }
    ]);
    
    upload(req, res, function(err) {
        if (err) {
            return res.send(400).end('Error');
        }
        return res.end('file successfully uploaded');
    });
})


app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});