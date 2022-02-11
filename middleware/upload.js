const multer = require('multer');
const path = require('path');


//storage having 2 attributes, one for destination and one for filename
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

//init storage
//single file to store
const upload = multer ({
    storage : storage,
    limits:{fileSize:100*1000*1000},    //12mb
    fileFilter: function (req,file,cd){
        checkFileExtension(file,cd);
    }
});

//multiple file storage
const uploads = multer ({
    storage : storage,
    limits:{fileSize:200*1000*1000},     //25mb
    fileFilter: function (req,file,cd){
        checkFileExtension(file,cd);
    }
});


//file extension checking
function checkFileExtension(file,cd){
    //declaring file types
    const filetype = /jpeg|png|gif|jpg/;
    //extracting file extension
    const extname = filetype.test(path.extname(file.originalname).toLowerCase());
    //mapping mimetype
    const mimetype = filetype.test(file.mimetype);

    if(mimetype && extname ){
        return cd(null, true);
    }
    else{
        return cd('Error: Images type only!');
    }
}

module.exports={upload,uploads}