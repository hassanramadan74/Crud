var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var currentDate = new Date();
const day = currentDate.getDate();   
const month = currentDate.getMonth() + 1; 
const year = currentDate.getFullYear(); 
const hour = currentDate.getHours();    
const minute = currentDate.getMinutes(); 
const amPm = hour < 12 ? "AM" : "PM";
var Products=[];
var addBtn = document.getElementById("addBtn");
var UpdateBtn = document.getElementById("updateBtn");
var productIndex;
if(localStorage.getItem('products')!=null){
    Products= JSON.parse(localStorage.getItem('products'));
    Display(Products);
}



function addProduct(){
    if(validatePrice()){
    var newProduct = {
        name: productName.value,
        price : productPrice.value,
        category  : productCategory.value,
        description   : productDesc.value
        }
      Products.push(newProduct);
      localStorage.setItem('products',JSON.stringify(Products));
      Display(Products);
      clearForm();
    }
    else{
        window.alert("not allowed");
    }
}


function Display(arr){
    var box=``;
    for(var i=0 ; i<arr.length;i++){
        box+=`
        <tr>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].description}</td>
        <td><button onclick="updateBtn(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
        <td><p>${hour}:${minute} ${amPm}</p><p>${month}/${day}/${year}</p></td>
    </tr>
        `
    }
document.getElementById("tableBody").innerHTML=box;
}




function clearForm(){
    productName.value="";
         productPrice.value="";
         productCategory.value="";
       productDesc.value="";
}


function deleteItem(productIndex){
Products.splice(productIndex,1);
localStorage.setItem('products',JSON.stringify(Products));
Display(Products);
}


function searchProducts(term){
    var matchedProducts = [];
    for(var i=0 ; i<Products.length;i++){
        if (Products[i].name.toLowerCase().includes(term.toLowerCase())){
            matchedProducts.push(Products[i]);
    }
}
Display(matchedProducts);
}



function updateBtn(index){
    productIndex=index;
addBtn.classList.replace('d-block','d-none');
UpdateBtn.classList.replace('d-none','d-block');
productName.value=Products[index].name;
productPrice.value=Products[index].price;
productCategory.value=Products[index].category;
productDesc.value = Products[index].description;
}

function updatedIndex(){
    Products[productIndex].name = productName.value;
    Products[productIndex].price = productPrice.value;
    Products[productIndex].category = productCategory.value;
    Products[productIndex].description = productDesc.value;
    localStorage.setItem('products',JSON.stringify(Products));
    Display(Products);
}


function validatePrice(){
    const digitRegex = /^[0-9]+$/;
    return digitRegex.test(productPrice.value);
}













