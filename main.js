const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');

async function run() {
  try {
    const name = core.getInput('name');
    const jarPath = path.join(__dirname, 'Greet.jar');

    let stdout = '';

    const options = {
      listeners: {
        stdout: (data) => {
          stdout += data.toString();
        },
      },
    };

    await exec.exec('java', ['-jar', jarPath, name], options);
    core.setOutput('jar-output', stdout);

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
