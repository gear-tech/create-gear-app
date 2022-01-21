const sh = require("shelljs");
const fs = require("fs");
const { getWasmMetadata } = require("@gear-js/api");

const projectDir = sh.pwd().toString();
const packageName = require("fs")
    .readFileSync(`${__dirname}/Cargo.toml`)
    .toString()
    .match(/name = "([^"]+)"/)[1];

const wasm = `${projectDir}/out/${packageName}.meta.wasm`;

const BuildTypes = async (wasm) => {
  const wasmBuffer = await fs.readFileSync(wasm);
  const meta = await getWasmMetadata(wasmBuffer);
  console.log(meta);
};

BuildTypes(wasm);
