"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.InstructorOrOrganizerModel = void 0;
var Mongoose = require("mongoose");
var UserModel_1 = require("./UserModel");
var InstructorOrOrganizerModel = /** @class */ (function (_super) {
    __extends(InstructorOrOrganizerModel, _super);
    function InstructorOrOrganizerModel(DB_CONNECTION_STRING) {
        var _this = _super.call(this, DB_CONNECTION_STRING) || this;
        _this.dbConnectionString = DB_CONNECTION_STRING;
        _this.createSchema();
        _this.createModel();
        return _this;
    }
    InstructorOrOrganizerModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            instructorID: String,
            userID: String,
            name: String,
            email: { type: String, unique: true },
            phoneNo: String,
            expertise: String,
            experience: Number,
            bio: String,
            rating: Number,
            profileImage: String,
            registrationDate: Date,
        }, { collection: 'instructors' });
    };
    InstructorOrOrganizerModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model('InstructorOrOrganizer', this.schema);
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
    InstructorOrOrganizerModel.prototype.getInstructorNameUsingId = function (response, instructorId) {
        return __awaiter(this, void 0, void 0, function () {
            var instructor, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ instructorID: instructorId })];
                    case 1:
                        instructor = _a.sent();
                        if (instructor) {
                            response.json(instructor);
                        }
                        else {
                            response.status(404).send("Instructor not found.");
                        }
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
    InstructorOrOrganizerModel.prototype.getInstructorUsingUserId = function (response, userID) {
        return __awaiter(this, void 0, void 0, function () {
            var instructor, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(userID);
                        return [4 /*yield*/, this.model.findOne({ userID: userID })];
                    case 1:
                        instructor = _a.sent();
                        console.log(instructor);
                        if (instructor) {
                            response.json(instructor);
                        }
                        else {
                            response.status(404).send("Instructor not found.");
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
    InstructorOrOrganizerModel.prototype.getAllInstructors = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var instructors, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find()];
                    case 1:
                        instructors = _a.sent();
                        if (instructors) {
                            response.json(instructors);
                        }
                        else {
                            response.status(404).send("No instructors found.");
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
    InstructorOrOrganizerModel.prototype.register = function (response, details) {
        return __awaiter(this, void 0, void 0, function () {
            var newStudent, result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newStudent = new this.model(details);
                        return [4 /*yield*/, newStudent.save()];
                    case 1:
                        result = _a.sent();
                        response.json({ message: "Registration successful", student: result });
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
    InstructorOrOrganizerModel.prototype.login = function (response, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var student, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ email: email })];
                    case 1:
                        student = _a.sent();
                        if (!student) {
                            response.status(404).send("Student not found.");
                            return [2 /*return*/];
                        }
                        if (password === student.password) {
                            response.json({ message: "Login successful", student: student });
                        }
                        else {
                            response.status(401).send("Incorrect password.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.error(e_6);
                        response.status(500).send(e_6.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InstructorOrOrganizerModel.prototype.updateProfile = function (instructorID, updatedDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("Attempting to update profile with ID: ".concat(instructorID));
                        console.log("Updated profile data: ".concat(JSON.stringify(updatedDetails)));
                        return [4 /*yield*/, this.model.updateOne({ instructorID: instructorID }, updatedDetails)];
                    case 1:
                        result = _a.sent();
                        if (result.nModified === 1 || result.modifiedCount === 1) {
                            console.log("Instructor with ID: ".concat(instructorID, " updated successfully."));
                            return [2 /*return*/, result];
                            //return { message: "Course updated successfully.", status: 200 };
                        }
                        else {
                            console.log("Instructor with ID: ".concat(instructorID, " not found."));
                            return [2 /*return*/, { message: "Instructor not found.", status: 404 }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        console.error("Error updating instructor with ID: ".concat(instructorID, ". Error: ").concat(e_7.message));
                        throw new Error(e_7.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InstructorOrOrganizerModel.prototype.getReviews = function (response, instructorID) {
        return __awaiter(this, void 0, void 0, function () {
            var courses, courseIds, reviews, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Mongoose.model('Course').find({ instructorID: instructorID })];
                    case 1:
                        courses = _a.sent();
                        if (!courses.length) {
                            response.status(404).send("No courses found for this instructor.");
                            return [2 /*return*/];
                        }
                        courseIds = courses.map(function (course) { return course._id; });
                        return [4 /*yield*/, Mongoose.model('Review').find({ courseID: { $in: courseIds } })];
                    case 2:
                        reviews = _a.sent();
                        if (!reviews.length) {
                            response.status(404).send("No reviews found for the courses taught by this instructor.");
                            return [2 /*return*/];
                        }
                        response.json(reviews);
                        return [3 /*break*/, 4];
                    case 3:
                        e_8 = _a.sent();
                        console.error(e_8);
                        response.status(500).send(e_8.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return InstructorOrOrganizerModel;
}(UserModel_1.UserModel));
exports.InstructorOrOrganizerModel = InstructorOrOrganizerModel;
