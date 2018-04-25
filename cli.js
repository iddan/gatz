#!/usr/bin/env node
/**
 * @todo
 * command develop: serve + watch + pretty print
 */
const program = require("commander");
const pkg = require("./package.json");
const build = require("./build");
const develop = require("./develop");

program.command("build").action(() => build(process.cwd()));
program.command("develop").action(() => develop(process.cwd()));

program.version(pkg.version).parse(process.argv);
