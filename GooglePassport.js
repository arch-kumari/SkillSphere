"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleOauth2_1 = require("./googleOauth2");
var passport = require('passport');
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// Creates a Passport configuration for Google
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        var _this = this;
        this.clientId = googleOauth2_1.default.id;
        this.secretId = googleOauth2_1.default.secret;
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "/auth/google/callback",
            scope: ['profile', 'email']
            //                profileFields: ['id', 'displayName', 'emails']
        }, function (accessToken, refreshToken, profile, done) {
            console.log("inside new password google strategy");
            process.nextTick(function () {
                console.log('validating google profile:' + JSON.stringify(profile));
                _this.googleProfile = profile;
                console.log('this.googleProfile', _this.googleProfile.photos);
                console.log("userId:" + profile.id);
                console.log("displayName: " + profile.displayName);
                console.log("retrieve all of the profile info needed");
                if (profile.emails) {
                    console.log("emails:", profile.emails.map(function (email) { return email.value; }));
                }
                else {
                    console.log("No emails found in profile");
                }
                // this.email = profile.emails[0].value;
                return done(null, profile);
            });
        }));
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    return GooglePassport;
}());
exports.default = GooglePassport;
