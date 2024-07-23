import Mongoose = require("mongoose");

interface ICategoryModel extends Mongoose.Document {
    categoryID: string;
    name: string;
    description: string;
    parentCategoryID: string;
    subcategories: Array<ICategoryModel>;
}

export {ICategoryModel};