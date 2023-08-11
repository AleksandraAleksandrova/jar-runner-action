try {
    const core = require('@actions/core');
    const { exec } = require('child_process');

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

} catch (error) {
    console.error('Required package is missing:', error.message);
} 
