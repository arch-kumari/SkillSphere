import googleAppAuth from './googleOauth2';
import { GoogleProfileModel } from './model/GoogleProfileModel';

let passport = require('passport');
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let GoogleStrategy = require('passport-google-oauth20').Strategy;

// Creates a Passport configuration for Google
class GooglePassport {

    clientId: string;
    secretId: string;
    googleProfile : GoogleProfileModel; 
    constructor() { 
        this.clientId = googleAppAuth.id;
        this.secretId = googleAppAuth.secret;

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback",
                scope: ['profile', 'email']
//                profileFields: ['id', 'displayName', 'emails']
            },
            (accessToken, refreshToken, profile, done) => {
                console.log("inside new password google strategy");
                process.nextTick( () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    this.googleProfile = profile;
                    console.log('this.googleProfile',this.googleProfile.photos);
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("retrieve all of the profile info needed");
                    if (profile.emails) {
                        console.log("emails:", profile.emails.map(email => email.value));
                      } else {
                        console.log("No emails found in profile");
                      }
                    // this.email = profile.emails[0].value;
                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }
}
export default GooglePassport;