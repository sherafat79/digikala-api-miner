const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
const { FatchData } = require("./src/FatchData");
const { cleanOldData, compressContent } = require("./src/utility");

const menu = (item) => {
  const menuItem = parseInt(item);

  if (typeof menuItem !== "number") {
    console.log(chalk.red("item not faund"));
    return null;
  }
  switch (menuItem) {
    case 0:
      getFromCategory();
      break;
    case 1:
      cleanOldData();
      break;
    case 2:
      compressContent();
      break;

    default:
      console.log("item not faund");
      break;
  }
};

const getFromCategory = async () => {
  const category_id = prompt(
    chalk.blue(
      "please insert delshop category code that you want to insert from digikala >>> "
    ),
    { value: null }
  );
  const brand_id = prompt(
    chalk.cyan("please inter delshop brand code default ==> others "),
    { value: 22 }
  );
  const digikalaCategoryName = prompt(
    chalk.red("please inter digikala category name >>> "),
    { value: null }
  );
  const startPage = prompt(
    chalk.cyan(" start page do you want >>> default ===> 1  "),
    { value: 1 }
  );
  const endPage = prompt(
    chalk.cyan(" end page do you want >>> default ===> 5  "),
    { value: 5 }
  );
  const filterString = prompt(
    chalk.cyan(" filter string >>> default ===> empty  "),
    { value: null }
  );

  if (category_id == "" || digikalaCategoryName == "") {
    console.log(chalk.bgRed("all items are required !!!"));
  } else {
    const fatchData = new FatchData(category_id, brand_id, startPage, endPage);
    await fatchData.getData(digikalaCategoryName, filterString);
    console.log(chalk.bgGreen("items are fatched !!! "));
  }
};
(async () => {
  console.log("please select your item : ");
  console.log("0 ==> get from category ");
  console.log("1 ==> clear old data ");
  console.log("2 ==> compress into a .zip file ");
  const menuItem = prompt(chalk.cyan("please select an  item "));
  menu(menuItem);
})();
