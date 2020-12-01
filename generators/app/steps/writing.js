const { join } = require('path');
const fs = require('fs');

module.exports = function() {
  const answers = this.answers;
  const payload = {
    config: answers,
  };
  const buildDir = answers.identifier;

  if (fs.existsSync('./src')) {
    this.fs.copyTpl(
      this.templatePath(join('./src')),
      this.destinationPath(`${buildDir}/src`),
      payload,
    );
  }

  this.fs.copyTpl(
    this.templatePath(join('./index.js')),
    this.destinationPath(`${buildDir}/index.js`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./nest-cli.json')),
    this.destinationPath(`${buildDir}/nest-cli.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./package.json')),
    this.destinationPath(`${buildDir}/package.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./package-lock.json')),
    this.destinationPath(`${buildDir}/package-lock.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./README.md')),
    this.destinationPath(`${buildDir}/README.md`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./tsconfig.build.json')),
    this.destinationPath(`${buildDir}/tsconfig.build.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./tsconfig.json')),
    this.destinationPath(`${buildDir}/tsconfig.json`),
    payload,
  );

  // files with "_" prefix
  this.fs.copyTpl(
    this.templatePath(join('./_.editorconfig')),
    this.destinationPath(`${buildDir}/.editorconfig`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./_.env.example')),
    this.destinationPath(`${buildDir}/.env.example`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./_.eslintrc.json')),
    this.destinationPath(`${buildDir}/.eslintrc.json`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./_.gitignore')),
    this.destinationPath(`${buildDir}/.gitignore`),
    payload,
  );
  this.fs.copyTpl(
    this.templatePath(join('./_.prettierrc')),
    this.destinationPath(`${buildDir}/.prettierrc`),
    payload,
  );

  if (answers['deploy:heroku'] === 'Yes') {
    this.fs.copyTpl(
      this.templatePath(join('./deploy-heroku.sh')),
      this.destinationPath(`${buildDir}/deploy-heroku.sh`),
      payload,
    );
  }

  // if auth is not needed then build a default project without auth.
  if (answers.wantedAuth.toLowerCase() === 'no') {
    this.fs.copyTpl(
      this.templatePath(join(`./${answers.db}/src`)),
      this.destinationPath(`${buildDir}/src`)
    );
  }

  if (answers.wantedDocker.toLowerCase() === 'yes') {
    this.fs.copyTpl(
      this.templatePath(join('./mongodb/docker-compose.yml')),
      this.destinationPath(`${buildDir}/docker-compose.yml`)
    );
  }
};
