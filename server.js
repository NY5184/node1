const express = require('express')
const {products}=require("./data")
const app = express()
const PORT = process.env.PORT || 4000


app.get('/home',(req,res)=>{
    res.send("<h1>Home Page</h1> <a href='./data'>Products</a>")
    })

app.get('/data', (req, res) => {
        res.json(products)
     })

app.get('/api/products',(req,res)=>{
const newProd=products.map(prod=>
{    return prod       }
)})

app.get('/api/products/prodid',(req,res)=>{
const {prodid}=req.params;
const oneprod=products.find(products=>{
    products.id===Number(prodid)
})
if(!oneprod)
{
    res.status(404).json({error:true,
        message:"Product does not exists"})
}
res.json(oneprod)
})


app.get('/api/v1/search', (req, res) => {
    const { search, limit, type = 1 } = req.query 
    let filterProducts = [...products];
  
    if (search) {
      filterProducts = filterProducts.filter(product => {
        switch (Number(type)) {
          case 1: 
            return product.name === search
          case 2: 
            return product.name.startsWith(search)
          case 3: 
            return product.name.includes(search)
          default: 
            return product.name === search
        }
      })
    }
  
    
    if (limit) {
      filterProducts = filterProducts.slice(0, Number(limit))
    }
  
    
    res.json(filterProducts)
  })
  
app.listen(PORT, ()=>console.log(`server running on ${PORT}`))