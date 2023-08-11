try {
    const core = require('@actions/core');
    const { exec } = require('child_process');

    try {
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
