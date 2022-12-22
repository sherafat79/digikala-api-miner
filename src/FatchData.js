const fetch = require("node-fetch");
const { sleep } = require("./utility");
const fs = require("fs");
const chalk = require("chalk");

class FatchData {
  categoryId;
  brandId;
  ids;
  #settings = { method: "Get" };
  constructor(category_id, brand_id, ids) {
    this.categoryId = category_id;
    this.brandId = brand_id;
    this.ids = ids;
  }

  async getData() {
    for (let id of this.ids) {
      await sleep(1000);
      await this.#getProduct(id);
    }
  }
  async #getProduct(id) {
    let url = `https://api.digikala.com/v1/product/${id}/`;
    const { data } = await fetch(url, this.#settings).then((res) => res.json());
    const { product } = data;

    if (!("is_inactive" in product)) {
      this.#updateJson({
        name: product.title_fa,
        category_id: parseInt(this.categoryId),
        brand_id: parseInt(this.brandId),
        qty: 0,
        price: 0,
        id: id,
        specifications: product.specifications[0]?.attributes ?? null,
        descrption: product?.review?.description,
      });
      console.log(chalk.green(`id =>> ${id} inserted try to  get images`));
      //   const imageArr=data.product.images.list;
      //   saveImageList(imageArr,id);
        const image = data.product.images.main;
        const imageRes=await this.saveImage(image, id);
    }
  }
  async #updateJson(data) {
    let ProductJson = fs.readFileSync(`${__dirname}/../content/data.json`);
    ProductJson = JSON.parse(ProductJson);
    ProductJson.push(data);
    fs.writeFileSync(
      `${__dirname}/../content/data.json`,
      JSON.stringify(ProductJson)
    );
  }
   saveImageList(imageArr, id) {
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
  
  async saveImage (image, id)  {
    await sleep(500);
    fs.mkdirSync(`./content/pic/${id}`,{recursive:true});
    const result=await fetch(image.url[0]).then(res =>res.body);
    await result.pipe(fs.createWriteStream(`${__dirname}/../content/pic/${id}/${id}.jpg`, {}))
    console.log(chalk.green(`product =>> ${id} image save successfully`));
    return id
  };
}
module.exports = {
  FatchData,
};
