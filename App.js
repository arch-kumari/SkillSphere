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
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var CategoryModel_1 = require("./model/CategoryModel");
var CourseModel_1 = require("./model/CourseModel");
var EventModel_1 = require("./model/EventModel");
var InstructorOrOrganizerModel_1 = require("./model/InstructorOrOrganizerModel");
var ReviewModel_1 = require("./model/ReviewModel");
var ScheduleModel_1 = require("./model/ScheduleModel");
var StudentModel_1 = require("./model/StudentModel");
var UserModel_1 = require("./model/UserModel");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var GooglePassport_1 = require("./GooglePassport");
var passport = require("passport");
var ConcreteUserModel = /** @class */ (function (_super) {
    __extends(ConcreteUserModel, _super);
    function ConcreteUserModel(DB_CONNECTION_STRING) {
        return _super.call(this, DB_CONNECTION_STRING) || this;
    }
    return ConcreteUserModel;
}(UserModel_1.UserModel));
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App(mongoDBConnection) {
        this.googlePassportObj = new GooglePassport_1.default();
        this.express = express();
        this.middleware();
        this.routes();
        console.log(mongoDBConnection);
        this.Category = new CategoryModel_1.CategoryModel(mongoDBConnection);
        this.Course = new CourseModel_1.CourseModel(mongoDBConnection);
        this.Event = new EventModel_1.EventModel(mongoDBConnection);
        this.InstructorOrOrganizer = new InstructorOrOrganizerModel_1.InstructorOrOrganizerModel(mongoDBConnection);
        this.Review = new ReviewModel_1.ReviewModel(mongoDBConnection);
        this.Schedule = new ScheduleModel_1.ScheduleModel(mongoDBConnection);
        this.Student = new StudentModel_1.StudentModel(mongoDBConnection);
        this.User = new ConcreteUserModel(mongoDBConnection);
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(session({ secret: 'keyboard cat' }));
        this.express.use(cookieParser());
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    App.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting to instructor dashboard /#/instructor/dashboard");
            res.redirect('/#/instructor/dashboard');
        });
        router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.send('Welcome to SkillSphere');
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        }); });
        //Handles logout of a user 
        router.post('/logout', this.validateAuth, function (req, res, next) {
            req.logout();
            res.clearCookie('SkillSphere-Cookie');
            req.session.destroy();
            res.status(200).redirect('/');
        });
        router.post('/api/logs', function (req, res) {
            console.log(req.body.message);
            res.status(200).send('Log received');
        });
        // Gets the user information based on id.
        router.get('/api/user', this.validateAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.isAuthenticated()) return [3 /*break*/, 2];
                        console.log(req.user.id);
                        return [4 /*yield*/, this.InstructorOrOrganizer.getInstructorUsingUserId(res, req.user.id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.log('User not authenticated');
                        res.status(401).json({ message: 'User not authenticated' });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // Gets the user information based on id.
        router.get('/api/dashboardCourse', this.validateAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.isAuthenticated()) return [3 /*break*/, 2];
                        console.log(req.user.id);
                        return [4 /*yield*/, this.Course.getCoursesUsingUserId(res, req.user.id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.log('User not authenticated');
                        res.status(401).json({ message: 'User not authenticated' });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        //GET single element
        router.get('/api/courses/:courseId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var courseId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseId = req.params.courseId;
                        if (!(courseId && typeof courseId === 'string')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Course.getSingleCourse(res, courseId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400).send('Invalid course ID.');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // Updated route handler for fetching courses by name
        router.get('/api/course/:courseName', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var courseName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseName = req.params.courseName;
                        if (!(courseName && typeof courseName === 'string')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Course.getSingleCourseByName(res, courseName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400).send('Invalid course name.');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // GET route to fetch all courses
        router.get('/api/courses', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Course.getAllCourses(res)];
                    case 1:
                        _a.sent(); // Call getAllCourses and pass the response object
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        res.status(500).send('Error fetching courses.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // GET route to fetch all courses
        router.get('/api/instructors', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.InstructorOrOrganizer.getAllInstructors(res)];
                    case 1:
                        _a.sent(); // Call getAllInstructors and pass the response object
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        res.status(500).send('Error fetching all instructors.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // POST route to create a new course
        router.post('/api/course', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var newCourseData, courseID, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newCourseData = req.body;
                        courseID = crypto.randomBytes(16).toString("hex");
                        console.log(req.body);
                        newCourseData.courseID = courseID;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Course.createCourse(newCourseData)];
                    case 2:
                        result = _a.sent();
                        res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        console.log('object creation failed');
                        if (!res.headersSent) {
                            res.status(500).send(e_3.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //PUT route to update a course
        router.put('/api/course/:courseID', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var courseID, updatedCourse, result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseID = req.params.courseID;
                        updatedCourse = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Course.updateCourse(courseID, updatedCourse)];
                    case 2:
                        result = _a.sent();
                        res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        console.error(e_4);
                        if (!res.headersSent) {
                            res.status(500).send(e_4.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //DELETE route to delete a course
        router.delete('/api/course/:courseID', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var courseID, result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseID = req.params.courseID;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Course.deleteCourse(courseID)];
                    case 2:
                        result = _a.sent();
                        res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        console.error(e_5);
                        if (!res.headersSent) {
                            res.status(500).send(e_5.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //POST route to enroll a student in particular course
        router.post('/api/course/:courseID/enroll/:studentID', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var courseID, studentID, result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseID = req.params.courseID;
                        studentID = req.params.studentID;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Course.enrollStudent(courseID, studentID)];
                    case 2:
                        result = _a.sent();
                        if (result.course) {
                            res.status(result.status).json(result.course);
                        }
                        else {
                            res.status(result.status).send(result.message);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        console.error(e_6);
                        if (!res.headersSent) {
                            res.status(500).send(e_6.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //Update instructor profile
        router.put('/api/instructorProfile/:instructorID', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var instructorID, updatedInstructorProfile, result, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instructorID = req.params.instructorID;
                        updatedInstructorProfile = req.body;
                        this.GoogleProfile = this.googlePassportObj.googleProfile;
                        if (this.GoogleProfile) {
                            // Merge Google profile data into the updatedInstructorProfile
                            updatedInstructorProfile.userID = this.GoogleProfile.id;
                            updatedInstructorProfile.name = this.GoogleProfile.displayName;
                            updatedInstructorProfile.email = this.GoogleProfile._json.email;
                            updatedInstructorProfile.profileImage = this.GoogleProfile.getProfilePicture;
                            console.log('Updated Instructor Profile:', updatedInstructorProfile);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.InstructorOrOrganizer.updateProfile(instructorID, updatedInstructorProfile)];
                    case 2:
                        result = _a.sent();
                        res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        console.error(e_7);
                        if (!res.headersSent) {
                            res.status(500).send(e_7.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //GET single element
        router.get('/api/instructorNameUsingID/:instructorID', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var instructorID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instructorID = req.params.instructorID;
                        if (!(instructorID && typeof instructorID === 'string')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.InstructorOrOrganizer.getInstructorNameUsingId(res, instructorID)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400).send('Invalid course ID.');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // route for registering a new instructor
        router.post('/api/instructors/register', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var instructorDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instructorDetails = req.body;
                        return [4 /*yield*/, this.InstructorOrOrganizer.register(res, instructorDetails)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.express.use('/images', express.static(__dirname + '/img'));
        this.express.use('/data', express.static(__dirname + '/json'));
        this.express.use('/', express.static(__dirname + '/dist/skill-sphere-application/browser'));
        this.express.use('/css', express.static(__dirname + '/css'));
        this.express.use('/counterup', express.static(__dirname + '/lib/counterup'));
        this.express.use('/easing', express.static(__dirname + '/lib/easing'));
        this.express.use('/assets', express.static(__dirname + '/lib/owlcarousel/assets'));
        this.express.use('/waypoints', express.static(__dirname + '/lib/waypoints'));
        this.express.use('/js', express.static(__dirname + '/js'));
        this.express.use('/', router);
        //this.express.use('/api', router);
    };
    return App;
}());
exports.App = App;
