
interface ICategoryModel  {
    categoryID: number;
    name: string;
    description: string;
    parentCategoryID: number;
    subcategories: Array<ICategoryModel>;
}

export default ICategoryModel;