module.exports = function() {
    return {
        isProduction: process.env.ELEVENTY_MODE === 'PROD',
        isDevelopment: process.env.ELEVETNY_MODE === 'DEV',
    };
}