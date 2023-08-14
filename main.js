try {
    const core = require('@actions/core');
    const { exec } = require('child_process');

    try {
        const jarUrl = 'https://github.com/AleksandraAleksandrova/jar-runner-action/releases/download/1.0/HelloWorld.jar';
        const jarPathRelative = core.getInput('jar-path').trim();
        exec(`java -jar ${jarPathRelative}`, (error, stdout, stderr) => {
            if (error) {
                core.setFailed(`Error: ${error.message}`);
            }
            console.log(stdout);
            core.setOutput('jar-output', stdout);
        });

    } catch (error) {
        core.setFailed(error.message);
    }

} catch (error) {
    console.error('Required package is missing:', error.message);
} 



const core = require('@actions/core');
const { exec } = require('child_process');
const axios = require('axios');

try {
  const jarUrl = 'https://github.com/AleksandraAleksandrova/jar-runner-action/releases/download/1.0/HelloWorld.jar';
  axios.get(jarUrl, {
    responseType: 'arraybuffer',
  })
  .then(response => {
    exec(`java -jar HelloWorld.jar`, (error, stdout, stderr) => {
      if (error) {
        core.setFailed(`Error: ${error.message}`);
      }
      console.log(stdout);
      core.setOutput('jar-output', stdout);
    });
  })
  .catch(error => {
    core.setFailed(`Error: ${error.message}`);
  });

} catch (error) {
  core.setFailed(error.message);
}
