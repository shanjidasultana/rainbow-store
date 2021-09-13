// ===============load products function============

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

//============== show all product in UI=============

const showProducts = (products) => {
  console.log(products);
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div  class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h4 >${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p>Rating-Count:${product?.rating?.count}</p>
      <p>Rating-Rate:${product?.rating?.rate}	
      &#127775 &#127775 &#127775 ;</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" data-bs-dismiss="modal" onclick="addDetails(${product.id})" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// =============counting of product================

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};
// ==============get input value from cart=========

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value.toFixed(2));
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
 
};

const showText=()=>{
  const buyBtn = document.getElementById('Buy');
   const totalBuy =document.getElementById('total').innerText;
   if(totalBuy >0){
   buyBtn.style.display='block'
   }else{
     buyBtn.style.display='none';
   }
}
//  ============single product api  ==========

const addDetails=(id)=>{
 const url=`https://fakestoreapi.com/products/${id}`
 fetch(url)
  .then((response) => response.json())
  .then((data) =>productDetails(data));
}

// ===============show single product function===============

const productDetails=(product)=>{
  const singleDiv= document.getElementById('single-div');
  const div=document.createElement('div');
  
  div.innerHTML=`
  <div class="modal-dialog " id="${product.id}">
  <div class="modal-content ">
    <div class="modal-header">
     <h3 class="modal-title text-danger">${product.title}</h3>
    </div>
    <div class="modal-body text-center " >
    <img src=${product.image} height="200" width="200" >
    </div>
    <div class="modal-header">
     <h4 class="modal-title text-success">${product.description}</h4>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" data-toggle='modal' onclick=" remove(${product.id})">Close</button>
    </div>
  </div>
</div>
  
  
`;
singleDiv.appendChild(div);
      
}
// =============function for close button==============

const remove=(Id)=>{
 document.getElementById(Id).style.display='none';

  
}