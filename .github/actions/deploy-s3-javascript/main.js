const core = require('@actions/core');
//const github = require('@actions/github');
const exec = require('@actions/exec');

function run(){
    // 1) Get the inputs
    const bucket = core.getInput('bucket-name', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: true});
    const distFolder = core.getInput('dist-folder', {required: true});

    // 2) Upload files
    const s3URI = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3URI} --region ${bucketRegion}`);

    core.notice('Deploy complete!');
}

run();