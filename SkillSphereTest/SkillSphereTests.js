import chai from 'chai';
import chaiHttp from 'chai-http';
import async from 'async';

const { assert, expect, should } = chai;
chai.use(chaiHttp);


describe('Test single course object', function () {
    let singleClass;
    let response;

    before(function (done) {
        chai.request("https://skill-sphere.azurewebsites.net")
            .get("/api/course/introduction_to_python_programming") // Adjust the endpoint URL as per your API
            .end(function (err, res) {
                singleClass = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return a single object with known properties', function () {
        expect(response).to.have.status(200);
        expect(singleClass).to.have.property('title').that.is.a('string');
        expect(singleClass).to.have.property('description').that.is.a('string');
        expect(singleClass).to.have.property('courseID').that.is.a('string');
        expect(singleClass).to.have.property('price').that.is.a('number');
        expect(singleClass).to.have.property('courseImage').that.is.a('string');
        expect(singleClass).to.have.property('courseName').that.is.a('string');
        expect(singleClass).to.have.property('categoryID').that.is.a('string');
        expect(singleClass).to.have.property('userID').that.is.a('string');
        expect(singleClass).to.have.property('instructorID').that.is.a('string');
        expect(singleClass).to.have.property('schedule').that.is.an('array');
    });

    it('Should return the correct class object', function () {
        expect(singleClass.title).to.equal("Introduction to Python Programming");
        // Add more assertions to check other properties if needed
    });
});

describe('Test courses lists result', function () {
    let requestResult;
    let response;

    before(function (done) {
        chai.request("https://skill-sphere.azurewebsites.net")
            .get("/api/courses")
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return an array object with more than 2 objects', function () {
        expect(response).to.have.status(200);
        expect(response.body).to.have.length.above(2);
        expect(response).to.have.headers;
    });

    it('The first entry in the array has known properties', function () {
        expect(requestResult[0]).to.include.keys('title');
        expect(requestResult[0]).to.have.property('_id');
        expect(response.body[0]).to.have.property('courseID');
        expect(response.body).to.not.be.a.string;
    });

    it('The elements in the array have the expected properties', function () {
        expect(response.body).to.have.lengthOf(14); // Update the expected length to 6
        expect(response.body).to.satisfy(function (body) {
            for (let i = 0; i < body.length; i++) {
                expect(body[i]).to.have.property('title');
                expect(body[i]).to.have.property('description');
                expect(body[i]).to.have.property('courseID');
                expect(body[i]).to.have.property('price');
                expect(body[i]).to.have.property('courseImage').that.is.a('string');
                expect(body[i]).to.have.property('courseName').that.is.a('string');
                expect(body[i]).to.have.property('categoryID').that.is.a('string');
                expect(body[i]).to.have.property('userID').that.is.a('string');
                expect(body[i]).to.have.property('instructorID').that.is.a('string');
                expect(body[i]).to.have.property('schedule').that.is.an('array');
            }
            return true;
        });
    });
});

describe('Test POST new course', function() {
    let requestResult;
    let response;
    let courseID; // Variable to store the created course ID

    // Runs once before the first test in this block
    before(function (done) {
        // Set up any necessary preconditions here
        done();
    });

    // Defines a single test case
    it('Should create a new course with all properties', function (done) {
        // Define the data for the new course
        const newCourseData = {
            "courseName": "carnatic_vocal_music",
            "title": "Carnatic Vocal Music",
            "description": "Music school in the Seattle area offering lessons taught by an All India Radio graded vocalist and playback singer whose repertoire includes a wide range of genres.",
            "categoryID": "1",
            "instructorID": "9",
            "userID": "102517777969441008047",
            "price": 160,
            "courseImage": "https://th-i.thgim.com/public/migration_catalog/article12221108.ece/alternates/LANDSCAPE_1200/04FR_RANJANI__amp__GAYATHRI_1",
            "schedule": [
                {
                    "date": "2024-05-10",
                    "startTime": "10:00 AM",
                    "endTime": "12:00 PM",
                    "location": "Seattle"
                },
                {
                    "date": "2024-05-15",
                    "startTime": "2:00 PM",
                    "endTime": "4:00 PM",
                    "location": "Kirkland"
                }
            ]
        };

        // Make a POST request to the API
        chai.request("https://skill-sphere.azurewebsites.net")
            .post("/api/course")
            .send(newCourseData)
            .end(function (err, res) {

                requestResult = res.body;
                response = res;

                // Assert that there is no error
                expect(err).to.be.null;
                expect(res).to.have.status(200);

                // Store the created course ID for cleanup
                courseID = res.body.courseID;

                done();
            });
    });

    it('API should return status OK (200)', function() {
        expect(response).to.have.headers;
        expect(response).to.have.status(200);
    });

    it('API should return a single JSON object', function () {
        expect(response).to.be.json;
        expect(response.body).to.be.an('object');
    });

    it('API returns object that has expected properties/keys', function () {
        expect(requestResult).to.include.keys(['_id','__v',
            'courseID', 'courseName', 'title', 'description', 'categoryID', 
            'instructorID', 'userID', 'price', 'courseImage', 'schedule'
        ]);
    });

    it('API returns object that contains the expected keys and of correct data type', function () {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(requestResult.courseID).to.be.a('string');
        expect(requestResult.title).to.be.a('string');
        expect(requestResult.description).to.be.a('string');
        expect(requestResult.categoryID).to.be.a('string');
        expect(requestResult.instructorID).to.be.a('string');
        expect(requestResult.userID).to.be.a('string');
        expect(requestResult.price).to.be.a('number');
        expect(requestResult.courseImage).to.be.a('string');
        expect(requestResult.schedule).to.be.an('array');
        expect(requestResult.schedule[0].date).to.be.a('string');
        expect(requestResult.schedule[0].startTime).to.be.a('string');
        expect(requestResult.schedule[0].endTime).to.be.a('string');
        expect(requestResult.schedule[0].location).to.be.a('string');
    });

    // Cleanup: delete the course created during the test
    after(function (done) {
        if (courseID) {
            chai.request("https://skill-sphere.azurewebsites.net")
                .delete(`/api/course/${courseID}`)
                .end(function (err, res) {
                    console.log('Cleanup error:', err);
                    console.log('Cleanup response status:', res.status);
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        } else {
            done();
        }
    });
});