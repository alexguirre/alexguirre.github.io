const luxon = require('luxon');
const htmlmin = require("html-minifier");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyFetch = require("@11ty/eleventy-fetch");
const fs = require("fs/promises");
const path = require("path");
const AdmZip = require("adm-zip");

module.exports = function(eleventyConfig) {
    const isProduction = process.env.ELEVENTY_MODE === 'PROD';

    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    eleventyConfig.addPassthroughCopy('site/favicon.svg');
    eleventyConfig.addPassthroughCopy('site/css');
    eleventyConfig.addPassthroughCopy('site/fonts');
    eleventyConfig.addPassthroughCopy('site/img');
    eleventyConfig.addPassthroughCopy("site/blog/**/*.png");

    eleventyConfig.ignores.add("site/animations-list/**/*");
    eleventyConfig.addPassthroughCopy("site/animations-list");

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

    eleventyConfig.on("eleventy.before", async ({ dir, runMode, outputMode }) => {
        await fetchSevZombies(dir.output);
    });

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

async function fetchSevZombies(outputDir) {
    try {
        const cacheDuration = "1d";

        const latestRelease = await eleventyFetch("https://api.github.com/repos/alexguirre/sev-zombies/releases/latest", {
            duration: cacheDuration,
            type: "json",
        });
        const emscriptenBuildUrl = latestRelease.assets
            .filter(asset => asset.name === "sev-zombies-wasm32-emscripten.zip")
            .map(asset => asset.url)[0];
        const emscriptenBuildZipBuffer = await eleventyFetch(emscriptenBuildUrl, {
                duration: cacheDuration,
                type: "buffer",
                fetchOptions: {
                    headers: {
                        "Accept": "application/octet-stream",
                    }
                }
            })

        const zip = new AdmZip(emscriptenBuildZipBuffer);
        const dir = path.join(outputDir, "projects/sev-zombies");
        zip.extractEntryTo("sev-zombies-wasm32-emscripten/sev-zombies.data", dir, false, true);
        zip.extractEntryTo("sev-zombies-wasm32-emscripten/sev-zombies.js", dir, false, true);
        zip.extractEntryTo("sev-zombies-wasm32-emscripten/sev-zombies.wasm", dir, false, true);
    } catch (e) {
        console.log("Failed fetching sev-zombies release", e);
    }
}