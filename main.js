try {
    const core = require('@actions/core');
    const { exec } = require('child_process');
    const path = require('path');

    try {
        console.log('Running the jar exactly as in my local terminal:')
        exec('java -jar ./HelloWorld.jar', (error, stdout, stderr) => {
            console.log('Output:', stdout);
        });

        console.log('Local run passed.\nCurrent working directory:', process.cwd());
        
        console.log("USE RELATIVE PATH")
        const jarPathRelative = core.getInput('jar-path').trim();
        console.log('Relative Jar Path from workflow:', jarPathRelative);
        exec(`ls -l ${jarPathRelative}`, (lsError, lsStdout, lsStderr) => {
            console.log('ls Output:', lsStdout);
            console.error('ls Error:', lsError);

            exec(`java -jar ${jarPathRelative}`, (error, stdout, stderr) => {
                if (error) {
                    core.setFailed(`Error: ${error.message}`);
                }
                console.log(stdout);
                core.setOutput('output', stdout);
            });
        });

        console.log("USE ABSOLUTE PATH")
        const jarPathAbsolute = path.resolve(process.cwd(), jarPathRelative);
        console.log('Absolute Jar Path:', jarPathAbsolute);
        exec(`ls -l ${jarPathAbsolute}`, (lsError, lsStdout, lsStderr) => {
            console.log('ls Output:', lsStdout);
            console.error('ls Error:', lsError);

            exec(`java -jar ${jarPathAbsolute}`, (error, stdout, stderr) => {
                if (error) {
                    core.setFailed(`Error: ${error.message}`);
                }
                console.log(stdout);
                core.setOutput('output', stdout);
            });
        });
    } catch (error) {
        core.setFailed(error.message);
    }

} catch (error) {
    console.error('Required package is missing:', error.message);
} 
