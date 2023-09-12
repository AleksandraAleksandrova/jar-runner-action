const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const name = 'Anna';
    const jarPath = './Greet.jar'

    const name2 = core.getInput('name');
    console.log(`Hello ${name2}!`);

    await exec.exec('java', ['-jar', jarPath, name]);

    core.setOutput('jar-output', 'Success');

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
