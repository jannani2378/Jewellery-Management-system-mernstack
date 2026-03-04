import React,{useState} from "react";
import "./Billing.css";
import {products} from "../data/dummyProducts";
import {generateEstimationInvoice} from "../utils/estimationInvoice";
import {generateFinalInvoice} from "../utils/finalInvoice";

export default function Billing(){

const [search,setSearch]=useState("");
const [barcode,setBarcode]=useState("");
const [cart,setCart]=useState([]);

const [customerSearch,setCustomerSearch]=useState("");
const [customer,setCustomer]=useState("");

const [goldRate,setGoldRate]=useState(6000);

const customers=[
"Arun Kumar",
"Priya Sharma",
"Rahul Verma",
"Sanjay Gupta"
];

function calculatePrice(product){

const base = product.net * goldRate;
const wastage = product.wastage * goldRate;

return Math.round(base + wastage + product.making);
}

function addProduct(product){

const price = calculatePrice(product);

setCart([...cart,{...product,price}]);
}

function handleBarcodeScan(){

const product = products.find(p=>p.barcode===barcode);

if(product){
addProduct(product);
setBarcode("");
}else{
alert("Product not found");
}
}

function removeItem(index){

const updated=[...cart];
updated.splice(index,1);
setCart(updated);
}

const subtotal = cart.reduce((s,i)=>s+i.price,0);
const gst = subtotal * 0.03;
const total = subtotal + gst;

function generateEstimation(){

generateEstimationInvoice({
customer,
cart,
subtotal,
gst,
total
});

}

function generateFinalBill(){

generateFinalInvoice({
customer,
cart,
subtotal,
gst,
total
});

}

return(

<div className="billing-page">

<h2>Billing</h2>

<div className="billing-grid">

<div className="search-card">

<h3>Search and Add Items</h3>

<input
placeholder="Scan barcode and press Enter"
value={barcode}
onChange={e=>setBarcode(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter"){
handleBarcodeScan();
}
}}
autoFocus
/>

<input
placeholder="Search product name"
value={search}
onChange={e=>setSearch(e.target.value)}
/>

<div className="product-results">

{products
.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()))
.map(product=>(
<div key={product.id} className="product-row">

<span>{product.name}</span>

<button onClick={()=>addProduct(product)}>
Add
</button>

</div>
))}

</div>

</div>

<div className="customer-card">

<h3>Customer Details</h3>

<input
placeholder="Search customer (optional)"
value={customerSearch}
onChange={(e)=>setCustomerSearch(e.target.value)}
/>

<div className="customer-results">

{customers
.filter(c=>c.toLowerCase().includes(customerSearch.toLowerCase()))
.map((c,i)=>(
<div
key={i}
className="customer-item"
onClick={()=>{
setCustomer(c);
setCustomerSearch(c);
}}
>
{c}
</div>
))}

</div>

<label>Gold Rate (per gram)</label>

<input
type="number"
value={goldRate}
onChange={e=>setGoldRate(e.target.value)}
/>

</div>

</div>

<div className="cart-card">

<h3>Cart Items</h3>

<table>

<thead>
<tr>
<th>Item</th>
<th>Gross</th>
<th>Net</th>
<th>Wastage</th>
<th>Making</th>
<th>Amount</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{cart.map((item,index)=>(

<tr key={index}>

<td>{item.name}</td>
<td>{item.gross} g</td>
<td>{item.net} g</td>
<td>{item.wastage} g</td>
<td>₹ {item.making}</td>
<td>₹ {item.price}</td>

<td>
<button onClick={()=>removeItem(index)}>
Remove
</button>
</td>

</tr>

))}

</tbody>

</table>

</div>

<div className="summary-card">

<h3>Bill Summary</h3>

<p>Subtotal : ₹ {subtotal}</p>
<p>GST (3%) : ₹ {gst.toFixed(2)}</p>

<h4>Total : ₹ {total.toFixed(2)}</h4>

<button
className="estimate-btn"
onClick={generateEstimation}
>
Generate Estimation
</button>

<button
className="final-btn"
onClick={generateFinalBill}
>
Generate Final Bill
</button>

</div>

</div>
);
}