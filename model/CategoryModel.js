"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
var Mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var CategoryModel = /** @class */ (function () {
    function CategoryModel(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    CategoryModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            categoryID: String,
            name: String,
            description: String,
            parentCategoryID: String,
            subcategories: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Category' }]
        }, { collection: 'categories' });
    };
    CategoryModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, mongoose_1.default
                                .connect(this.dbConnectionString, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                            })
                                .then(function (res) {
                                console.log('Connected to Distribution API Database - Initial Connection');
                            })
                                .catch(function (err) {
                                console.log("Initial Distribution API Database connection error occured -", err);
                            })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model('Category', this.schema);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.addCategory = function (response, category) {
        return __awaiter(this, void 0, void 0, function () {
            var newCategory, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newCategory = new this.model(category);
                        return [4 /*yield*/, newCategory.save()];
                    case 1:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        response.status(500).send(e_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.updateCategory = function (response, categoryID, updatedCategory) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.updateOne({ categoryID: categoryID }, updatedCategory)];
                    case 1:
                        result = _a.sent();
                        if (result.nModified === 1) {
                            response.json({ message: "Category updated successfully." });
                        }
                        else {
                            response.status(404).send("Category not found.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.error(e_3);
                        response.status(500).send(e_3.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.deleteCategory = function (response, categoryID) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.deleteOne({ categoryID: categoryID })];
                    case 1:
                        result = _a.sent();
                        if (result.deletedCount === 1) {
                            response.json({ message: "Category deleted successfully." });
                        }
                        else {
                            response.status(404).send("Category not found.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        console.error(e_4);
                        response.status(500).send(e_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.getSubcategories = function (response, categoryID) {
        return __awaiter(this, void 0, void 0, function () {
            var category, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ categoryID: categoryID }).populate('subcategories')];
                    case 1:
                        category = _a.sent();
                        if (category) {
                            response.json(category.subcategories);
                        }
                        else {
                            response.status(404).send("Category not found.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.error(e_5);
                        response.status(500).send(e_5.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.addSubcategory = function (response, parentCategoryID, subCategory) {
        return __awaiter(this, void 0, void 0, function () {
            var parentCategory, newSubcategory, newSubcategoryResult, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.model.findOne({ categoryID: parentCategoryID })];
                    case 1:
                        parentCategory = _a.sent();
                        if (!parentCategory) return [3 /*break*/, 4];
                        newSubcategory = new this.model(subCategory);
                        return [4 /*yield*/, newSubcategory.save()];
                    case 2:
                        newSubcategoryResult = _a.sent();
                        parentCategory.subcategories.push(newSubcategoryResult._id);
                        return [4 /*yield*/, parentCategory.save()];
                    case 3:
                        _a.sent();
                        response.json(parentCategory);
                        return [3 /*break*/, 5];
                    case 4:
                        response.status(404).send("Parent category not found.");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_6 = _a.sent();
                        console.error(e_6);
                        response.status(500).send(e_6.message);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CategoryModel.prototype.removeSubcategory = function (response, parentCategoryID, subCategory) {
        return __awaiter(this, void 0, void 0, function () {
            var parentCategory, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.model.findOne({ categoryID: parentCategoryID })];
                    case 1:
                        parentCategory = _a.sent();
                        if (!(parentCategory && subCategory._id)) return [3 /*break*/, 3];
                        parentCategory.subcategories.pull(subCategory._id);
                        return [4 /*yield*/, parentCategory.save()];
                    case 2:
                        _a.sent();
                        response.json(parentCategory);
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(404).send("Parent category or subcategory not found.");
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_7 = _a.sent();
                        console.error(e_7);
                        response.status(500).send(e_7.message);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return CategoryModel;
}());
exports.CategoryModel = CategoryModel;
