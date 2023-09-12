const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const jarPath = './Greet.jar'
    const name = core.getInput('name');

    await exec.exec('java', ['-jar', jarPath, name]);
    core.setOutput('jar-output', 'Success');

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
