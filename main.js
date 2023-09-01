const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');
const fs = require('fs');
const workingDir = process.cwd();
const filesInDir = fs.readdirSync(workingDir);

console.log(`Working Directory: ${workingDir}`);
console.log(`Files in Directory: ${filesInDir.join(', ')}`);

async function run() {
  try {
    const name =  "Anna" //core.getInput('name');
    //const jarPath = './Greet.jar';
    const jarPath1 = path.join(process.env.GITHUB_WORKSPACE, 'Greet.jar');
    const jarPath2 = path.join(__dirname, 'Greet.jar');

    /*
    let stdout = '';
    const options = {
      listeners: {
        stdout: (data) => {
          stdout += data.toString();
        },
      },
    };
    */

    console.log(`Jar Path: ${jarPath1}`);
    await exec.exec('java', ['-jar', jarPath1, name], options);
    //core.setOutput('jar-output', stdout);

    console.log(`Jar Path: ${jarPath2}`);
    await exec.exec('java', ['-jar', jarPath2, name], options);
    //core.setOutput('jar-output', stdout);

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
