import React,{useState} from "react";
import "./Reports.css";

const stockData=[
{category:"Rings",qty:45,gross:850,value:125000},
{category:"Chains",qty:32,gross:1200,value:175000},
{category:"Bangles",qty:28,gross:960,value:152000},
{category:"Earrings",qty:56,gross:420,value:95000}
];

export default function Reports(){

const [tab,setTab]=useState("stock");

return(

<div className="reports-container">

<h2 className="reports-title">
Reports & Analytics
</h2>

<div className="tabs">

<button onClick={()=>setTab("stock")}>Stock</button>
<button onClick={()=>setTab("sales")}>Sales</button>
<button onClick={()=>setTab("gst")}>GST</button>
<button onClick={()=>setTab("cash")}>Cash & Gold</button>

</div>

<div className="reports-layout">

<div className="filters">

<h3>Filters</h3>

<select>
<option>All Categories</option>
<option>Rings</option>
<option>Chains</option>
<option>Bangles</option>
</select>

<select>
<option>All Suppliers</option>
<option>Supplier A</option>
<option>Supplier B</option>
</select>

<input type="date"/>
<input type="date"/>

<button className="apply-btn">
Apply Filters
</button>

</div>

<div className="report-content">

<h3>Stock Distribution</h3>

<table>

<thead>
<tr>
<th>Category</th>
<th>Quantity</th>
<th>Gross Weight</th>
<th>Value</th>
</tr>
</thead>

<tbody>

{stockData.map((item,i)=>(
<tr key={i}>

<td>{item.category}</td>
<td>{item.qty}</td>
<td>{item.gross} g</td>
<td>₹ {item.value}</td>

</tr>
))}

</tbody>

</table>

<div className="export-buttons">

<button>
Export CSV
</button>

<button>
Export PDF
</button>

</div>

</div>

</div>

</div>

);
}