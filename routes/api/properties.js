const router = require("express").Router();
const Properties = require("../../models/Properties");
const Categories = require("../../models/Categories");
const auth = require("../../middleware/auth");
const {
  OkResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
} = require("express-http-response");

router.post("/add", auth.isToken, (req, res, next) => {
  let property = new Properties();
  try {
    if (
      req.body.category &&
      req.body.price &&
      req.body.address &&
      req.body.description &&
      req.body.beds &&
      req.body.baths &&
      req.body.area &&
      req.body.isElectricity &&
      req.body.isSeperateEnterance &&
      req.body.isInsulated
    ) {
      Categories.findOne({ category: req.body.category }, (err, data) => {
        property.category = data._id;
        property.price = req.body.price;
        property.image = req.body.image;
        property.address = req.body.address;
        property.description = req.body.description;
        property.beds = req.body.beds;
        property.baths = req.body.baths;
        property.area = req.body.area;
        property.isInsulated = req.body.isInsulated;
        property.isElectricity = req.body.isElectricity;
        property.isSeperateEnterance = req.body.isSeperateEnterance;
        property.user = req.user.id;
        property.save();
        next(new OkResponse(property));
      });
    } else {
      next(new BadRequestResponse("Please fill required fields"));
    }
  } catch (err) {
    next(new BadRequestResponse(err));
  }
});

router.put("/update", (req, res, next) => {
  Properties.findById({_id:req.query.id }, (err, data) => {
    if (req.body.price) {
      data.price = req.body.price;
    }
    if (req.body.image) {
      data.image = req.body.image;
    }
    if (req.body.address) {
      data.address = req.body.address;
    }
    if (req.body.description) {
      data.description = req.body.description;
    }
    if (req.body.beds) {
      data.beds = req.body.beds;
    }
    if (req.body.baths) {
      data.baths = req.body.baths;
    }
    if (req.body.area) {
      data.area = req.body.area;
    }
    data.save();
    next(new OkResponse(data));
  });
});

router.delete('/delete',(req, res, next)=>{
    Properties.findById({_id: req.query.id},(err, data)=>{
        if(!err && data){
            console.log(data);
            data.remove();
            next(new OkResponse("Data has been removed successfully"))
        }else{
            next(new BadRequestResponse("error"))
        }
    })
})

router.get('/showAll',(req, res, next)=>{
    Properties.find().populate('category user').then((err,data)=>{
        if(err){
            next(err);
        }else{
            next(new OkResponse(data));
        }
    })
})

module.exports = router;
