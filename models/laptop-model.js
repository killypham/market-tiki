const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    remainQuantity: {
        type: Number,
        required: true
    },
    chip: String,
    ram: String,
    hardDrive: String,
    graphicChipset: String,
    screen: String,
    operatingSystem: String,
    battery: String,
    salePrice: Number,
    soldQuantity: Number,
    description: String,
    // accessories: String,
})

class LaptopClass{
    // For
    // **
    // USER

    static async getListLaptop() {
        return await LaptopModel.find();
    }

    static async findById(id){
        if(id){
            return await LaptopModel.findById(id);
        }else{
            return Promise.reject("ID is not exist.");
        }
    }

    static async findByBrand(brand){
        if(brand){
            return await LaptopModel.find({
                brand: { $regex: new RegExp(brand, "i")}
            });
        }else {
            return await Promise.reject("Brand is empty.");
        }
    }

    static async findByName(name){
        if(name){
            return await LaptopModel.find({
                name: { $regex: new RegExp(name, "i")}
            });
        }else {
            return await Promise.reject("Name is empty.");
        }
    }
    
    static async findByChip(chip){
        if(chip){
            return await LaptopModel.find({
                chip: { $regex: new RegExp(chip, "i")}
            });
        }else {
            return await Promise.reject("Chip is empty.");
        }
    }

    static async findByGraphicChipset(graphicChipset){
        if(graphicChipset){
            return await LaptopModel.find({
                graphicChipset: { $regex: new RegExp(graphicChipset, "i")}
            });
        }else {
            return await Promise.reject("Graphic Chipset is empty.");
        }
    }

    static async findByOperatingSystem(operatingSystem){
        if(operatingSystem){
            return await LaptopModel.find({
                operatingSystem: { $regex: new RegExp(operatingSystem, "i")}
            });
        }else {
            return await Promise.reject("Operating System is empty.");
        }
    }

    // For
    // **
    // ADMIN
    static async addLaptop(newLaptop) {
        const { brand, name, price, remainQuantity } = newLaptop;
    
        if (!brand) { return Promise.reject("Missing brand of laptop."); }
        else if (!name) { return Promise.reject("Missing name of laptop."); }
        else if (!price) { return Promise.reject("Missing price of laptop."); }
        else if (!remainQuantity) { return Promise.reject("Missing remainQuantity of laptop."); }
    
        return LaptopModel(newLaptop).save();
    }

    static async updateLaptop(updatedLaptop) {
        const { brand, name, price, remainQuantity } = updatedLaptop;
    
        if (!brand) { return Promise.reject("Missing brand of laptop."); }
        else if (!name) { return Promise.reject("Missing name of laptop."); }
        else if (!price) { return Promise.reject("Missing price of laptop."); }
        else if (!remainQuantity) { return Promise.reject("Missing remainQuantity of laptop."); }
        
        return this.findById(updatedLaptop.id).then(() => {
          return LaptopModel.findByIdAndUpdate(updatedLaptop.id, updatedLaptop, {new: true});
        }).catch(err => {
          return Promise.reject({msg: "ID is invalid", err: err});
        })
    }

    static async deleteLaptopById(id) {
        return LaptopModel.findByIdAndDelete(id);
    }
}

const ModelName = 'Laptop'
const LaptopModel = mongoose.model(ModelName, LaptopSchema);
module.exports = LaptopClass;