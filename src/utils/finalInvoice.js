import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateFinalInvoice(data){

const doc = new jsPDF();

const date = new Date();
const invoiceNo = Math.floor(Math.random()*9000)+1000;

doc.setFontSize(18);
doc.text("IBT JEWELLERY ENTERPRISES",14,20);

doc.setFontSize(10);
doc.text("No.12, Anna Salai, T Nagar",14,28);
doc.text("Chennai, Tamil Nadu - 600017",14,34);
doc.text("Phone : +91 9876543210",14,40);
doc.text("Email : ibtjewellery@gmail.com",14,46);
doc.text("GSTIN : 33AABCI1234A1Z5",14,52);

doc.setFontSize(14);
doc.text("TAX INVOICE",150,20);

doc.setFontSize(10);
doc.text(`Invoice No : INV-${invoiceNo}`,140,34);
doc.text(`Date : ${date.toLocaleDateString()}`,140,40);
doc.text(`Time : ${date.toLocaleTimeString()}`,140,46);

doc.line(14,60,196,60);

doc.text(`Customer : ${data.customer || "Walk-in Customer"}`,14,72);

const rows = data.cart.map(item=>{

const goldRate = 6000;

const goldValue = item.net * goldRate;
const wastageCost = item.wastage * goldRate;

const making = Math.round(goldValue * 0.12);

const amount = Math.round(goldValue + wastageCost + making);

return[
item.name,
item.net + " g",
goldValue,
making,
amount
]

});

autoTable(doc,{
startY:85,
head:[["Item","Weight","Gold Value","Making","Total"]],
body:rows,
theme:"grid",
headStyles:{fillColor:[212,175,55]}
});

let y = doc.lastAutoTable.finalY + 10;

doc.text(`Taxable Amount : ${data.subtotal}`,140,y);
doc.text(`GST (3%) : ${data.gst.toFixed(2)}`,140,y+8);
doc.text(`Total Amount : ${data.total.toFixed(2)}`,140,y+18);

doc.text("Bank Details",14,y);
doc.text("Account Name : IBT Jewellery Enterprises",14,y+6);
doc.text("Bank : State Bank of India",14,y+12);
doc.text("Account No : 123456789012",14,y+18);
doc.text("IFSC : SBIN0001234",14,y+24);

doc.text("Terms & Conditions",14,y+34);
doc.text("1. Goods once sold will not be taken back.",14,y+40);
doc.text("2. GST applicable as per government rules.",14,y+46);
doc.text("3. Payment must be completed at billing.",14,y+52);

doc.text("Customer Signature",14,270);
doc.text("Authorised Signatory",150,270);

doc.save("IBT_Final_Invoice.pdf");

}