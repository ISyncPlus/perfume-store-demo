import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {addToBag,products,readBag,type BagLine,type Product} from './shop';
import {createDemoOrder,readOrders,readProfile,type DemoOrder,type DemoProfile} from './demo';

function stored(key:string){try{return localStorage.getItem(key);}catch{return null;}}
function ids(key:string){try{const value:unknown=JSON.parse(stored(key)??'[]');return Array.isArray(value)?[...new Set(value.filter((id):id is number=>typeof id==='number'&&products.some(p=>p.id===id)))]:[];}catch{return [];}}
interface Store {profile:DemoProfile|null;orders:DemoOrder[];signIn:(profile:DemoProfile)=>void;signOut:()=>void;placeOrder:(delivery:DemoOrder['delivery'])=>string;bag:BagLine[];saved:number[];compared:number[];toast:string;quickView:Product|null;finderOpen:boolean;setFinderOpen:(open:boolean)=>void;setQuickView:(p:Product|null)=>void;notify:(text:string)=>void;add:(p:Product,quantity?:number)=>void;quantity:(id:number,value:number)=>void;remove:(id:number)=>void;clearBag:()=>void;toggleSaved:(p:Product)=>void;toggleCompare:(p:Product)=>void;clearCompare:()=>void}
const Context=createContext<Store|null>(null);
export function StoreProvider({children}:{children:ReactNode}){
 const [profile,setProfile]=useState(()=>readProfile(stored('lattafa-profile')));const [orders,setOrders]=useState(()=>readOrders(stored('lattafa-orders')));
 const [bag,setBag]=useState<BagLine[]>(()=>readBag(stored('lattafa-bag')));const [saved,setSaved]=useState(()=>ids('lattafa-saved'));const [compared,setCompared]=useState(()=>ids('lattafa-compare').slice(0,4));const [toast,setToast]=useState('');const [quickView,setQuickView]=useState<Product|null>(null);const [finderOpen,setFinderOpen]=useState(false);
 useEffect(()=>{try{localStorage.setItem('lattafa-profile',JSON.stringify(profile));localStorage.setItem('lattafa-orders',JSON.stringify(orders));localStorage.setItem('lattafa-bag',JSON.stringify(bag));localStorage.setItem('lattafa-saved',JSON.stringify(saved));localStorage.setItem('lattafa-compare',JSON.stringify(compared));}catch{/* Shopping still works for this visit when storage is unavailable. */}},[bag,saved,compared,profile,orders]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),4000);return()=>clearTimeout(t);},[toast]);
 const add=(p:Product,quantity=1)=>{if(!p.inStock||!p.purchasable)return;setBag(current=>{let next=current;for(let i=0;i<Math.min(10,Math.max(1,quantity));i++)next=addToBag(next,p);return next;});setToast(`${p.name} added to your bag`);};
 const toggleSaved=(p:Product)=>setSaved(current=>current.includes(p.id)?current.filter(id=>id!==p.id):[...current,p.id]);
 const toggleCompare=(p:Product)=>{if(compared.includes(p.id)){setCompared(current=>current.filter(id=>id!==p.id));return;}if(compared.length>=4){setToast('Compare up to four fragrances. Remove one to add another.');return;}setCompared(current=>[...current,p.id]);setToast(`${p.name} added to comparison`);};
 const value:Store={profile,orders,signIn:setProfile,signOut:()=>setProfile(null),placeOrder:delivery=>{const order=createDemoOrder(bag,delivery);setOrders(current=>[order,...current].slice(0,30));setBag([]);return order.id;},bag,saved,compared,toast,quickView,finderOpen,setFinderOpen,setQuickView,notify:setToast,add,quantity:(id,value)=>{if(!Number.isFinite(value))return;setBag(current=>current.flatMap(line=>line.id!==id?[line]:value<=0?[]:[{id,quantity:Math.min(10,Math.floor(value))}]))},remove:id=>setBag(current=>current.filter(line=>line.id!==id)),clearBag:()=>setBag([]),toggleSaved,toggleCompare,clearCompare:()=>setCompared([])};
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useStore(){const store=useContext(Context);if(!store)throw new Error('StoreProvider is required');return store;}
