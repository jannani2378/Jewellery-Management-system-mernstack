
import React, { useState } from "react";
import "./Reports.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ---------------- STOCK DATA ---------------- */

const stockData = [
{ category:"Rings", sub:"Gents Ring", supplier:"Supplier A", date:"2024-01-10", qty:45, gross:850, net:820, value:125000 },
{ category:"Chains", sub:"Gold Chain", supplier:"Supplier B", date:"2024-01-15", qty:32, gross:1200, net:1180, value:175000 },
{ category:"Bangles", sub:"Ladies Bangle", supplier:"Supplier A", date:"2024-02-02", qty:28, gross:960, net:940, value:152000 },
{ category:"Earrings", sub:"Diamond Earring", supplier:"Supplier C", date:"2024-02-10", qty:56, gross:420, net:410, value:95000 },
{ category:"Rings", sub:"Wedding Ring", supplier:"Supplier B", date:"2024-02-20", qty:22, gross:400, net:380, value:65000 },
{ category:"Chains", sub:"Light Chain", supplier:"Supplier C", date:"2024-03-01", qty:15, gross:300, net:280, value:42000 }
];

const COLORS = ["#D4AF37","#1E8449","#3498DB","#9B59B6"];

export default function Reports(){

const [tab,setTab]=useState("stock");

const [category,setCategory]=useState("All");
const [supplier,setSupplier]=useState("All");
const [fromDate,setFromDate]=useState("");
const [toDate,setToDate]=useState("");

/* ---------------- SALES DATA ---------------- */

const salesData = [
{ bill:"INV001", date:"2024-03-01", customer:"Rajesh Kumar", items:3, gross:45, making:8500, gst:4200, total:21500 },
{ bill:"INV002", date:"2024-03-02", customer:"Priya Sharma", items:2, gross:32, making:6000, gst:3100, total:15800 },
{ bill:"INV003", date:"2024-03-03", customer:"Amit Patel", items:1, gross:18, making:3500, gst:1800, total:9200 }
];

/* ---------------- GST DATA ---------------- */

const gstSummary = {
totalGST:45800,
cgst:22900,
sgst:22900,
taxable:1520000
};

/* ---------------- CASH DATA ---------------- */

const cashData = {
opening:150000,
inflow:285000,
outflow:150000,
closing:285000
};

/* ---------------- GOLD DATA ---------------- */

const goldData = {
opening:2850,
inflow:1250,
outflow:650,
closing:3450
};

/* ---------------- FILTER LOGIC ---------------- */

const filteredData = stockData.filter(item=>{
if(category!=="All" && item.category!==category) return false;
if(supplier!=="All" && item.supplier!==supplier) return false;
if(fromDate && new Date(item.date) < new Date(fromDate)) return false;
if(toDate && new Date(item.date) > new Date(toDate)) return false;
return true;
});

/* ---------------- PIE DATA ---------------- */

const categoryMap = {};

filteredData.forEach(item=>{
if(!categoryMap[item.category]) categoryMap[item.category]=0;
categoryMap[item.category]+=item.qty;
});

const pieData = Object.keys(categoryMap).map(key=>({
name:key,
value:categoryMap[key]
}));

/* ---------------- EXPORT STOCK ---------------- */

function exportExcel(){
const worksheet = XLSX.utils.json_to_sheet(filteredData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook,worksheet,"Stock");
const excelBuffer = XLSX.write(workbook,{bookType:"xlsx",type:"array"});
const data = new Blob([excelBuffer],{type:"application/octet-stream"});
saveAs(data,"StockReport.xlsx");
}

function exportPDF(){
const doc = new jsPDF();
doc.text("IBT Jewellery Stock Report",14,15);
const tableData = filteredData.map(item=>[
item.category,item.sub,item.qty,item.gross+" g",item.net+" g","₹"+item.value
]);
autoTable(doc,{
head:[["Category","Sub Category","Qty","Gross","Net","Value"]],
body:tableData,
startY:25
});
doc.save("StockReport.pdf");
}

/* ---------------- EXPORT SALES ---------------- */

function exportSalesExcel(){
const ws=XLSX.utils.json_to_sheet(salesData);
const wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws,"Sales");
const buf=XLSX.write(wb,{bookType:"xlsx",type:"array"});
saveAs(new Blob([buf]),"SalesReport.xlsx");
}

function exportSalesPDF(){

const doc = new jsPDF();

doc.setFontSize(16);
doc.text("IBT Jewellery - Sales Report",14,15);

const tableData = salesData.map(s=>[
s.bill,
s.date,
s.customer,
s.items,
s.gross + " g",
"Rs " + s.making.toLocaleString("en-IN"),
"Rs " + s.gst.toLocaleString("en-IN"),
"Rs " + s.total.toLocaleString("en-IN")
]);

autoTable(doc,{
head:[["Bill","Date","Customer","Items","Gross","Making","GST","Total"]],
body:tableData,
startY:25,
styles:{
fontSize:10,
cellPadding:4
},
headStyles:{
fillColor:[20,90,50],
textColor:255
},
alternateRowStyles:{
fillColor:[240,240,240]
}
});

doc.save("SalesReport.pdf");

}

/* ---------------- EXPORT GST ---------------- */

function exportGSTExcel(){
const ws=XLSX.utils.json_to_sheet([gstSummary]);
const wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws,"GST");
saveAs(new Blob([XLSX.write(wb,{bookType:"xlsx",type:"array"})]),"GSTReport.xlsx");
}

function exportGSTPDF(){
const doc=new jsPDF();
doc.text("GST Summary",14,15);
autoTable(doc,{
head:[["Type","Amount"]],
body:[
["Total GST",gstSummary.totalGST],
["CGST",gstSummary.cgst],
["SGST",gstSummary.sgst],
["Taxable Amount",gstSummary.taxable]
],
startY:25
});
doc.save("GSTReport.pdf");
}

/* ---------------- EXPORT CASH ---------------- */

function exportCashExcel(){
const ws=XLSX.utils.json_to_sheet([{...cashData,...goldData}]);
const wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws,"CashGold");
saveAs(new Blob([XLSX.write(wb,{bookType:"xlsx",type:"array"})]),"CashGoldReport.xlsx");
}

function exportCashPDF(){
const doc=new jsPDF();
doc.text("Cash & Gold Summary",14,15);
autoTable(doc,{
head:[["Type","Value"]],
body:[
["Opening Cash",cashData.opening],
["Cash Inflow",cashData.inflow],
["Cash Outflow",cashData.outflow],
["Closing Cash",cashData.closing],
["Opening Gold",goldData.opening+" g"],
["Gold Inflow",goldData.inflow+" g"],
["Gold Outflow",goldData.outflow+" g"],
["Closing Gold",goldData.closing+" g"]
],
startY:25
});
doc.save("CashGoldReport.pdf");
}

return(

<div className="reports-page">

<h2>Reports & Analytics</h2>

<div className="report-tabs">

<button className={tab==="stock"?"active":""} onClick={()=>setTab("stock")}>Stock</button>
<button className={tab==="sales"?"active":""} onClick={()=>setTab("sales")}>Sales</button>
<button className={tab==="gst"?"active":""} onClick={()=>setTab("gst")}>GST</button>
<button className={tab==="cash"?"active":""} onClick={()=>setTab("cash")}>Cash & Gold</button>

</div>

{/* -------- STOCK TAB (UNCHANGED) -------- */}

{tab==="stock" && (
<div className="report-layout">

<div className="filters-card">
<h3>Filters</h3>

<label>Categories</label>
<select onChange={e=>setCategory(e.target.value)}>
<option value="All">All Categories</option>
<option value="Rings">Rings</option>
<option value="Chains">Chains</option>
<option value="Bangles">Bangles</option>
<option value="Earrings">Earrings</option>
</select>

<label>Supplier</label>
<select onChange={e=>setSupplier(e.target.value)}>
<option value="All">All Suppliers</option>
<option value="Supplier A">Supplier A</option>
<option value="Supplier B">Supplier B</option>
<option value="Supplier C">Supplier C</option>
</select>

<label>Date Range</label>
<input type="date" onChange={e=>setFromDate(e.target.value)} />
<input type="date" onChange={e=>setToDate(e.target.value)} />

</div>

<div className="report-card">

<h3>Stock Distribution by Category</h3>

<PieChart width={400} height={260}>
<Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={40} paddingAngle={4} label>
{pieData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}
</Pie>
<Tooltip/>
<Legend/>
</PieChart>

<h3>Stock Details</h3>

<table>
<thead>
<tr>
<th>Category</th>
<th>Sub Category</th>
<th>Quantity</th>
<th>Gross Weight</th>
<th>Net Weight</th>
<th>Value</th>
</tr>
</thead>

<tbody>
{filteredData.map((item,i)=>(
<tr key={i}>
<td>{item.category}</td>
<td>{item.sub}</td>
<td>{item.qty}</td>
<td>{item.gross} g</td>
<td>{item.net} g</td>
<td>₹ {item.value.toLocaleString()}</td>
</tr>
))}
</tbody>
</table>

<div className="export-buttons">
<button className="btn primary" onClick={exportExcel}>Export Excel</button>
<button className="btn ghost" onClick={exportPDF}>Export PDF</button>
</div>

</div>

</div>
)}

{/* -------- SALES -------- */}

{tab==="sales" && (
<div className="report-card">
<h3>Sales Transactions</h3>

<table>
<thead>
<tr>
<th>Bill</th>
<th>Date</th>
<th>Customer</th>
<th>Items</th>
<th>Gross</th>
<th>Making</th>
<th>GST</th>
<th>Total</th>
</tr>
</thead>

<tbody>
{salesData.map((s,i)=>(
<tr key={i}>
<td>{s.bill}</td>
<td>{s.date}</td>
<td>{s.customer}</td>
<td>{s.items}</td>
<td>{s.gross} g</td>
<td>₹{s.making}</td>
<td>₹{s.gst}</td>
<td>₹{s.total}</td>
</tr>
))}
</tbody>
</table>

<div className="export-buttons">
<button className="btn primary" onClick={exportSalesExcel}>Export Excel</button>
<button className="btn ghost" onClick={exportSalesPDF}>Export PDF</button>
</div>

</div>
)}

{/* -------- GST -------- */}

{tab==="gst" && (
<div className="report-card">

<h3>GST Summary</h3>

<div className="gst-summary">

<div className="gst-card"><p>Total GST</p><h2>₹{gstSummary.totalGST}</h2></div>
<div className="gst-card"><p>CGST</p><h2>₹{gstSummary.cgst}</h2></div>
<div className="gst-card"><p>SGST</p><h2>₹{gstSummary.sgst}</h2></div>
<div className="gst-card"><p>Taxable</p><h2>₹{gstSummary.taxable}</h2></div>

</div>

<div className="export-buttons">
<button className="btn primary" onClick={exportGSTExcel}>Export Excel</button>
<button className="btn ghost" onClick={exportGSTPDF}>Export PDF</button>
</div>

</div>
)}

{/* -------- CASH -------- */}

{tab==="cash" && (
<div className="report-card">

<h3>Cash & Gold Summary</h3>

<div className="cash-layout">

<div className="cash-card">
<p>Opening Cash : ₹{cashData.opening}</p>
<p>Inflow : ₹{cashData.inflow}</p>
<p>Outflow : ₹{cashData.outflow}</p>
<p className="closing">Closing : ₹{cashData.closing}</p>
</div>

<div className="cash-card">
<p>Opening Gold : {goldData.opening} g</p>
<p>Inflow : {goldData.inflow} g</p>
<p>Outflow : {goldData.outflow} g</p>
<p className="closing">Closing : {goldData.closing} g</p>
</div>

</div>

<div className="export-buttons">
<button className="btn primary" onClick={exportCashExcel}>Export Excel</button>
<button className="btn ghost" onClick={exportCashPDF}>Export PDF</button>
</div>

</div>
)}

</div>
);

}

