var moment = require("moment");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function() {
  return `${this.family_name}, ${this.first_name}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function() {
  return moment(this.date_of_birth).format("YYYY-MM-DD");
});

AuthorSchema.virtual("date_of_death_formatted").get(function() {
  return moment(this.date_of_death).format("YYYY-MM-DD");
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function() {
  let deathDate = this.date_of_death
    ? moment(this.date_of_death).format("YYYY-MM-DD")
    : "";
  let birthDate = this.date_of_birth
    ? moment(this.date_of_birth).format("YYYY-MM-DD")
    : "";
  return `${birthDate} - ${deathDate}`;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function() {
  return `/catalog/author/${this._id}`;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
