const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const { FatchData } = require("./src/FatchData");


let ids=fs.readFileSync("./content/ids.json");
ids=JSON.parse(ids);



(async () => {

  const  category_id = prompt(chalk.blue("please insert delshop category code that you want to insert from digikala >>> "),{value: null});
  const  brand_id = prompt(chalk.cyan("please inter delshop brand code default ==> others "),{value: 22});
  const  digikalaCategoryName = prompt(chalk.red("please inter digikala category name >>> "),{value: null});

  if(category_id==""  || digikalaCategoryName==""){
    console.log(chalk.bgRed("all items are required !!!"))
  }
  else{
    const fatchData=new FatchData(category_id,brand_id,ids);
    await fatchData.getData();
    console.log(chalk.bgGreen("items are fatched !!! "))
   
  }


})();




