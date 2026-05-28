"use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   KREDIIDIMÄÄRAD
═══════════════════════════════════════════════════════════ */
const CREDIT_COSTS = {
  permanent: 10,
  temporary: 10,
  gig: 1,
};

/* ═══════════════════════════════════════════════════════════
   MASINATÜÜBID
═══════════════════════════════════════════════════════════ */
const VEHICLE_TYPES = [
  { key:"cold",      label:"Külmik / Termo",                    icon:"❄️" },
  { key:"tipper",    label:"Kallur / Puistematerjal / Tera",     icon:"⛏️" },
  { key:"curtain",   label:"Kardin / Tent / Standardhaagis",     icon:"🚛" },
  { key:"container", label:"Konteinervedu / Skelett",            icon:"📦" },
  { key:"tanker",    label:"Pütt / Tsistern (ADR)",              icon:"🛢️" },
  { key:"platform",  label:"Platvorm / Autoveok / Gabariidita",  icon:"🏗️" },
  { key:"crane",     label:"Madel / Kraana / Fassi / Kasti-kraana", icon:"🏗️" },
  { key:"mega",      label:"Mega / Madal haagis / Maxima",       icon:"🚛" },
  { key:"lowloader", label:"Madal treiler / Raskeveo treiler",   icon:"🏋️" },
  { key:"timber",    label:"Metsaveokas / Puiduvedu",            icon:"🌲" },
  { key:"hook",      label:"Multilift / Konks / Vahetuskere",    icon:"🔗" },
  { key:"van",       label:"Kaubik / Buss / B-kat vedu",         icon:"🚐" },
  { key:"other",     label:"Muu",                                icon:"⚙️" },
];

/* ═══════════════════════════════════════════════════════════
   PÄDEVUSTE CHECKLIST
═══════════════════════════════════════════════════════════ */
const COMPETENCIES = [
  { key:"code95",    label:"CODE 95",           icon:"📋" },
  { key:"adr_basic", label:"ADR Põhikoolitus",  icon:"☢️" },
  { key:"adr_tank",  label:"ADR Tsisternid",    icon:"🛢️" },
  { key:"digicard",  label:"Digimeeriku kaart", icon:"💳" },
  { key:"forklift",  label:"Tõstukijuhi load",  icon:"🏗️" },
];

/* ═══════════════════════════════════════════════════════════
   PIIRKONNATÜÜBID
═══════════════════════════════════════════════════════════ */
const REGION_TYPES = [
  { key:"local",    label:"Eesti-sisene vedu",            icon:"🇪🇪" },
  { key:"baltic",   label:"Baltikum / Skandinaavia",      icon:"🌍" },
  { key:"europe",   label:"Euroopa vedu / Ringid",        icon:"🌐" },
];

/* ═══════════════════════════════════════════════════════════
   THEME TOKENS — DARK / LIGHT
   Tumedas: bg-slate-950 + bg-slate-900 kaardid, puhas B2B
═══════════════════════════════════════════════════════════ */
const DARK = {
  page:"#020617",
  s1:"#0F172A",
  s2:"#1E293B",
  s3:"#334155",
  s4:"#475569",
  adBg:"#0A0F1E", adBd:"#1E293B",
  b1:"#1E293B",
  b2:"#334155",
  t1:"#F1F5F9",
  t2:"#CBD5E1",
  t3:"#64748B",
  pri:"#3B82F6", priD:"#2563EB", priL:"#60A5FA",
  priBg:"rgba(59,130,246,0.12)", priBd:"rgba(59,130,246,0.28)", priGlow:"rgba(59,130,246,0.04)",
  blue:"#818CF8",   blueBg:"rgba(129,140,248,0.10)",  blueBd:"rgba(129,140,248,0.22)",
  green:"#34D399",  greenBg:"rgba(52,211,153,0.10)",  greenBd:"rgba(52,211,153,0.22)",
  amber:"#FBBF24",  amberBg:"rgba(251,191,36,0.10)",  amberBd:"rgba(251,191,36,0.25)",
  red:"#F87171",    redBg:"rgba(248,113,113,0.10)",   redBd:"rgba(248,113,113,0.25)",
  purple:"#A78BFA", purpleBg:"rgba(167,139,250,0.10)",purpleBd:"rgba(167,139,250,0.22)",
  teal:"#2DD4BF",   tealBg:"rgba(45,212,191,0.10)",   tealBd:"rgba(45,212,191,0.22)",
  catB:{bg:"rgba(59,130,246,0.13)",  t:"#93C5FD", r:"rgba(59,130,246,0.30)"},
  catC:{bg:"rgba(52,211,153,0.12)",  t:"#6EE7B7", r:"rgba(52,211,153,0.28)"},
  catCE:{bg:"rgba(251,191,36,0.12)", t:"#FDE68A", r:"rgba(251,191,36,0.28)"},
  shadow:"0 1px 3px rgba(0,0,0,0.35)",
  shadowMd:"0 4px 16px rgba(0,0,0,0.55)",
  headerBg:"#0F172A",
  tabBg:"#020617",
  isDark:true,
};

const LIGHT = {
  page:"#F8FAFC",
  s1:"#FFFFFF",
  s2:"#F1F5F9",
  s3:"#E2E8F0",
  s4:"#CBD5E1",
  adBg:"#EFF6FF", adBd:"#BFDBFE",
  b1:"#E2E8F0",
  b2:"#CBD5E1",
  t1:"#0F172A",
  t2:"#334155",
  t3:"#64748B",
  pri:"#2563EB", priD:"#1D4ED8", priL:"#3B82F6",
  priBg:"rgba(37,99,235,0.07)", priBd:"rgba(37,99,235,0.20)", priGlow:"rgba(37,99,235,0.03)",
  blue:"#4F46E5",   blueBg:"rgba(79,70,229,0.07)",   blueBd:"rgba(79,70,229,0.20)",
  green:"#059669",  greenBg:"rgba(5,150,105,0.08)",  greenBd:"rgba(5,150,105,0.20)",
  amber:"#D97706",  amberBg:"rgba(217,119,6,0.08)",  amberBd:"rgba(217,119,6,0.20)",
  red:"#DC2626",    redBg:"rgba(220,38,38,0.08)",    redBd:"rgba(220,38,38,0.20)",
  purple:"#7C3AED", purpleBg:"rgba(124,58,237,0.08)",purpleBd:"rgba(124,58,237,0.20)",
  teal:"#0D9488",   tealBg:"rgba(13,148,136,0.08)",  tealBd:"rgba(13,148,136,0.20)",
  catB:{bg:"rgba(37,99,235,0.08)",  t:"#1D4ED8", r:"rgba(37,99,235,0.22)"},
  catC:{bg:"rgba(5,150,105,0.08)",  t:"#065F46", r:"rgba(5,150,105,0.22)"},
  catCE:{bg:"rgba(217,119,6,0.08)", t:"#92400E", r:"rgba(217,119,6,0.22)"},
  shadow:"0 1px 3px rgba(0,0,0,0.07)",
  shadowMd:"0 4px 16px rgba(0,0,0,0.12)",
  headerBg:"#FFFFFF",
  tabBg:"#F8FAFC",
  isDark:false,
};

/* ═══════════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════════ */
const WEEKDAYS = ["E","T","K","N","R","L","P"];
const WEEKDAY_KEYS = ["mon","tue","wed","thu","fri","sat","sun"];
const DAYS_LBL = ["P","E","T","K","N","R","L"];
const MOS_S = ["jaan","veeb","märts","apr","mai","juu","juul","aug","sept","okt","nov","dets"];
const MONS = ["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktober","November","Detsember"];

const JOBS = [
  {id:1,cat:"CE",title:"CE-juht Skandinaavia suunal",company:"Nordic Freight OÜ",salary:"3 200–3 800",location:"Tallinn → Stockholm",type:"Täisaeg",hot:true,days:2,logoKey:"nordic",hue:210,region:"baltic",veh:"curtain",reqComps:["code95","adr_basic","digicard"]},
  {id:2,cat:"C",title:"C-kategooria juht Eesti siseveos",company:"Esto Logistics AS",salary:"2 400–2 800",location:"Tallinn, Harjumaa",type:"Täisaeg",hot:false,days:5,logoKey:"esto",hue:155,region:"local",veh:"tipper",reqComps:["code95","digicard"]},
  {id:3,cat:"B",title:"Pakiautojuht / courier",company:"QuickBox Estonia",salary:"1 800–2 100",location:"Tartu linn",type:"Osaline aeg",hot:false,days:1,logoKey:"quickbox",hue:270,region:"local",veh:"van",reqComps:[]},
  {id:4,cat:"CE",title:"Rahvusvaheline CE-juht (ADR)",company:"TransEuro OÜ",salary:"3 500–4 200",location:"Tallinn → Saksamaa",type:"Täisaeg",hot:true,days:8,logoKey:"transeuro",hue:30,region:"europe",veh:"tanker",reqComps:["code95","adr_basic","adr_tank","digicard"]},
  {id:5,cat:"C",title:"Betooniseguri juht",company:"Betonikivi OÜ",salary:"2 600–3 000",location:"Pärnu",type:"Täisaeg",hot:false,days:3,logoKey:"betonikivi",hue:340,region:"local",veh:"tipper",reqComps:["code95"]},
  {id:6,cat:"B",title:"Laokomplekteerija / B-juht",company:"Rimi Eesti Food AS",salary:"1 700–1 950",location:"Loo, Harjumaa",type:"Osaline aeg",hot:false,days:6,logoKey:"rimi",hue:0,region:"local",veh:"van",reqComps:["forklift"]},
];

const GIGS = [
  {id:1,date:new Date(2025,5,25),title:"Asendusjuht jaotusveole",company:"TallEx Logistics",logoKey:"tallex",hue:155,cat:"C",pay:130,slots:2,urgent:true,city:"Tallinn",from:"Tallinn Ülemiste",to:"Harjumaa ring",dist:"~85 km",hours:"06:00–16:00",veh:"curtain",note:"C-kat kogemus 2a+ soovitav",region:"local",reqComps:["code95","digicard"]},
  {id:2,date:new Date(2025,5,26),title:"CE-juht konteinerveol",company:"Muuga Port OÜ",logoKey:"muuga",hue:210,cat:"CE",pay:180,slots:1,urgent:false,city:"Muuga sadam",from:"Muuga sadam",to:"Tartu logistika",dist:"~200 km",hours:"05:00–18:00",veh:"container",note:"ADR sertifikaat on pluss",region:"local",reqComps:["code95","digicard"]},
  {id:3,date:new Date(2025,5,27),title:"B-juht kohaletoimetamisel",company:"QuickBox Estonia",logoKey:"quickbox",hue:270,cat:"B",pay:90,slots:3,urgent:false,city:"Tartu",from:"Tartu sortimiskeskus",to:"Tartumaa piirkond",dist:"~60 km",hours:"07:00–16:00",veh:"van",note:"Kullerteenuse kogemus eelis",region:"local",reqComps:[]},
  {id:4,date:new Date(2025,5,28),title:"CE-juht puisteveole",company:"NarTrans OÜ",logoKey:"nartrans",hue:30,cat:"CE",pay:160,slots:1,urgent:true,city:"Narva–Tallinn",from:"Narva",to:"Tallinn–Paldiski",dist:"~235 km",hours:"04:00–17:00",veh:"tipper",note:"Kaaluti kuni 24t veosed",region:"local",reqComps:["code95","digicard"]},
  {id:5,date:new Date(2025,5,30),title:"C-juht ehitusmaterjalidel",company:"RaplaLogistik AS",logoKey:"rapla",hue:340,cat:"C",pay:120,slots:2,urgent:false,city:"Rapla–Tallinn",from:"Rapla laoplats",to:"Tallinn ehitusplatsid",dist:"~120 km",hours:"06:30–15:30",veh:"tipper",note:"Palk kokkuleppel",region:"local",reqComps:["code95"]},
  {id:6,date:new Date(2025,6,1),title:"CE-juht Rootsi suunal",company:"Nordic Freight OÜ",logoKey:"nordic",hue:210,cat:"CE",pay:320,slots:1,urgent:true,city:"Tallinn→Stockholm",from:"Tallinn terminal",to:"Stockholm (Rootsi)",dist:"~1 100 km",hours:"Lähetuses 2 ööd",veh:"curtain",note:"Kehtiv CE + ADR nõutav",region:"baltic",reqComps:["code95","adr_basic","digicard"]},
  {id:7,date:new Date(2025,6,2),title:"C-juht külmveol",company:"FreshRoute OÜ",logoKey:"freshroute",hue:185,cat:"C",pay:140,slots:2,urgent:false,city:"Pärnu–Lõuna-Eesti",from:"Pärnu toidutehas",to:"Lõuna-Eesti kaubandus",dist:"~180 km",hours:"03:00–14:00",veh:"cold",note:"ATP sertifikaadiga auto",region:"local",reqComps:["code95","digicard"]},
];

const PARTNERS = [
  {name:"Scania Eesti AS",desc:"Kevadine tehnoülevaatus soodushinnaga — broneeri kohe",logoKey:"scania",cta:"Broneeri aeg",accent:"pri",badge:"−20%"},
  {name:"Reka Tarvikud OÜ",desc:"Rekkajuhi varustus ja tarvikud — kiirtarne üle Eesti",logoKey:"reka",cta:"Vaata poodi",accent:"blue",badge:"Kiirtarne"},
];
const TRAININGS = [
  {date:"28",mo:"mai",title:"ADR ohtlike ainete vedamine",type:"CE",spots:8},
  {date:"3",mo:"juu",title:"Ökonoomilise sõitmise kursus",type:"C/CE",spots:12},
  {date:"10",mo:"juu",title:"Digitacho kasutamine",type:"B/C",spots:5},
];

const TOP_BANNER_JOBS = {
  eyebrow:"AMETIKOOLITUS", logoKey:"akoolitus", hue:220,
  headline:"Saa ADR kood 95 — järgmine grupp 3. juunil Tallinnas",
  sub:"B, C ja CE kategooria. Sertifikaat 5 aastaks. Tunnustatud koolitaja.",
  cta:"Vaata graafikut", accent:"pri",
  stats:[{v:"1 200+",l:"koolitatut"},{v:"98%",l:"läbimise määr"},{v:"2 linna",l:"TLN & TRT"}],
};
const TOP_BANNER_GIGS = {
  eyebrow:"KIIRKONTROLL", logoKey:"kiirkontroll", hue:35,
  headline:"Tervisekontroll 24 h — Tallinn, Tartu, Pärnu",
  sub:"Kehtiv tervisetõend on eeldus. Broneeri kohe, tulemus samal päeval.",
  cta:"Broneeri aeg", accent:"amber",
  stats:[{v:"24h",l:"tulemus"},{v:"3 linna",l:"saadaval"},{v:"100+",l:"arsti"}],
};
const INFEED_AD_JOBS = {company:"Ergo Kindlustus",logoKey:"ergo",hue:220,headline:"Veoki kasko ja vastutuskindlustus transpordiettevõtetele",sub:"Kohandatud lahendused. Kiire hinnapäring 2 minutiga.",cta:"Küsi pakkumist",accent:"pri",tag:"Kindlustus"};
const INFEED_AD_GIGS = {company:"AutoRent24",logoKey:"autorent",hue:28,headline:"Asendussõiduk tundideks või päevadeks — B, C, CE",sub:"Kiire kättetoimetamine Tallinnas. Saadaval ööpäevaringselt.",cta:"Vaata saadavust",accent:"amber",tag:"Rent"};

const TEMP_JOBS = [
  {id:1,cat:"CE",title:"CE-juht suvehooajaks (juu–aug)",company:"Nordic Freight OÜ",salary:"3 200–3 600",location:"Tallinn → Soome/Rootsi",type:"Tähtajaline",dateStart:"02.06.2025",dateEnd:"31.08.2025",days:90,hot:true,logoKey:"nordic",hue:210,region:"baltic",veh:"curtain",reqComps:["code95","adr_basic","digicard"]},
  {id:2,cat:"C",title:"C-juht ehitushooaja lõpuni",company:"Betonikivi OÜ",salary:"2 600–2 900",location:"Tallinn, Harju",type:"Tähtajaline",dateStart:"01.06.2025",dateEnd:"30.09.2025",days:121,hot:false,logoKey:"betonikivi",hue:340,region:"local",veh:"tipper",reqComps:["code95"]},
  {id:3,cat:"B",title:"Asenduskuller (mai–juuni)",company:"QuickBox Estonia",salary:"1 750–2 000",location:"Tartu linn",type:"Tähtajaline",dateStart:"20.05.2025",dateEnd:"20.07.2025",days:61,hot:false,logoKey:"quickbox",hue:270,region:"local",veh:"van",reqComps:[]},
];
const TOP_BANNER_TEMP = {
  eyebrow:"HOOAJALINE", logoKey:"transeuro", hue:30,
  headline:"Leia hooajaline autojuht — valmistatud transpordisektorile",
  sub:"Tähtajalised lepingud B, C ja CE kategoorias. Kiire värbamine.",
  cta:"Postita kuulutus", accent:"pri",
  stats:[{v:"3 kuud",l:"min. periood"},{v:"24h",l:"vastus"},{v:"CE/C/B",l:"kategooriad"}],
};

/* ═══════════════════════════════════════════════════════════
   ADMIN GAP DEMO DATA
═══════════════════════════════════════════════════════════ */
const ADMIN_DEMO_DATA = [
  { driver:"Mart Tamm",    cat:"CE", veh:"cold",      offerType:"month", offer:3200, wishType:"month", wish:3400, comps:["code95","adr_basic","digicard"] },
  { driver:"Jaan Kask",    cat:"C",  veh:"tipper",    offerType:"month", offer:2800, wishType:"month", wish:2600, comps:["code95","digicard"] },
  { driver:"Piret Loodus", cat:"B",  veh:"van",       offerType:"day",   offer:120,  wishType:"day",   wish:110,  comps:["forklift"] },
  { driver:"Indrek Mägi",  cat:"CE", veh:"container", offerType:"month", offer:3500, wishType:"month", wish:4000, comps:["code95","adr_basic","adr_tank","digicard"] },
  { driver:"Riho Saar",    cat:"C",  veh:"curtain",   offerType:"hour",  offer:11,   wishType:"hour",  wish:13,   comps:["code95","digicard"] },
];

/* Kanban demo kandidaadid */
const KANBAN_INIT = {
  new:[
    { id:"k1", name:"Aleksei Petrov", cat:"CE", veh:"cold",    comps:["code95","adr_basic","digicard"], wish:"3 600 €/kuu" },
    { id:"k2", name:"Toivo Kallas",   cat:"C",  veh:"tipper",  comps:["code95","digicard"],             wish:"2 900 €/kuu" },
    { id:"k3", name:"Marge Laan",     cat:"B",  veh:"van",     comps:["forklift"],                      wish:"110 €/päev"  },
  ],
  contacted:[
    { id:"k4", name:"Raivo Uus",      cat:"CE", veh:"curtain", comps:["code95","adr_basic","digicard"], wish:"3 800 €/kuu" },
  ],
  hired:[
    { id:"k5", name:"Silvia Tamm",    cat:"C",  veh:"platform",comps:["code95","digicard"],             wish:"2 700 €/kuu" },
  ],
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
function sameDay(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
function gigsFor(d){return GIGS.filter(g=>sameDay(g.date,d));}
function wkNum(d){const o=new Date(d.getFullYear(),0,1);return Math.ceil((((d-o)/86400000)+o.getDay()+1)/7);}
function wkStart(off){const n=new Date(2025,5,23);n.setDate(n.getDate()+off*7);const dw=n.getDay();n.setDate(n.getDate()+(dw===0?-6:1-dw));n.setHours(0,0,0,0);return n;}
function daysBetween(a,b){if(!a||!b)return 0;return Math.max(0,Math.round((new Date(b)-new Date(a))/86400000))+1;}

/* ═══════════════════════════════════════════════════════════
   BRAND LOGOS
═══════════════════════════════════════════════════════════ */
function BrandLogo({logoKey,size=36,radius=8,dark=true}){
  const D=dark;
  const logos={
    scania:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#0C1B30":"#E8F3FF"}/><rect x="6" y="9" width="24" height="3" rx="1.5" fill="#1D6FA4"/><rect x="6" y="15" width="18" height="3" rx="1.5" fill="#1D6FA4"/><rect x="6" y="21" width="12" height="3" rx="1.5" fill="#1D6FA4"/><circle cx="28" cy="23" r="4" fill="none" stroke="#1D6FA4" strokeWidth="2.2"/></svg>,
    reka:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#120D26":"#F0EBFF"}/><polygon points="18,7 29,13 29,23 18,29 7,23 7,13" fill="none" stroke="#7C3AED" strokeWidth="2.2"/><text x="18" y="22.5" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="system-ui" fill="#A78BFA">RK</text></svg>,
    kiirkontroll:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1A1200":"#FFF8E0"}/><path d="M8 20C8 13.37 12.48 8 18 8C23.52 8 28 13.37 28 20" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round"/><line x1="18" y1="20" x2="23" y2="13" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"/><circle cx="18" cy="20" r="2.5" fill="#FBBF24"/></svg>,
    autorent:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1A0D00":"#FFF3E0"}/><rect x="6" y="16" width="22" height="9" rx="2.5" fill="none" stroke="#F59E0B" strokeWidth="1.8"/><rect x="9" y="11" width="12" height="7" rx="1.8" fill="none" stroke="#F59E0B" strokeWidth="1.6"/><circle cx="11" cy="26" r="2.2" fill="#F59E0B"/><circle cx="23" cy="26" r="2.2" fill="#F59E0B"/><text x="28" y="13" fontSize="6" fontWeight="800" fontFamily="system-ui" fill="#F59E0B">24</text></svg>,
    ergo:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#001A33":"#E0F0FF"}/><text x="18" y="23" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="system-ui" fill="#3B82F6">ERGO</text></svg>,
    akoolitus:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#0D1525":"#EBF4FF"}/><path d="M8 20L18 14L28 20L18 26Z" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinejoin="round"/><path d="M28 20V26" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/><circle cx="28" cy="27.5" r="1.5" fill="#60A5FA"/></svg>,
    nordic:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#0A1828":"#E5F1FF"}/><text x="18" y="16" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="#60A5FA">NORDIC</text><text x="18" y="25" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="#60A5FA">FREIGHT</text></svg>,
    esto:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#0A2018":"#E5FFF5"}/><text x="18" y="17" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="#34D399">ESTO</text><text x="18" y="26" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="#34D399">LOGIST.</text></svg>,
    quickbox:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#14082A":"#F3EEFF"}/><rect x="10" y="10" width="16" height="16" rx="3" fill="none" stroke="#A78BFA" strokeWidth="2"/><path d="M10 18H26M18 10V26" stroke="#A78BFA" strokeWidth="1.5"/></svg>,
    transeuro:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1A0E00":"#FFF5E5"}/><text x="18" y="17" textAnchor="middle" fontSize="6.5" fontWeight="800" fontFamily="system-ui" fill="#FBBF24">TRANS</text><text x="18" y="26" textAnchor="middle" fontSize="6.5" fontWeight="800" fontFamily="system-ui" fill="#FBBF24">EURO</text></svg>,
    betonikivi:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1A0015":"#FFE8F5"}/><text x="18" y="17" textAnchor="middle" fontSize="6" fontWeight="800" fontFamily="system-ui" fill="#F87171">BETONI</text><text x="18" y="26" textAnchor="middle" fontSize="6.5" fontWeight="800" fontFamily="system-ui" fill="#F87171">KIVI</text></svg>,
    rimi:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1A0000":"#FFE5E5"}/><text x="18" y="23" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="system-ui" fill="#F87171">RIMI</text></svg>,
    tallex:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#0A2018":"#E5FFF5"}/><text x="18" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fontFamily="system-ui" fill="#34D399">TALL</text><text x="18" y="26" textAnchor="middle" fontSize="8" fontWeight="800" fontFamily="system-ui" fill="#34D399">EX</text></svg>,
    muuga:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#0A1828":"#E5F1FF"}/><text x="18" y="17" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="#60A5FA">MUUGA</text><text x="18" y="26" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="#60A5FA">PORT</text></svg>,
    nartrans:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1A0E00":"#FFF5E5"}/><text x="18" y="17" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="system-ui" fill="#FBBF24">NAR</text><text x="18" y="26" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="system-ui" fill="#FBBF24">TRANS</text></svg>,
    rapla:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1A0015":"#FFE8F5"}/><text x="18" y="17" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="#F87171">RAPLA</text><text x="18" y="26" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="#F87171">LOG.</text></svg>,
    freshroute:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#0A1E20":"#E5FCFF"}/><text x="18" y="17" textAnchor="middle" fontSize="6.5" fontWeight="700" fontFamily="system-ui" fill="#34D399">FRESH</text><text x="18" y="26" textAnchor="middle" fontSize="6.5" fontWeight="700" fontFamily="system-ui" fill="#34D399">ROUTE</text></svg>,
    seb:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#001A33":"#E0F0FF"}/><text x="18" y="23" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="system-ui,sans-serif" fill="#0075BE">SEB</text></svg>,
    lhv:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1A0D00":"#FFF0E0"}/><text x="18" y="23" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="system-ui,sans-serif" fill="#FF6B00">LHV</text></svg>,
    coop:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#001A0D":"#E0F5EA"}/><text x="18" y="23" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="system-ui,sans-serif" fill="#009639">Coop</text></svg>,
    gpay:<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#0F1117":"#F8F9FA"}/><text x="9" y="21.5" fontSize="8" fontWeight="700" fontFamily="system-ui" fill="#4285F4">G</text><text x="15" y="21.5" fontSize="8" fontWeight="700" fontFamily="system-ui" fill="#34A853">P</text><text x="21" y="21.5" fontSize="8" fontWeight="700" fontFamily="system-ui" fill="#FBBC05">a</text><text x="26" y="21.5" fontSize="8" fontWeight="700" fontFamily="system-ui" fill="#EA4335">y</text></svg>,
  };
  return logos[logoKey]||(<svg width={size} height={size} viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx={radius} fill={D?"#1C2840":"#E8EEF8"}/></svg>);
}

/* ═══════════════════════════════════════════════════════════
   MICRO COMPONENTS
═══════════════════════════════════════════════════════════ */
function ZapIcon({size=14,color="currentColor"}){
  return(<svg width={size} height={size} viewBox="0 0 16 16" fill={color} stroke={color} strokeWidth="0.3" strokeLinejoin="round" aria-hidden="true"><path d="M9.5 1.5L3 9H7.5L6.5 14.5L13 7H8.5L9.5 1.5Z"/></svg>);
}

function CreditsDisplay({credits,C,onClick}){
  return(
    <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:6,background:C.priBg,border:`1px solid ${C.priBd}`,borderRadius:6,padding:"6px 12px",cursor:onClick?"pointer":"default",transition:"all .15s"}}>
      <ZapIcon size={13} color={C.priL}/>
      <span style={{fontWeight:700,fontSize:13,color:C.priL}}>{credits}</span>
      <span style={{fontSize:10,color:C.t3,fontWeight:600,letterSpacing:".4px"}}>KREDIITI</span>
    </div>
  );
}

function SponsoredTag({C}){
  return(<span style={{fontSize:9,fontWeight:600,letterSpacing:".8px",textTransform:"uppercase",color:C.t3,border:`1px solid ${C.b2}`,borderRadius:4,padding:"2px 6px",whiteSpace:"nowrap"}}>Sponsoreeritud</span>);
}

function CatBadge({cat,C,size=24}){
  const s=C[`cat${cat}`];
  const fs=cat==="CE"?size*0.26:size*0.32;
  return(<div style={{width:size,height:size,borderRadius:4,background:s.bg,border:`1px solid ${s.r}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontWeight:700,fontSize:fs,color:s.t}}>{cat}</span></div>);
}

function Pill({children,color="default",small,C}){
  const map={
    default:{bg:C.s3,text:C.t2,bd:C.b2},
    green:{bg:C.greenBg,text:C.green,bd:C.greenBd},
    amber:{bg:C.amberBg,text:C.amber,bd:C.amberBd},
    red:{bg:C.redBg,text:C.red,bd:C.redBd},
    pri:{bg:C.priBg,text:C.priL,bd:C.priBd},
    blue:{bg:C.blueBg,text:C.blue,bd:C.blueBd},
    teal:{bg:C.tealBg,text:C.teal,bd:C.tealBd},
  };
  const v=map[color]||map.default;
  return(<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:small?"2px 7px":"3px 9px",borderRadius:4,fontSize:small?10:11,fontWeight:600,color:v.text,background:v.bg,border:`1px solid ${v.bd}`,whiteSpace:"nowrap",lineHeight:1.5}}>{children}</span>);
}

/* Pädevuste märgised — kompaktne rida */
function CompBadges({comps=[],C,max=3}){
  const visible=comps.slice(0,max);
  const rest=comps.length-max;
  return(
    <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
      {visible.map(ck=>{
        const c=COMPETENCIES.find(x=>x.key===ck);
        if(!c) return null;
        return(<span key={ck} style={{fontSize:9.5,fontWeight:600,padding:"2px 6px",borderRadius:3,background:C.tealBg,color:C.teal,border:`1px solid ${C.tealBd}`,whiteSpace:"nowrap"}}>{c.icon} {c.label}</span>);
      })}
      {rest>0 && <span style={{fontSize:9.5,fontWeight:600,padding:"2px 6px",borderRadius:3,background:C.s3,color:C.t3}}>+{rest}</span>}
    </div>
  );
}

/* Piirkonna märgis */
function RegionBadge({regionKey,C,small}){
  const r=REGION_TYPES.find(x=>x.key===regionKey);
  if(!r) return null;
  return(<Pill color="blue" small={small} C={C}>{r.icon} {r.label}</Pill>);
}

/* ═══════════════════════════════════════════════════════════
   1-CLICK APPLY NUPP
═══════════════════════════════════════════════════════════ */
function QuickApplyBtn({onApply,C,profile}){
  const hasProfile = profile.vehTypes.size>0;
  return(
    <button onClick={onApply}
      style={{display:"flex",alignItems:"center",gap:6,padding:"9px 14px",borderRadius:6,
        background:hasProfile?C.teal:"transparent",
        border:`1px solid ${hasProfile?C.tealBd:C.b2}`,
        color:hasProfile?"#fff":C.t3,
        fontWeight:700,fontSize:12,cursor:"pointer",transition:"all .15s",
        flexShrink:0}}>
      ⚡ {hasProfile?"Kiirkandideerimine":"1-Click Apply"}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   TOP PREMIUM BANNER
═══════════════════════════════════════════════════════════ */
function TopPremiumBanner({ad,C,dark}){
  const isAmber=ad.accent==="amber";
  const ac={btn:isAmber?C.amber:C.pri,glow:isAmber?C.amberBg:C.priBg,bd:isAmber?C.amberBd:C.priBd};
  return(
    <div style={{position:"relative",borderRadius:8,border:`1px solid ${C.adBd}`,background:C.adBg,overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:ac.btn,opacity:.3}}/>
      <div style={{position:"relative",padding:"11px 14px 10px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <BrandLogo logoKey={ad.logoKey} size={32} radius={7} dark={dark}/>
          <span style={{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:isAmber?C.amber:C.priL,opacity:.85}}>{ad.eyebrow}</span>
          <div style={{marginLeft:"auto"}}><SponsoredTag C={C}/></div>
        </div>
        <div style={{display:"flex",gap:16,alignItems:"flex-end",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:180}}>
            <p style={{fontWeight:700,fontSize:14,color:C.t1,lineHeight:1.35,marginBottom:4}}>{ad.headline}</p>
            <p style={{fontSize:12.5,color:C.t2,lineHeight:1.5}}>{ad.sub}</p>
          </div>
          {ad.stats&&(
            <div style={{display:"flex",borderRadius:6,border:`1px solid ${C.adBd}`,overflow:"hidden",flexShrink:0}}>
              {ad.stats.map((s,i)=>(
                <div key={i} style={{padding:"5px 10px",textAlign:"center",borderRight:i<ad.stats.length-1?`1px solid ${C.adBd}`:"none",background:i===0?ac.glow:"transparent"}}>
                  <p style={{fontWeight:700,fontSize:13,color:i===0?ac.btn:C.t1,lineHeight:1}}>{s.v}</p>
                  <p style={{fontSize:9,color:C.t3,fontWeight:600,marginTop:2}}>{s.l}</p>
                </div>
              ))}
            </div>
          )}
          <button style={{display:"flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:6,background:ac.btn,color:"#fff",fontWeight:700,fontSize:12.5,border:"none",cursor:"pointer",flexShrink:0}}>
            {ad.cta} →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   IN-FEED NATIVE AD
═══════════════════════════════════════════════════════════ */
function InFeedAd({ad,C,dark}){
  const isAmber=ad.accent==="amber";
  const at=isAmber?C.amber:C.priL,ab=isAmber?C.amberBg:C.priBg,abd=isAmber?C.amberBd:C.priBd;
  const [hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{borderRadius:8,border:`1px solid ${hov?abd:C.adBd}`,background:hov?C.isDark?"#0B1220":"#E8F0FF":C.adBg,overflow:"hidden",position:"relative",cursor:"pointer",transition:"all .15s"}}>
      <div style={{position:"absolute",left:0,top:10,bottom:10,width:2,borderRadius:2,background:at,opacity:.5}}/>
      <div style={{padding:"12px 15px 12px 18px",display:"flex",gap:12,alignItems:"flex-start"}}>
        <BrandLogo logoKey={ad.logoKey} size={40} radius={8} dark={dark}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
            <span style={{fontSize:10,color:C.t3,fontWeight:600,letterSpacing:".6px",textTransform:"uppercase"}}>{ad.company}</span>
            <Pill color={ad.accent==="amber"?"amber":"pri"} small C={C}>{ad.tag}</Pill>
            <span style={{marginLeft:"auto"}}><SponsoredTag C={C}/></span>
          </div>
          <p style={{fontWeight:700,fontSize:13.5,color:C.t1,lineHeight:1.3,marginBottom:3}}>{ad.headline}</p>
          <p style={{fontSize:12,color:C.t2,lineHeight:1.5,marginBottom:9}}>{ad.sub}</p>
          <button style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:5,background:ab,border:`1px solid ${abd}`,color:at,fontWeight:600,fontSize:12,cursor:"pointer"}}>
            {ad.cta} ↗
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   JOB CARD (Püsiv töö)
═══════════════════════════════════════════════════════════ */
function JobCard({job,open,onToggle,onApply,onQuickApply,profile,C,dark}){
  return(
    <div style={{borderRadius:8,border:`1px solid ${open?C.priBd:C.b1}`,background:C.s1,overflow:"hidden",transition:"border-color .15s"}}>
      <div style={{padding:"11px 13px",cursor:"pointer"}} onClick={onToggle}>
        <div style={{display:"flex",gap:11,alignItems:"flex-start"}}>
          <BrandLogo logoKey={job.logoKey} size={42} radius={8} dark={dark}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:2}}>
              <p style={{fontWeight:700,fontSize:14,color:C.t1,lineHeight:1.3}}>{job.title}</p>
              {job.hot&&<Pill color="amber" small C={C}>🔥 Kuum</Pill>}
            </div>
            <p style={{fontSize:12,color:C.t2,fontWeight:500,marginBottom:7}}>🏢 {job.company}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:job.reqComps?.length?6:0}}>
              <Pill color="green" small C={C}>€ {job.salary} /kuu</Pill>
              <Pill small C={C}>📍 {job.location}</Pill>
              <Pill small C={C}>💼 {job.type}</Pill>
              {job.region&&<RegionBadge regionKey={job.region} C={C} small/>}
              <Pill small C={C}>🕐 {job.days}p tagasi</Pill>
            </div>
            {job.reqComps?.length>0&&<CompBadges comps={job.reqComps} C={C}/>}
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7,flexShrink:0}}>
            <CatBadge cat={job.cat} C={C} size={34}/>
            <span style={{fontSize:13,color:open?C.pri:C.t3,transform:open?"rotate(180deg)":"none",display:"inline-block",transition:"transform .2s"}}>⌄</span>
          </div>
        </div>
      </div>
      {open&&(
        <div style={{borderTop:`1px solid ${C.b1}`,background:C.page,padding:"9px 12px",display:"flex",gap:7,flexWrap:"wrap"}}>
          <button onClick={onApply} style={{flex:1,minWidth:100,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",borderRadius:6,background:C.pri,color:"#fff",fontWeight:700,fontSize:12.5,border:"none",cursor:"pointer"}}>
            → Kandideeri
          </button>
          <QuickApplyBtn onApply={onQuickApply} C={C} profile={profile}/>
          <button style={{padding:"10px 12px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,color:C.t2,cursor:"pointer",fontSize:14}}>🔖</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TÄHTAJALINE TÖÖ KAART
═══════════════════════════════════════════════════════════ */
function TempJobCard({job,open,onToggle,onApply,onQuickApply,profile,C,dark}){
  return(
    <div style={{borderRadius:8,border:`1px solid ${open?C.priBd:C.b1}`,background:C.s1,overflow:"hidden",transition:"border-color .15s"}}>
      <div style={{height:2,background:C.blue,opacity:.4}}/>
      <div style={{padding:"11px 13px",cursor:"pointer"}} onClick={onToggle}>
        <div style={{display:"flex",gap:11,alignItems:"flex-start"}}>
          <BrandLogo logoKey={job.logoKey} size={42} radius={8} dark={dark}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:2}}>
              <p style={{fontWeight:700,fontSize:14,color:C.t1,lineHeight:1.3}}>{job.title}</p>
              {job.hot&&<Pill color="amber" small C={C}>🔥 Kuum</Pill>}
            </div>
            <p style={{fontSize:12,color:C.t2,fontWeight:500,marginBottom:7}}>🏢 {job.company}</p>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,padding:"6px 10px",borderRadius:5,background:C.s2,border:`1px solid ${C.b1}`}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:C.blue,flexShrink:0}}/>
              <span style={{fontSize:11,color:C.t2,fontWeight:600}}>{job.dateStart}</span>
              <div style={{flex:1,height:1,background:C.b2}}/>
              <span style={{fontSize:10,fontWeight:700,color:C.priL,fontFamily:"monospace"}}>{job.days}p</span>
              <div style={{flex:1,height:1,background:C.b2}}/>
              <span style={{fontSize:11,color:C.t1,fontWeight:600}}>{job.dateEnd}</span>
              <div style={{width:5,height:5,borderRadius:"50%",background:C.pri,flexShrink:0}}/>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:job.reqComps?.length?6:0}}>
              <Pill color="green" small C={C}>€ {job.salary} /kuu</Pill>
              <Pill small C={C}>📍 {job.location}</Pill>
              <Pill color="blue" small C={C}>📋 {job.type}</Pill>
              {job.region&&<RegionBadge regionKey={job.region} C={C} small/>}
            </div>
            {job.reqComps?.length>0&&<CompBadges comps={job.reqComps} C={C}/>}
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7,flexShrink:0}}>
            <CatBadge cat={job.cat} C={C} size={34}/>
            <span style={{fontSize:13,color:open?C.priL:C.t3,transform:open?"rotate(180deg)":"none",display:"inline-block",transition:"transform .2s"}}>⌄</span>
          </div>
        </div>
      </div>
      {open&&(
        <div style={{borderTop:`1px solid ${C.b1}`,background:C.page,padding:"9px 12px",display:"flex",gap:7,flexWrap:"wrap"}}>
          <button onClick={onApply} style={{flex:1,minWidth:100,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",borderRadius:6,background:C.pri,color:"#fff",fontWeight:700,fontSize:12.5,border:"none",cursor:"pointer"}}>
            → Kandideeri
          </button>
          <QuickApplyBtn onApply={onQuickApply} C={C} profile={profile}/>
          <button style={{padding:"10px 12px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,color:C.t2,cursor:"pointer",fontSize:14}}>🔖</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GIG CARD
═══════════════════════════════════════════════════════════ */
function GigCard({gig,open,onToggle,onApply,onQuickApply,profile,C,dark}){
  const accentCol=gig.urgent?C.red:(gig.cat==="CE"?C.catCE.t:gig.cat==="C"?C.catC.t:C.catB.t);
  return(
    <div style={{borderRadius:8,border:`1px solid ${open?C.priBd:gig.urgent?C.redBd:C.b1}`,background:C.s1,overflow:"hidden",transition:"border-color .15s"}}>
      <div style={{height:2,background:accentCol,opacity:.5}}/>
      <div style={{padding:"10px 12px",cursor:"pointer",display:"flex",gap:9}} onClick={onToggle}>
        <div style={{flexShrink:0,width:44,textAlign:"center",borderRadius:6,border:`1px solid ${gig.urgent?C.redBd:C.b1}`,background:gig.urgent?C.redBg:C.s2,padding:"7px 0"}}>
          <p style={{fontWeight:700,fontSize:19,color:gig.urgent?C.red:C.t1,lineHeight:1}}>{gig.date.getDate()}</p>
          <p style={{fontSize:8,color:C.t3,fontWeight:700,letterSpacing:"1.2px",marginTop:2,textTransform:"uppercase"}}>{MOS_S[gig.date.getMonth()]}</p>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
            <BrandLogo logoKey={gig.logoKey} size={24} radius={5} dark={dark}/>
            <span style={{fontSize:11,color:C.t2,fontWeight:500}}>{gig.company}</span>
          </div>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:6}}>
            <p style={{fontWeight:700,fontSize:13,color:C.t1,lineHeight:1.3}}>{gig.title}</p>
            <div style={{display:"flex",gap:4,alignItems:"center",flexShrink:0}}>
              {gig.urgent&&<Pill color="red" small C={C}>⚡ Kiire</Pill>}
              <CatBadge cat={gig.cat} C={C} size={20}/>
              <span style={{fontSize:13,color:open?C.priL:C.t3,transform:open?"rotate(180deg)":"none",display:"inline-block",transition:"transform .2s"}}>⌄</span>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6,padding:"6px 10px",borderRadius:5,background:C.s2,border:`1px solid ${C.b1}`}}>
            <div style={{width:4,height:4,borderRadius:"50%",background:C.green,flexShrink:0}}/>
            <span style={{fontWeight:600,fontSize:11,color:C.t2}}>{gig.from}</span>
            <div style={{flex:1,height:1,background:C.b2}}/>
            <span style={{fontSize:9.5,fontWeight:600,color:C.priL}}>{gig.dist}</span>
            <div style={{flex:1,height:1,background:C.b2}}/>
            <span style={{fontWeight:600,fontSize:11,color:C.t1}}>{gig.to}</span>
            <div style={{width:4,height:4,borderRadius:"50%",background:C.pri,flexShrink:0}}/>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:gig.reqComps?.length?5:0}}>
            <Pill color="green" small C={C}><ZapIcon size={9} color={C.green}/> {gig.pay} €/päev</Pill>
            <Pill small C={C}>📍 {gig.city}</Pill>
            <Pill color={gig.slots===1?"red":"default"} small C={C}>{gig.slots===1?"1 koht":`${gig.slots} kohta`}</Pill>
            <Pill small C={C}>🕐 {gig.hours}</Pill>
            {gig.region&&<RegionBadge regionKey={gig.region} C={C} small/>}
          </div>
          {gig.reqComps?.length>0&&<CompBadges comps={gig.reqComps} C={C}/>}
        </div>
      </div>
      {open&&(
        <div style={{borderTop:`1px solid ${C.b1}`,background:C.page,padding:"9px 12px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:9}}>
            {[["Sõiduk",VEHICLE_TYPES.find(v=>v.key===gig.veh)?.label||gig.veh||"—"],["Tööaeg",gig.hours]].map(([k,v])=>(
              <div key={k} style={{background:C.s2,borderRadius:5,padding:"8px 10px",border:`1px solid ${C.b1}`}}>
                <div style={{fontSize:8.5,color:C.t3,fontWeight:700,letterSpacing:".6px",textTransform:"uppercase",marginBottom:2}}>{k}</div>
                <div style={{fontSize:12,color:C.t1,fontWeight:600}}>{v}</div>
              </div>
            ))}
            <div style={{background:C.s2,borderRadius:5,padding:"8px 10px",border:`1px solid ${C.b1}`,gridColumn:"1/-1"}}>
              <div style={{fontSize:8.5,color:C.t3,fontWeight:700,letterSpacing:".6px",textTransform:"uppercase",marginBottom:2}}>Lisainfo</div>
              <div style={{fontSize:11.5,color:C.t2,lineHeight:1.5}}>{gig.note}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={onApply} style={{flex:1,minWidth:100,display:"flex",alignItems:"center",justifyContent:"center",gap:5,padding:"9px 0",borderRadius:6,background:C.pri,color:"#fff",fontWeight:700,fontSize:12,border:"none",cursor:"pointer"}}>
              → Kandideeri
            </button>
            <QuickApplyBtn onApply={onQuickApply} C={C} profile={profile}/>
            <button style={{padding:"9px 11px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,color:C.t2,cursor:"pointer",fontSize:13}}>🔖</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR WIDGETID
═══════════════════════════════════════════════════════════ */
function StatsWidget({credits,C}){
  return(
    <div style={{background:C.s1,borderRadius:8,border:`1px solid ${C.b1}`,padding:11}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
        <div style={{width:26,height:26,borderRadius:5,background:C.priBg,border:`1px solid ${C.priBd}`,display:"flex",alignItems:"center",justifyContent:"center"}}><ZapIcon size={13} color={C.pri}/></div>
        <p style={{fontWeight:700,fontSize:13,color:C.t1}}>Sinu konto</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
        {[
          {label:"KREDIITI",val:credits,color:C.priL,isCredit:true},
          {label:"Avaldused",val:3,color:C.t1,unit:"tk"},
          {label:"Salvestatud",val:7,color:C.t1,unit:"tk"},
          {label:"Vaatamised",val:142,color:C.green},
        ].map(s=>(
          <div key={s.label} style={{background:C.s2,borderRadius:6,padding:"9px 11px",border:`1px solid ${C.b1}`}}>
            {s.isCredit?(
              <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}>
                <ZapIcon size={14} color={C.priL}/>
                <p style={{fontWeight:700,fontSize:18,color:s.color,lineHeight:1}}>{s.val}</p>
              </div>
            ):(
              <p style={{fontWeight:700,fontSize:17,color:s.color,lineHeight:1,marginBottom:2}}>
                {s.val}<span style={{fontSize:9.5,fontWeight:500,color:C.t3,marginLeft:2}}>{s.unit}</span>
              </p>
            )}
            <p style={{fontSize:10,color:C.t3,fontWeight:500}}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FreeDaysWidget({C}){
  const [days,setDays]=useState(["E 27","T 28","K 29","N 30","R 31","L 1","P 2"].map((d,i)=>({label:d,free:[0,3,4,6].includes(i)})));
  const freeCnt=days.filter(d=>d.free).length;
  return(
    <div style={{background:C.s1,borderRadius:8,border:`1px solid ${C.b1}`,padding:11}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
        <div style={{width:26,height:26,borderRadius:5,background:C.purpleBg,border:`1px solid ${C.purpleBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>📅</div>
        <p style={{fontWeight:700,fontSize:13,color:C.t1}}>Vabad päevad</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:9}}>
        {days.map((d,i)=>(
          <button key={i} onClick={()=>setDays(p=>p.map((x,idx)=>idx===i?{...x,free:!x.free}:x))}
            style={{textAlign:"center",background:"none",border:"none",cursor:"pointer",padding:0}}>
            <p style={{fontSize:7.5,color:C.t3,fontWeight:700,marginBottom:2}}>{d.label.split(" ")[0]}</p>
            <div style={{borderRadius:4,aspectRatio:"1/1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10.5,fontWeight:700,transition:"all .15s",background:d.free?C.priBg:C.s2,color:d.free?C.priL:C.t3,border:`1px solid ${d.free?C.priBd:C.b1}`}}>
              {d.label.split(" ")[1]}
            </div>
          </button>
        ))}
      </div>
      <p style={{fontSize:11,color:C.t3,textAlign:"center"}}><span style={{color:C.priL,fontWeight:700}}>{freeCnt}</span> vaba päeva nädalas</p>
    </div>
  );
}

function PartnersWidget({C,dark}){
  return(
    <div style={{background:C.adBg,borderRadius:8,border:`1px solid ${C.adBd}`,overflow:"hidden"}}>
      <div style={{padding:"9px 13px 8px",borderBottom:`1px solid ${C.adBd}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:26,height:26,borderRadius:5,background:C.amberBg,border:`1px solid ${C.amberBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>⭐</div>
          <p style={{fontWeight:700,fontSize:13,color:C.t1}}>Partnerid</p>
        </div>
        <SponsoredTag C={C}/>
      </div>
      {PARTNERS.map((p,i)=>{
        const isPri=p.accent==="pri";
        const at=isPri?C.priL:C.blue,ab=isPri?C.priBg:C.blueBg,abd=isPri?C.priBd:C.blueBd;
        return(
          <div key={i} style={{padding:"11px 14px",borderBottom:i<PARTNERS.length-1?`1px solid ${C.adBd}`:"none",cursor:"pointer",position:"relative"}}>
            <div style={{position:"absolute",left:0,top:10,bottom:10,width:2,background:at,opacity:.5}}/>
            <div style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:8,paddingLeft:8}}>
              <BrandLogo logoKey={p.logoKey} size={36} radius={8} dark={dark}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                  <p style={{fontWeight:700,fontSize:12,color:at}}>{p.name}</p>
                  <span style={{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4,background:ab,color:at,border:`1px solid ${abd}`}}>{p.badge}</span>
                </div>
                <p style={{fontSize:11,color:C.t2,lineHeight:1.4}}>{p.desc}</p>
              </div>
            </div>
            <div style={{paddingLeft:8}}>
              <button style={{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 11px",borderRadius:5,background:ab,border:`1px solid ${abd}`,color:at,fontWeight:600,fontSize:11,cursor:"pointer"}}>
                {p.cta} →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TrainingWidget({C}){
  return(
    <div style={{background:C.s1,borderRadius:8,border:`1px solid ${C.b1}`,overflow:"hidden"}}>
      <div style={{padding:"9px 13px 8px",borderBottom:`1px solid ${C.b1}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:26,height:26,borderRadius:5,background:C.blueBg,border:`1px solid ${C.blueBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🎓</div>
          <p style={{fontWeight:700,fontSize:13,color:C.t1}}>Koolituskalender</p>
        </div>
        <button style={{fontSize:11,color:C.priL,fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>Kõik →</button>
      </div>
      {TRAININGS.map((t,i)=>(
        <div key={i} style={{padding:"8px 13px",borderBottom:i<TRAININGS.length-1?`1px solid ${C.b1}`:"none",display:"flex",gap:11,cursor:"pointer"}}>
          <div style={{textAlign:"center",flexShrink:0,width:30}}>
            <p style={{fontSize:7.5,color:C.t3,fontWeight:700,textTransform:"uppercase",letterSpacing:".4px"}}>{t.mo}</p>
            <p style={{fontWeight:700,fontSize:17,color:C.t1,lineHeight:1.1}}>{t.date}</p>
          </div>
          <div style={{flex:1}}>
            <p style={{fontSize:12,fontWeight:600,color:C.t2,lineHeight:1.35,marginBottom:4}}>{t.title}</p>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <Pill color="pri" small C={C}>{t.type}</Pill>
              <span style={{fontSize:10,color:C.t3}}>{t.spots} kohta</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   KANDIDAADI PROFIILI EELVAATE MODAL
   Avaneb Kanban-kaardil "Vaata profiili" klõpsul
═══════════════════════════════════════════════════════════ */
function CandidateProfileModal({card,onClose,C}){
  /* Demo-andmed profiili rikastamiseks — päris rakenduses tuleksid API-st */
  const DEMO_EXTRA={
    k1:{exp:7, availDays:["E","T","K","N","R"],  bio:"Pikaajaline külmvedu-kogemus, rahvusvaheline marsruut TLN-HEL, kehtiv ADR."},
    k2:{exp:4, availDays:["E","T","K","T","R"],  bio:"Ehitusmaterjalide vedu ja põhjalik traktori käsitlus. Harjumaa piirkond eelistus."},
    k3:{exp:2, availDays:["E","T","K"],           bio:"Laokogemus + kullervedu Tartu linnas. B-kategooria 2a."},
    k4:{exp:9, availDays:["E","T","K","N","R","L"],bio:"Kogenud rahvusvaheline CE-juht, kardina- ja konteinerveo kogemus, Baltikum + Skandinaavia."},
    k5:{exp:5, availDays:["E","T","K","N","R"],  bio:"Platvorm- ja standardveod. Täpne ja usaldusväärne, soovib püsivat töösuhet."},
  };
  const extra=DEMO_EXTRA[card.id]||{exp:3,availDays:["E","T","K","N","R"],bio:"—"};
  const veh=VEHICLE_TYPES.find(v=>v.key===card.veh);
  const DAYS_ALL=["E","T","K","N","R","L","P"];

  return(
    <div style={{position:"fixed",inset:0,zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.80)",padding:"16px"}}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{width:"100%",maxWidth:440,background:C.isDark?"#0F172A":"#fff",border:`1px solid ${C.b2}`,borderRadius:8,overflow:"hidden",boxShadow:C.shadowMd,animation:"sheetUp .22s cubic-bezier(.22,1,.36,1) both"}}>

        {/* Header */}
        <div style={{background:C.isDark?"#1E293B":"#F1F5F9",borderBottom:`1px solid ${C.b1}`,padding:"13px 16px",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:6,background:C.priBg,border:`1px solid ${C.priBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>👤</div>
          <div style={{flex:1,minWidth:0}}>
            <p style={{fontWeight:700,fontSize:15,color:C.t1,letterSpacing:"-.2px"}}>{card.name}</p>
            <div style={{display:"flex",alignItems:"center",gap:7,marginTop:3}}>
              <CatBadge cat={card.cat} C={C} size={20}/>
              <span style={{fontSize:11,color:C.t3,fontWeight:500}}>{veh?.icon} {veh?.label?.split(" /")[0]||card.veh}</span>
              <span style={{fontSize:10,fontWeight:700,color:C.amber,marginLeft:"auto"}}>🔒 {card.wish}</span>
            </div>
          </div>
          <button onClick={onClose}
            style={{width:28,height:28,borderRadius:5,background:C.s3,border:`1px solid ${C.b2}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.t3,cursor:"pointer",fontSize:12,flexShrink:0}}>
            ✕
          </button>
        </div>

        {/* Sisu */}
        <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:13}}>

          {/* Kogemus + bio */}
          <div style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:10}}>
            <div style={{background:C.s2,borderRadius:6,padding:"10px 11px",border:`1px solid ${C.b1}`,textAlign:"center"}}>
              <p style={{fontWeight:800,fontSize:22,color:C.priL,lineHeight:1}}>{extra.exp}</p>
              <p style={{fontSize:9,color:C.t3,fontWeight:600,textTransform:"uppercase",letterSpacing:".5px",marginTop:3}}>aastat kogemust</p>
            </div>
            <div style={{background:C.s2,borderRadius:6,padding:"10px 12px",border:`1px solid ${C.b1}`}}>
              <p style={{fontSize:9,color:C.t3,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",marginBottom:5}}>Lühitutvustus</p>
              <p style={{fontSize:11.5,color:C.t2,lineHeight:1.55}}>{extra.bio}</p>
            </div>
          </div>

          {/* Vabad päevad */}
          <div>
            <p style={{fontSize:9,color:C.t3,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",marginBottom:7}}>Töövalmidus nädalas</p>
            <div style={{display:"flex",gap:4}}>
              {DAYS_ALL.map(d=>{
                const avail=extra.availDays.includes(d);
                return(
                  <div key={d} style={{flex:1,textAlign:"center"}}>
                    <p style={{fontSize:8,color:C.t3,fontWeight:700,marginBottom:3}}>{d}</p>
                    <div style={{borderRadius:4,aspectRatio:"1/1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,
                      background:avail?C.greenBg:C.s2,
                      color:avail?C.green:C.t3,
                      border:`1px solid ${avail?C.greenBd:C.b1}`}}>
                      {avail?"✓":"—"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pädevused */}
          <div>
            <p style={{fontSize:9,color:C.t3,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",marginBottom:7}}>Litsentsid ja pädevused</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {card.comps.map(ck=>{
                const comp=COMPETENCIES.find(x=>x.key===ck);
                if(!comp) return null;
                return(
                  <span key={ck} style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:4,background:C.tealBg,color:C.teal,border:`1px solid ${C.tealBd}`}}>
                    {comp.icon} {comp.label}
                  </span>
                );
              })}
              {card.comps.length===0&&<span style={{fontSize:11,color:C.t3}}>Pädevused puuduvad</span>}
            </div>
          </div>

          {/* Masinatüübi eelistus */}
          <div>
            <p style={{fontSize:9,color:C.t3,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",marginBottom:7}}>Masinatüübi eelistus</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,padding:"7px 11px",borderRadius:5,background:C.priBg,border:`1px solid ${C.priBd}`}}>
              <span style={{fontSize:13}}>{veh?.icon||"🚛"}</span>
              <span style={{fontSize:12,fontWeight:600,color:C.priL}}>{veh?.label||card.veh}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{padding:"10px 16px",borderTop:`1px solid ${C.b1}`,background:C.isDark?"#1E293B":"#F8FAFC",display:"flex",gap:7}}>
          <button style={{flex:1,padding:"9px 0",borderRadius:6,background:C.pri,color:"#fff",fontWeight:700,fontSize:12.5,border:"none",cursor:"pointer",fontFamily:"inherit"}}>
            📞 Võta ühendust
          </button>
          <button onClick={onClose}
            style={{padding:"9px 14px",borderRadius:6,border:`1px solid ${C.b2}`,background:"transparent",color:C.t2,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
            Sulge
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRO RECRUITER KANBAN
   v2: + Quick Notes, + Smart Match, + Profile Preview Modal
═══════════════════════════════════════════════════════════ */
function ProKanban({C,isPro,onActivate}){
  /* Kaartide state — lisame notes välja igale kaardile */
  const [cols,setCols]=useState(()=>{
    const init=JSON.parse(JSON.stringify(KANBAN_INIT));
    const addNotes=arr=>arr.map(c=>({...c,note:""}));
    return{new:addNotes(init.new),contacted:addNotes(init.contacted),hired:addNotes(init.hired)};
  });

  /* Profiili eelvaate state */
  const [previewCard,setPreviewCard]=useState(null);

  /* Smart Match — aktiivse kuulutuse nõuded: võtame JOBS[0] reqComps näitena */
  const ACTIVE_JOB_COMPS=new Set(JOBS[0]?.reqComps||[]);

  function moveCard(card,from,to){
    setCols(prev=>{
      const next={...prev};
      next[from]=prev[from].filter(c=>c.id!==card.id);
      next[to]=[...prev[to],card];
      return next;
    });
  }

  function updateNote(cardId,colKey,val){
    setCols(prev=>({
      ...prev,
      [colKey]:prev[colKey].map(c=>c.id===cardId?{...c,note:val}:c),
    }));
  }

  const COL_CFG=[
    {key:"new",      label:"Uued avaldused",    color:C.priL,  bg:C.priBg,  bd:C.priBd},
    {key:"contacted",label:"Ühendust võetud",   color:C.amber, bg:C.amberBg,bd:C.amberBd},
    {key:"hired",    label:"Palgatud / Arhiiv", color:C.green, bg:C.greenBg,bd:C.greenBd},
  ];
  const TRANSITIONS={new:"contacted",contacted:"hired"};
  const BACK={contacted:"new",hired:"contacted"};

  /* ── SMART MATCH märgis ── */
  const SmartCompBadge=({compKey})=>{
    const comp=COMPETENCIES.find(x=>x.key===compKey);
    if(!comp) return null;
    const isMatch=ACTIVE_JOB_COMPS.has(compKey);
    return(
      <span style={{
        fontSize:9.5,fontWeight:600,padding:"2px 6px",borderRadius:3,whiteSpace:"nowrap",
        background:isMatch?C.priBg:C.tealBg,
        color:isMatch?C.priL:C.teal,
        border:`1px solid ${isMatch?C.priBd:C.tealBd}`,
        /* Kattuvuse korral pisut tugevam piirjoon */
        boxShadow:isMatch?`0 0 0 1px ${C.priBd}`:"none",
        transition:"all .15s",
      }}>
        {isMatch&&<span style={{marginRight:3,fontSize:8}}>✦</span>}
        {comp.icon} {comp.label}
      </span>
    );
  };

  /* ── KANBAN KAART ── */
  const KanbanCard=({card,colKey})=>{
    const [noteOpen,setNoteOpen]=useState(false);
    const [localNote,setLocalNote]=useState(card.note||"");
    const colCfg=COL_CFG.find(c=>c.key===colKey);

    function saveNote(){
      updateNote(card.id,colKey,localNote);
      setNoteOpen(false);
    }

    return(
      <div style={{borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,marginBottom:7,overflow:"hidden"}}>
        <div style={{padding:"10px 11px"}}>
          {/* Juhi nimi + profiili link */}
          <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
            <div style={{width:30,height:30,borderRadius:5,background:C.s3,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13}}>👤</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                <p style={{fontWeight:700,fontSize:12.5,color:C.t1}}>{card.name}</p>
                {/* "Vaata profiili" link */}
                <button onClick={()=>setPreviewCard(card)}
                  style={{display:"inline-flex",alignItems:"center",gap:3,padding:"1px 6px",borderRadius:3,background:"transparent",border:`1px solid ${C.b2}`,color:C.t3,fontSize:9.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit",lineHeight:1.5,transition:"all .12s",whiteSpace:"nowrap"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.priBd;e.currentTarget.style.color=C.priL;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.b2;e.currentTarget.style.color=C.t3;}}>
                  ↗ profiil
                </button>
              </div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
                <CatBadge cat={card.cat} C={C} size={18}/>
                <span style={{fontSize:10,color:C.t3,alignSelf:"center"}}>{VEHICLE_TYPES.find(v=>v.key===card.veh)?.label?.split(" /")[0]||card.veh}</span>
              </div>
            </div>
            <span style={{fontSize:10,fontWeight:700,color:C.amber,whiteSpace:"nowrap",flexShrink:0}}>🔒 {card.wish}</span>
          </div>

          {/* Smart Match pädevuste märgised */}
          <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:9}}>
            {card.comps.map(ck=>(<SmartCompBadge key={ck} compKey={ck}/>))}
            {card.comps.length===0&&<span style={{fontSize:9.5,color:C.t3}}>Pädevused puuduvad</span>}
          </div>

          {/* Smart Match indikaator kui kattuvus > 0 */}
          {card.comps.some(ck=>ACTIVE_JOB_COMPS.has(ck))&&(
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:9,padding:"4px 8px",borderRadius:4,background:C.priBg,border:`1px solid ${C.priBd}`}}>
              <span style={{fontSize:9,color:C.priL}}>✦</span>
              <span style={{fontSize:9.5,color:C.priL,fontWeight:600}}>
                Smart Match — {card.comps.filter(ck=>ACTIVE_JOB_COMPS.has(ck)).length}/{ACTIVE_JOB_COMPS.size} nõuet katab
              </span>
            </div>
          )}

          {/* Liigutamise nupud */}
          <div style={{display:"flex",gap:5}}>
            {BACK[colKey]&&(
              <button onClick={()=>moveCard(card,colKey,BACK[colKey])}
                style={{padding:"5px 8px",borderRadius:4,border:`1px solid ${C.b2}`,background:"transparent",color:C.t3,fontSize:10.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                ← Tagasi
              </button>
            )}
            {TRANSITIONS[colKey]&&(
              <button onClick={()=>moveCard(card,colKey,TRANSITIONS[colKey])}
                style={{flex:1,padding:"6px 0",borderRadius:4,
                  background:COL_CFG.find(c=>c.key===TRANSITIONS[colKey])?.bg||C.priBg,
                  border:`1px solid ${COL_CFG.find(c=>c.key===TRANSITIONS[colKey])?.bd||C.priBd}`,
                  color:COL_CFG.find(c=>c.key===TRANSITIONS[colKey])?.color||C.priL,
                  fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                {TRANSITIONS[colKey]==="contacted"?"Võta ühendust →":"Palka ✓"}
              </button>
            )}
          </div>
        </div>

        {/* ── QUICK NOTES ── */}
        <div style={{borderTop:`1px solid ${C.b1}`,background:C.isDark?"rgba(2,6,23,0.5)":"rgba(241,245,249,0.6)"}}>
          {!noteOpen&&!card.note?(
            /* Tühi olek — diskreetne platseholder */
            <button onClick={()=>{setNoteOpen(true);}}
              style={{width:"100%",padding:"7px 11px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:11,color:C.t3,fontStyle:"italic"}}>✍️ Lisa märkus...</span>
            </button>
          ):!noteOpen&&card.note?(
            /* Salvestatud märkus — klikib muutmiseks */
            <button onClick={()=>{setLocalNote(card.note);setNoteOpen(true);}}
              style={{width:"100%",padding:"7px 11px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
              <p style={{fontSize:10.5,color:C.t2,lineHeight:1.5,wordBreak:"break-word"}}>{card.note}</p>
            </button>
          ):(
            /* Muutmisrežiim */
            <div style={{padding:"7px 9px",display:"flex",flexDirection:"column",gap:6}}>
              <textarea value={localNote} onChange={e=>setLocalNote(e.target.value)}
                autoFocus
                placeholder="nt Tervisetõend aegub pea / Helistatud, sobib alates juuli..."
                style={{width:"100%",padding:"6px 8px",borderRadius:4,border:`1px solid ${C.priBd}`,background:C.isDark?"#0F172A":"#fff",color:C.t1,fontSize:11,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.55,minHeight:52,colorScheme:C.isDark?"dark":"light"}}/>
              <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
                <button onClick={()=>{setLocalNote(card.note||"");setNoteOpen(false);}}
                  style={{padding:"4px 10px",borderRadius:4,border:`1px solid ${C.b2}`,background:"transparent",color:C.t3,fontSize:10.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                  Tühista
                </button>
                <button onClick={saveNote}
                  style={{padding:"4px 10px",borderRadius:4,background:C.pri,border:"none",color:"#fff",fontSize:10.5,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                  Salvesta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ── TASUTA VAADE (bluritud eelvaade) ── */
  if(!isPro) return(
    <div style={{borderRadius:8,border:`1px solid ${C.amberBd}`,background:C.adBg,overflow:"hidden",marginTop:12}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.amberBd}`,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:28,height:28,borderRadius:5,background:C.amberBg,border:`1px solid ${C.amberBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🏆</div>
        <div style={{flex:1}}>
          <p style={{fontWeight:700,fontSize:13,color:C.amber}}>PRO Värbaja pakett aktiveerimata</p>
          <p style={{fontSize:11,color:C.t3,marginTop:1}}>Kandidaatide Kanban-haldus on saadaval PRO paketis</p>
        </div>
        <button onClick={onActivate}
          style={{padding:"7px 14px",borderRadius:6,background:C.amber,color:"#000",fontWeight:700,fontSize:12,border:"none",cursor:"pointer",flexShrink:0}}>
          Aktiveeri PRO →
        </button>
      </div>
      <div style={{position:"relative",overflow:"hidden"}}>
        <div style={{filter:"blur(4px)",opacity:.45,padding:"12px 14px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,pointerEvents:"none",userSelect:"none"}}>
          {COL_CFG.map(col=>{
            const cards=KANBAN_INIT[col.key]||[];
            return(
              <div key={col.key}>
                <div style={{fontSize:10,fontWeight:700,color:col.color,letterSpacing:".7px",textTransform:"uppercase",marginBottom:8,display:"flex",alignItems:"center",gap:5}}>
                  {col.label}<span style={{fontSize:9,padding:"1px 6px",borderRadius:99,background:col.bg,border:`1px solid ${col.bd}`}}>{cards.length}</span>
                </div>
                {cards.slice(0,2).map(card=>(
                  <div key={card.id} style={{borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,padding:"8px 10px",marginBottom:6}}>
                    <p style={{fontSize:11.5,fontWeight:700,color:C.t1}}>{card.name}</p>
                    <p style={{fontSize:10,color:C.t3}}>{card.wish}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:C.s1,border:`1px solid ${C.amberBd}`,borderRadius:8,padding:"14px 20px",textAlign:"center",boxShadow:C.shadowMd}}>
            <p style={{fontWeight:700,fontSize:13,color:C.t1,marginBottom:4}}>🔒 PRO Funktsioon</p>
            <p style={{fontSize:11.5,color:C.t3}}>Aktiveeri PRO pakett, et kasutada Kanban-lauda</p>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── PRO VAADE ── */
  return(
    <>
      <div style={{borderRadius:8,border:`1px solid ${C.greenBd}`,background:C.s1,overflow:"hidden",marginTop:12}}>
        {/* Päis */}
        <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.b1}`,display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:26,height:26,borderRadius:5,background:C.greenBg,border:`1px solid ${C.greenBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🏆</div>
          <p style={{fontWeight:700,fontSize:13,color:C.green}}>PRO Värbaja — Kandidaatide Kanban</p>
          <span style={{marginLeft:"auto",fontSize:10,color:C.green,fontWeight:600,padding:"2px 8px",borderRadius:4,background:C.greenBg,border:`1px solid ${C.greenBd}`}}>AKTIIVNE</span>
        </div>
        {/* Smart Match legend */}
        <div style={{padding:"7px 14px",borderBottom:`1px solid ${C.b1}`,background:C.isDark?"rgba(59,130,246,0.05)":"rgba(37,99,235,0.03)",display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:10,color:C.priL}}>✦</span>
          <span style={{fontSize:10.5,color:C.t3}}>Smart Match — tumedamad märgised kattuvad sinu aktiivse kuulutuse nõuetega</span>
          <span style={{marginLeft:"auto",fontSize:10,color:C.t3,fontStyle:"italic"}}>Aktiivne kuulutus: {JOBS[0]?.title||"—"}</span>
        </div>
        {/* Kolm tulpa */}
        <div style={{padding:"12px 14px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
          {COL_CFG.map(col=>(
            <div key={col.key}>
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:9,padding:"6px 9px",borderRadius:5,background:col.bg,border:`1px solid ${col.bd}`}}>
                <span style={{fontSize:10,fontWeight:700,color:col.color,letterSpacing:".5px",textTransform:"uppercase",flex:1}}>{col.label}</span>
                <span style={{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:99,background:C.s1,color:col.color}}>{cols[col.key].length}</span>
              </div>
              {cols[col.key].map(card=>(
                <KanbanCard key={card.id} card={card} colKey={col.key}/>
              ))}
              {cols[col.key].length===0&&(
                <div style={{borderRadius:6,border:`1px dashed ${C.b2}`,padding:"14px 10px",textAlign:"center"}}>
                  <p style={{fontSize:11,color:C.t3}}>Tühi</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Profiili eelvaate modal — renderdatakse Kanbani kohal */}
      {previewCard&&(
        <CandidateProfileModal card={previewCard} onClose={()=>setPreviewCard(null)} C={C}/>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   POST MODAL
═══════════════════════════════════════════════════════════ */
function PostModal({credits,onClose,onPost,C}){
  const [step,setStep]=useState(1);
  const [type,setType]=useState(null);
  const [formCat,setFormCat]=useState("C");
  const [formPay,setFormPay]=useState("");
  const [payType,setPayType]=useState("day");
  const [formRoute,setFormRoute]=useState("");
  const [formVeh,setFormVeh]=useState("");
  const [formRegion,setFormRegion]=useState("");
  const [formComps,setFormComps]=useState(new Set());
  const [permStart,setPermStart]=useState("asap");
  const [tempDateStart,setTempDateStart]=useState("");
  const [tempDateEnd,setTempDateEnd]=useState("");
  const [gigVariant,setGigVariant]=useState("A");
  const [gigWeekdays,setGigWeekdays]=useState(new Set());
  const [gigSpecificDates,setGigSpecificDates]=useState("");

  const cost=type?CREDIT_COSTS[type]:0;
  const hasEnough=credits>=cost;
  const noCredits=type!==null&&!hasEnough;
  const dayCount=daysBetween(tempDateStart,tempDateEnd);

  const PERM_START_OPTS=[
    {key:"asap",       label:"Niipea kui võimalik"},
    {key:"next_month", label:"Järgmise kuu algusest"},
    {key:"agreement",  label:"Kokkuleppel"},
  ];

  const TYPE_BADGE={
    permanent:{bg:C.priBg,text:C.priL,bd:C.priBd,label:"Püsiv töö"},
    temporary:{bg:C.blueBg,text:C.blue,bd:C.blueBd,label:"Tähtajaline töö"},
    gig:{bg:C.amberBg,text:C.amber,bd:C.amberBd,label:"Tööamps"},
  };

  const FL=({children})=>(<label style={{display:"block",fontSize:9,fontWeight:700,color:C.t3,letterSpacing:".8px",textTransform:"uppercase",marginBottom:5}}>{children}</label>);
  const FI=({type:t="text",value,onChange,placeholder=""})=>(<input type={t} value={value} onChange={onChange} placeholder={placeholder} style={{width:"100%",padding:"8px 11px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.isDark?"#1E293B":C.s2,color:C.t1,fontSize:12.5,fontFamily:"inherit",outline:"none",colorScheme:C.isDark?"dark":"light"}}/>);

  function StepRow(){
    return(
      <div style={{display:"flex",alignItems:"center",marginBottom:12,flexShrink:0}}>
        {[1,2,3].map((n,i)=>{
          const st=n<step?"done":n===step?"active":"idle";
          const labels=["Tüüp","Andmed","Kinnitus"];
          return(
            <div key={n} style={{display:"flex",alignItems:"center",flex:i<2?1:"auto"}}>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:20,height:20,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9.5,fontWeight:700,background:st==="active"?C.pri:st==="done"?C.greenBg:C.s3,color:st==="active"?"#fff":st==="done"?C.green:C.t3,border:st==="done"?`1.5px solid ${C.greenBd}`:st==="idle"?`1px solid ${C.b1}`:"none"}}>{st==="done"?"✓":n}</div>
                <span style={{fontSize:9.5,fontWeight:600,color:st==="active"?C.priL:st==="done"?C.green:C.t3,whiteSpace:"nowrap"}}>{labels[n-1]}</span>
              </div>
              {i<2&&<div style={{flex:1,height:1.5,background:n<step?C.green:C.b1,margin:"0 5px"}}/>}
            </div>
          );
        })}
      </div>
    );
  }

  function Step1(){
    const CARDS=[
      {key:"permanent",label:"Püsiv töö",desc:"Tähtajatu tööleping autojuhile.",badge:"Täisaeg / osaline",cost:CREDIT_COSTS.permanent,icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect x="3" y="8" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 8V6a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9 16h10M9 19.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,accent:C.priL,acBg:C.priBg,acBd:C.priBd},
      {key:"temporary",label:"Tähtajaline töö",desc:"Hooajaline töö, projektid või pikem asendus.",badge:"Perioodiga",cost:CREDIT_COSTS.temporary,icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect x="3" y="5" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M3 11h22" stroke="currentColor" strokeWidth="1.8"/><path d="M8 3v4M20 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><rect x="7" y="14" width="5" height="5" rx="1.2" fill="currentColor" opacity=".6"/></svg>,accent:C.blue,acBg:C.blueBg,acBd:C.blueBd},
      {key:"gig",label:"Tööamps",desc:"Lühiajaline, ühepäevane või paari päeva asendus.",badge:"1 krediit",cost:CREDIT_COSTS.gig,icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M16 3L5 16h8L10 25l13-14h-8L16 3Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg>,accent:C.amber,acBg:C.amberBg,acBd:C.amberBd},
    ];
    return(
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <p style={{fontSize:11.5,color:C.t3,marginBottom:12,flexShrink:0,lineHeight:1.5}}>Vali kuulutuse tüüp — klõps avab kohe andmete sisestamise.</p>
        <div style={{display:"flex",flexDirection:"column",gap:9,flex:1,overflowY:"auto"}}>
          {CARDS.map(card=>(
            <button key={card.key} onClick={()=>{setType(card.key);setStep(2);}}
              style={{width:"100%",borderRadius:8,border:`1px solid ${C.b1}`,background:C.s2,cursor:"pointer",fontFamily:"inherit",textAlign:"left",padding:0,overflow:"hidden",transition:"border-color .15s,background .15s",display:"block"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=card.acBd;e.currentTarget.style.background=card.acBg;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.b1;e.currentTarget.style.background=C.s2;}}>
              <div style={{height:2,background:card.accent,opacity:.3}}/>
              <div style={{display:"flex",alignItems:"stretch",padding:"12px 14px",gap:14}}>
                <div style={{width:48,height:48,borderRadius:8,background:card.acBg,border:`1px solid ${card.acBd}`,display:"flex",alignItems:"center",justifyContent:"center",color:card.accent,flexShrink:0}}>{card.icon}</div>
                <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                    <span style={{fontWeight:700,fontSize:13.5,color:C.t1}}>{card.label}</span>
                    <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:4,background:card.acBg,color:card.accent,border:`1px solid ${card.acBd}`,textTransform:"uppercase",letterSpacing:".3px"}}>{card.badge}</span>
                  </div>
                  <p style={{fontSize:12,color:C.t2,lineHeight:1.4}}>{card.desc}</p>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",flexShrink:0,borderLeft:`1px solid ${C.b2}`,paddingLeft:14,minWidth:56}}>
                  <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:2}}>
                    <ZapIcon size={13} color={card.accent}/>
                    <span style={{fontWeight:800,fontSize:22,color:card.accent,lineHeight:1}}>{card.cost}</span>
                  </div>
                  <span style={{fontSize:8.5,color:card.accent,fontWeight:700,letterSpacing:".4px",textTransform:"uppercase",marginBottom:9}}>KREDIITI</span>
                  <div style={{width:24,height:24,borderRadius:"50%",background:card.acBg,border:`1px solid ${card.acBd}`,display:"flex",alignItems:"center",justifyContent:"center",color:card.accent,fontSize:12,fontWeight:700}}>→</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function GigSchedule(){
    return(
      <div>
        <FL>Tööampsude ajakava</FL>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
          {[{key:"A",label:"Nädalapäevad",sub:"Kindlad päevad igal nädalal",icon:"🔁"},{key:"B",label:"Konkreetsed kuupäevad",sub:"Üksikud päevad kuus",icon:"📅"}].map(v=>(
            <button key={v.key} onClick={()=>setGigVariant(v.key)}
              style={{padding:"9px 10px",borderRadius:6,border:`1px solid ${gigVariant===v.key?C.amberBd:C.b1}`,background:gigVariant===v.key?C.amberBg:"transparent",cursor:"pointer",fontFamily:"inherit",textAlign:"left",transition:"all .12s"}}>
              <div style={{fontSize:14,marginBottom:4}}>{v.icon}</div>
              <p style={{fontWeight:700,fontSize:11.5,color:gigVariant===v.key?C.amber:C.t1,marginBottom:1}}>{v.label}</p>
              <p style={{fontSize:9.5,color:C.t3,lineHeight:1.4}}>{v.sub}</p>
            </button>
          ))}
        </div>
        {gigVariant==="A"?(
          <div>
            <p style={{fontSize:10.5,color:C.t3,marginBottom:7}}>Vali päevad (mitu võimalik):</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
              {WEEKDAYS.map((d,i)=>{
                const sel=gigWeekdays.has(WEEKDAY_KEYS[i]);
                return(<button key={d} onClick={()=>{const next=new Set(gigWeekdays);sel?next.delete(WEEKDAY_KEYS[i]):next.add(WEEKDAY_KEYS[i]);setGigWeekdays(next);}} style={{aspectRatio:"1/1",borderRadius:5,border:`1px solid ${sel?C.amberBd:C.b1}`,background:sel?C.amberBg:"transparent",color:sel?C.amber:C.t2,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit",transition:"all .12s",display:"flex",alignItems:"center",justifyContent:"center"}}>{d}</button>);
              })}
            </div>
            {gigWeekdays.size>0&&<div style={{marginTop:8,display:"flex",gap:4,flexWrap:"wrap"}}>{[...gigWeekdays].map(k=>(<Pill key={k} color="amber" small C={C}>{WEEKDAYS[WEEKDAY_KEYS.indexOf(k)]}</Pill>))}</div>}
          </div>
        ):(
          <div>
            <p style={{fontSize:10.5,color:C.t3,marginBottom:7}}>Sisesta kuupäevad komaga eraldatult:</p>
            <textarea value={gigSpecificDates} onChange={e=>setGigSpecificDates(e.target.value)} placeholder="nt 25.06, 28.06, 02.07"
              style={{width:"100%",padding:"8px 11px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.isDark?"#1E293B":C.s2,color:C.t1,fontSize:12,fontFamily:"inherit",outline:"none",resize:"vertical",minHeight:60,lineHeight:1.5,colorScheme:C.isDark?"dark":"light"}}/>
          </div>
        )}
      </div>
    );
  }

  function Step2(){
    const badge=TYPE_BADGE[type]||TYPE_BADGE.permanent;
    return(
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,flexShrink:0}}>
          <span style={{fontSize:9,color:C.t3,fontWeight:600}}>Täidad:</span>
          <span style={{fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:4,background:badge.bg,color:badge.text,border:`1px solid ${badge.bd}`}}>{badge.label}</span>
          <span style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:3}}>
            <ZapIcon size={10} color={badge.text}/><span style={{fontSize:10,fontWeight:700,color:badge.text}}>{CREDIT_COSTS[type]} KREDIITI</span>
          </span>
        </div>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:11}}>
          {/* Kategooria */}
          <div>
            <FL>Kategooria</FL>
            <div style={{display:"flex",gap:5}}>
              {["B","C","CE"].map(c=>{const sel=formCat===c,s=C[`cat${c}`];return(<button key={c} onClick={()=>setFormCat(c)} style={{padding:"6px 14px",borderRadius:5,border:`1px solid ${sel?s.r:C.b1}`,background:sel?s.bg:"transparent",fontSize:12,fontWeight:700,color:sel?s.t:C.t2,cursor:"pointer",fontFamily:"inherit",transition:"all .12s"}}>{c}</button>);})}</div>
          </div>
          {/* Piirkond */}
          <div>
            <FL>Tööpiirkond</FL>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {REGION_TYPES.map(r=>{const sel=formRegion===r.key;return(<button key={r.key} onClick={()=>setFormRegion(r.key)} style={{padding:"8px 11px",borderRadius:5,border:`1px solid ${sel?C.priBd:C.b1}`,background:sel?C.priBg:"transparent",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:8,transition:"all .12s"}}><span style={{fontSize:13}}>{r.icon}</span><span style={{fontSize:12.5,fontWeight:600,color:sel?C.priL:C.t2}}>{r.label}</span></button>);})}</div>
          </div>
          {/* Ajalogika */}
          {type==="permanent"&&(
            <div>
              <FL>Töö orienteeruv algus</FL>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {PERM_START_OPTS.map(o=>(
                  <button key={o.key} onClick={()=>setPermStart(o.key)}
                    style={{padding:"9px 12px",borderRadius:5,border:`1px solid ${permStart===o.key?C.priBd:C.b1}`,background:permStart===o.key?C.priBg:"transparent",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:9,transition:"all .12s"}}>
                    <div style={{width:14,height:14,borderRadius:"50%",border:`2px solid ${permStart===o.key?C.pri:C.t3}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {permStart===o.key&&<div style={{width:6,height:6,borderRadius:"50%",background:C.pri}}/>}
                    </div>
                    <span style={{fontSize:12.5,fontWeight:600,color:permStart===o.key?C.priL:C.t1}}>{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {type==="temporary"&&(
            <div>
              <FL>Tööperiood</FL>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:7,alignItems:"center"}}>
                <div><p style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:".5px",textTransform:"uppercase",marginBottom:4}}>Algus</p><FI type="date" value={tempDateStart} onChange={e=>setTempDateStart(e.target.value)}/></div>
                <div style={{paddingTop:16}}><span style={{fontSize:14,color:C.t3,display:"block",textAlign:"center"}}>→</span></div>
                <div><p style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:".5px",textTransform:"uppercase",marginBottom:4}}>Lõpp</p><FI type="date" value={tempDateEnd} onChange={e=>setTempDateEnd(e.target.value)}/></div>
              </div>
              {dayCount>0&&<div style={{marginTop:6,display:"flex",gap:6}}><Pill color="blue" small C={C}>{dayCount} päeva</Pill></div>}
            </div>
          )}
          {type==="gig"&&<GigSchedule/>}
          {/* Tasustamine */}
          <div>
            <FL>Tasustamise viis</FL>
            <div style={{display:"flex",gap:4,marginBottom:8}}>
              {[{key:"day",label:"Päevatasu"},{key:"month",label:"Kuupalk"},{key:"hour",label:"Tunnipalk"}].map(pt=>{const sel=payType===pt.key;return(<button key={pt.key} onClick={()=>setPayType(pt.key)} style={{flex:1,padding:"6px 5px",borderRadius:5,border:`1px solid ${sel?C.priBd:C.b1}`,background:sel?C.priBg:"transparent",color:sel?C.priL:C.t2,fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .12s",textAlign:"center"}}>{pt.label}</button>);})}</div>
            <FI value={formPay} onChange={e=>setFormPay(e.target.value)} placeholder={payType==="month"?"nt 2 800 – 3 200":payType==="hour"?"nt 12":"nt 150"}/>
          </div>
          {/* Masinatüüp */}
          <div>
            <FL>Masinatüüp / haagis</FL>
            <select value={formVeh} onChange={e=>setFormVeh(e.target.value)}
              style={{width:"100%",padding:"8px 11px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.isDark?"#1E293B":C.s2,color:formVeh?C.t1:C.t3,fontSize:12.5,fontFamily:"inherit",outline:"none",cursor:"pointer",appearance:"none",colorScheme:C.isDark?"dark":"light",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394A3B8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 11px center",paddingRight:30}}>
              <option value="" style={{background:C.isDark?"#1E293B":"#fff",color:C.isDark?"#94A3B8":"#64748B"}}>Vali masinatüüp…</option>
              {VEHICLE_TYPES.map(v=>(<option key={v.key} value={v.key} style={{background:C.isDark?"#1E293B":"#fff",color:C.isDark?"#F1F5F9":"#0F172A"}}>{v.icon} {v.label}</option>))}
            </select>
          </div>
          {/* Nõutavad pädevused */}
          <div>
            <FL>Nõutavad pädevused / litsentsid</FL>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {COMPETENCIES.map(comp=>{
                const sel=formComps.has(comp.key);
                return(<button key={comp.key} onClick={()=>{const next=new Set(formComps);sel?next.delete(comp.key):next.add(comp.key);setFormComps(next);}} style={{padding:"5px 10px",borderRadius:4,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${sel?C.tealBd:C.b1}`,background:sel?C.tealBg:"transparent",color:sel?C.teal:C.t3,transition:"all .12s"}}>{comp.icon} {comp.label}</button>);
              })}
            </div>
          </div>
          {/* Marsruut */}
          <div>
            <FL>Marsruut / tööpiirkond</FL>
            <FI value={formRoute} onChange={e=>setFormRoute(e.target.value)} placeholder="nt Tallinn → Tartu"/>
          </div>
        </div>
        <div style={{display:"flex",gap:7,marginTop:11,flexShrink:0}}>
          <button onClick={()=>setStep(1)} style={{padding:"10px 13px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,color:C.t2,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Tagasi</button>
          <button onClick={()=>setStep(3)} style={{flex:1,padding:"11px 0",borderRadius:6,background:C.pri,color:"#fff",fontWeight:700,fontSize:13,border:"none",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            <ZapIcon size={12} color="#fff"/> Edasi — vaata kinnitust
          </button>
        </div>
      </div>
    );
  }

  function Step3(){
    function getScheduleSummary(){
      if(type==="permanent") return PERM_START_OPTS.find(o=>o.key===permStart)?.label||"—";
      if(type==="temporary"){if(!tempDateStart&&!tempDateEnd)return"—";const dc=daysBetween(tempDateStart,tempDateEnd);return`${tempDateStart} → ${tempDateEnd}${dc>0?` (${dc} päeva)`:""}`;}
      if(type==="gig"){if(gigVariant==="A") return gigWeekdays.size>0?`Iganädalaselt: ${[...gigWeekdays].map(k=>WEEKDAYS[WEEKDAY_KEYS.indexOf(k)]).join(", ")}`:"Nädalapäevad valimata";const dates=gigSpecificDates.split(",").filter(s=>s.trim());return dates.length>0?`${dates.length} konkreetset kuupäeva`:"Kuupäevad sisestamata";}
      return"—";
    }
    const confirmedCost=CREDIT_COSTS[type];
    const remainingAfter=credits-confirmedCost;
    const badge=TYPE_BADGE[type]||TYPE_BADGE.permanent;
    const typeLabel=badge.label;
    const regionLabel=REGION_TYPES.find(r=>r.key===formRegion)?.label||"—";
    const rows=[
      {k:"Tüüp",v:typeLabel},
      {k:"Kategooria",v:formCat},
      {k:"Piirkond",v:regionLabel},
      {k:type==="permanent"?"Töö algus":"Ajakava",v:getScheduleSummary()},
      {k:"Marsruut",v:formRoute||"—"},
      {k:"Tasu",v:formPay?`${formPay} €/${payType==="month"?"kuu":payType==="hour"?"tund":"päev"} bruto`:"—"},
      {k:"Masinatüüp",v:(VEHICLE_TYPES.find(v=>v.key===formVeh)?.label)||formVeh||"—"},
      {k:"Nõutavad pädevused",v:[...formComps].map(k=>COMPETENCIES.find(c=>c.key===k)?.label).filter(Boolean).join(", ")||"—"},
    ];
    return(
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={{flex:1,overflowY:"auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
            <span style={{fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:4,background:badge.bg,color:badge.text,border:`1px solid ${badge.bd}`}}>{typeLabel}</span>
            <span style={{fontSize:10.5,color:C.t3}}>kuulutuse kokkuvõte</span>
          </div>
          <div style={{borderRadius:6,border:`1px solid ${C.b1}`,background:C.s2,overflow:"hidden",marginBottom:11}}>
            {rows.map((r,i)=>(<div key={r.k} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"6px 10px",borderBottom:i<rows.length-1?`1px solid ${C.b1}`:"none",gap:10}}><span style={{fontSize:11,color:C.t3,fontWeight:500,flexShrink:0}}>{r.k}</span><span style={{fontSize:11.5,color:C.t1,fontWeight:600,textAlign:"right",wordBreak:"break-word"}}>{r.v}</span></div>))}
          </div>
          <div style={{borderRadius:6,border:`1px solid ${badge.bd}`,background:badge.bg,padding:"11px 13px"}}>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}><ZapIcon size={13} color={badge.text}/><span style={{fontSize:11.5,color:C.t2,flex:1,fontWeight:500}}>Krediidikulu</span></div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"baseline",gap:4}}><span style={{fontWeight:800,fontSize:26,color:badge.text,lineHeight:1}}>{confirmedCost}</span><span style={{fontSize:10,color:badge.text,fontWeight:600}}>KREDIITI</span></div>
              <div style={{textAlign:"right"}}><p style={{fontSize:10,color:C.t3,marginBottom:1}}>Kontol järele</p><p style={{fontSize:13,fontWeight:700,color:C.t1}}>{credits} → <span style={{color:remainingAfter>=0?C.green:C.red}}>{remainingAfter}</span></p></div>
            </div>
          </div>
        </div>
        <div style={{marginTop:11,flexShrink:0}}>
          <button onClick={()=>onPost(type,confirmedCost)} style={{width:"100%",padding:"12px 0",borderRadius:6,fontWeight:700,fontSize:13.5,border:"none",cursor:"pointer",background:C.pri,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"inherit",marginBottom:8}}>
            <ZapIcon size={14} color="#fff"/> Avalda — kuluta {confirmedCost} KREDIITI
          </button>
          <button onClick={()=>setStep(2)} style={{padding:"9px 13px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,color:C.t2,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Tagasi</button>
        </div>
      </div>
    );
  }

  function WalletEmpty(){
    return(
      <div style={{display:"flex",flexDirection:"column",flex:1}}>
        <div style={{flex:1,overflowY:"auto"}}>
          <div style={{width:44,height:44,borderRadius:7,background:C.redBg,border:`1px solid ${C.redBd}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"4px auto 11px",fontSize:20}}>💸</div>
          <p style={{fontWeight:700,fontSize:15,color:C.t1,textAlign:"center",marginBottom:4}}>Rahakott on tühi</p>
          <p style={{fontSize:12,color:C.t2,textAlign:"center",lineHeight:1.5,marginBottom:14}}>Laadi kontole ja jätka koheselt.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:14}}>
            {[{cr:20,price:"20€",per:"1.00 €/kr",popular:false},{cr:55,price:"50€",per:"0.91 €/kr",popular:true},{cr:120,price:"100€",per:"0.83 €/kr",popular:false}].map(p=>(
              <div key={p.cr} onClick={()=>onPost("buy",p.cr)} style={{borderRadius:6,border:`1px solid ${p.popular?C.priBd:C.b1}`,background:p.popular?C.priBg:C.s2,padding:"9px 7px",textAlign:"center",cursor:"pointer",position:"relative",overflow:"hidden"}}>
                {p.popular&&<div style={{position:"absolute",top:0,left:0,right:0,background:C.pri,color:"#fff",fontSize:7.5,fontWeight:700,letterSpacing:".6px",textTransform:"uppercase",padding:"2px 0"}}>Parim</div>}
                <div style={{fontSize:8,color:C.t3,fontWeight:600,textTransform:"uppercase",marginTop:p.popular?13:0,marginBottom:2}}>KREDIITI</div>
                <div style={{fontWeight:800,fontSize:20,color:p.popular?C.priL:C.t1,lineHeight:1,marginBottom:5}}>{p.cr}</div>
                <div style={{fontWeight:700,fontSize:13,color:p.popular?C.priL:C.t1,marginBottom:1}}>{p.price}</div>
                <div style={{fontSize:8.5,color:C.t3}}>{p.per}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:9.5,fontWeight:700,color:C.t3,letterSpacing:".8px",textTransform:"uppercase",marginBottom:7}}>Makseviis</p>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {[{logoKey:"gpay",name:"Google Pay",sub:"Kiire mobiilimakse"},{logoKey:"seb",name:"SEB Internetipank",sub:"Eesti pangalink"},{logoKey:"lhv",name:"LHV Internetipank",sub:"Eesti pangalink"},{logoKey:"coop",name:"Coop Pank",sub:"Eesti pangalink"}].map(p=>(
              <button key={p.name} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"8px 11px",borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,cursor:"pointer",fontFamily:"inherit"}}>
                <BrandLogo logoKey={p.logoKey} size={30} radius={7} dark={C.isDark}/>
                <div style={{textAlign:"left"}}><div style={{fontWeight:600,fontSize:12,color:C.t1}}>{p.name}</div><div style={{fontSize:9.5,color:C.t3,marginTop:1}}>{p.sub}</div></div>
                <span style={{marginLeft:"auto",color:C.t3,fontSize:12}}>›</span>
              </button>
            ))}
          </div>
        </div>
        <button onClick={()=>setStep(1)} style={{width:"100%",marginTop:9,padding:"9px 0",borderRadius:6,border:`1px solid ${C.b2}`,background:C.s2,color:C.t2,fontWeight:600,fontSize:12.5,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>← Tagasi</button>
      </div>
    );
  }

  return(
    <div style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,.75)"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:460,background:C.s1,border:`1px solid ${C.b2}`,borderRadius:"8px 8px 0 0",padding:"11px 15px 20px",display:"flex",flexDirection:"column",maxHeight:"90vh",animation:"sheetUp .26s cubic-bezier(.22,1,.36,1) both"}}>
        <div style={{width:32,height:3,borderRadius:4,background:C.b2,margin:"0 auto 13px",flexShrink:0}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9,flexShrink:0}}>
          <h2 style={{fontWeight:700,fontSize:16,color:C.t1,letterSpacing:"-.3px"}}>Postita kuulutus</h2>
          <button onClick={onClose} style={{width:26,height:26,borderRadius:"50%",background:C.s2,border:`1px solid ${C.b1}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.t2,cursor:"pointer",fontSize:11}}>✕</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:11,padding:"7px 11px",borderRadius:6,background:C.priBg,border:`1px solid ${C.priBd}`,flexShrink:0}}>
          <ZapIcon size={12} color={C.priL}/><span style={{fontSize:11.5,color:C.t2}}>Sinu krediidid:</span>
          <span style={{fontWeight:700,fontSize:13,color:C.priL}}>{credits}</span>
          <span style={{fontSize:9.5,color:C.t3,fontWeight:600,letterSpacing:".4px"}}>KREDIITI</span>
        </div>
        {!noCredits&&<StepRow/>}
        <div style={{flex:1,minHeight:0,display:"flex",flexDirection:"column"}}>
          {noCredits?<WalletEmpty/>:step===1?<Step1/>:step===2?<Step2/>:<Step3/>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   AUTOJUHI PROFIILIMOODUL
═══════════════════════════════════════════════════════════ */
function DriverProfileModal({driverVehTypes,setDriverVehTypes,driverComps,setDriverComps,driverRegion,setDriverRegion,driverSalaryType,setDriverSalaryType,driverSalaryWish,setDriverSalaryWish,onClose,C}){
  return(
    <div style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,.75)"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.s1,border:`1px solid ${C.b2}`,borderRadius:"8px 8px 0 0",padding:"11px 15px 22px",display:"flex",flexDirection:"column",maxHeight:"90vh",animation:"sheetUp .26s cubic-bezier(.22,1,.36,1) both"}}>
        <div style={{width:32,height:3,borderRadius:4,background:C.b2,margin:"0 auto 13px",flexShrink:0}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13,flexShrink:0}}>
          <h2 style={{fontWeight:700,fontSize:16,color:C.t1,letterSpacing:"-.3px"}}>👤 Minu profiil</h2>
          <button onClick={onClose} style={{width:26,height:26,borderRadius:"50%",background:C.s2,border:`1px solid ${C.b1}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.t2,cursor:"pointer",fontSize:11}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:16}}>
          {/* Masinatüübid */}
          <div>
            <label style={{display:"block",fontSize:9,fontWeight:700,color:C.t3,letterSpacing:".8px",textTransform:"uppercase",marginBottom:8}}>Masinatüübid, millega olen nõus sõitma</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {VEHICLE_TYPES.map(v=>{
                const sel=driverVehTypes.has(v.key);
                return(<button key={v.key} onClick={()=>{const next=new Set(driverVehTypes);sel?next.delete(v.key):next.add(v.key);setDriverVehTypes(next);}} style={{padding:"5px 10px",borderRadius:4,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${sel?C.priBd:C.b1}`,background:sel?C.priBg:"transparent",color:sel?C.priL:C.t3,transition:"all .12s"}}>{v.icon} {v.label.split(" /")[0]}</button>);
              })}
            </div>
            <p style={{fontSize:10,color:C.t3,marginTop:7}}>Valitud: <span style={{color:C.priL,fontWeight:700}}>{driverVehTypes.size}</span> tüüpi</p>
          </div>
          {/* Pädevused */}
          <div>
            <label style={{display:"block",fontSize:9,fontWeight:700,color:C.t3,letterSpacing:".8px",textTransform:"uppercase",marginBottom:8}}>Minu pädevused ja litsentsid</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {COMPETENCIES.map(comp=>{
                const sel=driverComps.has(comp.key);
                return(<button key={comp.key} onClick={()=>{const next=new Set(driverComps);sel?next.delete(comp.key):next.add(comp.key);setDriverComps(next);}} style={{padding:"6px 11px",borderRadius:4,fontSize:11.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${sel?C.tealBd:C.b1}`,background:sel?C.tealBg:"transparent",color:sel?C.teal:C.t3,transition:"all .12s"}}>{comp.icon} {comp.label}</button>);
              })}
            </div>
            <p style={{fontSize:10,color:C.t3,marginTop:7}}>Valitud: <span style={{color:C.teal,fontWeight:700}}>{driverComps.size}</span> pädevust</p>
          </div>
          {/* Piirkond */}
          <div>
            <label style={{display:"block",fontSize:9,fontWeight:700,color:C.t3,letterSpacing:".8px",textTransform:"uppercase",marginBottom:8}}>Eelistatud tööpiirkond</label>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {REGION_TYPES.map(r=>{const sel=driverRegion===r.key;return(<button key={r.key} onClick={()=>setDriverRegion(r.key)} style={{padding:"9px 12px",borderRadius:5,border:`1px solid ${sel?C.priBd:C.b1}`,background:sel?C.priBg:"transparent",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:9,transition:"all .12s"}}><span style={{fontSize:14}}>{r.icon}</span><span style={{fontSize:13,fontWeight:600,color:sel?C.priL:C.t2}}>{r.label}</span>{sel&&<span style={{marginLeft:"auto",fontSize:11,color:C.priL}}>✓</span>}</button>);})}</div>
          </div>
          {/* Konfidentsiaalne palgasoov */}
          <div style={{borderRadius:6,border:`1px solid ${C.amberBd}`,background:C.amberBg,padding:"12px 14px"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:11}}>
              <span style={{fontSize:14,flexShrink:0}}>🔒</span>
              <div>
                <p style={{fontWeight:700,fontSize:12.5,color:C.amber}}>Konfidentsiaalne palgasoov</p>
                <p style={{fontSize:10.5,color:C.t3,marginTop:2,lineHeight:1.5}}>Sinu palgasoov on täiesti privaatne — seda ei kuvata avalikult tööandjatele ega külalistele. Nähtav ainult sulle ja administraatorile sobivuse analüüsiks.</p>
              </div>
            </div>
            <label style={{display:"block",fontSize:9,fontWeight:700,color:C.t3,letterSpacing:".8px",textTransform:"uppercase",marginBottom:5}}>Tasustamise eelistus</label>
            <div style={{display:"flex",gap:5,marginBottom:9}}>
              {[{key:"month",label:"Kuupalk"},{key:"day",label:"Päevatasu"},{key:"hour",label:"Tunnipalk"}].map(pt=>{const sel=driverSalaryType===pt.key;return(<button key={pt.key} onClick={()=>setDriverSalaryType(pt.key)} style={{flex:1,padding:"6px 4px",borderRadius:4,border:`1px solid ${sel?C.amberBd:C.b1}`,background:sel?C.amberBg:"transparent",color:sel?C.amber:C.t3,fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .12s",textAlign:"center"}}>{pt.label}</button>);})}</div>
            <label style={{display:"block",fontSize:9,fontWeight:700,color:C.t3,letterSpacing:".8px",textTransform:"uppercase",marginBottom:5}}>{driverSalaryType==="month"?"Soovitud kuupalk (€)":driverSalaryType==="hour"?"Soovitud tunnipalk (€)":"Soovitud päevatasu (€)"}</label>
            <input type="number" value={driverSalaryWish} onChange={e=>setDriverSalaryWish(e.target.value)} placeholder={driverSalaryType==="month"?"nt 3500":driverSalaryType==="hour"?"nt 14":"nt 180"}
              style={{width:"100%",padding:"8px 11px",borderRadius:5,border:`1px solid ${C.amberBd}`,background:C.isDark?"#1E293B":C.s2,color:C.t1,fontSize:13,fontFamily:"inherit",outline:"none",colorScheme:C.isDark?"dark":"light"}}/>
            <p style={{fontSize:9.5,color:C.t3,marginTop:4}}>{driverSalaryType==="month"?"Bruto kuupalk €/kuu":driverSalaryType==="hour"?"Bruto tunnipalk €/h":"Bruto päevatasu €/päev"}</p>
          </div>
        </div>
        <button onClick={onClose} style={{width:"100%",marginTop:13,padding:"11px 0",borderRadius:6,background:C.pri,color:"#fff",fontWeight:700,fontSize:13,border:"none",cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Salvesta muudatused ✓</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADMIN MODAL — GAP-ANALÜÜS + ARVELDUS
═══════════════════════════════════════════════════════════ */
function AdminModal({onClose,driverSalaryType,driverSalaryWish,C}){
  const [activeTab,setActiveTab]=useState("gap");
  const payLabel={month:"/kuu",day:"/päev",hour:"/h"};
  return(
    <div style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.75)",padding:"20px"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:820,background:C.s1,border:`1px solid ${C.b2}`,borderRadius:8,padding:"20px 22px 24px",display:"flex",flexDirection:"column",maxHeight:"88vh",boxShadow:C.shadowMd}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexShrink:0}}>
          <div>
            <h2 style={{fontWeight:700,fontSize:17,color:C.t1,letterSpacing:"-.3px"}}>🛡️ Admin Paneel</h2>
            <p style={{fontSize:11.5,color:C.t3,marginTop:2}}>Konfidentsiaalne — mitte külastajatele nähtav</p>
          </div>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:"50%",background:C.s2,border:`1px solid ${C.b1}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.t2,cursor:"pointer",fontSize:12}}>✕</button>
        </div>
        {/* Sakid */}
        <div style={{display:"flex",gap:5,marginBottom:14,flexShrink:0}}>
          {[{k:"gap",l:"Gap-analüüs"},{k:"billing",l:"Arveldus & Pakett"}].map(t=>{
            const act=activeTab===t.k;
            return(<button key={t.k} onClick={()=>setActiveTab(t.k)} style={{padding:"7px 14px",borderRadius:5,fontSize:12,fontWeight:act?700:500,border:`1px solid ${act?C.priBd:C.b1}`,background:act?C.priBg:"transparent",color:act?C.priL:C.t2,cursor:"pointer",fontFamily:"inherit",transition:"all .13s"}}>{t.l}</button>);
          })}
        </div>

        {activeTab==="gap"&&(
          <>
            <div style={{borderRadius:6,border:`1px solid ${C.amberBd}`,background:C.amberBg,padding:"9px 13px",marginBottom:13,display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
              <span style={{fontSize:14}}>🔒</span>
              <span style={{fontSize:12,color:C.t2,flex:1}}>Sinu (Mart Tamm) konfidentsiaalne palgasoov:</span>
              <span style={{fontWeight:800,fontSize:16,color:C.amber}}>{driverSalaryWish||"—"}</span>
              <span style={{fontSize:10.5,color:C.amber,fontWeight:600}}>€{payLabel[driverSalaryType]}</span>
            </div>
            <div style={{flex:1,overflowY:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead>
                  <tr style={{background:C.s2}}>
                    {["Juht","Kat.","Pädevused","Masin","Pakkumine","Palgasoov","Vahe (GAP)"].map(h=>(<th key={h} style={{padding:"9px 11px",textAlign:"left",fontWeight:700,color:C.t3,fontSize:10,letterSpacing:".5px",textTransform:"uppercase",borderBottom:`1px solid ${C.b1}`,whiteSpace:"nowrap"}}>{h}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {ADMIN_DEMO_DATA.map((r,i)=>{
                    const gap=r.offer-r.wish;
                    const pos=gap>=0;
                    const gapColor=pos?C.green:C.red;
                    const gapBg=pos?C.greenBg:C.redBg;
                    const gapBd=pos?C.greenBd:C.redBd;
                    const veh=VEHICLE_TYPES.find(v=>v.key===r.veh);
                    const pl=payLabel[r.offerType]||"/kuu";
                    return(
                      <tr key={i} style={{borderBottom:`1px solid ${C.b1}`,background:i%2===0?"transparent":C.isDark?"rgba(255,255,255,.012)":"rgba(0,0,0,.012)"}}>
                        <td style={{padding:"9px 11px",color:C.t1,fontWeight:600}}>{r.driver}</td>
                        <td style={{padding:"9px 11px"}}><CatBadge cat={r.cat} C={C} size={20}/></td>
                        <td style={{padding:"9px 11px"}}><CompBadges comps={r.comps} C={C} max={2}/></td>
                        <td style={{padding:"9px 11px",color:C.t2,fontSize:11}}>{veh?.icon} {veh?.label?.split(" /")[0]||r.veh}</td>
                        <td style={{padding:"9px 11px",color:C.green,fontWeight:700}}>{r.offer} €{pl}</td>
                        <td style={{padding:"9px 11px",color:C.amber,fontWeight:700}}><span style={{display:"flex",alignItems:"center",gap:3}}><span style={{fontSize:9}}>🔒</span>{r.wish} €{payLabel[r.wishType]||"/kuu"}</span></td>
                        <td style={{padding:"9px 11px"}}>
                          <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:4,fontWeight:700,fontSize:11.5,background:gapBg,color:gapColor,border:`1px solid ${gapBd}`}}>
                            {pos?"↑ +":"↓ "}{Math.abs(gap)} €{pl}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{marginTop:12,padding:"10px 13px",borderRadius:6,background:C.s2,border:`1px solid ${C.b1}`,display:"flex",gap:18,flexShrink:0,flexWrap:"wrap"}}>
              {[
                {l:"Pakkumine ≥ soov",c:C.green,cnt:ADMIN_DEMO_DATA.filter(r=>r.offer>=r.wish).length},
                {l:"Pakkumine < soov",c:C.red,cnt:ADMIN_DEMO_DATA.filter(r=>r.offer<r.wish).length},
                {l:"Keskmine GAP",c:C.priL,cnt:`${Math.round(ADMIN_DEMO_DATA.reduce((a,r)=>a+(r.offer-r.wish),0)/ADMIN_DEMO_DATA.length)} €`},
              ].map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:s.c,flexShrink:0}}/><span style={{fontSize:11,color:C.t3}}>{s.l}:</span><span style={{fontWeight:700,fontSize:12.5,color:s.c}}>{s.cnt}</span></div>))}
            </div>
          </>
        )}

        {activeTab==="billing"&&(
          <div style={{flex:1,overflowY:"auto"}}>
            {/* Aktiivne pakett */}
            <div style={{borderRadius:7,border:`1px solid ${C.greenBd}`,background:C.greenBg,padding:"14px 16px",marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
                <div style={{width:30,height:30,borderRadius:5,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff"}}>🏆</div>
                <div>
                  <p style={{fontWeight:700,fontSize:14,color:C.green}}>PRO Värbaja pakett aktiivne</p>
                  <p style={{fontSize:11,color:C.t3,marginTop:1}}>Täielik juurdepääs kõigile värbamisvahenditele</p>
                </div>
                <span style={{marginLeft:"auto",fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:4,background:"rgba(52,211,153,0.2)",color:C.green,border:`1px solid ${C.greenBd}`}}>AKTIIVNE</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
                {[{k:"Pakett",v:"PRO Värbaja"},{k:"Hind",v:"89 € / kuu"},{k:"Järgmine makse",v:"28. juuni 2026"}].map(item=>(<div key={item.k} style={{background:C.isDark?"rgba(0,0,0,0.2)":"rgba(255,255,255,0.5)",borderRadius:5,padding:"9px 11px",border:`1px solid ${C.greenBd}`}}><p style={{fontSize:9.5,color:C.t3,fontWeight:600,letterSpacing:".5px",textTransform:"uppercase",marginBottom:3}}>{item.k}</p><p style={{fontWeight:700,fontSize:13,color:C.t1}}>{item.v}</p></div>))}
              </div>
            </div>
            {/* PRO Funktsionaalsus */}
            <div style={{borderRadius:7,border:`1px solid ${C.b1}`,background:C.s2,padding:"13px 15px",marginBottom:14}}>
              <p style={{fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>PRO paketiga saadaval:</p>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {[
                  {icon:"🏆",t:"Kanban-värbajate laud",s:"Kandidaatide liigutamine 3 tulba vahel"},
                  {icon:"🔒",t:"Gap-analüüs",s:"Palkade vahe tööandja vs kandidaat"},
                  {icon:"📊",t:"Täielik statistika",s:"Klikkide, vaatamiste ja kandideerimisd andmed"},
                  {icon:"⚡",t:"Prioriteetsed kuulutused",s:"Kuulutused nimekirja ülaosas"},
                  {icon:"📱",t:"Otseühendus",s:"Kandidaatidega otsekontakt rakenduses"},
                ].map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:9,padding:"8px 10px",borderRadius:5,background:C.s1,border:`1px solid ${C.b1}`}}><span style={{fontSize:14,flexShrink:0}}>{f.icon}</span><div><p style={{fontWeight:600,fontSize:12.5,color:C.t1}}>{f.t}</p><p style={{fontSize:11,color:C.t3,marginTop:1}}>{f.s}</p></div><span style={{marginLeft:"auto",color:C.green,fontSize:12}}>✓</span></div>))}
              </div>
            </div>
            <div style={{display:"flex",gap:7}}>
              <button style={{flex:1,padding:"10px 0",borderRadius:6,background:C.s2,border:`1px solid ${C.b2}`,color:C.t2,fontWeight:600,fontSize:12.5,cursor:"pointer",fontFamily:"inherit"}}>Muuda paketti</button>
              <button style={{flex:1,padding:"10px 0",borderRadius:6,background:C.s2,border:`1px solid ${C.redBd}`,color:C.red,fontWeight:600,fontSize:12.5,cursor:"pointer",fontFamily:"inherit"}}>Tühista tellimus</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
function Toast({msg,C}){
  return(<div style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",zIndex:60,display:"flex",alignItems:"center",gap:9,background:C.s1,border:`1px solid ${C.priBd}`,color:C.t1,fontSize:13,fontWeight:600,padding:"10px 16px",borderRadius:6,boxShadow:C.shadowMd,whiteSpace:"nowrap",animation:"toastIn .2s ease both"}}><ZapIcon size={13} color={C.green}/> {msg}</div>);
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App(){
  const [dark,setDark]=useState(true);
  const [tab,setTab]=useState("gigs");
  const [filterCat,setFilterCat]=useState("ALL");
  const [wOff,setWOff]=useState(0);
  const [selIdx,setSelIdx]=useState(0);
  const [openJob,setOpenJob]=useState(null);
  const [openGig,setOpenGig]=useState(null);
  const [showPost,setShowPost]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [credits,setCredits]=useState(12);
  const [toast,setToast]=useState(null);
  const [isPro,setIsPro]=useState(false);
  // Autojuhi profiil
  const [driverVehTypes,setDriverVehTypes]=useState(new Set(["cold","curtain"]));
  const [driverComps,setDriverComps]=useState(new Set(["code95","digicard"]));
  const [driverRegion,setDriverRegion]=useState("local");
  const [driverSalaryType,setDriverSalaryType]=useState("month");
  const [driverSalaryWish,setDriverSalaryWish]=useState("3400");

  const C=dark?DARK:LIGHT;
  const driverProfile={vehTypes:driverVehTypes,comps:driverComps,region:driverRegion};

  function fire(msg){setToast(msg);setTimeout(()=>setToast(null),2800);}
  function doPost(type,cost){
    if(type==="buy"){setCredits(c=>c+cost);setShowPost(false);fire(`+${cost} KREDIITI lisatud! ⚡`);return;}
    setCredits(c=>c-cost);setShowPost(false);fire("Kuulutus edukalt postitatud ✓");
  }
  function quickApply(title){fire(`Kiirkandideerimine saadetud: ${title} ✓`);}

  const days=(()=>{const ws=wkStart(wOff);const arr=[];for(let i=0;i<7;i++){const d=new Date(ws);d.setDate(d.getDate()+i);arr.push(d);}return arr;})();
  const selDate=days[selIdx];
  const gigs=gigsFor(selDate);
  const visibleJobs=filterCat==="ALL"?JOBS:JOBS.filter(j=>j.cat===filterCat);

  return(
    <div style={{minHeight:"100vh",background:C.page,color:C.t1,fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"background .25s,color .25s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        button,input,textarea,select{font-family:'Plus Jakarta Sans',sans-serif}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{border-radius:4px;background:#253350}
        @media(max-width:768px){.aj-nav{display:none!important}.aj-post-desktop{display:none!important}}
        @media(max-width:1024px){.aj-sidebar{display:none!important}}
      `}</style>

      {/* ══ HEADER ══ */}
      <header style={{position:"sticky",top:0,zIndex:40,background:C.headerBg,borderBottom:`1px solid ${C.b1}`,transition:"background .25s"}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:"0 20px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:54,gap:10}}>
            {/* Brand */}
            <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0,userSelect:"none"}}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
                <path d="M6 26L13 6H9L3 26H6Z" fill={dark?"#64748B":"#94A3B8"}/>
                <path d="M16 6L23 26H20L15.5 13L13.5 18L12.5 15L16 6Z" fill={C.pri}/>
                <circle cx="16" cy="6" r="2" fill={C.pri}/>
              </svg>
              <div style={{display:"flex",alignItems:"baseline",gap:0}}>
                <span style={{fontWeight:700,fontSize:19,color:C.t1,letterSpacing:"-.4px",lineHeight:1}}>autojuhid</span>
                <span style={{fontWeight:600,fontSize:19,color:C.pri,letterSpacing:"-.4px",lineHeight:1}}>.ee</span>
              </div>
            </div>
            {/* Nav */}
            <nav className="aj-nav" style={{display:"flex",gap:2}}>
              {["Tööpakkumised","Koolitused","Uudised","KKK"].map(item=>(<button key={item} style={{padding:"7px 13px",fontSize:13,fontWeight:500,color:C.t3,background:"none",border:"none",cursor:"pointer",borderRadius:5}}>{item}</button>))}
            </nav>
            {/* Right */}
            <div style={{display:"flex",gap:7,alignItems:"center"}}>
              <CreditsDisplay credits={credits} C={C} onClick={()=>setShowPost(true)}/>
              {/* PRO indikátor */}
              {isPro&&<span style={{fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:4,background:C.greenBg,color:C.green,border:`1px solid ${C.greenBd}`}}>PRO</span>}
              <button onClick={()=>setDark(d=>!d)} style={{width:34,height:34,borderRadius:5,background:C.s2,border:`1px solid ${C.b1}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.t2,cursor:"pointer",fontSize:15,flexShrink:0}}>{dark?"☀️":"🌙"}</button>
              <button style={{width:34,height:34,borderRadius:5,background:C.s2,border:`1px solid ${C.b1}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.t2,cursor:"pointer",flexShrink:0}}>🔔</button>
              <button onClick={()=>setShowProfile(true)} style={{width:34,height:34,borderRadius:5,background:C.s2,border:`1px solid ${C.b1}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.t2,cursor:"pointer",fontSize:14,flexShrink:0}} title="Minu profiil">👤</button>
              <button onClick={()=>setShowAdmin(true)} style={{width:34,height:34,borderRadius:5,background:C.purpleBg,border:`1px solid ${C.purpleBd}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.purple,cursor:"pointer",fontSize:13,flexShrink:0}} title="Admin vaade">🛡️</button>
              <button className="aj-post-desktop" onClick={()=>setShowPost(true)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:6,background:C.pri,color:"#fff",fontWeight:700,fontSize:13,border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>
                + Postita kuulutus
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <div style={{background:C.s1,borderBottom:`1px solid ${C.b1}`,transition:"background .25s"}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:"13px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div>
            <h1 style={{fontWeight:700,fontSize:18,color:C.t1,letterSpacing:"-.3px"}}>Tere tulemast, Mart 👋</h1>
            <p style={{fontSize:12.5,color:C.t2,marginTop:2}}>
              Sinu jaoks on täna{" "}
              <span style={{color:C.priL,fontWeight:600}}>
                {tab==="gigs"?`${gigs.length} tööampsu ${selDate.getDate()}. ${MOS_S[selDate.getMonth()]}.`:tab==="temp"?`${TEMP_JOBS.length} tähtajalist tööpakkumist.`:"3 uut püsivat pakkumist."}
              </span>
            </p>
          </div>
          <div style={{display:"flex",gap:9}}>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:C.t3,fontSize:13}}>🔍</span>
              <input placeholder={tab==="gigs"?"Otsi tööampse...":tab==="temp"?"Otsi tähtajalisi...":"Otsi kuulutusi..."} style={{paddingLeft:34,paddingRight:13,paddingTop:8,paddingBottom:8,borderRadius:6,border:`1px solid ${C.b2}`,background:C.isDark?"#1E293B":C.s2,color:C.t1,fontSize:12.5,outline:"none",width:210,colorScheme:C.isDark?"dark":"light"}}/>
            </div>
            <button style={{display:"flex",alignItems:"center",gap:5,border:`1px solid ${C.b1}`,background:C.s2,color:C.t2,fontSize:12.5,fontWeight:500,padding:"8px 13px",borderRadius:6,cursor:"pointer"}}>⚙ Filtreeri</button>
          </div>
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div style={{background:C.tabBg,borderBottom:`1px solid ${C.b1}`}}>
        <div style={{maxWidth:1152,margin:"0 auto",padding:"7px 20px",display:"flex",gap:4}}>
          {[{k:"jobs",l:"Püsiv Töö",n:JOBS.length},{k:"temp",l:"Tähtajaline Töö",n:TEMP_JOBS.length},{k:"gigs",l:"Tööampsud",n:GIGS.length}].map(({k,l,n})=>{
            const act=tab===k;
            return(<button key={k} onClick={()=>{setTab(k);setOpenJob(null);setOpenGig(null);setFilterCat("ALL");}}
              style={{display:"flex",alignItems:"center",gap:7,padding:"7px 14px",borderRadius:6,fontSize:13,fontWeight:act?700:500,color:act?C.priL:C.t2,background:act?C.priBg:"transparent",border:`1px solid ${act?C.priBd:C.b1}`,cursor:"pointer",transition:"all .13s",position:"relative"}}>
              {l}
              <span style={{fontSize:10.5,fontWeight:700,padding:"1px 6px",borderRadius:4,background:act?C.pri:C.isDark?"#1E293B":"#E2E8F0",color:act?"#fff":C.isDark?"#CBD5E1":"#475569"}}>{n}</span>
              {k==="gigs"&&!act&&(<span style={{width:5,height:5,borderRadius:"50%",background:C.red,position:"absolute",top:8,right:14,animation:"pulse 2s ease-in-out infinite"}}/>)}
            </button>);
          })}
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div style={{maxWidth:1152,margin:"0 auto",padding:"14px 20px",display:"flex",gap:16}}>
        {/* FEED */}
        <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:9}}>
          <TopPremiumBanner ad={tab==="jobs"?TOP_BANNER_JOBS:tab==="temp"?TOP_BANNER_TEMP:TOP_BANNER_GIGS} C={C} dark={dark}/>

          {/* ── PÜSIV TÖÖ ── */}
          {tab==="jobs"&&(
            <>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:5}}>
                  {["ALL","B","C","CE"].map(fc=>{
                    const act=filterCat===fc;const cs=fc!=="ALL"?C[`cat${fc}`]:null;
                    return(<button key={fc} onClick={()=>setFilterCat(fc)} style={{padding:"5px 12px",borderRadius:4,fontSize:11.5,fontWeight:700,border:`1px solid ${act?(fc==="ALL"?C.priBd:cs.r):C.b1}`,background:act?(fc==="ALL"?C.priBg:cs.bg):"transparent",color:act?(fc==="ALL"?C.priL:cs.t):C.t2,cursor:"pointer",transition:"all .11s"}}>{fc==="ALL"?"Kõik":fc}</button>);
                  })}
                </div>
                <span style={{fontSize:11.5,color:C.t3,fontWeight:500}}>{visibleJobs.length} kuulutust</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {visibleJobs.map((job,i)=>(
                  <div key={job.id}>
                    <JobCard job={job} open={openJob===job.id} C={C} dark={dark} profile={driverProfile}
                      onToggle={()=>setOpenJob(openJob===job.id?null:job.id)}
                      onApply={()=>{setOpenJob(null);fire("Kandideerimine saadetud ✓");}}
                      onQuickApply={()=>{setOpenJob(null);quickApply(job.title);}}/>
                    {i===2&&<div style={{marginTop:9}}><InFeedAd ad={INFEED_AD_JOBS} C={C} dark={dark}/></div>}
                  </div>
                ))}
              </div>
              {/* PRO Kanban */}
              <ProKanban C={C} isPro={isPro} onActivate={()=>setIsPro(true)}/>
            </>
          )}

          {/* ── TÄHTAJALINE TÖÖ ── */}
          {tab==="temp"&&(
            <>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:5}}>
                  {["ALL","B","C","CE"].map(fc=>{
                    const act=filterCat===fc;const cs=fc!=="ALL"?C[`cat${fc}`]:null;
                    return(<button key={fc} onClick={()=>setFilterCat(fc)} style={{padding:"5px 12px",borderRadius:4,fontSize:11.5,fontWeight:700,border:`1px solid ${act?(fc==="ALL"?C.priBd:cs.r):C.b1}`,background:act?(fc==="ALL"?C.priBg:cs.bg):"transparent",color:act?(fc==="ALL"?C.priL:cs.t):C.t3,cursor:"pointer",transition:"all .11s"}}>{fc==="ALL"?"Kõik":fc}</button>);
                  })}
                </div>
                <span style={{fontSize:11.5,color:C.t3,fontWeight:500}}>{(filterCat==="ALL"?TEMP_JOBS:TEMP_JOBS.filter(j=>j.cat===filterCat)).length} kuulutust</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {(filterCat==="ALL"?TEMP_JOBS:TEMP_JOBS.filter(j=>j.cat===filterCat)).map((job,i)=>(
                  <div key={job.id}>
                    <TempJobCard job={job} open={openJob===job.id} C={C} dark={dark} profile={driverProfile}
                      onToggle={()=>setOpenJob(openJob===job.id?null:job.id)}
                      onApply={()=>{setOpenJob(null);fire("Kandideerimine saadetud ✓");}}
                      onQuickApply={()=>{setOpenJob(null);quickApply(job.title);}}/>
                    {i===1&&<div style={{marginTop:9}}><InFeedAd ad={INFEED_AD_JOBS} C={C} dark={dark}/></div>}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── TÖÖAMPSUD ── */}
          {tab==="gigs"&&(
            <>
              <div style={{borderRadius:7,border:`1px solid ${C.amberBd}`,background:C.amberBg,padding:"10px 14px",display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:28,height:28,borderRadius:5,background:C.amberBg,border:`1px solid ${C.amberBd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13}}>⚡</div>
                <div><p style={{fontWeight:700,fontSize:12.5,color:C.amber}}>Tööampsud</p><p style={{fontSize:11.5,color:C.t2,marginTop:1,lineHeight:1.4}}>Ühe päeva asendusjuhid. Bruto päevatasu, kokkulepe samal päeval.</p></div>
              </div>
              {/* Nädalanavigaator */}
              <div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11}}>
                  <span style={{fontWeight:700,fontSize:12.5,color:C.t2}}>{MONS[days[0].getMonth()]} {days[0].getFullYear()} — nädal {wkNum(days[0])}</span>
                  <div style={{display:"flex",gap:4}}>
                    {["‹","›"].map((ch,i)=>(<button key={ch} onClick={()=>{setWOff(w=>w+(i?1:-1));setSelIdx(0);setOpenGig(null);}} style={{width:27,height:27,borderRadius:5,border:`1px solid ${C.b2}`,background:C.s2,color:C.t3,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{ch}</button>))}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:5,marginBottom:16}}>
                  {days.map((d,i)=>{
                    const gs=gigsFor(d);const hu=gs.some(g=>g.urgent);
                    let bg=C.s2,border=`1px solid ${C.b1}`,numColor=C.t1;
                    if(i===selIdx){bg=C.priBg;border=`1.5px solid ${C.pri}`;numColor=C.priL;}
                    else if(hu){bg=C.redBg;border=`1px solid ${C.redBd}`;numColor=C.red;}
                    else if(gs.length){border=`1px solid ${C.priBd}`;}
                    const dotMap={B:C.catB.t,C:C.catC.t,CE:C.catCE.t};
                    return(<div key={i} onClick={()=>{setSelIdx(i);setOpenGig(null);}} style={{borderRadius:5,border,background:bg,padding:"7px 3px",textAlign:"center",cursor:"pointer",transition:"all .13s"}}>
                      <div style={{fontSize:8,color:C.t3,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",marginBottom:2}}>{DAYS_LBL[d.getDay()]}</div>
                      <div style={{fontWeight:700,fontSize:16,color:numColor,lineHeight:1}}>{d.getDate()}</div>
                      <div style={{display:"flex",gap:2,justifyContent:"center",marginTop:3,minHeight:5}}>
                        {gs.slice(0,3).map((g,j)=><div key={j} style={{width:4,height:4,borderRadius:"50%",background:g.urgent?C.red:dotMap[g.cat]}}/>)}
                      </div>
                    </div>);
                  })}
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <span style={{fontSize:10.5,fontWeight:700,color:C.t3,letterSpacing:"1.2px",textTransform:"uppercase"}}>{selDate.getDate()}. {MOS_S[selDate.getMonth()]} · tööampsud</span>
                {gigs.length>0&&<span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4,background:C.priBg,color:C.priL,border:`1px solid ${C.priBd}`}}>{gigs.length} avatud</span>}
              </div>
              {gigs.length===0?(
                <div style={{borderRadius:8,border:`1px solid ${C.b1}`,background:C.s1,padding:28,textAlign:"center"}}>
                  <p style={{fontSize:28,marginBottom:9}}>📅</p>
                  <p style={{color:C.t3,fontWeight:600,fontSize:13}}>Sel päeval pole tööampse</p>
                  <p style={{color:C.t3,fontSize:11,marginTop:3}}>Vali teine kuupäev kalenderribalt</p>
                </div>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:9}}>
                  {gigs.map((gig,i)=>(
                    <div key={gig.id}>
                      <GigCard gig={gig} open={openGig===gig.id} C={C} dark={dark} profile={driverProfile}
                        onToggle={()=>setOpenGig(openGig===gig.id?null:gig.id)}
                        onApply={()=>{setOpenGig(null);fire("Kandideerimine saadetud ✓");}}
                        onQuickApply={()=>{setOpenGig(null);quickApply(gig.title);}}/>
                      {i===1&&<div style={{marginTop:9}}><InFeedAd ad={INFEED_AD_GIGS} C={C} dark={dark}/></div>}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ══ SIDEBAR ══ */}
        <aside className="aj-sidebar" style={{width:256,flexShrink:0,display:"flex",flexDirection:"column",gap:10}}>
          <StatsWidget credits={credits} C={C}/>
          <FreeDaysWidget C={C}/>
          {/* Pädevuste kiirvaade */}
          <div style={{background:C.s1,borderRadius:8,border:`1px solid ${C.b1}`,padding:11}}>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
              <div style={{width:26,height:26,borderRadius:5,background:C.tealBg,border:`1px solid ${C.tealBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>📋</div>
              <p style={{fontWeight:700,fontSize:13,color:C.t1}}>Minu pädevused</p>
              <button onClick={()=>setShowProfile(true)} style={{marginLeft:"auto",fontSize:11,color:C.priL,fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>Muuda →</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
              {COMPETENCIES.map(comp=>{
                const has=driverComps.has(comp.key);
                return(<span key={comp.key} style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:4,background:has?C.tealBg:C.s2,color:has?C.teal:C.t3,border:`1px solid ${has?C.tealBd:C.b1}`,opacity:has?1:.55}}>{comp.icon} {comp.label}</span>);
              })}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {driverVehTypes.size>0&&(
                <div style={{width:"100%"}}>
                  <p style={{fontSize:9,color:C.t3,fontWeight:700,letterSpacing:".6px",textTransform:"uppercase",marginBottom:5}}>Masinatüübid</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                    {[...driverVehTypes].slice(0,4).map(k=>{const v=VEHICLE_TYPES.find(x=>x.key===k);return v?<span key={k} style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:C.priBg,color:C.priL,border:`1px solid ${C.priBd}`,fontWeight:600}}>{v.icon} {v.label.split(" /")[0]}</span>:null;})}
                    {driverVehTypes.size>4&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:C.s2,color:C.t3,border:`1px solid ${C.b1}`}}>+{driverVehTypes.size-4}</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
          <PartnersWidget C={C} dark={dark}/>
          <TrainingWidget C={C}/>
        </aside>
      </div>

      {showPost&&<PostModal credits={credits} onClose={()=>setShowPost(false)} onPost={doPost} C={C}/>}
      {showProfile&&(
        <DriverProfileModal
          driverVehTypes={driverVehTypes} setDriverVehTypes={setDriverVehTypes}
          driverComps={driverComps} setDriverComps={setDriverComps}
          driverRegion={driverRegion} setDriverRegion={setDriverRegion}
          driverSalaryType={driverSalaryType} setDriverSalaryType={setDriverSalaryType}
          driverSalaryWish={driverSalaryWish} setDriverSalaryWish={setDriverSalaryWish}
          onClose={()=>setShowProfile(false)} C={C}
        />
      )}
      {showAdmin&&(
        <AdminModal onClose={()=>setShowAdmin(false)} driverSalaryType={driverSalaryType} driverSalaryWish={driverSalaryWish} C={C}/>
      )}
      {toast&&<Toast msg={toast} C={C}/>}
    </div>
  );
}