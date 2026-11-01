// Configure Firebase using your own project values in firebase-config.js.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
const $=s=>document.querySelector(s);
$("#year").textContent=new Date().getFullYear();
let selectedOrder=null;
async function loadServices(){const snap=await getDocs(collection(db,"services"));const el=$("#service-list");el.innerHTML="";if(snap.empty){el.textContent="Services will appear here once the manager adds them.";return;}snap.forEach(d=>{const x=d.data();el.insertAdjacentHTML("beforeend",`<article class="card"><h3>${esc(x.name)}</h3><strong>₹${Number(x.price||0).toLocaleString("en-IN")}</strong><p>${esc(x.description||"")}</p></article>`);});}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("#order-form").addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget);try{const ref=await addDoc(collection(db,"orders"),{name:f.get("name"),mobile:f.get("mobile"),details:f.get("details"),orderDate:f.get("orderDate"),deliveryDate:f.get("deliveryDate"),amount:Number(f.get("amount")),status:"New",createdAt:serverTimestamp()});$("#order-status").textContent="Order received. Reference: "+ref.id;e.currentTarget.reset();}catch(err){$("#order-status").textContent="Could not submit. Check Firebase setup and try again.";console.error(err);}});
$("#login-form").addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget);try{await signInWithEmailAndPassword(auth,f.get("email"),f.get("password"));$("#login-status").textContent="Signed in.";}catch(err){$("#login-status").textContent="Login failed. Check manager account setup.";console.error(err);}});
onAuthStateChanged(auth,async user=>{if(user){$("#manager-panel").hidden=false;await loadOrders();}else{$("#manager-panel").hidden=true;}});
async function loadOrders(){const snap=await getDocs(query(collection(db,"orders"),orderBy("createdAt","desc")));const el=$("#orders-list");el.innerHTML="";snap.forEach(d=>{const x=d.data(),b=document.createElement("button");b.className="button";b.style.margin="5px";b.textContent=`${x.name} — ₹${x.amount} (${x.status})`;b.onclick=()=>{selectedOrder={id:d.id,...x};$("#bill-area").innerHTML=`<h2>Vishva Tailoring</h2><p>Bill / Order: ${esc(d.id)}</p><p>Customer: ${esc(x.name)}</p><p>Mobile: ${esc(x.mobile)}</p><p>Work: ${esc(x.details)}</p><p>Amount: ₹${Number(x.amount).toLocaleString("en-IN")}</p>`;};el.append(b);});}
$("#service-form").addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget);await addDoc(collection(db,"services"),{name:f.get("name"),price:Number(f.get("price")),description:f.get("description")});e.currentTarget.reset();await loadServices();});
$("#print-bill").onclick=()=>window.print();
loadServices().catch(console.error);
