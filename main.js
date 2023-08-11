try {
    const core = require('@actions/core');
    const { exec } = require('child_process');
    const path = require('path');

    try {
        console.log('Running JAR file...');
        console.log('Current working directory:', process.cwd());
        console.log('Current directory content:', exec('ls -la'));
        console.log('jar path from core input:', core.getInput('jar-path'));
        const jarPathRelative = core.getInput('jar-path').trim();
        console.log('Relative Jar Path from argv:', jarPathRelative);

        // Construct the absolute path to the JAR file
        const jarPathAbsolute = path.resolve(process.cwd(), jarPathRelative);
        console.log('Absolute Jar Path:', jarPathAbsolute);

        exec(`java -jar ${jarPathAbsolute}`, (error, stdout, stderr) => {
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
