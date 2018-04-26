const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const FrontMatter = require("front-matter");
const Handlebars = require("handlebars");
const marked = require("marked");
const Emoji = require("node-emoji");
const { fromPairs } = require("./util");

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

const layouts = {};

async function getLayout(name) {
  if (layouts[name]) {
    return layouts[name];
  }
  const layoutContent = await readFile(path.join("layouts", name + ".hbs"), { encoding: 'utf-8' });
  return Handlebars.compile(layoutContent, {
    // strict: true
  });
}

async function loadPartials(directory) {
  const partialsDir = directory ? path.join(directory, "partials") : "partials";
  const partials = await readdir(partialsDir);

  await Promise.all(
    partials.map(async partial => {
      const { name } = path.parse(partial);
      Handlebars.registerPartial(
        name,
        await readFile(path.join(partialsDir, partial), { encoding: "utf-8" })
      );
    })
  );
}

async function loadData(directory) {
  const dataDir = directory ? path.join(directory, "data") : 'data';
  const dataFiles = await readdir(dataDir);
  return fromPairs(
    await Promise.all(
      dataFiles.map(async dataFile => [
        path.parse(dataFile).name,
        JSON.parse(
          await readFile(path.join(dataDir, dataFile), { encoding: "utf-8" })
        )
      ])
    )
  );
}

module.exports = async function(content, map, meta) {
  const { body, attributes } = FrontMatter(content);
  const parsedMarkdown = Emoji.emojify(marked.parse(body, { gfm: true }));
  await loadPartials();
  const template = await getLayout(attributes.layout);
  const data = await loadData();
  const compiled = template({
    ...data,
    page: {
      content: parsedMarkdown
    }
  })
  return compiled;
};
