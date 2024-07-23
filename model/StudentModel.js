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
exports.StudentModel = void 0;
var Mongoose = require("mongoose");
var UserModel_1 = require("./UserModel");
var StudentModel = /** @class */ (function (_super) {
    __extends(StudentModel, _super);
    function StudentModel(DB_CONNECTION_STRING) {
        var _this = _super.call(this, DB_CONNECTION_STRING) || this;
        _this.dbConnectionString = DB_CONNECTION_STRING;
        _this.createSchema();
        _this.createModel();
        return _this;
    }
    StudentModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            studentID: String,
            userID: String,
            studentName: String,
            email: String,
            phoneNo: String,
            enrolledCourses: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Course' }],
            profileImage: String,
            registrationDate: Date,
        }, { collection: 'students' });
    };
    StudentModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model('Student', this.schema);
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
    StudentModel.prototype.register = function (response, studentDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var newStudent, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newStudent = new this.model(studentDetails);
                        return [4 /*yield*/, newStudent.save()];
                    case 1:
                        result = _a.sent();
                        response.json({ message: "Registration successful", student: result });
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
    StudentModel.prototype.login = function (response, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var student, e_3;
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
                        e_3 = _a.sent();
                        console.error(e_3);
                        response.status(500).send(e_3.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StudentModel.prototype.enrollInCourse = function (response, studentID, courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var student, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.model.findOne({ studentID: studentID })];
                    case 1:
                        student = _a.sent();
                        if (!student) return [3 /*break*/, 5];
                        if (!student.enrolledCourses.includes(courseID)) return [3 /*break*/, 2];
                        response.status(400).send("Student is already enrolled in this course.");
                        return [3 /*break*/, 4];
                    case 2:
                        student.enrolledCourses.push(courseID);
                        return [4 /*yield*/, student.save()];
                    case 3:
                        _a.sent();
                        response.json(student);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        response.status(404).send("Student not found.");
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_4 = _a.sent();
                        console.error(e_4);
                        response.status(500).send(e_4.message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    StudentModel.prototype.dropCourse = function (response, studentID, courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var student, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.model.findOne({ studentID: studentID })];
                    case 1:
                        student = _a.sent();
                        if (!student) return [3 /*break*/, 3];
                        student.enrolledCourses = student.enrolledCourses.filter(function (id) { return id.toString() !== courseID.toString(); });
                        return [4 /*yield*/, student.save()];
                    case 2:
                        _a.sent();
                        response.json({ message: "Course dropped successfully", student: student });
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(404).send("Student not found.");
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_5 = _a.sent();
                        console.error(e_5);
                        response.status(500).send(e_5.message);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return StudentModel;
}(UserModel_1.UserModel));
exports.StudentModel = StudentModel;
