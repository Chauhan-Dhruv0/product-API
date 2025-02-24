const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const multer =require('multer');



// Strorage

const strorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+'-'+file.originalname)
  },
  
})

const upload = multer({ storage: strorage });
 
// Get all items

router.get("/", async (req, res) => {
    try {
        const items = await Item.find()
        .select("name price description _id photo")
        .exec()
        res.json({count: items.length, products: items
        //   .map(items=>{
        //   return{
        //     _id:items.id,
        //     name:items.name,
        //     price:items.price,
        //     request:{
        //       type:"GET",
        //       url:`http://localhost:3000/items/${items._id}`
        //     }

        //   }
        // })
      });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//one  Product find by id

router.get("/:id", getItem, async (req, res) => {
    try {
      const item = await Item.findById(req.params.id).select("-__v -createAt")
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item
//         {
//     product: {
//         name: item.name,
//         price: item.price,
//         description:item.description,
        
//     }
// }
);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


// Add items

router.post("/",upload.single('photo'), async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        photo: req.file ? req.file.path : undefined,
    });

    try {
        const newItem = await item.save();  
        res.status(201).json(newItem); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', upload.single('photo'), getItem, async (req, res) => {
  // Update text fields if provided
  if (req.body.name) res.item.name = req.body.name;
  if (req.body.description) res.item.description = req.body.description;
  if (req.body.price) res.item.price = req.body.price;

  // If a new file was uploaded, update the photo path
  if (req.file) {
    res.item.photo = req.file.path;
  }
    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// delete

router.delete("/:id", getItem, async (req, res) => {
    try {
        await res.item.deleteOne();
        res.json({ message: "Item Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//  now find ID


async function getItem(req, res, next) {
    let item; 
    try {
      item = await Item.findById(req.params.id); 
      if (!item) {
        return res.status(404).json({ message: "Cannot find item" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.item = item;
    next();
  }
  

module.exports = router;
