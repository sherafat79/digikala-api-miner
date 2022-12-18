const fetch = require('node-fetch');
var fs = require('fs');
const writeData=(data)=>{
    let products=data.products;
    
   
    products.forEach(p=>{
        let ProductJson=fs.readFileSync("./content/ids.json");
        ProductJson=JSON.parse(ProductJson);
        ProductJson.push(p.id)
        fs.writeFileSync("./content/ids.json",JSON.stringify(ProductJson));
    })
}
const fatchData=(page)=>{
    
    let url = `https://api.digikala.com/v1/categories/book/search/?page=${page}`;
    let settings = { method: "Get" };
        fetch(url, settings)
        .then(res => res.json())
        .then(({data}) => {
      
          writeData(data);
        })
    }          
    

   
fs.writeFileSync("./content/ids.json",JSON.stringify([]));

let totalPage=5;
for (let index = 1; index <= totalPage; index++) 
{
    fatchData(index);
}
