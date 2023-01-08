module.exposrts = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./assets');

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};