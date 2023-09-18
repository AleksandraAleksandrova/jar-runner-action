const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');

async function run() {
  try {
    const name = core.getInput('name');
    const files = core.getInput('changed-files');
    console.log(files);
    const greeterPath = path.join(__dirname, 'Greet.jar');
    const printerPath = path.join(__dirname, 'file-printer.jar');

    let stdout = '';

    const options = {
      listeners: {
        stdout: (data) => {
          stdout += data.toString();
        },
      },
    };

    await exec.exec('java', ['-jar', greeterPath, name], options);
    core.setOutput('greeting', stdout);

    stdout = '';
    const args = ['-jar', printerPath, ...files];
    await exec.exec('java', args, options);
    core.setOutput('files-contents', stdout);

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
