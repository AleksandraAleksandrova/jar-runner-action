import * as core from '@actions/core';
import { exec } from 'child_process';

try {
  const jarPath = core.getInput('jar-path');
  exec(`java -jar ${jarPath}`, (error, stdout, stderr) => {
    if (error) {
      core.setFailed(`Error: ${error.message}`);
      return;
    }
    console.log(stdout);
    core.setOutput('output', stdout);
  });
} catch (error) {
  core.setFailed(error.message);
}
