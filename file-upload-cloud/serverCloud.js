const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path'); //built-in node module
const multer = require('multer');
const cloudinary = require('cloudinary');
const formidable = require('express-formidable');
const port = process.env.PORT || 5000;

const app = express();

cloudinary.config({ 
    cloud_name: 'dsqyr9b9a', 
    api_key: '697676688638133', 
    api_secret: 'mumhZmzbF6pBmZ0sxUSzhJBfoV0' 
  });

////######### HBS SETUP ############/////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(formidable({
  multiples: true
}));

// GET
app.get('/', (req, res) => {
    res.render('home')
});

//POST
app.post('/api/uploads',(req, res) =>{
//   console.log(req.fields);
//   console.log(req.files);
    cloudinary.uploader.upload(req.files.image.path, function(result) {
        console.log(result);
        res.status(200).send('ok'); 
    }, {
        public_id: `${Date.now()}_${path.parse(req.files.image.name).name}`,
        transformation: [
            { width: 400, height: 400, gravity: "face", crop: "crop" } // face recognition with cloudinary
        ],
        resource_type: 'auto' 
    });   
});


app.listen(port,()=>{
    console.log(`Started on port ${port}`)
}); 