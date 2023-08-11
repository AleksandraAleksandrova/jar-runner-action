try {
    const core = require('@actions/core');
    const { exec } = require('child_process');

    try {
        const jarPathRelative = core.getInput('jar-path').trim();
        console.log(`Running jar: ${jarPathRelative}`);
        exec(`java -jar ${jarPathRelative}`, (error, stdout, stderr) => {
            if (error) {
                core.setFailed(`Error: ${error.message}`);
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
