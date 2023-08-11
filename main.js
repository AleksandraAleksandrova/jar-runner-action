try {
    const core = require('@actions/core');
    const { exec } = require('child_process');
    const path = require('path');

    try {
        console.log('Current working directory:', process.cwd());
        const jarPathRelative = core.getInput('jar-path').trim();
        console.log('Relative Jar Path from argv:', jarPathRelative);

        const jarPathAbsolute = path.resolve(process.cwd(), jarPathRelative);
        console.log('Absolute Jar Path:', jarPathAbsolute);

        // use relative path to jar file
        exec(`java -jar ${jarPathRelative}`, (error, stdout, stderr) => {
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
