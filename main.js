const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const jarPath = './HelloWorld.jar';

    await exec.exec('java', ['-jar', jarPath]);

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
