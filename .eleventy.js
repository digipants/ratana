module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./fonts');


    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};