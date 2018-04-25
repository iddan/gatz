const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const marked = require("marked");
const fm = require("front-matter");
const Handlebars = require("handlebars");
const emoji = require("node-emoji");
const cheerio = require("cheerio");
const htmlMinify = require("./html-minify");
const { assureDir, fromPairs } = require("./util");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);

/**
 * @todo
 * Support nested pages
 * Resolve referred resources (images, fonts...): custom statement or ./
 * Support .handlebars and .html
 */
module.exports = async function build(directory) {
  const pagesDir = path.join(directory, "pages");
  const layoutsDir = path.join(directory, "layouts");
  const partialsDir = path.join(directory, "partials");
  const buildDir = path.join(directory, "build");
  const dataDir = path.join(directory, "data");
  const pages = await readdir(pagesDir);
  const partials = await readdir(partialsDir);
  const dataFiles = await readdir(dataDir);
  const layouts = {};
  const data = fromPairs(
    await Promise.all(
      dataFiles.map(async dataFile => [
        path.parse(dataFile).name,
        JSON.parse(
          await readFile(path.join(dataDir, dataFile), { encoding: "utf-8" })
        )
      ])
    )
  );

  await Promise.all(
    partials.map(async partial => {
      const { name } = path.parse(partial);
      Handlebars.registerPartial(
        name,
        await readFile(path.join(partialsDir, partial), { encoding: "utf-8" })
      );
    })
  );

  assureDir(buildDir);

  await Promise.all(
    // assume pages
    pages.map(async page => {
      const pageName = path.parse(page).name;
      const pagePath = path.join(pagesDir, page);
      const pageRawContent = await readFile(pagePath, { encoding: "utf-8" });
      const { body, attributes } = fm(pageRawContent);
      const content = emoji.emojify(marked.parse(body, { gfm: true }));
      // assume layout
      const layoutPath = path.join(layoutsDir, attributes.layout + ".hbs");
      const layout =
        layouts[attributes.layout] ||
        Handlebars.compile(
          await readFile(layoutPath, {
            encoding: "utf-8"
          })
        );
      const builtPageFileName = pageName + ".html";
      const builtPage = layout({
        page: {
          attributes,
          content
        },
        ...data
      });
      await writeFile(
        path.join(buildDir, builtPageFileName),
        htmlMinify(builtPage)
      );
      console.info("Built", builtPageFileName);
      // just use webpack
      // todo rename files
      const $ = cheerio.load(builtPage);
      const images = $("img")
        .map((index, img) => $(img).attr("src"))
        .get();
      const stylesheets = $('link[href$=".css"]')
        .map((index, link) => $(link).attr("href"))
        .get();
      const scripts = $("script")
        .map((index, script) => $(script).attr("src"))
        .get();
      const localFiles = [...images, ...stylesheets, ...scripts].filter(
        asset => asset.startsWith("./") || asset.startsWith("../")
      );
      // resolve not just from layout
      await Promise.all(
        localFiles.map(async file =>
          copyFile(
            path.resolve(path.dirname(layoutPath), file),
            path.resolve(buildDir, file)
          )
        )
      );
      console.info("Copied referenced files of", builtPageFileName);
    })
  );
};
