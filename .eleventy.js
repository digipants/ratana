module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/api');
    eleventyConfig.addPassthroughCopy('./fonts');
    eleventyConfig.addPassthroughCopy('./src/robots.txt');
    eleventyConfig.addPassthroughCopy('./src/sitemap.xml');


    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};