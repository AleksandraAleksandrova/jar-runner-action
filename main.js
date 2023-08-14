const core = require('@actions/core');
const { exec } = require('child_process');
const axios = require('axios');
const token = process.env.GITHUB_TOKEN;

try {
  const jarUrl = 'https://github.com/AleksandraAleksandrova/jar-runner-action/releases/download/1.0/HelloWorld.jar';

  axios.get(jarUrl, {
    responseType: 'arraybuffer',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    const fs = require('fs');
    fs.writeFileSync('HelloWorld.jar', response.data);

    exec('java -jar HelloWorld.jar', (error, stdout, stderr) => {
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
