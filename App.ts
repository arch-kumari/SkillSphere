import express = require('express');
import * as Module from 'module';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as crypto from 'crypto';
import { CategoryModel } from './model/CategoryModel';
import { CourseModel } from './model/CourseModel';
import { EventModel } from './model/EventModel';
import { InstructorOrOrganizerModel } from './model/InstructorOrOrganizerModel';
import { ReviewModel } from './model/ReviewModel';
import { ScheduleModel } from './model/ScheduleModel';
import { StudentModel } from './model/StudentModel';
import { UserModel } from './model/UserModel';
import { ICourseModel } from './interfaces/ICourseModel';
import { userInfo } from 'os';
import { parseArgs } from 'util';

import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import GooglePassportObj from './GooglePassport';
import * as passport from 'passport';
import { GoogleProfileModel } from './model/GoogleProfileModel';

declare global {
  namespace Express {
    interface User {
      id: string,
      displayName: string,
    }
  }
}

class ConcreteUserModel extends UserModel {
  constructor(DB_CONNECTION_STRING: string) {
    super(DB_CONNECTION_STRING);
  }
}

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public Category: CategoryModel;
  public Course: CourseModel;
  public Event: EventModel;
  public InstructorOrOrganizer: InstructorOrOrganizerModel;
  public Review: ReviewModel;
  public Schedule: ScheduleModel;
  public Student: StudentModel;
  public User: UserModel;
  public GoogleProfile: GoogleProfileModel;

  public googlePassportObj: GooglePassportObj;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection: string) {
    this.googlePassportObj = new GooglePassportObj();

    this.express = express();
    this.middleware();
    this.routes();
    console.log(mongoDBConnection);
    this.Category = new CategoryModel(mongoDBConnection);
    this.Course = new CourseModel(mongoDBConnection);
    this.Event = new EventModel(mongoDBConnection);
    this.InstructorOrOrganizer = new InstructorOrOrganizerModel(mongoDBConnection);
    this.Review = new ReviewModel(mongoDBConnection);
    this.Schedule = new ScheduleModel(mongoDBConnection);
    this.Student = new StudentModel(mongoDBConnection);
    this.User = new ConcreteUserModel(mongoDBConnection);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(session({ secret: 'keyboard cat' }));
    this.express.use(cookieParser());
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  private validateAuth(req, res, next): void {
    if (req.isAuthenticated()) { console.log("user is authenticated"); return next(); }
    console.log("user is not authenticated");
    res.redirect('/');
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/auth/google',
      passport.authenticate('google', { scope: ['profile','email'] }));


    router.get('/auth/google/callback',
      passport.authenticate('google',
        { failureRedirect: '/' }
      ),
      (req, res) => {
        console.log("successfully authenticated user and returned to callback page.");
        console.log("redirecting to instructor dashboard /#/instructor/dashboard");
        res.redirect('/#/instructor/dashboard');
      }
    );


    router.get('/', async (req, res) => {
      try {
        res.send('Welcome to SkillSphere');
      } catch (error) {
        console.log(error);
      }
    });

    //Handles logout of a user 

    router.post('/logout', this.validateAuth, (req: any, res, next) => {
      req.logout();
      res.clearCookie('SkillSphere-Cookie');
      req.session.destroy();
      res.status(200).redirect('/');
    });

    router.post('/api/logs', (req, res) => {
      console.log(req.body.message);
      res.status(200).send('Log received');
    });

    // Gets the user information based on id.
    router.get('/api/user', this.validateAuth, async (req: any, res) => {
      if (req.isAuthenticated()) {
        console.log(req.user.id);
        await this.InstructorOrOrganizer.getInstructorUsingUserId(res, req.user.id);
      } else {
        console.log('User not authenticated');
        res.status(401).json({ message: 'User not authenticated' });
      }
    });

    // Gets the user information based on id.
    router.get('/api/dashboardCourse', this.validateAuth, async (req: any, res) => {
      if (req.isAuthenticated()) {
        console.log(req.user.id);
        await this.Course.getCoursesUsingUserId(res, req.user.id);
      } else {
        console.log('User not authenticated');
        res.status(401).json({ message: 'User not authenticated' });
      }
    });

    //GET single element
    router.get('/api/courses/:courseId', async (req, res) => {
      const courseId = req.params.courseId;

      if (courseId && typeof courseId === 'string') {
        await this.Course.getSingleCourse(res, courseId);
      } else {
        res.status(400).send('Invalid course ID.');
      }
    });

    // Updated route handler for fetching courses by name
    router.get('/api/course/:courseName', async (req, res) => {
      const courseName = req.params.courseName;

      if (courseName && typeof courseName === 'string') {
        await this.Course.getSingleCourseByName(res, courseName);
      } else {
        res.status(400).send('Invalid course name.');
      }
    });

    // GET route to fetch all courses
    router.get('/api/courses', async (req, res) => {
      try {
        await this.Course.getAllCourses(res); // Call getAllCourses and pass the response object
      } catch (e) {
        console.error(e);
        res.status(500).send('Error fetching courses.');
      }
    });

    // GET route to fetch all courses
    router.get('/api/instructors', async (req, res) => {
      try {
        await this.InstructorOrOrganizer.getAllInstructors(res); // Call getAllInstructors and pass the response object
      } catch (e) {
        console.error(e);
        res.status(500).send('Error fetching all instructors.');
      }
    });

    // POST route to create a new course
    router.post('/api/course', async (req, res) => {
      const newCourseData = req.body; // Assuming you send course data in the request body
      const courseID = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      newCourseData.courseID = courseID;

      try {
        const result = await this.Course.createCourse(newCourseData);
        res.json(result);
      } catch (e) {
        console.error(e);
        console.log('object creation failed');
        if (!res.headersSent) {
          res.status(500).send(e.message);
        }
      }
    });

    //PUT route to update a course
    router.put('/api/course/:courseID', async (req, res) => {
      const courseID = req.params.courseID;
      const updatedCourse = req.body;

      try {
        const result = await this.Course.updateCourse(courseID, updatedCourse);
        res.json(result);
        //res.status(result.status).send(result.message);
      } catch (e) {
        console.error(e);
        if (!res.headersSent) {
          res.status(500).send(e.message);
        }
      }
    });


    //DELETE route to delete a course
    router.delete('/api/course/:courseID', async (req, res) => {
      const courseID = req.params.courseID;

      try {
        const result = await this.Course.deleteCourse(courseID);
        res.json(result);
        //res.status(result.status).send(result.message);
      } catch (e) {
        console.error(e);
        if (!res.headersSent) {
          res.status(500).send(e.message);
        }
      }
    });

    //POST route to enroll a student in particular course
    router.post('/api/course/:courseID/enroll/:studentID', async (req, res) => {
      const courseID = req.params.courseID;
      const studentID = req.params.studentID;

      try {
        const result = await this.Course.enrollStudent(courseID, studentID);
        if (result.course) {
          res.status(result.status).json(result.course);
        } else {
          res.status(result.status).send(result.message);
        }
      } catch (e) {
        console.error(e);
        if (!res.headersSent) {
          res.status(500).send(e.message);
        }
      }
    });

    //Update instructor profile
    router.put('/api/instructorProfile/:instructorID', async (req, res) => {
      const instructorID = req.params.instructorID;
      const updatedInstructorProfile = req.body;
      this.GoogleProfile =  this.googlePassportObj.googleProfile;
      if (this.GoogleProfile) {
        // Merge Google profile data into the updatedInstructorProfile
        updatedInstructorProfile.userID = this.GoogleProfile.id;
        updatedInstructorProfile.name = this.GoogleProfile.displayName;
        updatedInstructorProfile.email = this.GoogleProfile._json.email;
        updatedInstructorProfile.profileImage = this.GoogleProfile.getProfilePicture;
        console.log('Updated Instructor Profile:', updatedInstructorProfile);
      }
      try {
        const result = await this.InstructorOrOrganizer.updateProfile(instructorID, updatedInstructorProfile);
        res.json(result);
        //res.status(result.status).send(result.message);
      } catch (e) {
        console.error(e);
        if (!res.headersSent) {
          res.status(500).send(e.message);
        }
      }
    });


    //GET single element
    router.get('/api/instructorNameUsingID/:instructorID', async (req, res) => {
      const instructorID = req.params.instructorID;

      if (instructorID && typeof instructorID === 'string') {
        await this.InstructorOrOrganizer.getInstructorNameUsingId(res, instructorID);
      } else {
        res.status(400).send('Invalid course ID.');
      }
    });

    // route for registering a new instructor
    router.post('/api/instructors/register', async (req, res) => {
      const instructorDetails = req.body; // Assuming instructor details are sent in the request body
      await this.InstructorOrOrganizer.register(res, instructorDetails);
    });

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



  }

}

export { App };