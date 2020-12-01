/**
 * Step 2
 * Where you prompt users for options (where you'd call this.prompt()).
 */

const questions = require('../questions');

function askQuestions(title, questions, done) {
  this.log(chalk.yellow(`\n${title} questions:`));

  return this.prompt(questions).then(answers => {
    this.answers = Object.assign(this.answers || {}, answers);
    done();
  });
}

module.exports = {
  askAuthType() {
    askQuestions.call(this, 'Auth', questions.auth.type, this.async());
  },

  askAdditionalAuthQuestions() {
    askQuestions.call(
      this,
      'Auth additional questions',
      questions.auth.additionalQuestions[this.answers.authType],
      this.async(),
    );
  },
}
