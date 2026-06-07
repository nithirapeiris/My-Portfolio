import { useState, useEffect, useRef } from "react";

/* ══════════════════ PALETTE — No Gradients ══════════════════ */
const C = {
  bg:        "#0F172A",
  bgSec:     "#111827",
  card:      "#1E293B",
  cardHov:   "#253447",
  accent:    "#3B82F6",
  accentLt:  "#93C5FD",
  accentDk:  "#2563EB",
  green:     "#22C55E",
  greenDk:   "#16A34A",
  textPri:   "#E5E7EB",
  textSec:   "#9CA3AF",
  textMut:   "#6B7280",
  border:    "rgba(59,130,246,0.12)",
  borderHov: "rgba(59,130,246,0.38)",
  shadow:    "0 4px 24px rgba(0,0,0,.55)",
  shadowBlue:"0 8px 32px rgba(59,130,246,.18)",
};

/* ══════════════════ DATA ══════════════════ */
const NAV_LINKS   = ["About","Skills","Projects","Experience","Contact"];
const TYPED_ROLES = ["Business Analyst","QA Specialist","CS Undergraduate"];

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const TECH_SKILLS = [
  { name:"Java",        logo:`${DI}/java/java-original.svg` },
  { name:"Python",      logo:`${DI}/python/python-original.svg` },
  { name:"MySQL / SQL", logo:`${DI}/mysql/mysql-original.svg` },
  { name:"JavaScript",  logo:`${DI}/javascript/javascript-original.svg` },
  { name:"HTML5",       logo:`${DI}/html5/html5-original.svg` },
  { name:"CSS3",        logo:`${DI}/css3/css3-original.svg` },
  { name:"Git",         logo:`${DI}/git/git-original.svg` },
  { name:"Selenium",    logo:`${DI}/selenium/selenium-original.svg` },
  { name:"Jira",        logo:`${DI}/jira/jira-original.svg` },
  { name:"Postman",     logo:`${DI}/postman/postman-original.svg` },
  { name:"MS Excel",    logo:null, abbr:"XLS" },
  { name:"Confluence",  logo:`${DI}/confluence/confluence-original.svg` },
];

const TOOLS = [
  "Agile / Scrum","CI/CD","Unit Testing","Integration Testing",
  "System Testing","Requirements Engineering","Business Analysis",
  "Stakeholder Communication","Encryption","Cross-platform Dev","Networking",
];

const SOFT_SKILLS = [
  { name:"Critical Thinking",   pct:90 },
  { name:"Time Management",     pct:85 },
  { name:"Team Collaboration",  pct:88 },
  { name:"Problem Solving",     pct:92 },
];

const PROJECTS = [
  { id:1, title:"Team Vertex — Project Manager",     tag:"Leadership",       year:"2024",
    description:"Led a cross-functional team to a 90% project milestone, optimising workflow transparency and sprint delivery.",
    tech:["Agile","Jira","Project Management","Stakeholder Comm."], color:"#3B82F6", icon:"👥" },
  { id:2, title:"Predictive Analytics Engine — LCH", tag:"Data / Analytics", year:"2024",
    description:"Built an analytics engine to forecast campus facility wait times for Live Campus Hub, streamlining traffic and boosting engagement.",
    tech:["Python","SQL","Data Analysis","Requirements Engineering"], color:"#22C55E", icon:"📊" },
  { id:3, title:"QA Test Automation Suite",          tag:"Quality Assurance", year:"2024",
    description:"Designed a full test automation suite across unit, integration, and system layers. Cut manual regression time by 40%.",
    tech:["Java","JUnit","Selenium","CI/CD"], color:"#F59E0B", icon:"🧪" },
  { id:4, title:"Campus Resource Booking System",    tag:"Full Stack",        year:"2025",
    description:"Room and resource booking platform with real-time availability, conflict detection, and an admin reporting dashboard.",
    tech:["Java","Python","SQL","MS Excel"], color:"#8B5CF6", icon:"🏛" },
  { id:5, title:"Encrypted File Transfer Tool",      tag:"Security",         year:"2025",
    description:"Cross-platform CLI tool for AES-256 secure file transfer with integrity verification and batch processing.",
    tech:["Python","Encryption","Cross-platform","OS"], color:"#EC4899", icon:"🔒" },
];

const EXPERIENCE = [
  { year:"Present",      role:"Quality Assurance Technician",  org:"Global Solutions International Pvt Ltd", type:"Work",        color:"#22C55E",
    desc:"Executing testing strategies across unit, integration, and system layers to ensure software quality and reliability." },
  { year:"2024–Present", role:"B.Sc. (Hons) Computer Science", org:"University of Wolverhampton",            type:"Education",   color:"#3B82F6",
    desc:"Honours degree focused on software engineering, data structures, and systems design." },
  { year:"2023",         role:"Engineering Foundation Program", org:"CINEC Campus",                           type:"Education",   color:"#3B82F6",
    desc:"Intensive foundation covering mathematics, physics, and programming fundamentals." },
  { year:"2023",         role:"English Certificate Course",    org:"Aquinas College",                        type:"Certificate", color:"#F59E0B",
    desc:"Certified English proficiency course focusing on professional and academic communication." },
  { year:"Current",      role:"English Certificate Course",    org:"British Council",                        type:"Certificate", color:"#F59E0B",
    desc:"Ongoing advanced English language training with the British Council." },
];

/* ══════════════════ HOOKS ══════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useViewport() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w < 980, width: w };
}

/* ══════════════════ PRIMITIVES ══════════════════ */
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(26px)",
      transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Btn({ children, onClick, href, variant = "primary" }) {
  const [h, setH] = useState(false);
  const base = {
    display:"inline-flex", alignItems:"center", gap:".45rem",
    borderRadius:"9px", cursor:"pointer",
    fontFamily:"'Inter',system-ui,sans-serif", fontSize:".88rem", fontWeight:"600",
    padding:".75rem 1.75rem", textDecoration:"none", whiteSpace:"nowrap",
    transition:"all .22s ease",
  };
  const styles = {
    primary: {
      ...base, border:"none",
      background: h ? C.accentDk : C.accent,
      color:"#fff",
      boxShadow: h ? "0 8px 24px rgba(59,130,246,.38)" : "0 3px 12px rgba(59,130,246,.22)",
      transform: h ? "translateY(-2px)" : "none",
    },
    ghost: {
      ...base,
      background: h ? "rgba(59,130,246,.1)" : "transparent",
      border: `1.5px solid ${h ? C.accent : "rgba(59,130,246,.3)"}`,
      color: h ? C.accentLt : C.textSec,
      transform: h ? "translateY(-2px)" : "none",
    },
  };
  const p = { onMouseEnter:()=>setH(true), onMouseLeave:()=>setH(false), style:styles[variant] };
  return href ? <a href={href} {...p}>{children}</a> : <button onClick={onClick} {...p}>{children}</button>;
}

/* ══════════════════ ICONS ══════════════════ */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="17" height="17">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="17" height="17">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.48-1.48a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="17" height="17">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ══════════════════ COMPONENTS ══════════════════ */

function TypedText({ roles }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = roles[idx];
    let t;
    if (!del && text.length < full.length)        t = setTimeout(() => setText(full.slice(0, text.length+1)), 80);
    else if (!del && text.length === full.length)  t = setTimeout(() => setDel(true), 2200);
    else if (del && text.length > 0)               t = setTimeout(() => setText(full.slice(0, text.length-1)), 44);
    else { setDel(false); setIdx(i => (i+1) % roles.length); }
    return () => clearTimeout(t);
  }, [text, del, idx, roles]);
  return (
    <span>
      <span style={{ color: C.accentLt }}>{text}</span>
      <span style={{ animation:"blink 1s step-end infinite", color:C.accentLt }}>|</span>
    </span>
  );
}

function ProfilePhoto() {
  return (
    <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"flex-end", padding:"24px", paddingRight:0 }}>
      {/* outer faint ring */}
      <div style={{
        position:"absolute",
        width:390, height:390, borderRadius:"50%",
        border:`1px solid rgba(59,130,246,.2)`,
        right:"-12px",
      }}/>
      {/* inner accent ring */}
      <div style={{
        position:"absolute",
        width:356, height:356, borderRadius:"50%",
        border:`2px solid ${C.accent}`, opacity:.35,
        right:"-12px",
      }}/>
      <img
        src="https://i.pravatar.cc/320?img=11"
        alt="Profile"
        style={{
          width:332, height:332, borderRadius:"50%",
          objectFit:"cover",
          border:`6px solid ${C.bg}`,
          boxShadow:`0 24px 64px rgba(0,0,0,.6)`,
          display:"block", position:"relative", zIndex:1,
        }}
      />
      {/* green dot */}
      <div style={{
        position:"absolute", bottom:38, right:12, zIndex:2,
        width:22, height:22, borderRadius:"50%",
        background:C.green, border:`4px solid ${C.bg}`,
      }}/>
    </div>
  );
}

function SocialBtn({ icon, href }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        width:38, height:38, borderRadius:"8px",
        background: h ? "rgba(59,130,246,.15)" : C.card,
        border:`1px solid ${h ? C.accent : C.border}`,
        color: h ? C.accentLt : C.textSec,
        textDecoration:"none",
        transform: h ? "translateY(-2px)" : "none",
        transition:"all .22s ease",
      }}
    >{icon}</a>
  );
}

function SectionHead({ eyebrow, title, highlight, desc }) {
  return (
    <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
      <div style={{
        display:"inline-flex", alignItems:"center", gap:".65rem",
        color:C.accent, fontSize:".68rem", fontWeight:"700",
        letterSpacing:"3px", textTransform:"uppercase", marginBottom:".9rem",
      }}>
        <span style={{ width:22, height:1.5, background:C.accent, display:"inline-block", opacity:.5 }}/>
        {eyebrow}
        <span style={{ width:22, height:1.5, background:C.accent, display:"inline-block", opacity:.5 }}/>
      </div>
      <h2 style={{
        fontSize:"clamp(1.9rem,4vw,2.6rem)", fontWeight:"800",
        color:C.textPri, letterSpacing:"-.025em", lineHeight:1.15,
        fontFamily:"'Inter',system-ui",
      }}>
        {title}{" "}
        {highlight && <span style={{ color:C.accent }}>{highlight}</span>}
      </h2>
      {desc && <p style={{ color:C.textMut, fontSize:".93rem", maxWidth:"480px", margin:".75rem auto 0", lineHeight:1.8 }}>{desc}</p>}
    </div>
  );
}

function TechCard({ skill }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      alignItems:"center",
      background: h ? C.cardHov : C.card,
      border:`1px solid ${h ? C.borderHov : C.border}`,
      borderRadius:"12px",
      boxShadow: h ? C.shadowBlue : "none",
      cursor:"default",
      display:"flex", flexDirection:"column", gap:".65rem",
      overflow:"hidden", padding:"1.3rem .75rem",
      position:"relative", textAlign:"center",
      transition:"all .25s ease",
    }}>
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:2,
        background:C.accent,
        transform: h ? "scaleX(1)" : "scaleX(0)", transformOrigin:"left",
        transition:"transform .25s ease",
      }}/>
      {skill.logo
        ? <img src={skill.logo} alt={skill.name} width={36} height={36} style={{ objectFit:"contain" }} draggable="false"/>
        : <span style={{ fontSize:".9rem", fontWeight:"800", color:C.accentLt, fontFamily:"'Inter',system-ui" }}>{skill.abbr}</span>
      }
      <div style={{ fontSize:".72rem", fontWeight:"600", color:C.textSec, lineHeight:1.3 }}>{skill.name}</div>
    </div>
  );
}

function ToolPill({ label }) {
  const [h, setH] = useState(false);
  return (
    <span onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      display:"inline-flex", alignItems:"center",
      background: h ? C.cardHov : C.card,
      border:`1px solid ${h ? C.borderHov : C.border}`,
      borderRadius:"30px",
      color: h ? C.textPri : C.textSec,
      cursor:"default", fontSize:".8rem", fontWeight:"500",
      padding:".42rem .9rem",
      transition:"all .2s ease",
    }}>{label}</span>
  );
}

function SoftCard({ skill }) {
  const [ref, vis] = useInView(0.2);
  const [h, setH] = useState(false);
  return (
    <div ref={ref} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      background: h ? C.cardHov : C.card,
      border:`1px solid ${h ? C.borderHov : C.border}`,
      borderRadius:"12px", padding:"1.25rem 1.4rem",
      transition:"all .25s ease",
      boxShadow: h ? C.shadowBlue : "none",
    }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:".9rem" }}>
        <span style={{ color:C.textPri, fontSize:".87rem", fontWeight:"600" }}>{skill.name}</span>
        <span style={{
          background:"rgba(59,130,246,.1)", border:`1px solid rgba(59,130,246,.22)`,
          borderRadius:"20px", color:C.accentLt,
          fontSize:".68rem", fontWeight:"700", padding:".16rem .58rem",
        }}>{skill.pct}%</span>
      </div>
      <div style={{ background:"rgba(59,130,246,.1)", borderRadius:4, height:5, overflow:"hidden" }}>
        <div style={{
          background:C.accent, borderRadius:4, height:"100%",
          width: vis ? `${skill.pct}%` : "0%",
          transition:"width 1s ease .3s",
        }}/>
      </div>
    </div>
  );
}

function ProjectCard({ project, onDetails }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      background:C.card,
      border:`1px solid ${h ? C.borderHov : C.border}`,
      borderRadius:"16px", overflow:"hidden",
      display:"flex", flexDirection:"column",
      boxShadow: h ? "0 20px 48px rgba(0,0,0,.45)" : "none",
      transition:"border-color .28s, box-shadow .28s",
      height:"100%",
    }}>
      {/* banner */}
      <div style={{
        height:170, flexShrink:0, position:"relative", overflow:"hidden",
        background:`${C.bgSec}`,
      }}>
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize:"20px 20px",
        }}/>
        <div style={{
          position:"absolute", inset:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"3.8rem", opacity:.11,
          transform: h ? "scale(1.08)" : "scale(1)",
          transition:"transform .45s ease",
        }}>{project.icon}</div>
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:"60%",
          background:`linear-gradient(to bottom,transparent,${C.card})`,
        }}/>
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:3,
          background:project.color,
          opacity: h ? 1 : 0.5, transition:"opacity .28s",
        }}/>
        <div style={{
          position:"absolute", top:".8rem", right:".8rem",
          background:"rgba(15,23,42,.85)", backdropFilter:"blur(8px)",
          border:`1px solid rgba(255,255,255,.08)`,
          borderRadius:"20px", color:C.textSec,
          fontSize:".6rem", fontWeight:"700", letterSpacing:".5px",
          padding:".22rem .6rem", textTransform:"uppercase",
        }}>{project.tag}</div>
      </div>

      <div style={{ padding:"1.25rem 1.3rem", display:"flex", flexDirection:"column", gap:".5rem", flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <h3 style={{ fontSize:".94rem", fontWeight:"700", color:C.textPri, lineHeight:1.35, fontFamily:"'Inter',system-ui", margin:0, flex:1, paddingRight:".5rem" }}>
            {project.title}
          </h3>
          <span style={{ fontSize:".67rem", color:C.textMut, fontFamily:"monospace", flexShrink:0, paddingTop:"2px" }}>{project.year}</span>
        </div>
        <p style={{ fontSize:".82rem", color:C.textMut, lineHeight:1.75, margin:0, flex:1 }}>{project.description}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:".32rem", marginTop:".2rem" }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background:"rgba(59,130,246,.07)", border:"1px solid rgba(59,130,246,.16)",
              borderRadius:"20px", color:C.accentLt,
              fontSize:".64rem", fontWeight:"600", padding:".16rem .55rem",
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ borderTop:`1px solid ${C.border}`, padding:".7rem 1.3rem", display:"flex", justifyContent:"flex-end", flexShrink:0 }}>
        <ViewBtn onClick={onDetails}/>
      </div>
    </div>
  );
}

function ViewBtn({ onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      display:"inline-flex", alignItems:"center", gap:".38rem",
      background: h ? "rgba(59,130,246,.1)" : "transparent",
      border:`1px solid ${h ? C.accent : C.border}`,
      borderRadius:"7px", color: h ? C.accentLt : C.textSec,
      cursor:"pointer", fontSize:".77rem", fontWeight:"600",
      padding:".35rem .85rem", transition:"all .2s ease",
      fontFamily:"'Inter',system-ui",
    }}>
      View Details
      <span style={{ transform: h ? "translateX(3px)" : "none", display:"inline-block", transition:"transform .2s" }}>→</span>
    </button>
  );
}

function ExpTimeline() {
  return (
    <div style={{ position:"relative", paddingLeft:"2.25rem" }}>
      <div style={{
        position:"absolute", left:"7px", top:10, bottom:0,
        width:2, background:C.accent, opacity:.3,
      }}/>
      {EXPERIENCE.map((item, i) => (
        <FadeIn key={i} delay={i*.08}>
          <div style={{ position:"relative", marginBottom:"1.6rem" }}>
            <div style={{
              position:"absolute", left:"-2.25rem", top:13,
              width:13, height:13, borderRadius:"50%",
              background:item.color, border:`3px solid ${C.bgSec}`,
            }}/>
            <div style={{
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:"12px", padding:"1.3rem 1.5rem",
              transition:"border-color .22s, box-shadow .22s",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.borderHov; e.currentTarget.style.boxShadow=C.shadowBlue; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".6rem", flexWrap:"wrap" }}>
                <span style={{
                  background:"rgba(59,130,246,.1)", border:`1px solid rgba(59,130,246,.2)`,
                  borderRadius:"20px", color:C.accent,
                  fontSize:".65rem", fontWeight:"700", letterSpacing:".6px",
                  padding:".18rem .6rem", textTransform:"uppercase",
                }}>{item.year}</span>
                <span style={{
                  background:`${item.color}18`, border:`1px solid ${item.color}32`,
                  borderRadius:"20px", color:item.color,
                  fontSize:".58rem", fontWeight:"700",
                  padding:".14rem .5rem", textTransform:"uppercase",
                }}>{item.type}</span>
              </div>
              <h4 style={{ color:C.textPri, fontSize:".96rem", fontWeight:"700", marginBottom:".3rem", fontFamily:"'Inter',system-ui" }}>{item.role}</h4>
              <div style={{ color:C.textSec, fontSize:".83rem", marginBottom:".5rem" }}>{item.org}</div>
              <p style={{ color:C.textMut, fontSize:".81rem", lineHeight:1.7, margin:0 }}>{item.desc}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

function InfoCard({ icon, label, val, action, actionLabel }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      display:"flex", alignItems:"center", gap:".85rem",
      background: h ? C.cardHov : C.card,
      border:`1px solid ${h ? C.borderHov : C.border}`,
      borderRadius:"11px", padding:".88rem 1.1rem",
      transition:"all .2s ease", cursor:"default", flexWrap:"wrap",
    }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        background:"rgba(59,130,246,.1)", border:`1px solid rgba(59,130,246,.18)`,
        borderRadius:"8px", color:C.accent,
        flexShrink:0, width:36, height:36,
      }}>{icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:C.textMut, fontSize:".64rem", fontWeight:"700", letterSpacing:".8px", textTransform:"uppercase", marginBottom:".14rem" }}>{label}</div>
        <div style={{ color:C.textSec, fontSize:".85rem", fontWeight:"500", wordBreak:"break-all" }}>{val}</div>
      </div>
      {action && (
        <button onClick={action} style={{
          background:"rgba(59,130,246,.1)", border:`1px solid rgba(59,130,246,.2)`,
          borderRadius:"6px", color:C.accentLt,
          cursor:"pointer", fontSize:".65rem", fontWeight:"700",
          padding:".2rem .6rem", textTransform:"uppercase",
          fontFamily:"'Inter',system-ui", letterSpacing:".4px",
        }}>{actionLabel}</button>
      )}
    </div>
  );
}

function SocialPill({ icon, label, href }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        display:"inline-flex", alignItems:"center", gap:".4rem",
        background: h ? "rgba(59,130,246,.1)" : C.card,
        border:`1px solid ${h ? C.borderHov : C.border}`,
        borderRadius:"30px", color: h ? C.accentLt : C.textSec,
        fontSize:".78rem", fontWeight:"500", padding:".42rem .92rem",
        textDecoration:"none", transition:"all .2s ease",
      }}
    >{icon}{label}</a>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name:"",email:"",subject:"",message:"" });
  const [status, setStatus] = useState("idle");

  const inpStyle = {
    background:"rgba(15,23,42,.9)", border:`1.5px solid ${C.border}`,
    borderRadius:"9px", color:C.textPri,
    fontFamily:"'Inter',system-ui,sans-serif", fontSize:".87rem",
    outline:"none", padding:".78rem 1rem", width:"100%",
    transition:"border-color .2s, box-shadow .2s",
  };
  const focus = e => { e.target.style.borderColor=C.accent; e.target.style.boxShadow=`0 0 0 3px rgba(59,130,246,.1)`; };
  const blur  = e => { e.target.style.borderColor=C.border; e.target.style.boxShadow="none"; };
  const submit = e => {
    e.preventDefault(); setStatus("sending");
    setTimeout(()=>{ setStatus("sent"); setTimeout(()=>{ setStatus("idle"); setForm({name:"",email:"",subject:"",message:""}); },3000); },1200);
  };
  const LBL = ({ t }) => (
    <label style={{ display:"block", fontSize:".68rem", fontWeight:"700", letterSpacing:".5px", color:C.textMut, textTransform:"uppercase", marginBottom:".4rem" }}>{t}</label>
  );

  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"16px", overflow:"hidden", padding:"2.2rem", position:"relative" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:C.accent }}/>
      <h3 style={{ fontSize:"1.18rem", fontWeight:"700", color:C.textPri, marginBottom:".3rem", fontFamily:"'Inter',system-ui" }}>Send a Message</h3>
      <p style={{ fontSize:".83rem", color:C.textMut, marginBottom:"1.6rem" }}>I'll get back to you as soon as possible.</p>
      <form onSubmit={submit}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".85rem", marginBottom:"1rem" }}>
          <div><LBL t="Name"/>  <input type="text"  placeholder="Your name"      value={form.name}    required onChange={e=>setForm({...form,name:e.target.value})}    onFocus={focus} onBlur={blur} style={inpStyle}/></div>
          <div><LBL t="Email"/> <input type="email" placeholder="your@email.com" value={form.email}   required onChange={e=>setForm({...form,email:e.target.value})}   onFocus={focus} onBlur={blur} style={inpStyle}/></div>
        </div>
        <div style={{ marginBottom:"1rem" }}>
          <LBL t="Subject"/>
          <input type="text" placeholder="What's this about?" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} onFocus={focus} onBlur={blur} style={inpStyle}/>
        </div>
        <div style={{ marginBottom:"1.2rem" }}>
          <LBL t="Message"/>
          <textarea rows={5} placeholder="Your message…" value={form.message} required onChange={e=>setForm({...form,message:e.target.value})} onFocus={focus} onBlur={blur} style={{...inpStyle,resize:"vertical"}}/>
        </div>
        <button type="submit" disabled={status!=="idle"} style={{
          width:"100%", border:"none", borderRadius:"9px", color:"#fff",
          background: status==="sent" ? C.green : C.accent,
          cursor: status!=="idle" ? "default" : "pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:".5rem",
          fontFamily:"'Inter',system-ui,sans-serif", fontSize:".88rem", fontWeight:"600",
          padding:".9rem", transition:"background .3s ease",
          boxShadow:"0 3px 12px rgba(59,130,246,.25)",
        }}>
          {status==="sent" ? "✓ Message Sent!" : status==="sending" ? "Sending…" : "Send Message →"}
        </button>
      </form>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:200,
      background:"rgba(0,0,0,.85)", backdropFilter:"blur(18px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:"1.5rem",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:C.card, border:`1px solid ${C.borderHov}`,
        borderRadius:"16px", maxWidth:"560px", width:"100%",
        maxHeight:"88vh", overflow:"hidden", display:"flex", flexDirection:"column",
        boxShadow:`0 40px 80px rgba(0,0,0,.6)`,
      }}>
        <div style={{
          height:120, flexShrink:0, position:"relative", overflow:"hidden",
          background:C.bgSec,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <div style={{ fontSize:"3.8rem", opacity:.1 }}>{project.icon}</div>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:project.color }}/>
        </div>
        <div style={{ padding:"1.7rem", overflowY:"auto", position:"relative" }}>
          <button onClick={onClose} style={{
            position:"absolute", top:".8rem", right:".8rem",
            background:"rgba(255,255,255,.05)", border:`1px solid ${C.border}`,
            color:C.textSec, width:30, height:30, borderRadius:"7px",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:".78rem",
          }}>✕</button>
          <span style={{
            display:"inline-block",
            background:"rgba(59,130,246,.1)", border:"1px solid rgba(59,130,246,.25)",
            borderRadius:"20px", color:C.accentLt,
            fontSize:".6rem", fontWeight:"700", letterSpacing:".5px",
            padding:".2rem .62rem", textTransform:"uppercase", marginBottom:".9rem",
          }}>{project.tag} · {project.year}</span>
          <h2 style={{ fontSize:"1.4rem", fontWeight:"700", color:C.textPri, margin:"0 0 1rem", fontFamily:"'Inter',system-ui", lineHeight:1.3 }}>{project.title}</h2>
          <p style={{ fontSize:".88rem", color:C.textMut, lineHeight:1.85, marginBottom:"1.5rem" }}>{project.description}</p>
          <div style={{ fontSize:".6rem", letterSpacing:"2px", textTransform:"uppercase", color:C.textMut, marginBottom:".65rem", fontWeight:"700" }}>Technologies</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:".42rem" }}>
            {project.tech.map(t=>(
              <span key={t} style={{
                background:"rgba(59,130,246,.1)", border:"1px solid rgba(59,130,246,.2)",
                borderRadius:"7px", color:C.accentLt,
                fontSize:".78rem", padding:".3rem .75rem", fontFamily:"monospace",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Preloader() {
  return (
    <div style={{
      position:"fixed", inset:0, background:C.bg, zIndex:9999,
      display:"flex", alignItems:"center", justifyContent:"center",
      flexDirection:"column", gap:"1.75rem",
    }}>
      <div style={{ fontSize:"2.6rem", fontWeight:"900", letterSpacing:"-.03em" }}>
        <span style={{ color:C.accent }}>N</span>
        <span style={{ color:C.textMut }}>P</span>
      </div>
      <div style={{
        width:32, height:32,
        border:`3px solid rgba(59,130,246,.15)`,
        borderTop:`3px solid ${C.accent}`,
        borderRadius:"50%", animation:"spin .8s linear infinite",
      }}/>
    </div>
  );
}

/* ══════════════════ MAIN ══════════════════ */
export default function Portfolio() {
  const [ready, setReady]           = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setSection] = useState("About");
  const [menuOpen, setMenu]         = useState(false);
  const [activeProject, setProject] = useState(null);
  const [copied, setCopied]         = useState(false);
  const { isMobile, isTablet }      = useViewport();

  useEffect(() => { const t = setTimeout(()=>setReady(true),1500); return()=>clearTimeout(t); }, []);
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 55);
      const sects = NAV_LINKS.map(n=>({ id:n, el:document.getElementById(n) }));
      for (let i=sects.length-1; i>=0; i--) {
        if (sects[i].el && window.scrollY >= sects[i].el.offsetTop-130) { setSection(sects[i].id); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return()=>window.removeEventListener("scroll", fn);
  }, []);

  const goTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenu(false); };
  const copy = ()  => { navigator.clipboard.writeText("nithirapeiris.me@gmail.com"); setCopied(true); setTimeout(()=>setCopied(false),2200); };

  if (!ready) return <Preloader/>;

  const W  = { margin:"0 auto", maxWidth:1440, padding: isMobile ? "0 1.2rem" : "0 4rem", width:"100%" };
  const SP = isMobile ? "4.5rem 0" : "6rem 0";

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:C.bg, color:C.textPri, minHeight:"100vh", overflowX:"hidden" }}>

      {/* ── NAV ── */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        padding: scrolled ? ".8rem 0" : "1.25rem 0",
        background: scrolled ? "rgba(15,23,42,.93)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition:"all .3s ease",
      }}>
        <div style={{ ...W, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span onClick={()=>goTo("About")} style={{
            cursor:"pointer", fontSize:"1.45rem", fontWeight:"900", letterSpacing:"-.03em",
          }}>
            <span style={{ color:C.accent }}>N</span>
            <span style={{ color:C.textMut }}>P</span>
          </span>

          {!isTablet && (
            <nav>
              <ul style={{ display:"flex", gap:".15rem", listStyle:"none" }}>
                {NAV_LINKS.map(l=>(
                  <li key={l}><NavItem label={l} active={activeSection===l} onClick={()=>goTo(l)}/></li>
                ))}
              </ul>
            </nav>
          )}

          {isTablet && (
            <button onClick={()=>setMenu(!menuOpen)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", gap:"5px", padding:4 }}>
              {[0,1,2].map(i=>(
                <span key={i} style={{
                  background:C.textPri, borderRadius:2, display:"block", height:2, width:22,
                  transition:"all .3s",
                  transform: menuOpen ? (i===0 ? "translateY(7px) rotate(45deg)" : i===1 ? "scaleX(0)" : "translateY(-7px) rotate(-45deg)") : "none",
                  opacity: menuOpen && i===1 ? 0 : 1,
                }}/>
              ))}
            </button>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {isTablet && (
        <div style={{
          position:"fixed", top:0, right: menuOpen ? 0 : "-100%",
          width:"min(280px,80vw)", height:"100vh",
          background:"rgba(15,23,42,.97)", backdropFilter:"blur(24px)",
          borderLeft:`1px solid ${C.border}`,
          zIndex:999, padding:"5rem 1.5rem 2rem",
          transition:"right .35s cubic-bezier(.4,0,.2,1)",
        }}>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:".3rem" }}>
            {NAV_LINKS.map(l=>(
              <li key={l}>
                <button onClick={()=>goTo(l)} style={{
                  background: activeSection===l ? "rgba(59,130,246,.12)" : "none",
                  border:"none", borderRadius:"9px",
                  color: activeSection===l ? C.accentLt : C.textSec,
                  cursor:"pointer", fontSize:".95rem", padding:".82rem 1.2rem",
                  textAlign:"left", width:"100%", fontFamily:"'Inter',system-ui",
                  transition:"all .2s",
                }}>{l}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ══ ABOUT ══ */}
      <section id="About" style={{
        background:C.bg, minHeight:"100vh",
        padding: isMobile ? "7rem 0 4.5rem" : "8rem 0 6rem",
        position:"relative", overflow:"hidden",
      }}>
        {/* subtle dot grid bg */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`radial-gradient(rgba(59,130,246,.07) 1px,transparent 0)`,
          backgroundSize:"30px 30px",
          WebkitMaskImage:"radial-gradient(ellipse 80% 90% at 50% 50%,#000 20%,transparent 100%)",
          maskImage:"radial-gradient(ellipse 80% 90% at 50% 50%,#000 20%,transparent 100%)",
        }}/>

        <div style={{ ...W, position:"relative", zIndex:1 }}>
          <div style={{
            display:"grid",
            gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
            gap: isTablet ? "2.5rem" : "5rem",
            alignItems:"center",
          }}>

            {/* ─── LEFT — content ─── */}
            <div style={{ display:"flex", flexDirection:"column", alignItems: isTablet ? "center" : "flex-start" }}>

              {/* eyebrow */}
              <span style={{
                fontSize:".8rem", fontWeight:"500",
                color:C.textMut, marginBottom:"1rem", display:"block",
                textAlign: isTablet ? "center" : "left",
              }}>Hi, I'm</span>

              {/* name */}
              <h1 style={{
                fontSize:"clamp(3.4rem,5.8vw,5rem)", fontWeight:"900",
                letterSpacing:"-.045em", lineHeight:1.0,
                marginBottom:".65rem", fontFamily:"'Inter',system-ui",
                textAlign: isTablet ? "center" : "left",
              }}>
                Nithira
                <span style={{ display:"block", color:C.accent }}>Dinujaya</span>
              </h1>

              {/* typed role */}
              <div style={{
                fontSize:"clamp(1rem,2vw,1.25rem)", fontWeight:"500",
                color:C.textSec, marginBottom:"1.5rem", minHeight:"1.9rem",
                textAlign: isTablet ? "center" : "left",
              }}>
                <TypedText roles={TYPED_ROLES}/>
              </div>

              {/* accent bar */}
              <div style={{
                width:50, height:3, background:C.accent, borderRadius:2,
                marginBottom:"1.6rem",
                ...(isTablet ? { margin:"0 auto 1.6rem" } : {}),
              }}/>

              {/* bio */}
              <p style={{
                color:C.textSec, fontSize:"1rem", lineHeight:1.85,
                marginBottom:"1.8rem",
                textAlign: isTablet ? "center" : "left",
                ...(isTablet ? { margin:"0 auto 1.8rem" } : {}),
              }}>
                CS undergraduate at University of Wolverhampton. I bridge the gap
                between business requirements and technical execution — with a sharp
                eye for quality and a love for clean systems.
              </p>

              {/* Currently — clean dot list, no card */}
              <div style={{ marginBottom:"2rem" }}>
                {[
                  { dot:C.green,   title:"QA Technician",         sub:"Global Solutions International" },
                  { dot:C.accent,  title:"B.Sc. Computer Science", sub:"University of Wolverhampton" },
                  { dot:C.textMut, title:"Ragama, Sri Lanka",      sub:null },
                ].map((item,i)=>(
                  <div key={i} style={{
                    display:"flex", alignItems:"flex-start", gap:".85rem",
                    marginBottom: i < 2 ? ".75rem" : 0,
                    justifyContent: isTablet ? "center" : "flex-start",
                  }}>
                    <div style={{
                      width:8, height:8, borderRadius:"50%",
                      background:item.dot, marginTop:".5rem", flexShrink:0,
                    }}/>
                    <div style={{ textAlign: isTablet ? "left" : "left" }}>
                      <span style={{ fontSize:".9rem", fontWeight:"600", color:C.textPri }}>{item.title}</span>
                      {item.sub && <span style={{ fontSize:".85rem", color:C.textMut }}> · {item.sub}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display:"flex", gap:".8rem", flexWrap:"wrap", marginBottom:"1.25rem", justifyContent: isTablet ? "center" : "flex-start" }}>
                <Btn onClick={()=>goTo("Projects")}>View Projects →</Btn>
                <Btn onClick={()=>goTo("Contact")} variant="ghost">Get in Touch</Btn>
              </div>

              {/* socials */}
              <div style={{ display:"flex", gap:".55rem", justifyContent: isTablet ? "center" : "flex-start" }}>
                <SocialBtn icon={<GithubIcon/>}   href="https://github.com/"/>
                <SocialBtn icon={<LinkedInIcon/>} href="https://linkedin.com/"/>
                <SocialBtn icon={<MailIcon/>}     href="mailto:nithirapeiris.me@gmail.com"/>
              </div>
            </div>

            {/* ─── RIGHT — circular photo ─── */}
            {!isTablet && (
              <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center", height:"100%" }}>
                <ProfilePhoto/>
              </div>
            )}
          </div>
        </div>

        {/* scroll hint */}
        {!isMobile && (
          <div onClick={()=>goTo("Skills")} style={{
            position:"absolute", bottom:"2rem", left:"50%",
            animation:"bobDown 2.2s ease-in-out infinite",
            cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:".4rem",
            color:C.textMut, fontSize:".65rem", letterSpacing:"1.5px", textTransform:"uppercase",
          }}>
            <div style={{ border:`1.5px solid rgba(59,130,246,.28)`, borderRadius:11, height:30, width:19, display:"flex", justifyContent:"center", paddingTop:3 }}>
              <div style={{ width:2.5, height:6, background:C.accent, borderRadius:2, animation:"wheelScroll 2.2s ease-in-out infinite" }}/>
            </div>
            Scroll
          </div>
        )}
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" style={{ background:C.bgSec, padding:SP }}>
        <div style={W}>
          <FadeIn><SectionHead eyebrow="What I Know" title="Skills &" highlight="Expertise" desc="Technical tools, methodologies, and domain knowledge I bring to every project."/></FadeIn>
          <FadeIn delay={.07}>
            <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fill,minmax(${isMobile?"98px":"115px"},1fr))`, gap:".85rem", marginBottom:"2.75rem" }}>
              {TECH_SKILLS.map(s=><TechCard key={s.name} skill={s}/>)}
            </div>
          </FadeIn>
          <FadeIn delay={.11}>
            <div style={{ marginBottom:"2.75rem", textAlign:"center" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:".6rem", color:C.textMut, fontSize:".66rem", fontWeight:"700", letterSpacing:"2.5px", textTransform:"uppercase", marginBottom:"1.2rem" }}>
                <span style={{ background:C.borderHov, display:"inline-block", height:1, width:20 }}/>
                Tools &amp; Methodologies
                <span style={{ background:C.borderHov, display:"inline-block", height:1, width:20 }}/>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem", justifyContent:"center" }}>
                {TOOLS.map(t=><ToolPill key={t} label={t}/>)}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={.15}>
            <p style={{ textAlign:"center", color:C.textSec, fontSize:".95rem", fontWeight:"700", marginBottom:"1.4rem" }}>Soft Skills</p>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap:".9rem", maxWidth:800, margin:"0 auto" }}>
              {SOFT_SKILLS.map((s,i)=><SoftCard key={i} skill={s}/>)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="Projects" style={{ background:C.bg, padding:SP }}>
        <div style={W}>
          <FadeIn><SectionHead eyebrow="My Work" title="Featured" highlight="Projects" desc="Selected projects showcasing QA, analytics, and full-stack development."/></FadeIn>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap:"1.1rem", alignItems:"stretch" }}>
            {PROJECTS.map((p,i)=>(
              <FadeIn key={p.id} delay={i*.07} style={{ display:"flex", flexDirection:"column" }}>
                <ProjectCard project={p} onDetails={()=>setProject(p)}/>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="Experience" style={{ background:C.bgSec, padding:SP }}>
        <div style={W}>
          <FadeIn><SectionHead eyebrow="My Journey" title="Experience &" highlight="Education"/></FadeIn>
          <ExpTimeline/>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" style={{ background:C.bg, padding:SP }}>
        <div style={W}>
          <FadeIn><SectionHead eyebrow="Get in Touch" title="Let's" highlight="Connect" desc="Have a project in mind or want to discuss opportunities? I'd love to hear."/></FadeIn>
          <div style={{ display:"grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1.5fr", gap: isTablet ? "1.75rem" : "2.75rem", alignItems:"start" }}>
            <FadeIn delay={.07}>
              <div>
                <h3 style={{ color:C.textPri, fontSize:"1.25rem", fontWeight:"700", marginBottom:".65rem", fontFamily:"'Inter',system-ui", lineHeight:1.35 }}>
                  Let's build something great together.
                </h3>
                <p style={{ color:C.textMut, fontSize:".9rem", lineHeight:1.8, marginBottom:"1.6rem" }}>
                  Whether you're looking for a QA specialist, business analyst,
                  or a project partner — I'd love to connect.
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:".6rem", marginBottom:"1.75rem" }}>
                  <InfoCard icon={<MailIcon/>}  label="Email"    val="nithirapeiris.me@gmail.com" action={copy} actionLabel={copied ? "✓ Copied" : "Copy"}/>

                  <InfoCard icon={<PinIcon/>}   label="Location" val="Ragama, Sri Lanka"/>
                </div>
                <p style={{ color:C.textMut, fontSize:".65rem", fontWeight:"700", letterSpacing:"1.8px", textTransform:"uppercase", marginBottom:".8rem" }}>Social</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
                  <SocialPill icon={<GithubIcon/>}   label="GitHub"   href="https://github.com/"/>
                  <SocialPill icon={<LinkedInIcon/>} label="LinkedIn" href="https://linkedin.com/"/>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={.13}><ContactForm/></FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"1.75rem 0 1.25rem" }}>
        <div style={W}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:".75rem" }}>
            <span style={{ fontSize:"1.25rem", fontWeight:"900", letterSpacing:"-.02em" }}>
              <span style={{ color:C.accent }}>N</span>
              <span style={{ color:C.textMut }}>P</span>
            </span>
            <span style={{ fontSize:".74rem", color:C.textMut }}>© 2025 Nithira Dinujaya · Built with React</span>
            <span style={{ fontSize:".74rem", color:C.textMut }}>Ragama, Sri Lanka</span>
          </div>
        </div>
      </footer>

      {activeProject && <ProjectModal project={activeProject} onClose={()=>setProject(null)}/>}
    </div>
  );
}

function NavItem({ label, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      background: active ? "rgba(59,130,246,.12)" : h ? "rgba(255,255,255,.04)" : "none",
      border:"none", borderRadius:"8px",
      color: active ? C.accentLt : h ? C.textPri : C.textSec,
      cursor:"pointer", fontFamily:"'Inter',system-ui,sans-serif",
      fontSize:".85rem", fontWeight: active ? "500" : "400",
      padding:".45rem .95rem", transition:"all .18s ease",
    }}>{label}</button>
  );
}