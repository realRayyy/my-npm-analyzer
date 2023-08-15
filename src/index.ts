#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { Command } from "commander";
import Dependencies from "./dependencies";

const program = new Command();
program.version("0.0.1", "-v, --ver", "版本信息");

// 设置选项;
program.option("--depth=<content> --depth", "指定递归分析的层次深度");
program.option("--json=<content>, --json", "指定json位置");

program.command("analyze [other...]").action(async () => {
  let depth = program.opts().depth ? Number(program.opts().depth) : -1;
  let path = program.opts().json ? program.opts().json : "./npm-analyze.json";
  if (isNaN(depth)) {
    console.log("depth参数不为数字");
    return;
  }

  const dependencies = new Dependencies(depth);

  const result = await dependencies.analyze();

  writeFile(path, JSON.stringify(result));
});

program.parse(process.argv);
