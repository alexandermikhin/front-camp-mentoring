// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var ReportPortalAgent = require('agent-js-jasmine');

var agent = new ReportPortalAgent({
    token: '5c9099f6-11a7-440b-bda1-8c45e186e4f4',
    endpoint: 'https://web.demo.reportportal.io/api/v1',
    launch: 'alexandermikhin_TEST_EXAMPLE',
    project: 'alexandermikhin_personal',
    attachPicturesToLogs: true
});

/**
 * @type { import("protractor").Config }
 */
exports.config = {
    allScriptsTimeout: 11000,
    specs: ['./src/**/*.e2e-spec.ts'],
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json')
        });
        jasmine
            .getEnv()
            .addReporter(
                new SpecReporter({ spec: { displayStacktrace: true } })
            );
        jasmine.getEnv().addReporter(agent.getJasmineReporter());
    },
    afterLaunch() {
        return agent
            .getExitPromise()
            .then(() => console.log('ReportPortal agent has finished work.'));
    }
};
