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
exports.CourseModel = void 0;
var Mongoose = require("mongoose");
var CourseModel = /** @class */ (function () {
    function CourseModel(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    CourseModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            courseID: String,
            courseName: String,
            title: String,
            description: String,
            categoryID: String,
            instructorID: String,
            userID: String,
            price: Number,
            schedule: Array,
            courseImage: String,
        }, { collection: 'courses' });
    };
    CourseModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model('Course', this.schema);
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
    CourseModel.prototype.getSingleCourse = function (response, courseId) {
        return __awaiter(this, void 0, void 0, function () {
            var course, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ courseID: courseId }).populate('instructorID').populate('categoryID').populate('schedule')];
                    case 1:
                        course = _a.sent();
                        if (course) {
                            response.json(course);
                        }
                        else {
                            response.status(404).send("Course not found.");
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
    // Updated method for fetching a single course by name
    CourseModel.prototype.getSingleCourseByName = function (response, courseName) {
        return __awaiter(this, void 0, void 0, function () {
            var course, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ courseName: courseName }).populate('schedule')];
                    case 1:
                        course = _a.sent();
                        if (course) {
                            response.json(course);
                        }
                        else {
                            response.status(404).send("Course not found.");
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
    CourseModel.prototype.getAllCourses = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var courses, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find().populate('instructorID').populate('categoryID').populate('schedule')];
                    case 1:
                        courses = _a.sent();
                        response.json(courses);
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
    // Updated method for fetching a single course by name
    CourseModel.prototype.getCoursesUsingUserId = function (response, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var course, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(userId);
                        return [4 /*yield*/, this.model.find({ userID: userId }).populate('schedule')];
                    case 1:
                        course = _a.sent();
                        console.log(course);
                        if (course) {
                            response.json(course);
                        }
                        else {
                            response.status(404).send("Course not found.");
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
    CourseModel.prototype.createCourse = function (course) {
        return __awaiter(this, void 0, void 0, function () {
            var newCourse, result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newCourse = new this.model(course);
                        return [4 /*yield*/, newCourse.save()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_6 = _a.sent();
                        console.error(e_6);
                        throw new Error(e_6.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CourseModel.prototype.updateCourse = function (courseID, updatedCourse) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("Attempting to update course with ID: ".concat(courseID));
                        console.log("Updated course data: ".concat(JSON.stringify(updatedCourse)));
                        return [4 /*yield*/, this.model.updateOne({ courseID: courseID }, updatedCourse)];
                    case 1:
                        result = _a.sent();
                        if (result.nModified === 1 || result.modifiedCount === 1) {
                            console.log("Course with ID: ".concat(courseID, " updated successfully."));
                            return [2 /*return*/, result];
                            //return { message: "Course updated successfully.", status: 200 };
                        }
                        else {
                            console.log("Course with ID: ".concat(courseID, " not found."));
                            return [2 /*return*/, { message: "Course not found.", status: 404 }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        console.error("Error updating course with ID: ".concat(courseID, ". Error: ").concat(e_7.message));
                        throw new Error(e_7.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CourseModel.prototype.deleteCourse = function (courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.deleteOne({ courseID: courseID })];
                    case 1:
                        result = _a.sent();
                        if (result.deletedCount === 1) {
                            return [2 /*return*/, result];
                            //return { message: "Course deleted successfully.", status: 200 };
                        }
                        else {
                            console.log("Course with ID: ".concat(courseID, " not found."));
                            return [2 /*return*/, { message: "Course not found.", status: 404 }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        console.log("Error deleting course with ID: ".concat(courseID, ". Error: ").concat(e_8.message));
                        console.error(e_8);
                        throw new Error(e_8.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CourseModel.prototype.enrollStudent = function (courseID, studentID) {
        return __awaiter(this, void 0, void 0, function () {
            var course, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.model.findOne({ courseID: courseID })];
                    case 1:
                        course = _a.sent();
                        if (!course) return [3 /*break*/, 5];
                        if (!course.students.includes(studentID)) return [3 /*break*/, 2];
                        return [2 /*return*/, { message: "Student is already enrolled.", status: 400 }];
                    case 2:
                        course.students.push(studentID);
                        return [4 /*yield*/, course.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "Student enrolled successfully.", status: 200, course: course }];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, { message: "Course not found.", status: 404 }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_9 = _a.sent();
                        console.error(e_9);
                        throw new Error(e_9.message);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return CourseModel;
}());
exports.CourseModel = CourseModel;
