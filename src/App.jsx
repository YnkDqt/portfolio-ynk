import { useState, useEffect } from "react";

// ── Palette ─────────────────────────────────────────────────────────
const C = {
  bg:           "#fdf8f3",
  bgAlt:        "#f7f0e6",
  bgDark:       "#2a1810",
  cream:        "#faf5ee",
  creamDark:    "#f0e8dc",
  white:        "#ffffff",
  primary:      "#b85c35",
  primaryLight: "#d4956a",
  primaryPale:  "#fdf0ec",
  olive:        "#4a5a38",
  olivePale:    "#e8eede",
  text:         "#2a1810",
  textMid:      "#6b5040",
  muted:        "#b0987e",
  mutedLight:   "#c8b5a0",
  border:       "#ecddd0",
  borderLight:  "#f5ede4",
};

const NAVS = ["expertise","projets","articles","contact"];
const NAVLABELS = { expertise:"Expertise", projets:"Projets", articles:"Articles", contact:"Contact" };

const ARTICLES = [
  {
    id:1, cat:"Analyse", date:"2 fév. 2026",
    title:"Géopolitique et résilience – Intégrer l'instabilité dans les choix structurels",
    excerpt:"En 2026, les tensions géopolitiques grandissantes mettent sous pression les équilibres sur lesquels reposent de nombreuses organisations. Sanctions, extraterritorialité du droit, dépendances technologiques : la géopolitique s'impose comme facteur opérationnel de résilience.",
    tags:["Géopolitique","Résilience","Souveraineté","Continuité"],
    url:"https://yannickdequant.wordpress.com/2026/02/02/geopolitique-et-resilience-integrer-linstabilite-dans-les-choix-structurels/",
  },
  {
    id:2, cat:"Rétrospective", date:"6 jan. 2026",
    title:"Résilience organisationnelle – Les enseignements clés de 2025 pour préparer 2026",
    excerpt:"Panne électrique en Espagne, crashs Cloudflare, explosion des cyberattaques, durcissement réglementaire DORA, NIS2, CRA. Rétrospective sur les perturbations de 2025 et les apprentissages concrets à en tirer pour l'année à venir.",
    tags:["Résilience","DORA","NIS2","Cybersécurité","IA"],
    url:"https://yannickdequant.wordpress.com/2026/01/06/resilience-organisationnelle-les-enseignements-cles-de-2025-pour-preparer-2026/",
  },
];

// ── Global styles ────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
  html { scroll-behavior: smooth; }
  body { font-family:'DM Sans',sans-serif; background:${C.bg}; color:${C.text}; -webkit-font-smoothing:antialiased; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
  .au { animation: fadeUp .7s ease both; }
  .d1{animation-delay:.1s} .d2{animation-delay:.2s} .d3{animation-delay:.3s} .d4{animation-delay:.4s}
  .hover-lift { transition: transform .22s, box-shadow .22s; }
  .hover-lift:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(80,40,20,.12); }
  .link-c:hover { color:${C.primary} !important; }
  @media(max-width:768px){
    .m-hide{display:none!important}
    .m-col{flex-direction:column!important}
    .m-1{grid-template-columns:1fr!important}
    .m-p{padding:28px 20px!important}
  }
`;

// ── Atoms ────────────────────────────────────────────────────────────
function Eyebrow({ children, light, style }) {
  return (
    <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase",
      fontWeight:500, color: light ? "rgba(255,255,255,0.35)" : C.primary,
      display:"flex", alignItems:"center", gap:8, ...style }}>
      {children}
    </div>
  );
}

function Pill({ children, onClick, href, outline, style }) {
  const s = {
    display:"inline-flex", alignItems:"center", gap:6,
    padding:"10px 22px", borderRadius:24, cursor:"pointer",
    fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500,
    letterSpacing:"0.04em", textDecoration:"none", whiteSpace:"nowrap",
    transition:"all .2s",
    background: outline ? "transparent" : C.primary,
    color:      outline ? C.primary     : C.white,
    border:     outline ? `1.5px solid ${C.primary}` : "none",
    ...style,
  };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={s}>{children}</a>;
  return <button onClick={onClick} style={s}>{children}</button>;
}

function Tag({ children, dark }) {
  return (
    <span style={{
      padding:"4px 10px", borderRadius:3, fontSize:10, fontWeight:500,
      background: dark ? "rgba(255,255,255,0.08)" : C.primaryPale,
      color:      dark ? "rgba(255,255,255,0.6)"  : C.primary,
    }}>{children}</span>
  );
}

function Card({ children, style, className, onClick }) {
  return (
    <div className={className} onClick={onClick} style={{
      background:C.white, border:`1px solid ${C.border}`,
      borderRadius:8, padding:28, ...style,
    }}>{children}</div>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────
function Nav({ view, setView }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { setOpen(false); setView(id); window.scrollTo({ top:0, behavior:"smooth" }); };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        background: scrolled ? "rgba(253,248,243,.95)" : "transparent",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        transition:"all .3s",
      }}>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 36px",
          height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          <div onClick={() => go("accueil")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:C.primary }} />
            <span style={{ fontFamily:"'Fraunces',serif", fontSize:17, fontWeight:400, color:C.text }}>
              Yannick Dequant
            </span>
          </div>

          {/* Desktop */}
          <div className="m-hide" style={{ display:"flex", alignItems:"center", gap:28 }}>
            {NAVS.map(n => (
              <span key={n} onClick={() => go(n)} className="link-c"
                style={{ fontSize:12, cursor:"pointer", transition:"color .18s",
                  color: view===n ? C.primary : C.textMid,
                  fontWeight: view===n ? 500 : 400, letterSpacing:"0.03em" }}>
                {NAVLABELS[n]}
              </span>
            ))}
            <Pill onClick={() => go("contact")} style={{ padding:"8px 18px", fontSize:11 }}>
              Me contacter
            </Pill>
          </div>

          {/* Burger */}
          <button onClick={() => setOpen(!open)} style={{
            display:"none", background:"none", border:"none", cursor:"pointer",
            flexDirection:"column", gap:5, padding:4,
          }} className="m-burger">
            {[0,1,2].map(i => (
              <div key={i} style={{ width:22, height:1.5, background:C.text, transition:"all .22s",
                transform: open ? (i===0?"rotate(45deg) translate(4.5px,4.5px)":i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"scaleX(0)") : "none",
                opacity: open && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position:"fixed", top:64, left:0, right:0, bottom:0, zIndex:199,
        background:C.cream, padding:"40px 36px", display:"flex",
        flexDirection:"column", gap:0,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition:"transform .28s ease",
      }}>
        {["accueil",...NAVS].map(n => (
          <div key={n} onClick={() => go(n)} style={{
            padding:"20px 0", borderBottom:`1px solid ${C.border}`,
            fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:300,
            color: view===n ? C.primary : C.text, cursor:"pointer",
          }}>
            {n==="accueil" ? "Accueil" : NAVLABELS[n]}
          </div>
        ))}
      </div>

      <style>{`.m-burger{display:none!important} @media(max-width:768px){.m-burger{display:flex!important}}`}</style>
    </>
  );
}

// ── HOME — section HERO ───────────────────────────────────────────────
function Hero({ setView }) {
  return (
    <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
      justifyContent:"center", paddingTop:64, background:C.bg }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"60px 36px 40px", width:"100%" }}>

        {/* Barre dégradée */}
        <div className="au" style={{
          height:3, marginBottom:52, borderRadius:2,
          background:`linear-gradient(90deg,${C.primary} 0%,${C.primaryLight} 55%,${C.creamDark} 100%)`,
        }} />

        <div style={{ display:"grid", gridTemplateColumns:"1.45fr 1fr", gap:52, alignItems:"start" }} className="m-1">

          {/* Gauche */}
          <div>
            <Eyebrow className="au d1" style={{ marginBottom:18 }}>Senior Business Analyst</Eyebrow>

            <h1 className="au d2" style={{
              fontFamily:"'Fraunces',serif",
              fontSize:"clamp(38px,5.5vw,68px)",
              fontWeight:300, lineHeight:1.05,
              color:C.text, marginBottom:24, letterSpacing:"-0.01em",
            }}>
              Résilience<br/>
              organisationnelle<br/>
              & <em style={{ fontStyle:"italic", color:C.primary }}>continuité</em><br/>
              d'activité.
            </h1>

            <p className="au d3" style={{
              fontSize:15, color:C.textMid, lineHeight:1.85,
              maxWidth:440, marginBottom:36,
            }}>
              Analyse des dépendances critiques, plans de continuité d'activité, déploiement ServiceNow BCM. Certifié CBCI. Mission longue durée à la CDPQ depuis 2023.
            </p>

            <div className="au d4" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Pill onClick={() => setView("expertise")}>Mon expertise →</Pill>
              <Pill outline onClick={() => setView("contact")}>Me contacter</Pill>
            </div>

            {/* Stats */}
            <div className="au d4" style={{
              display:"flex", gap:32, marginTop:52,
              paddingTop:28, borderTop:`1px solid ${C.border}`,
            }}>
              {[["7+","Ans d'expérience"],["CBCI","Certifié · The BCI"],["CDPQ","Mission en cours"],["22301","ISO maîtrisé"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:400, color:C.text, lineHeight:1, marginBottom:4 }}>{v}</div>
                  <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.06em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Droite — articles */}
          <div className="au d3" style={{ display:"flex", flexDirection:"column", gap:10, paddingTop:6 }}>
            <div style={{ fontSize:9, color:C.muted, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:4 }}>
              Dernières analyses
            </div>

            {ARTICLES.map((a, i) => (
              <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer"
                className="hover-lift"
                style={{
                  background:   i===0 ? C.primary : C.white,
                  border:       `1px solid ${i===0 ? C.primary : C.border}`,
                  borderRadius: 6, padding:"12px 14px",
                  textDecoration:"none", cursor:"pointer",
                  boxShadow:"0 1px 6px rgba(80,40,20,.06)",
                }}>
                <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:4,
                  color: i===0 ? "rgba(255,255,255,.55)" : C.muted }}>{a.cat}</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:14, lineHeight:1.35, marginBottom:4,
                  color: i===0 ? C.white : C.text }}>{a.title}</div>
                <div style={{ fontSize:10, color: i===0 ? "rgba(255,255,255,.45)" : C.mutedLight }}>{a.date}</div>
              </a>
            ))}

            <div style={{ background:C.bgAlt, border:`1px solid ${C.border}`, borderRadius:6, padding:"11px 14px" }}>
              <div style={{ fontSize:9, color:C.muted, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:3 }}>Certification</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:14, color:C.text, lineHeight:1.35 }}>CBCI · The BCI · 2024</div>
              <div style={{ fontSize:10, color:C.mutedLight, marginTop:4 }}>ISO 22301 · ServiceNow BCM</div>
            </div>

            <div onClick={() => setView("articles")} style={{ fontSize:11, color:C.primary, fontWeight:500, textAlign:"right", cursor:"pointer", marginTop:2 }}>
              Voir tous les articles →
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ textAlign:"center", marginTop:60, opacity:.35 }}>
          <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.12em", marginBottom:8 }}>DÉCOUVRIR</div>
          <div style={{ fontSize:18, color:C.muted, animation:"pulse 1.8s ease infinite" }}>↓</div>
        </div>
      </div>
    </section>
  );
}

// ── HOME — section À PROPOS ───────────────────────────────────────────
function SectionAbout({ setView }) {
  const parcours = [
    { period:"2023 →",    org:"Indépendant — Portage salarial", role:"Business Analyst Senior · Résilience", current:true },
    { period:"2022–2025", org:"CGI Montréal",                   role:"Business Analyst Senior" },
    { period:"2019–2022", org:"CGI Paris",                      role:"Consultant SIRH" },
  ];
  return (
    <section style={{ background:C.cream, padding:"100px 36px" }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:72, alignItems:"start" }} className="m-1">

          <div style={{ position:"sticky", top:90 }}>
            <Eyebrow style={{ marginBottom:16 }}>À propos</Eyebrow>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(36px,4.5vw,54px)", fontWeight:300,
              color:C.text, lineHeight:1.1, marginBottom:24 }}>
              Yannick<br/>Dequant
            </h2>
            <p style={{ fontSize:14, color:C.textMid, lineHeight:1.85, marginBottom:28 }}>
              Consultant senior en résilience organisationnelle, passionné de systémique et de prospective. Je construis des organisations capables d'absorber les chocs et de se transformer face à l'incertitude.
            </p>
            <Pill outline onClick={() => setView("expertise")} style={{ fontSize:11, padding:"8px 18px" }}>
              Voir mon expertise
            </Pill>
          </div>

          <div>
            {/* Vision */}
            <div style={{ marginBottom:48 }}>
              <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.12em", textTransform:"uppercase",
                marginBottom:16, paddingBottom:12, borderBottom:`1px solid ${C.border}` }}>Vision</div>
              <p style={{ fontSize:15, color:C.text, lineHeight:1.9, marginBottom:18 }}>
                Chaque démarche de résilience est unique. Elle nécessite une écoute attentive pour comprendre les enjeux, les objectifs et les contraintes — puis une construction rigoureuse qui ancre la résilience dans le fonctionnement quotidien de l'organisation, pas seulement dans des plans de secours.
              </p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {["Adaptabilité","Systémique","Prospective","Transparence","Rigueur"].map(q => (
                  <Tag key={q}>{q}</Tag>
                ))}
              </div>
            </div>

            {/* Parcours */}
            <div>
              <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.12em", textTransform:"uppercase",
                marginBottom:20, paddingBottom:12, borderBottom:`1px solid ${C.border}` }}>Parcours</div>
              {parcours.map((p, i) => (
                <div key={i} style={{
                  display:"grid", gridTemplateColumns:"100px 1fr", gap:20,
                  padding:"18px 0",
                  borderBottom: i < parcours.length-1 ? `1px solid ${C.borderLight}` : "none",
                  alignItems:"start",
                }}>
                  <div style={{ fontSize:11, color:C.muted, paddingTop:3 }}>{p.period}</div>
                  <div>
                    <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>{p.org}</div>
                    <div style={{ fontFamily:"'Fraunces',serif", fontSize:17, fontWeight:400, color:C.text,
                      display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                      {p.role}
                      {p.current && (
                        <span style={{ padding:"2px 8px", background:C.olivePale, color:C.olive,
                          fontSize:9, fontWeight:600, borderRadius:2, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                          En cours
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:24 }}>
                <Pill outline onClick={() => setView("projets")} style={{ fontSize:11, padding:"8px 18px" }}>
                  Voir mes projets →
                </Pill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── HOME — section EXPERTISE ──────────────────────────────────────────
function SectionExpertise({ setView }) {
  const domaines = [
    { icon:"◉", title:"Continuité d'activité",  desc:"BIA, plans PCA/BCP, tests et exercices de crise. Conformité ISO 22301." },
    { icon:"◈", title:"Analyse des risques",     desc:"Cartographie des dépendances critiques, exposition géopolitique, risques systémiques." },
    { icon:"◆", title:"ServiceNow BCM",          desc:"Paramétrage et déploiement expert de l'outil pour structurer la résilience." },
    { icon:"◇", title:"IA & Résilience",         desc:"Veille informationnelle, détection d'anomalies, simulation de scénarios de crise." },
    { icon:"○", title:"Gestion de crise",        desc:"Cellules de crise, playbooks, exercices de simulation, post-mortems." },
    { icon:"△", title:"Formation & gouvernance", desc:"Sensibilisation des équipes, KPIs de maturité, culture de résilience organisationnelle." },
  ];
  return (
    <section style={{ background:C.bg, padding:"100px 36px" }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <div style={{ marginBottom:52, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16 }}>
          <div>
            <Eyebrow style={{ marginBottom:14 }}>Expertise</Eyebrow>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:300, color:C.text, lineHeight:1.1 }}>
              Domaines<br/>d'intervention
            </h2>
          </div>
          <Pill outline onClick={() => setView("expertise")} style={{ fontSize:11, padding:"8px 18px" }}>
            Voir en détail →
          </Pill>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:18 }}>
          {domaines.map((d, i) => (
            <Card key={i} className="hover-lift" style={{ padding:"24px 26px" }}>
              <div style={{ fontSize:18, color:C.primary, marginBottom:14 }}>{d.icon}</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:400, color:C.text, marginBottom:10, lineHeight:1.2 }}>
                {d.title}
              </div>
              <p style={{ fontSize:13, color:C.textMid, lineHeight:1.8 }}>{d.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HOME — section ARTICLES (fond sombre) ─────────────────────────────
function SectionArticles({ setView }) {
  return (
    <section style={{ background:C.bgDark, padding:"100px 36px" }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
          <div>
            <Eyebrow light style={{ marginBottom:14 }}>Analyses & Réflexions</Eyebrow>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.1 }}>
              Dernières<br/>publications
            </h2>
          </div>
          <Pill onClick={() => setView("articles")}>Tous les articles →</Pill>
        </div>

        <div style={{ display:"flex", flexDirection:"column" }}>
          {ARTICLES.map((a, i) => (
            <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" style={{
              display:"grid", gridTemplateColumns:"80px 1fr 32px",
              gap:28, padding:"28px 0",
              borderBottom:`1px solid rgba(255,255,255,.07)`,
              textDecoration:"none", alignItems:"center",
              transition:"padding-left .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft="10px"}
              onMouseLeave={e => e.currentTarget.style.paddingLeft="0"}
            >
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:44, fontWeight:300, color:"rgba(255,255,255,.08)", lineHeight:1 }}>
                {String(i+1).padStart(2,"0")}
              </div>
              <div>
                <div style={{ fontSize:10, color:C.primary, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6 }}>
                  {a.cat} · {a.date}
                </div>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(17px,2vw,22px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.3, marginBottom:8 }}>
                  {a.title}
                </div>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", lineHeight:1.7, maxWidth:600 }}>
                  {a.excerpt.slice(0,130)}…
                </p>
              </div>
              <div style={{ fontSize:20, color:"rgba(255,255,255,.18)" }}>↗</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HOME — section CTA CONTACT ────────────────────────────────────────
function SectionCTA({ setView }) {
  return (
    <section style={{ background:C.cream, padding:"100px 36px", textAlign:"center" }}>
      <div style={{ maxWidth:540, margin:"0 auto" }}>
        <Eyebrow style={{ justifyContent:"center", marginBottom:18 }}>Contact</Eyebrow>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(30px,4vw,48px)", fontWeight:300, color:C.text, lineHeight:1.15, marginBottom:20 }}>
          Parlons de votre<br/>
          <em style={{ fontStyle:"italic", color:C.primary }}>démarche de résilience.</em>
        </h2>
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.85, marginBottom:36 }}>
          Continuité d'activité, dépendances critiques, déploiement ServiceNow BCM — échangeons sur vos enjeux.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Pill onClick={() => setView("contact")}>Démarrer une conversation</Pill>
          <Pill outline href="https://www.linkedin.com/in/yannick-dequant/">LinkedIn →</Pill>
        </div>
      </div>
    </section>
  );
}

// ── PAGE : EXPERTISE ─────────────────────────────────────────────────
function PageExpertise() {
  const expertises = [
    { num:"01", title:"Continuité d'activité (PCA/BCP)", desc:"Analyse d'impact sur les activités (BIA), définition des processus critiques et délais maximums d'interruption (RTO/RPO). Rédaction et mise en place de plans de continuité conformes à l'ISO 22301. Exercices de validation et post-mortems.", tags:["BIA","ISO 22301","RTO/RPO","PCA/BCP"] },
    { num:"02", title:"Gestion de crise", desc:"Conception de dispositifs de gestion de crise, cellules de crise, playbooks. Organisation et animation d'exercices de simulation. Culture d'apprentissage post-crise.", tags:["Cellule de crise","Exercices","Playbooks","Post-mortem"] },
    { num:"03", title:"Analyse des risques & dépendances", desc:"Cartographie des dépendances critiques : activités, technologies, tiers, compétences. Évaluation de l'exposition géopolitique, réglementaire et opérationnelle.", tags:["Cartographie","Géopolitique","Tiers","Risques systémiques"] },
    { num:"04", title:"ServiceNow BCM", desc:"Expert paramétrage ServiceNow Business Continuity Management. Déploiement et configuration pour automatiser les processus de résilience. Formation des équipes.", tags:["ServiceNow","BCM","Paramétrage","ITSM"] },
    { num:"05", title:"IA & Résilience", desc:"Intégration de l'IA dans les démarches de résilience : veille informationnelle, détection d'anomalies, simulation de scénarios. Gouvernance et implémentation éthique.", tags:["IA","Veille","Simulation","Gouvernance IA"] },
    { num:"06", title:"Transformation & gouvernance", desc:"Structuration d'approches globales dépassant les silos. Sensibilisation et formation, marketing interne de la résilience. KPIs de maturité, coordination inter-équipes.", tags:["Gouvernance","Formation","KPIs","Change management"] },
  ];
  return (
    <div style={{ paddingTop:64 }}>
      <section style={{ background:C.bgDark, padding:"80px 36px 72px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <Eyebrow light style={{ marginBottom:20 }}>Expertise</Eyebrow>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(40px,6vw,76px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.05, marginBottom:20 }}>
            Domaines<br/><em style={{ fontStyle:"italic", color:"rgba(240,232,220,.4)" }}>d'intervention</em>
          </h1>
          <p style={{ fontSize:16, color:"rgba(255,255,255,.38)", maxWidth:500, lineHeight:1.85 }}>
            Une approche globale de la résilience — de l'analyse des dépendances critiques à la gouvernance opérationnelle.
          </p>
        </div>
      </section>
      <section style={{ padding:"72px 36px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {expertises.map((e, i) => (
              <Card key={i} className="hover-lift" style={{ display:"flex", flexDirection:"column" }}>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:44, fontWeight:300, color:C.creamDark, lineHeight:1, marginBottom:22 }}>{e.num}</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:21, fontWeight:400, color:C.text, marginBottom:12, lineHeight:1.2 }}>{e.title}</div>
                <p style={{ fontSize:13, color:C.textMid, lineHeight:1.85, flex:1, marginBottom:20 }}>{e.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {e.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background:C.cream, padding:"64px 36px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <Eyebrow style={{ justifyContent:"center", marginBottom:28 }}>Référentiels maîtrisés</Eyebrow>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
            {["ISO 22301","BCI Good Practice Guidelines","DORA","NIS2","Cyber Resilience Act","ISO 31000","ITIL","ServiceNow BCM"].map(r => (
              <div key={r} style={{ padding:"10px 20px", background:C.white, border:`1px solid ${C.border}`, borderRadius:4, fontSize:12, fontWeight:500, color:C.text }}>{r}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PAGE : PROJETS ───────────────────────────────────────────────────
function PageProjets() {
  const autres = [
    { title:"Harmonisation de processus — Fusion d'assurances", org:"CGI Montréal", period:"2022–2023", desc:"Analyse et harmonisation des processus métiers lors de la fusion de deux compagnies d'assurance. Cartographie AS-IS/TO-BE, gestion des interdépendances, accompagnement au changement.", tags:["Process management","Fusion","Change management"] },
    { title:"Laboratoire d'idées orienté client", org:"CGI Montréal", period:"2022–2024", desc:"Création et animation d'un laboratoire d'idées pour favoriser l'innovation interne et la co-création avec les parties prenantes clients.", tags:["Innovation","Co-création","Animation"] },
    { title:"Aide au choix d'un ERP", org:"CGI Paris", period:"2020–2021", desc:"Accompagnement dans la sélection d'un ERP : définition des besoins, consultation des éditeurs, analyse comparative, recommandation et pilotage de l'implémentation.", tags:["ERP","Analyse","Recommandation"] },
    { title:"SIRH Formation", org:"CGI Paris", period:"2019–2021", desc:"Intégration d'un module de gestion de la formation dans un SIRH. Recueil des besoins, paramétrage, formation des utilisateurs, conduite du changement.", tags:["SIRH","Formation","Conduite du changement"] },
    { title:"Communauté Web3 / Blockchain", org:"CGI Montréal", period:"2022–2023", desc:"Création et animation d'une communauté interne pour sensibiliser les équipes aux technologies émergentes.", tags:["Web3","Blockchain","Innovation"] },
    { title:"Automatisation des process RH", org:"CGI Paris", period:"2020–2022", desc:"Développement d'une offre RPA appliquée aux processus RH : identification des cas d'usage, conception de la solution, pilote et généralisation.", tags:["RPA","Automatisation","RH"] },
  ];
  return (
    <div style={{ paddingTop:64 }}>
      <section style={{ background:C.bgDark, padding:"80px 36px 72px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <Eyebrow light style={{ marginBottom:20 }}>Projets</Eyebrow>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(40px,6vw,76px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.05 }}>
            Réalisations
          </h1>
        </div>
      </section>
      <section style={{ padding:"72px 36px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          {/* Featured */}
          <div style={{ marginBottom:64 }}>
            <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20 }}>
              Projet principal en cours
            </div>
            <div style={{ background:C.bgDark, borderRadius:8, padding:"48px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }} className="m-1 m-p">
              <div>
                <div style={{ fontSize:10, color:C.primary, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:16 }}>
                  2023 – Présent · Caisse de dépôt et placement du Québec
                </div>
                <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(24px,3vw,34px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.2, marginBottom:24 }}>
                  Résilience organisationnelle — CDPQ
                </h2>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["PCA/BCP","ServiceNow BCM","IA","ISO 22301","Gouvernance","Gestion de crise"].map(t => <Tag key={t} dark>{t}</Tag>)}
                </div>
              </div>
              <div>
                <p style={{ fontSize:14, color:"rgba(255,255,255,.5)", lineHeight:1.9, marginBottom:24 }}>
                  Mission longue durée pour structurer une approche globale de la résilience au sein d'un investisseur institutionnel à portée mondiale. Périmètre complet : cadre de résilience, cartographie des processus critiques, analyse des dépendances, plans de continuité et déploiement ServiceNow BCM.
                </p>
                {["Cadre de résilience global","BIA et cartographie des processus critiques","Analyse dépendances : tech, tiers, compétences","Déploiement ServiceNow BCM","IA de veille informationnelle","KPIs de maturité résilience"].map((pt, i) => (
                  <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:8 }}>
                    <div style={{ width:4, height:4, borderRadius:"50%", background:C.primary, marginTop:7, flexShrink:0 }} />
                    <span style={{ fontSize:13, color:"rgba(255,255,255,.45)", lineHeight:1.7 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Autres */}
          <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:24 }}>Autres projets</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:18 }}>
            {autres.map((p, i) => (
              <Card key={i} className="hover-lift" style={{ display:"flex", flexDirection:"column" }}>
                <div style={{ fontSize:10, color:C.muted, marginBottom:8 }}>{p.period} · {p.org}</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:400, color:C.text, marginBottom:12, lineHeight:1.3, flex:1 }}>{p.title}</div>
                <p style={{ fontSize:13, color:C.textMid, lineHeight:1.8, marginBottom:18 }}>{p.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PAGE : ARTICLES ──────────────────────────────────────────────────
function PageArticles() {
  return (
    <div style={{ paddingTop:64 }}>
      <section style={{ background:C.bgDark, padding:"80px 36px 72px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <Eyebrow light style={{ marginBottom:20 }}>Articles</Eyebrow>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(40px,6vw,76px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.05, marginBottom:16 }}>
            Analyses &<br/><em style={{ fontStyle:"italic", color:"rgba(240,232,220,.38)" }}>Réflexions</em>
          </h1>
          <p style={{ fontSize:16, color:"rgba(255,255,255,.35)", maxWidth:480, lineHeight:1.85 }}>
            Analyses concrètes sur la résilience organisationnelle et les enjeux opérationnels des grandes organisations.
          </p>
        </div>
      </section>
      <section style={{ padding:"72px 36px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {ARTICLES.map((a, i) => (
              <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer"
                className="hover-lift"
                style={{ display:"grid", gridTemplateColumns:"96px 1fr", gap:36,
                  background:C.white, border:`1px solid ${C.border}`, borderRadius:8,
                  padding:"36px", textDecoration:"none", cursor:"pointer" }}>
                <div>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:58, fontWeight:300, color:C.creamDark, lineHeight:1, marginBottom:10 }}>
                    {String(i+1).padStart(2,"0")}
                  </div>
                  <div style={{ fontSize:11, color:C.muted }}>{a.date}</div>
                </div>
                <div>
                  <div style={{ fontSize:10, color:C.primary, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:10 }}>{a.cat}</div>
                  <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(20px,2.5vw,27px)", fontWeight:400, color:C.text, lineHeight:1.25, marginBottom:14 }}>
                    {a.title}
                  </h2>
                  <p style={{ fontSize:14, color:C.textMid, lineHeight:1.85, marginBottom:20 }}>{a.excerpt}</p>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                    {a.tags.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                  <div style={{ fontSize:12, color:C.primary, fontWeight:500, letterSpacing:"0.04em" }}>Lire l'article →</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ marginTop:48, padding:"36px", background:C.cream, borderRadius:8,
            display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
            <div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:300, color:C.text, marginBottom:6 }}>
                Nouvelles analyses chaque mois
              </div>
              <p style={{ fontSize:13, color:C.textMid }}>Résilience organisationnelle, continuité d'activité, enjeux réglementaires.</p>
            </div>
            <Pill href="https://www.linkedin.com/in/yannick-dequant/">Suivre sur LinkedIn →</Pill>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PAGE : CONTACT ───────────────────────────────────────────────────
function PageContact() {
  return (
    <div style={{ paddingTop:64 }}>
      <section style={{ background:C.bgDark, padding:"80px 36px 72px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <Eyebrow light style={{ marginBottom:20 }}>Contact</Eyebrow>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(40px,6vw,76px)", fontWeight:300, color:"#f0e8dc", lineHeight:1.05 }}>
            Parlons de votre<br/>
            <em style={{ fontStyle:"italic", color:"rgba(240,232,220,.38)" }}>démarche de résilience.</em>
          </h1>
        </div>
      </section>
      <section style={{ padding:"72px 36px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }} className="m-1">
          <div>
            <p style={{ fontSize:16, color:C.textMid, lineHeight:1.9, marginBottom:44 }}>
              Que vous souhaitiez structurer votre démarche de résilience, mettre en place un plan de continuité, évaluer vos dépendances critiques ou déployer ServiceNow BCM — je suis disponible pour en discuter.
            </p>
            {[
              { label:"Email",        val:"yannick.dequant@gmail.com",       href:"mailto:yannick.dequant@gmail.com" },
              { label:"LinkedIn",     val:"linkedin.com/in/yannick-dequant", href:"https://www.linkedin.com/in/yannick-dequant/" },
              { label:"Localisation", val:"Aix-en-Provence, France",          href:null },
              { label:"Mode",         val:"Remote / Présentiel",              href:null },
            ].map(c => (
              <div key={c.label} style={{ paddingBottom:20, marginBottom:20, borderBottom:`1px solid ${C.border}` }}>
                <div style={{ fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:C.muted, marginBottom:6 }}>{c.label}</div>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:16, color:C.primary, fontWeight:500, textDecoration:"underline", textUnderlineOffset:4 }}>
                    {c.val}
                  </a>
                ) : (
                  <div style={{ fontSize:16, color:C.text }}>{c.val}</div>
                )}
              </div>
            ))}
          </div>
          <Card style={{ background:C.cream, borderColor:C.creamDark }}>
            <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:26, fontWeight:300, color:C.text, marginBottom:28 }}>
              Disponibilités
            </h3>
            {[
              { label:"Statut",           val:"Indépendant — Portage salarial" },
              { label:"Type de missions",  val:"Longue durée privilégiée" },
              { label:"Secteurs cibles",   val:"Finance, investissement institutionnel, grandes organisations" },
            ].map((d, i, arr) => (
              <div key={d.label} style={{ padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>{d.label}</div>
                <div style={{ fontSize:14, color:C.text, fontWeight:500 }}>{d.val}</div>
              </div>
            ))}
            <div style={{ marginTop:32, display:"flex", flexDirection:"column", gap:10 }}>
              <Pill href="https://www.linkedin.com/in/yannick-dequant/">Me contacter sur LinkedIn</Pill>
              <Pill outline href="mailto:yannick.dequant@gmail.com">Envoyer un email</Pill>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

// ── Footer ───────────────────────────────────────────────────────────
function Footer({ setView }) {
  const go = (id) => { setView(id); window.scrollTo({ top:0, behavior:"smooth" }); };
  return (
    <footer style={{ background:C.bgDark, padding:"36px", borderTop:"1px solid rgba(255,255,255,.05)" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:300, color:"rgba(255,255,255,.3)" }}>
          Yannick Dequant
        </div>
        <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
          {NAVS.map(n => (
            <span key={n} onClick={() => go(n)} className="link-c"
              style={{ fontSize:11, color:"rgba(255,255,255,.22)", cursor:"pointer", letterSpacing:"0.04em", transition:"color .18s" }}>
              {NAVLABELS[n]}
            </span>
          ))}
        </div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,.15)" }}>© 2026</div>
      </div>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("accueil");

  return (
    <>
      <style>{G}</style>
      <Nav view={view} setView={setView} />
      <main>
        {view === "accueil" && (
          <>
            <Hero          setView={setView} />
            <SectionAbout  setView={setView} />
            <SectionExpertise setView={setView} />
            <SectionArticles  setView={setView} />
            <SectionCTA    setView={setView} />
          </>
        )}
        {view === "expertise" && <PageExpertise />}
        {view === "projets"   && <PageProjets />}
        {view === "articles"  && <PageArticles />}
        {view === "contact"   && <PageContact />}
      </main>
      <Footer setView={setView} />
    </>
  );
}
