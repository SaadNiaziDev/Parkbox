const router = require("express").Router();
const Boost=require("../../models/Boost");
const {OkResponse,BadRequestResponse,InternalServerErrorResponse}=require("express-http-response");


router.post('/add',(req,res, next)=>{
    try {
        let boost = new Boost();
        boost.no_of_days=req.body.days;
        boost.price=req.body.price;
        boost.save((err,response)=>{
            if(response){
                next(new OkResponse(response))
            }else{
                next(new BadRequestResponse(err));
            }
        });
    } catch (err) {
        next(new BadRequestResponse(err));
    }
})

router.put('/update/:id',(req, res, next)=>{
    try {
        Boost.findById(req.params.id,(err, data)=>{
            if(!err && data){
                if(typeof req.body.days!=='undefined' && req.body.days!== null && req.body.days){
                    data.no_of_days = req.body.days;
                }
                if(typeof req.body.price!=='undefined' && req.body.price!== null && req.body.price){
                    data.price = req.body.price;
                }
                data.save((err,result)=>{
                    if(!err && result){
                        next(new OkResponse("Data updated successfully!"));
                    }else{
                        next(new InternalServerErrorResponse("Error updating data!"));
                    }
                });
            }
            if(err){
                next(new InternalServerErrorResponse("Something unknow Happened!"));
            }
        })
    } catch (err) {
        next(new BadRequestResponse(err));
    }
})


router.delete('/delete/:id',(req, res, next)=>{
    try {
        Boost.deleteOne({_id:req.params.id},(err, data)=>{
            if(!err && data){
                next(new OkResponse(data));
            }
            if(err){
                next(new InternalServerErrorResponse("Something unknow Happened!"));
            }
        })
    } catch (err) {
        next(new BadRequestResponse(err));
    }
})

router.get('/show',(req, res, next)=>{
    try {
        Boost.find({},(err, data)=>{
            if(!err && data){
                next(new OkResponse(data));
            }else{
                next(new BadRequestResponse("Fail to retrive data"));
            }
        })
    } catch (err) {
        next(new InternalServerErrorResponse("Something unknow Happened!"));
    }
})

module.exports = router;