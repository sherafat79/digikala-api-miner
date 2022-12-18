const fetch = require("node-fetch");
var fs = require("fs");

// let ids=fs.readFileSync("./content/ids.json");
// ids=JSON.parse(ids);

let ids = [
  4148678, 6089334, 3368400, 175804, 6801966, 4125232, 9869380, 4009878,
  5148938, 820878, 8061139, 9867023, 10091000, 4017165, 4122746, 9730068,
  9634936, 9635006, 9634960, 9634974, 9147854, 2915057, 446794, 8138496,
  3425914, 2879118, 8138508, 41519, 9965106, 8595927, 10056779, 7785998,
  3422922, 6462593, 8452213, 3889799, 6832087,
];

let settings = { method: "Get" };
const saveImageList = (imageArr, id) => {
  if (!fs.existsSync(`./content/pic/${id}`))
    fs.mkdirSync(`./content/pic/${id}`);
  imageArr.map((img, index) => {
    fetch(img.url[0]).then((res) =>
      res.body.pipe(
        fs.createWriteStream(`./content/pic/${id}/${index}.jpg`, {})
      )
    );
  });
};
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const saveImage = async (image, id) => {
  await sleep(5000);
  if (!fs.existsSync(`./content/pic/${id}`)) {
    fs.mkdirSync(`./content/pic/${id}`);
  }
  fetch(image.url[0]).then((res) =>
    res.body.pipe(fs.createWriteStream(`./content/pic/${id}/${id}.jpg`, {}))
  );
};

async function fetchData(id) {
  let url = `https://api.digikala.com/v1/product/${id}/`;
  const { data } = await fetch(url, settings).then((res) => res.json());

  if (!("is_inactive" in data.product)) {
    let ProductJson = fs.readFileSync("./content/data.json");
    ProductJson = JSON.parse(ProductJson);
    ProductJson.push({
      name: data.product.title_fa,
      category_id: 411,
      brand_id: 22,
      qty: 0,
      price: 0,
      id: id,
      specifications: data.product.specifications[0]?.attributes ?? null,
    });
    fs.writeFileSync("./content/data.json", JSON.stringify(ProductJson));

    fs.writeFileSync(
      `./content/desc/${id}.txt`,
      data.product.review.description ?? "--",
      { encoding: "utf-8" }
    );
    // const imageArr=data.product.images.list;
    // saveImageList(imageArr,id);
    const image = data.product.images.main;
    saveImage(image, id);
  }
  return id;
}

const main = async () => {
  for (i of ids) {
    await sleep(1000);
    const res = await fetchData(i);
    console.log(`${res} inserted`);
  }
};
main();
