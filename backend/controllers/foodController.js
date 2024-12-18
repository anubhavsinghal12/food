import fs from 'fs'
import foodModel from '../models/foodModel.js'

//add food item

const addFood = async (req,res) =>{

    let image_filename = `${req.file.filename }`;

    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        res.json({success:true,message:'Food Added'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}

// All food list

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        // Add full path for image URLs
        const foodsWithImagePath = foods.map(food => ({
            ...food.toObject(),
            image: `https://food-iksm.onrender.com/uploads/${food.image}`,
        }));

        res.status(200).json({ success: true, data: foodsWithImagePath });
    } catch (error) {
        console.error(`Error fetching food list: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching food list', error: error.message });
    }
};


// remove food item

const removeFood = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:'Food Removed'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}

export {addFood, listFood, removeFood}
