import * as Mongoose from "mongoose";
import {ICategoryModel} from '../interfaces/ICategoryModel';
import mongoose, { ConnectOptions } from "mongoose";

class CategoryModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema({
            categoryID: String,
            name: String,
            description: String,
            parentCategoryID: String,
            subcategories: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Category' }]
        }, { collection: 'categories' });
    }

    public async createModel() {
        try {
            await mongoose
      .connect(this.dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to Distribution API Database - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          `Initial Distribution API Database connection error occured -`,
          err
        );
      });
              
            this.model = Mongoose.model<ICategoryModel>('Category', this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async addCategory(response: any, category: ICategoryModel): Promise<void> {
        try {
            const newCategory = new this.model(category);
            const result = await newCategory.save();
            response.json(result);
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async updateCategory(response: any, categoryID: String, updatedCategory: ICategoryModel): Promise<void> {
        try {
            const result = await this.model.updateOne({ categoryID: categoryID }, updatedCategory);
            if (result.nModified === 1) {
                response.json({ message: "Category updated successfully." });
            } else {
                response.status(404).send("Category not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async deleteCategory(response: any, categoryID: String): Promise<void> {
        try {
            const result = await this.model.deleteOne({ categoryID: categoryID });
            if (result.deletedCount === 1) {
                response.json({ message: "Category deleted successfully." });
            } else {
                response.status(404).send("Category not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async getSubcategories(response: any, categoryID: String): Promise<void> {
        try {
            const category = await this.model.findOne({ categoryID: categoryID }).populate('subcategories');
            if (category) {
                response.json(category.subcategories);
            } else {
                response.status(404).send("Category not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }

    public async addSubcategory(response: any, parentCategoryID: String, subCategory: ICategoryModel): Promise<void> {
        try {
            const parentCategory = await this.model.findOne({ categoryID: parentCategoryID });
            if (parentCategory) {
                const newSubcategory = new this.model(subCategory);
                const newSubcategoryResult = await newSubcategory.save();
                parentCategory.subcategories.push(newSubcategoryResult._id);
                await parentCategory.save();
                response.json(parentCategory);
            } else {
                response.status(404).send("Parent category not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }
    
    public async removeSubcategory(response: any, parentCategoryID: String, subCategory: ICategoryModel): Promise<void> {
        try {
            const parentCategory = await this.model.findOne({ categoryID: parentCategoryID });
            if (parentCategory && subCategory._id) {
                parentCategory.subcategories.pull(subCategory._id);
                await parentCategory.save();
                response.json(parentCategory);
            } else {
                response.status(404).send("Parent category or subcategory not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500).send(e.message);
        }
    }
}
export {CategoryModel};