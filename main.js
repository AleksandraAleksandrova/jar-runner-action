const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const jarPath = './helloworld.jar';

    let jarOutput = '';

    await exec.exec('java', ['-jar', jarPath], {
      listeners: {
        stdout: (data) => {
          jarOutput += data.toString();
        },
      },
    });

    core.setOutput('jar-output', jarOutput);

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
