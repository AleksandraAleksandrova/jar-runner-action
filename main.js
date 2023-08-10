import { getInput, setFailed, setOutput } from '@actions/core';
import { exec } from 'child_process';

try {
  const jarPath = getInput('jar-path');
  exec(`java -jar ${jarPath}`, (error, stdout, stderr) => {
    if (error) {
      setFailed(`Error: ${error.message}`);
      return;
    }
    console.log(stdout);
    setOutput('output', stdout);
  });
} catch (error) {
  setFailed(error.message);
}
