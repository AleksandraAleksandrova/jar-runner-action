const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');
const workingDir = process.cwd();

async function run() {
  try {
    const name = 'Anna';
    const jarPath = './Greet.jar'

    await exec.exec('java', ['-jar', jarPath, name]);

    //core.setOutput('jar-output', stdout);

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
