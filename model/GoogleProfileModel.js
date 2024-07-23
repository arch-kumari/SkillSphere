"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleProfileModel = void 0;
var GoogleProfileModel = /** @class */ (function () {
    function GoogleProfileModel(profile) {
        this.id = profile.id;
        this.displayName = profile.displayName;
        this.name = profile.name;
        this.emails = profile.emails;
        this.photos = profile.photos;
        this.provider = profile.provider;
        this._raw = profile._raw;
        this._json = profile._json;
    }
    // You can add methods to manipulate or retrieve profile data as needed.
    GoogleProfileModel.prototype.getFullName = function () {
        return "".concat(this.name.givenName, " ").concat(this.name.familyName);
    };
    GoogleProfileModel.prototype.getProfilePicture = function () {
        return this.photos.length > 0 ? this.photos[0].value : '';
    };
    return GoogleProfileModel;
}());
exports.GoogleProfileModel = GoogleProfileModel;
