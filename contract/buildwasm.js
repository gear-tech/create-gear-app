const sh = require("shelljs");
const path = require("path");
const fs = require("fs");
const { getWasmMetadata } = require("@gear-js/api");

const projectDir = sh.pwd().toString();

// Move to script directory
sh.cd(path.join(__dirname));

const debug = process.argv.pop() === "--debug";

// check out if we have 'debug' flag in options
const buildCmd = debug
  ? "cargo +nightly build"
  : "cargo +nightly build --release";

// Run cargo build command and save exit code
const { code } = sh.exec(buildCmd);

// if success

if (code === 0 && projectDir !== __dirname) {
  const outDir = `${projectDir}/public/out`;
  const packageName = require("fs")
    .readFileSync(`${__dirname}/Cargo.toml`)
    .toString()
    .match(/name = "([^"]+)"/)[1];
  const wasm = `${projectDir}/public/out/${packageName}.wasm`;
  const outFile = `./target/wasm32-unknown-unknown/${debug ? "debug" : "release"}/${packageName}.wasm`;
  sh.mkdir("-p", outDir);
  sh.rm("-f", wasm);
  sh.cp("-u", outFile, wasm);

  //   Check if Gear wasm-proc util already installed
  if (!sh.which("wasm-proc")) {
    sh.echo("Sorry, wasm-proc is not installed. Installing...");
    sh.exec("cargo install --git https://github.com/gear-tech/gear wasm-proc");
  } else {
    sh.exec(`wasm-proc -p ${wasm}`);
  }
}
