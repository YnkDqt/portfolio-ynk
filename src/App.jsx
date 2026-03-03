import { useState, useEffect } from "react";

const C = {
  bg:"#fdf8f3", bgAlt:"#f7f0e6", bgDark:"#2a1810",
  cream:"#faf5ee", creamDark:"#f0e8dc", white:"#ffffff",
  primary:"#b85c35", primaryLight:"#d4956a", primaryPale:"#fdf0ec",
  olive:"#4a5a38", olivePale:"#e8eede",
  text:"#2a1810", textMid:"#6b5040", muted:"#b0987e", mutedLight:"#c8b5a0",
  border:"#ecddd0", borderLight:"#f5ede4",
};
const NAVS = ["expertise","projets","articles","contact"];
const NAVLABELS = { expertise:"Expertise", projets:"Projets", articles:"Articles", contact:"Contact" };
const ARTICLES = [
  { id:1, cat:"Analyse", date:"2 fév. 2026",
    title:"Géopolitique et résilience – Intégrer l'instabilité dans les choix structurels",
    excerpt:"En 2026, les tensions géopolitiques grandissantes mettent sous pression les équilibres sur lesquels reposent de nombreuses organisations. Sanctions, extraterritorialité du droit, dépendances technologiques : la géopolitique s'impose comme facteur opérationnel de résilience.",
    tags:["Géopolitique","Résilience","Souveraineté","Continuité"],
    url:"https://yannickdequant.wordpress.com/2026/02/02/geopolitique-et-resilience-integrer-linstabilite-dans-les-choix-structurels/" },
  { id:2, cat:"Rétrospective", date:"6 jan. 2026",
    title:"Résilience organisationnelle – Les enseignements clés de 2025 pour préparer 2026",
    excerpt:"Panne électrique en Espagne, crashs Cloudflare, explosion des cyberattaques, durcissement réglementaire DORA, NIS2, CRA. Rétrospective sur les perturbations de 2025 et les apprentissages concrets à en tirer pour l'année à venir.",
    tags:["Résilience","DORA","NIS2","Cybersécurité","IA"],
    url:"https://yannickdequant.wordpress.com/2026/01/06/resilience-organisationnelle-les-enseignements-cles-de-2025-pour-preparer-2026/" },
];
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'DM Sans',sans-serif; background:#fdf8f3; color:#2a1810; -webkit-font-smoothing:antialiased; line-height:1.65; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  .au{animation:fadeUp .7s ease both}
  .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}
  .hl{transition:transform .22s,box-shadow .22s}
  .hl:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(80,40,20,.12)}
  .lc:hover{color:#b85c35!important}
  @media(max-width:768px){.mh{display:none!important}.m1{grid-template-columns:1fr!important}.mp{padding:28px 20px!important}}
`;
function Ey({ children, light, style }) {
  return <div style={{ fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:500,
    color:light?"rgba(255,255,255,0.35)":"#b85c35", display:"flex", alignItems:"center", gap:8, ...style }}>{children}</div>;
}
function Btn({ children, onClick, href, outline, style, sm }) {
  const base = { display:"inline-flex", alignItems:"center", gap:6,
    padding:sm?"11px 22px":"13px 28px", borderRadius:24, cursor:"pointer",
    fontFamily:"'DM Sans',sans-serif", fontSize:sm?14:15, fontWeight:500,
    letterSpacing:"0.02em", textDecoration:"none", whiteSpace:"nowrap", transition:"all .2s",
    background:outline?"transparent":"#b85c35", color:outline?"#b85c35":"#fff",
    border:outline?"1.5px solid #b85c35":"none", ...style };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={base}>{children}</a>;
  return <button onClick={onClick} style={base}>{children}</button>;
}
function Tag({ children, dark }) {
  return <span style={{ padding:"5px 12px", borderRadius:3, fontSize:12, fontWeight:500,
    background:dark?"rgba(255,255,255,0.08)":"#fdf0ec", color:dark?"rgba(255,255,255,0.6)":"#b85c35" }}>{children}</span>;
}
function Card({ children, style, className }) {
  return <div className={className} style={{ background:"#fff", border:"1px solid #ecddd0", borderRadius:8, padding:32, ...style }}>{children}</div>;
}
function Nav({ view, setView }) {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => { const f=()=>setSc(window.scrollY>40); window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f); },[]);
  const go = id => { setOp(false); setView(id); window.scrollTo({top:0,behavior:"smooth"}); };
  return (
    <>
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,
        background:sc?"rgba(253,248,243,.96)":"transparent", borderBottom:sc?"1px solid #ecddd0":"none",
        backdropFilter:sc?"blur(14px)":"none", transition:"all .3s" }}>
        <div style={{ maxWidth:1180,margin:"0 auto",padding:"0 40px",height:72,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div onClick={()=>go("accueil")} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:"#b85c35" }} />
            <span style={{ fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:400,color:"#2a1810" }}>Yannick Dequant</span>
          </div>
          <div className="mh" style={{ display:"flex",alignItems:"center",gap:32 }}>
            {NAVS.map(n=>(
              <span key={n} onClick={()=>go(n)} className="lc"
                style={{ fontSize:15,cursor:"pointer",transition:"color .18s",color:view===n?"#b85c35":"#6b5040",fontWeight:view===n?500:400 }}>
                {NAVLABELS[n]}
              </span>
            ))}
            <Btn onClick={()=>go("contact")} sm>Me contacter</Btn>
          </div>
          <button onClick={()=>setOp(!op)} style={{ background:"none",border:"none",cursor:"pointer",flexDirection:"column",gap:5,padding:4,display:"none" }} className="mbg">
            {[0,1,2].map(i=>(
              <div key={i} style={{ width:24,height:2,background:"#2a1810",transition:"all .22s",
                transform:op?(i===0?"rotate(45deg) translate(4.5px,4.5px)":i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"scaleX(0)"):"none",
                opacity:op&&i===1?0:1 }} />
            ))}
          </button>
        </div>
      </nav>
      <div style={{ position:"fixed",top:72,left:0,right:0,bottom:0,zIndex:199,background:"#faf5ee",padding:"40px",display:"flex",flexDirection:"column",
        transform:op?"translateX(0)":"translateX(100%)",transition:"transform .28s ease" }}>
        {["accueil",...NAVS].map(n=>(
          <div key={n} onClick={()=>go(n)} style={{ padding:"22px 0",borderBottom:"1px solid #ecddd0",
            fontFamily:"'Fraunces',serif",fontSize:34,fontWeight:300,color:view===n?"#b85c35":"#2a1810",cursor:"pointer" }}>
            {n==="accueil"?"Accueil":NAVLABELS[n]}
          </div>
        ))}
      </div>
      <style>{`.mbg{display:none!important}@media(max-width:768px){.mbg{display:flex!important}}`}</style>
    </>
  );
}
function Hero({ setView }) {
  return (
    <section style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",paddingTop:72,background:"#fdf8f3" }}>
      <div style={{ maxWidth:1180,margin:"0 auto",padding:"64px 40px 40px",width:"100%" }}>
        <div className="au" style={{ height:3,marginBottom:56,borderRadius:2,
          background:"linear-gradient(90deg,#b85c35 0%,#d4956a 55%,#f0e8dc 100%)" }} />
        <div style={{ display:"grid",gridTemplateColumns:"1.45fr 1fr",gap:60,alignItems:"start" }} className="m1">
          <div>
            <Ey style={{ marginBottom:20 }} className="au d1">Senior Business Analyst</Ey>
            <h1 className="au d2" style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(44px,5.5vw,72px)",fontWeight:300,lineHeight:1.05,color:"#2a1810",marginBottom:28,letterSpacing:"-0.01em" }}>
              Résilience<br/>organisationnelle<br/>& <em style={{ fontStyle:"italic",color:"#b85c35" }}>continuité</em><br/>d'activité.
            </h1>
            <p className="au d3" style={{ fontSize:18,color:"#6b5040",lineHeight:1.85,maxWidth:460,marginBottom:40 }}>
              Analyse des dépendances critiques, plans de continuité d'activité, déploiement ServiceNow BCM. Certifié CBCI. Mission longue durée à la CDPQ depuis 2023.
            </p>
            <div className="au d4" style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
              <Btn onClick={()=>setView("expertise")}>Mon expertise →</Btn>
              <Btn outline onClick={()=>setView("contact")}>Me contacter</Btn>
            </div>
            <div className="au d4" style={{ display:"flex",gap:44,marginTop:56,paddingTop:32,borderTop:"1px solid #ecddd0" }}>
              {[["7+","Ans d'expérience"],["CBCI","Certifié · The BCI"],["CDPQ","Mission en cours"],["22301","ISO maîtrisé"]].map(([v,l])=>(
                <div key={l}>
                  <div style={{ fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:400,color:"#2a1810",lineHeight:1,marginBottom:7 }}>{v}</div>
                  <div style={{ fontSize:13,color:"#b0987e" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="au d3" style={{ display:"flex",flexDirection:"column",gap:12,paddingTop:6 }}>
            <div style={{ fontSize:12,color:"#b0987e",letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:4 }}>Dernières analyses</div>
            {ARTICLES.map((a,i)=>(
              <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" className="hl"
                style={{ background:i===0?"#b85c35":"#fff",border:`1px solid ${i===0?"#b85c35":"#ecddd0"}`,
                  borderRadius:7,padding:"16px 18px",textDecoration:"none",boxShadow:"0 1px 6px rgba(80,40,20,.06)" }}>
                <div style={{ fontSize:11,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:7,
                  color:i===0?"rgba(255,255,255,.55)":"#b0987e" }}>{a.cat}</div>
                <div style={{ fontFamily:"'Fraunces',serif",fontSize:17,lineHeight:1.35,marginBottom:7,
                  color:i===0?"#fff":"#2a1810" }}>{a.title}</div>
                <div style={{ fontSize:13,color:i===0?"rgba(255,255,255,.45)":"#c8b5a0" }}>{a.date}</div>
              </a>
            ))}
            <div style={{ background:"#f7f0e6",border:"1px solid #ecddd0",borderRadius:7,padding:"14px 18px" }}>
              <div style={{ fontSize:11,color:"#b0987e",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:6 }}>Certification</div>
              <div style={{ fontFamily:"'Fraunces',serif",fontSize:17,color:"#2a1810",lineHeight:1.35 }}>CBCI · The BCI · 2024</div>
              <div style={{ fontSize:13,color:"#c8b5a0",marginTop:6 }}>ISO 22301 · ServiceNow BCM</div>
            </div>
            <div onClick={()=>setView("articles")} style={{ fontSize:14,color:"#b85c35",fontWeight:500,textAlign:"right",cursor:"pointer",marginTop:2 }}>
              Voir tous les articles →
            </div>
          </div>
        </div>
        <div style={{ textAlign:"center",marginTop:64,opacity:.35 }}>
          <div style={{ fontSize:11,color:"#b0987e",letterSpacing:"0.12em",marginBottom:8 }}>DÉCOUVRIR</div>
          <div style={{ fontSize:20,color:"#b0987e",animation:"pulse 1.8s ease infinite" }}>↓</div>
        </div>
      </div>
    </section>
  );
}
function SectionAbout({ setView }) {
  const p=[
    { period:"2023 →",org:"Indépendant — Portage salarial",role:"Business Analyst Senior · Résilience",cur:true },
    { period:"2022–2025",org:"CGI Montréal",role:"Business Analyst Senior" },
    { period:"2019–2022",org:"CGI Paris",role:"Consultant SIRH" },
  ];
  return (
    <section style={{ background:"#faf5ee",padding:"110px 40px" }}>
      <div style={{ maxWidth:1180,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:80,alignItems:"start" }} className="m1">
          <div style={{ position:"sticky",top:90 }}>
            <Ey style={{ marginBottom:18 }}>À propos</Ey>
            <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(40px,4.5vw,58px)",fontWeight:300,color:"#2a1810",lineHeight:1.1,marginBottom:28 }}>Yannick<br/>Dequant</h2>
            <p style={{ fontSize:17,color:"#6b5040",lineHeight:1.9,marginBottom:32 }}>
              Consultant senior en résilience organisationnelle, passionné de systémique et de prospective. Je construis des organisations capables d'absorber les chocs et de se transformer face à l'incertitude.
            </p>
            <Btn outline onClick={()=>setView("expertise")} sm>Voir mon expertise</Btn>
          </div>
          <div>
            <div style={{ marginBottom:52 }}>
              <div style={{ fontSize:12,color:"#b0987e",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:18,paddingBottom:14,borderBottom:"1px solid #ecddd0" }}>Vision</div>
              <p style={{ fontSize:17,color:"#2a1810",lineHeight:1.9,marginBottom:22 }}>
                Chaque démarche de résilience est unique. Elle nécessite une écoute attentive pour comprendre les enjeux, les objectifs et les contraintes — puis une construction rigoureuse qui ancre la résilience dans le fonctionnement quotidien de l'organisation, pas seulement dans des plans de secours.
              </p>
              <div style={{ display:"flex",gap:9,flexWrap:"wrap" }}>
                {["Adaptabilité","Systémique","Prospective","Transparence","Rigueur"].map(q=><Tag key={q}>{q}</Tag>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize:12,color:"#b0987e",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:22,paddingBottom:14,borderBottom:"1px solid #ecddd0" }}>Parcours</div>
              {p.map((x,i)=>(
                <div key={i} style={{ display:"grid",gridTemplateColumns:"110px 1fr",gap:24,padding:"22px 0",
                  borderBottom:i<p.length-1?"1px solid #f5ede4":"none",alignItems:"start" }}>
                  <div style={{ fontSize:14,color:"#b0987e",paddingTop:3 }}>{x.period}</div>
                  <div>
                    <div style={{ fontSize:14,color:"#b0987e",marginBottom:5 }}>{x.org}</div>
                    <div style={{ fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:400,color:"#2a1810",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap" }}>
                      {x.role}
                      {x.cur&&<span style={{ padding:"3px 9px",background:"#e8eede",color:"#4a5a38",fontSize:10,fontWeight:600,borderRadius:2,textTransform:"uppercase",letterSpacing:"0.06em" }}>En cours</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:28 }}><Btn outline onClick={()=>setView("projets")} sm>Voir mes projets →</Btn></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function SectionExpertise({ setView }) {
  const d=[
    { icon:"◉",title:"Continuité d'activité",desc:"BIA, plans PCA/BCP, tests et exercices de crise. Conformité ISO 22301." },
    { icon:"◈",title:"Analyse des risques",desc:"Cartographie des dépendances critiques, exposition géopolitique, risques systémiques." },
    { icon:"◆",title:"ServiceNow BCM",desc:"Paramétrage et déploiement expert de l'outil pour structurer la résilience." },
    { icon:"◇",title:"IA & Résilience",desc:"Veille informationnelle, détection d'anomalies, simulation de scénarios de crise." },
    { icon:"○",title:"Gestion de crise",desc:"Cellules de crise, playbooks, exercices de simulation, post-mortems." },
    { icon:"△",title:"Formation & gouvernance",desc:"Sensibilisation des équipes, KPIs de maturité, culture de résilience organisationnelle." },
  ];
  return (
    <section style={{ background:"#fdf8f3",padding:"110px 40px" }}>
      <div style={{ maxWidth:1180,margin:"0 auto" }}>
        <div style={{ marginBottom:56,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:20 }}>
          <div>
            <Ey style={{ marginBottom:16 }}>Expertise</Ey>
            <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(36px,4vw,52px)",fontWeight:300,color:"#2a1810",lineHeight:1.1 }}>Domaines<br/>d'intervention</h2>
          </div>
          <Btn outline onClick={()=>setView("expertise")} sm>Voir en détail →</Btn>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20 }}>
          {d.map((x,i)=>(
            <Card key={i} className="hl" style={{ padding:"28px 30px" }}>
              <div style={{ fontSize:22,color:"#b85c35",marginBottom:16 }}>{x.icon}</div>
              <div style={{ fontFamily:"'Fraunces',serif",fontSize:23,fontWeight:400,color:"#2a1810",marginBottom:12,lineHeight:1.2 }}>{x.title}</div>
              <p style={{ fontSize:16,color:"#6b5040",lineHeight:1.85 }}>{x.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
function SectionArticles({ setView }) {
  return (
    <section style={{ background:"#2a1810",padding:"110px 40px" }}>
      <div style={{ maxWidth:1180,margin:"0 auto" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:52,flexWrap:"wrap",gap:20 }}>
          <div>
            <Ey light style={{ marginBottom:16 }}>Analyses & Réflexions</Ey>
            <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(36px,4vw,52px)",fontWeight:300,color:"#f0e8dc",lineHeight:1.1 }}>Dernières<br/>publications</h2>
          </div>
          <Btn onClick={()=>setView("articles")}>Tous les articles →</Btn>
        </div>
        {ARTICLES.map((a,i)=>(
          <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" style={{
            display:"grid",gridTemplateColumns:"90px 1fr 36px",gap:32,padding:"32px 0",
            borderBottom:"1px solid rgba(255,255,255,.07)",textDecoration:"none",alignItems:"center",transition:"padding-left .2s" }}
            onMouseEnter={e=>e.currentTarget.style.paddingLeft="12px"}
            onMouseLeave={e=>e.currentTarget.style.paddingLeft="0"}>
            <div style={{ fontFamily:"'Fraunces',serif",fontSize:48,fontWeight:300,color:"rgba(255,255,255,.08)",lineHeight:1 }}>{String(i+1).padStart(2,"0")}</div>
            <div>
              <div style={{ fontSize:12,color:"#b85c35",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:9 }}>{a.cat} · {a.date}</div>
              <div style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(20px,2.2vw,27px)",fontWeight:300,color:"#f0e8dc",lineHeight:1.3,marginBottom:10 }}>{a.title}</div>
              <p style={{ fontSize:15,color:"rgba(255,255,255,.35)",lineHeight:1.75,maxWidth:600 }}>{a.excerpt.slice(0,140)}…</p>
            </div>
            <div style={{ fontSize:22,color:"rgba(255,255,255,.18)" }}>↗</div>
          </a>
        ))}
      </div>
    </section>
  );
}
function SectionCTA({ setView }) {
  return (
    <section style={{ background:"#faf5ee",padding:"110px 40px",textAlign:"center" }}>
      <div style={{ maxWidth:580,margin:"0 auto" }}>
        <Ey style={{ justifyContent:"center",marginBottom:20 }}>Contact</Ey>
        <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(34px,4vw,52px)",fontWeight:300,color:"#2a1810",lineHeight:1.15,marginBottom:24 }}>
          Parlons de votre<br/><em style={{ fontStyle:"italic",color:"#b85c35" }}>démarche de résilience.</em>
        </h2>
        <p style={{ fontSize:18,color:"#6b5040",lineHeight:1.85,marginBottom:40 }}>Continuité d'activité, dépendances critiques, déploiement ServiceNow BCM — échangeons sur vos enjeux.</p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <Btn onClick={()=>setView("contact")}>Démarrer une conversation</Btn>
          <Btn outline href="https://www.linkedin.com/in/yannick-dequant/">LinkedIn →</Btn>
        </div>
      </div>
    </section>
  );
}
function PageExpertise() {
  const ex=[
    { num:"01",title:"Continuité d'activité (PCA/BCP)",desc:"Analyse d'impact sur les activités (BIA), définition des processus critiques et délais maximums d'interruption (RTO/RPO). Rédaction et mise en place de plans de continuité conformes à l'ISO 22301. Exercices de validation et post-mortems.",tags:["BIA","ISO 22301","RTO/RPO","PCA/BCP"] },
    { num:"02",title:"Gestion de crise",desc:"Conception de dispositifs de gestion de crise, cellules de crise, playbooks. Organisation et animation d'exercices de simulation. Culture d'apprentissage post-crise.",tags:["Cellule de crise","Exercices","Playbooks","Post-mortem"] },
    { num:"03",title:"Analyse des risques & dépendances",desc:"Cartographie des dépendances critiques : activités, technologies, tiers, compétences. Évaluation de l'exposition géopolitique, réglementaire et opérationnelle.",tags:["Cartographie","Géopolitique","Tiers","Risques systémiques"] },
    { num:"04",title:"ServiceNow BCM",desc:"Expert paramétrage ServiceNow Business Continuity Management. Déploiement et configuration pour automatiser les processus de résilience. Formation des équipes.",tags:["ServiceNow","BCM","Paramétrage","ITSM"] },
    { num:"05",title:"IA & Résilience",desc:"Intégration de l'IA dans les démarches de résilience : veille informationnelle, détection d'anomalies, simulation de scénarios. Gouvernance et implémentation éthique.",tags:["IA","Veille","Simulation","Gouvernance IA"] },
    { num:"06",title:"Transformation & gouvernance",desc:"Structuration d'approches globales dépassant les silos. Sensibilisation et formation, marketing interne de la résilience. KPIs de maturité, coordination inter-équipes.",tags:["Gouvernance","Formation","KPIs","Change management"] },
  ];
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810",padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <Ey light style={{ marginBottom:22 }}>Expertise</Ey>
          <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(44px,6vw,80px)",fontWeight:300,color:"#f0e8dc",lineHeight:1.05,marginBottom:24 }}>
            Domaines<br/><em style={{ fontStyle:"italic",color:"rgba(240,232,220,.4)" }}>d'intervention</em>
          </h1>
          <p style={{ fontSize:18,color:"rgba(255,255,255,.38)",maxWidth:520,lineHeight:1.85 }}>Une approche globale de la résilience — de l'analyse des dépendances critiques à la gouvernance opérationnelle.</p>
        </div>
      </section>
      <section style={{ padding:"80px 40px" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:22 }}>
            {ex.map((e,i)=>(
              <Card key={i} className="hl" style={{ display:"flex",flexDirection:"column",padding:"32px" }}>
                <div style={{ fontFamily:"'Fraunces',serif",fontSize:48,fontWeight:300,color:"#f0e8dc",lineHeight:1,marginBottom:24 }}>{e.num}</div>
                <div style={{ fontFamily:"'Fraunces',serif",fontSize:23,fontWeight:400,color:"#2a1810",marginBottom:14,lineHeight:1.2 }}>{e.title}</div>
                <p style={{ fontSize:16,color:"#6b5040",lineHeight:1.85,flex:1,marginBottom:22 }}>{e.desc}</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>{e.tags.map(t=><Tag key={t}>{t}</Tag>)}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background:"#faf5ee",padding:"72px 40px" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <Ey style={{ justifyContent:"center",marginBottom:32 }}>Référentiels maîtrisés</Ey>
          <div style={{ display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center" }}>
            {["ISO 22301","BCI Good Practice Guidelines","DORA","NIS2","Cyber Resilience Act","ISO 31000","ITIL","ServiceNow BCM"].map(r=>(
              <div key={r} style={{ padding:"13px 24px",background:"#fff",border:"1px solid #ecddd0",borderRadius:4,fontSize:15,fontWeight:500,color:"#2a1810" }}>{r}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
function PageProjets() {
  const autres=[
    { title:"Harmonisation de processus — Fusion d'assurances",org:"CGI Montréal",period:"2022–2023",desc:"Analyse et harmonisation des processus métiers lors de la fusion de deux compagnies d'assurance. Cartographie AS-IS/TO-BE, gestion des interdépendances, accompagnement au changement.",tags:["Process management","Fusion","Change management"] },
    { title:"Laboratoire d'idées orienté client",org:"CGI Montréal",period:"2022–2024",desc:"Création et animation d'un laboratoire d'idées pour favoriser l'innovation interne et la co-création avec les parties prenantes clients.",tags:["Innovation","Co-création","Animation"] },
    { title:"Aide au choix d'un ERP",org:"CGI Paris",period:"2020–2021",desc:"Accompagnement dans la sélection d'un ERP : définition des besoins, consultation des éditeurs, analyse comparative, recommandation et pilotage.",tags:["ERP","Analyse","Recommandation"] },
    { title:"SIRH Formation",org:"CGI Paris",period:"2019–2021",desc:"Intégration d'un module de gestion de la formation dans un SIRH. Recueil des besoins, paramétrage, formation des utilisateurs, conduite du changement.",tags:["SIRH","Formation","Conduite du changement"] },
    { title:"Communauté Web3 / Blockchain",org:"CGI Montréal",period:"2022–2023",desc:"Création et animation d'une communauté interne pour sensibiliser les équipes aux technologies émergentes.",tags:["Web3","Blockchain","Innovation"] },
    { title:"Automatisation des process RH",org:"CGI Paris",period:"2020–2022",desc:"Développement d'une offre RPA appliquée aux processus RH : identification des cas d'usage, conception de la solution, pilote et généralisation.",tags:["RPA","Automatisation","RH"] },
  ];
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810",padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <Ey light style={{ marginBottom:22 }}>Projets</Ey>
          <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(44px,6vw,80px)",fontWeight:300,color:"#f0e8dc",lineHeight:1.05 }}>Réalisations</h1>
        </div>
      </section>
      <section style={{ padding:"80px 40px" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <div style={{ marginBottom:72 }}>
            <div style={{ fontSize:12,color:"#b0987e",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:22 }}>Projet principal en cours</div>
            <div style={{ background:"#2a1810",borderRadius:8,padding:"52px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52 }} className="m1 mp">
              <div>
                <div style={{ fontSize:12,color:"#b85c35",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:18 }}>2023 – Présent · Caisse de dépôt et placement du Québec</div>
                <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(26px,3vw,36px)",fontWeight:300,color:"#f0e8dc",lineHeight:1.2,marginBottom:26 }}>Résilience organisationnelle — CDPQ</h2>
                <div style={{ display:"flex",flexWrap:"wrap",gap:9 }}>
                  {["PCA/BCP","ServiceNow BCM","IA","ISO 22301","Gouvernance","Gestion de crise"].map(t=><Tag key={t} dark>{t}</Tag>)}
                </div>
              </div>
              <div>
                <p style={{ fontSize:15,color:"rgba(255,255,255,.5)",lineHeight:1.9,marginBottom:26 }}>Mission longue durée pour structurer une approche globale de la résilience au sein d'un investisseur institutionnel à portée mondiale. Périmètre complet : cadre de résilience, cartographie des processus critiques, analyse des dépendances, plans de continuité et déploiement ServiceNow BCM.</p>
                {["Cadre de résilience global","BIA et cartographie des processus critiques","Analyse dépendances : tech, tiers, compétences","Déploiement ServiceNow BCM","IA de veille informationnelle","KPIs de maturité résilience"].map((pt,i)=>(
                  <div key={i} style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:10 }}>
                    <div style={{ width:5,height:5,borderRadius:"50%",background:"#b85c35",marginTop:8,flexShrink:0 }} />
                    <span style={{ fontSize:15,color:"rgba(255,255,255,.45)",lineHeight:1.75 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ fontSize:12,color:"#b0987e",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:26 }}>Autres projets</div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20 }}>
            {autres.map((p,i)=>(
              <Card key={i} className="hl" style={{ display:"flex",flexDirection:"column",padding:"30px" }}>
                <div style={{ fontSize:13,color:"#b0987e",marginBottom:10 }}>{p.period} · {p.org}</div>
                <div style={{ fontFamily:"'Fraunces',serif",fontSize:21,fontWeight:400,color:"#2a1810",marginBottom:14,lineHeight:1.3,flex:1 }}>{p.title}</div>
                <p style={{ fontSize:15,color:"#6b5040",lineHeight:1.85,marginBottom:20 }}>{p.desc}</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>{p.tags.map(t=><Tag key={t}>{t}</Tag>)}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
function PageArticles() {
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810",padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <Ey light style={{ marginBottom:22 }}>Articles</Ey>
          <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(44px,6vw,80px)",fontWeight:300,color:"#f0e8dc",lineHeight:1.05,marginBottom:18 }}>
            Analyses &<br/><em style={{ fontStyle:"italic",color:"rgba(240,232,220,.38)" }}>Réflexions</em>
          </h1>
          <p style={{ fontSize:18,color:"rgba(255,255,255,.35)",maxWidth:500,lineHeight:1.85 }}>Analyses concrètes sur la résilience organisationnelle et les enjeux opérationnels des grandes organisations.</p>
        </div>
      </section>
      <section style={{ padding:"80px 40px" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <div style={{ display:"flex",flexDirection:"column",gap:26 }}>
            {ARTICLES.map((a,i)=>(
              <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" className="hl"
                style={{ display:"grid",gridTemplateColumns:"110px 1fr",gap:40,background:"#fff",border:"1px solid #ecddd0",borderRadius:8,padding:"42px",textDecoration:"none" }}>
                <div>
                  <div style={{ fontFamily:"'Fraunces',serif",fontSize:64,fontWeight:300,color:"#f0e8dc",lineHeight:1,marginBottom:12 }}>{String(i+1).padStart(2,"0")}</div>
                  <div style={{ fontSize:14,color:"#b0987e" }}>{a.date}</div>
                </div>
                <div>
                  <div style={{ fontSize:12,color:"#b85c35",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:12 }}>{a.cat}</div>
                  <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(22px,2.5vw,30px)",fontWeight:400,color:"#2a1810",lineHeight:1.25,marginBottom:16 }}>{a.title}</h2>
                  <p style={{ fontSize:16,color:"#6b5040",lineHeight:1.85,marginBottom:22 }}>{a.excerpt}</p>
                  <div style={{ display:"flex",gap:7,flexWrap:"wrap",marginBottom:18 }}>{a.tags.map(t=><Tag key={t}>{t}</Tag>)}</div>
                  <div style={{ fontSize:14,color:"#b85c35",fontWeight:500 }}>Lire l'article →</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ marginTop:52,padding:"42px",background:"#faf5ee",borderRadius:8,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:26 }}>
            <div>
              <div style={{ fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:300,color:"#2a1810",marginBottom:8 }}>Nouvelles analyses chaque mois</div>
              <p style={{ fontSize:16,color:"#6b5040" }}>Résilience organisationnelle, continuité d'activité, enjeux réglementaires.</p>
            </div>
            <Btn href="https://www.linkedin.com/in/yannick-dequant/">Suivre sur LinkedIn →</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
function PageContact() {
  return (
    <div style={{ paddingTop:72 }}>
      <section style={{ background:"#2a1810",padding:"90px 40px 80px" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <Ey light style={{ marginBottom:22 }}>Contact</Ey>
          <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:"clamp(44px,6vw,80px)",fontWeight:300,color:"#f0e8dc",lineHeight:1.05 }}>
            Parlons de votre<br/><em style={{ fontStyle:"italic",color:"rgba(240,232,220,.38)" }}>démarche de résilience.</em>
          </h1>
        </div>
      </section>
      <section style={{ padding:"80px 40px" }}>
        <div style={{ maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start" }} className="m1">
          <div>
            <p style={{ fontSize:18,color:"#6b5040",lineHeight:1.9,marginBottom:48 }}>Que vous souhaitiez structurer votre démarche de résilience, mettre en place un plan de continuité, évaluer vos dépendances critiques ou déployer ServiceNow BCM — je suis disponible pour en discuter.</p>
            {[
              { label:"Email",val:"yannick.dequant@gmail.com",href:"mailto:yannick.dequant@gmail.com" },
              { label:"LinkedIn",val:"linkedin.com/in/yannick-dequant",href:"https://www.linkedin.com/in/yannick-dequant/" },
              { label:"Localisation",val:"Aix-en-Provence, France",href:null },
              { label:"Mode",val:"Remote / Présentiel",href:null },
            ].map(c=>(
              <div key={c.label} style={{ paddingBottom:22,marginBottom:22,borderBottom:"1px solid #ecddd0" }}>
                <div style={{ fontSize:12,letterSpacing:"0.14em",textTransform:"uppercase",color:"#b0987e",marginBottom:8 }}>{c.label}</div>
                {c.href
                  ?<a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:18,color:"#b85c35",fontWeight:500,textDecoration:"underline",textUnderlineOffset:4 }}>{c.val}</a>
                  :<div style={{ fontSize:18,color:"#2a1810" }}>{c.val}</div>}
              </div>
            ))}
          </div>
          <Card style={{ background:"#faf5ee",borderColor:"#f0e8dc",padding:"38px" }}>
            <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:30,fontWeight:300,color:"#2a1810",marginBottom:32 }}>Disponibilités</h3>
            {[
              { label:"Statut",val:"Indépendant — Portage salarial" },
              { label:"Type de missions",val:"Longue durée privilégiée" },
              { label:"Secteurs cibles",val:"Finance, investissement institutionnel, grandes organisations" },
            ].map((d,i,arr)=>(
              <div key={d.label} style={{ padding:"17px 0",borderBottom:i<arr.length-1?"1px solid #ecddd0":"none" }}>
                <div style={{ fontSize:12,color:"#b0987e",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:7 }}>{d.label}</div>
                <div style={{ fontSize:16,color:"#2a1810",fontWeight:500 }}>{d.val}</div>
              </div>
            ))}
            <div style={{ marginTop:36,display:"flex",flexDirection:"column",gap:12 }}>
              <Btn href="https://www.linkedin.com/in/yannick-dequant/">Me contacter sur LinkedIn</Btn>
              <Btn outline href="mailto:yannick.dequant@gmail.com">Envoyer un email</Btn>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
function Footer({ setView }) {
  const go = id => { setView(id); window.scrollTo({top:0,behavior:"smooth"}); };
  return (
    <footer style={{ background:"#2a1810",padding:"40px",borderTop:"1px solid rgba(255,255,255,.05)" }}>
      <div style={{ maxWidth:1180,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:18 }}>
        <div style={{ fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:300,color:"rgba(255,255,255,.3)" }}>Yannick Dequant</div>
        <div style={{ display:"flex",gap:28,flexWrap:"wrap" }}>
          {NAVS.map(n=>(
            <span key={n} onClick={()=>go(n)} className="lc"
              style={{ fontSize:14,color:"rgba(255,255,255,.22)",cursor:"pointer",transition:"color .18s" }}
              onMouseEnter={e=>e.target.style.color="rgba(255,255,255,.6)"}
              onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.22)"}>
              {NAVLABELS[n]}
            </span>
          ))}
        </div>
        <div style={{ fontSize:13,color:"rgba(255,255,255,.15)" }}>© 2026</div>
      </div>
    </footer>
  );
}
export default function App() {
  const [view, setView] = useState("accueil");
  return (
    <>
      <style>{G}</style>
      <Nav view={view} setView={setView} />
      <main>
        {view==="accueil"&&<><Hero setView={setView}/><SectionAbout setView={setView}/><SectionExpertise setView={setView}/><SectionArticles setView={setView}/><SectionCTA setView={setView}/></>}
        {view==="expertise"&&<PageExpertise/>}
        {view==="projets"&&<PageProjets/>}
        {view==="articles"&&<PageArticles/>}
        {view==="contact"&&<PageContact/>}
      </main>
      <Footer setView={setView} />
    </>
  );
}