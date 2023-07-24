const luxon = require('luxon');
const htmlmin = require("html-minifier");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    const isProduction = process.env.ELEVENTY_MODE === 'PROD';

    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    eleventyConfig.addPassthroughCopy('site/favicon.svg');
    eleventyConfig.addPassthroughCopy('site/css');
    eleventyConfig.addPassthroughCopy('site/fonts');
    eleventyConfig.addPassthroughCopy('site/img');
    eleventyConfig.addPassthroughCopy("site/blog/**/*.png");

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return luxon.DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLLL yyyy");
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return luxon.DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter("head", (array, n) => {
        if(!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if( n < 0 ) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    // remove tags for internal use from the array and sort alphabetically
    const internalTags = ["all", "blogPosts"];
    eleventyConfig.addFilter("cleanTags", (array) => {
        return array.filter(tag => !internalTags.includes(tag)).sort();
    });
    eleventyConfig.addFilter("cleanTagCollections", (collections) => {
        const result = [];
        for (const [key, value] of Object.entries(collections)) {
            if (!internalTags.includes(key)) {
                result.push([key, value]);
            }
        }
        result.sort((a, b) => a[0].localeCompare(b[0]));
        return result;
    });

    if (isProduction) {
        eleventyConfig.addTransform("htmlmin", function (content) {
            if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
                return htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true
                });
            }

            return content;
        });
    }


    console.log(">>>>>", process.env.ELEVENTY_MODE);

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
        ],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        dir: {
            input: "site",
            output: "_site"
        },
    }
};