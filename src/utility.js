const fs = require("fs");
const compressing = require('compressing');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  function cleanOldData(){
   fs.writeFileSync(
      `${__dirname}/../content/data.json`,
      JSON.stringify([])
    );
    console.log("data are cleaned")
    fs.rmSync(`${__dirname}/../content/pic`, { recursive: true, force: true });
    console.log("images are cleaned")
  }
  async function compressContent(){
    await compressing.zip.compressDir(`${__dirname}/../content`, `${__dirname}/../${Date.now()}.zip`).catch(e=>console.log("error==>"+e))
    console.log("done")
    
  }

  module.exports={
    sleep,
    cleanOldData,
    compressContent
  }