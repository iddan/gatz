#!/usr/bin/env node
/**
 * @todo
 * command develop: serve + watch + pretty print
 */
const program = require("commander");
const pkg = require("./package.json");
const build = require("./build");

program.command("build").action(() => build(process.cwd()));

program.version(pkg.version).parse(process.argv);
