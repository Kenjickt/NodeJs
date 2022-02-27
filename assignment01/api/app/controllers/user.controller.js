exports.allAccess = (req, res) => {
  res.status(200).send("Welcome to Assignment01!");
};
exports.userDataAccess = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminDataAccess = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorDataAccess = (req, res) => {
  res.status(200).send("Moderator Content.");
};