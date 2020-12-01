const chalk = require('chalk');
const questions = require('../questions');

/**
 * Step 2
 * Where you prompt users for options (where you'd call this.prompt()).
 */
function askQuestions(title, questions, done) {
  this.log(chalk.yellow(`\n${title} questions:`));

  return this.prompt(questions).then(answers => {
    this.answers = Object.assign(this.answers || {}, answers);
    done();
  });
}

module.exports = {
  askPackageManager() {
    askQuestions.call(
      this,
      'Package Manager',
      questions.packageManager,
      this.async(),
    );
  },

  askAppName() {
    askQuestions.call(this, 'Application', questions.app, this.async());
  },

  askIsAuthNeed() {
    askQuestions.call(this, 'Need auth', questions.wantedAuth, this.async());
  },

  askAboutDatabase() {
    askQuestions.call(this, 'Database', questions.db, this.async());
  },

  askWouldHeLikeDocker() {
    askQuestions.call(this, 'Docker', questions.docker, this.async());
  },

  askWouldHeLikeToDeployOnHeroku() {
    askQuestions.call(this, 'Deploy on heroku', questions.deploy, this.async());
  },

  askAppIdentifier() {
    askQuestions.call(
      this,
      'App Identifier',
      questions.identifier,
      this.async(),
    );
  },

  askDescription() {
    askQuestions.call(
      this,
      'App Description',
      questions.description,
      this.async(),
    );
  },
};
