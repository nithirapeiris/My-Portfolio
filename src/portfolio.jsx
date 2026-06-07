import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Team Vertex — Project Manager",
    tag: "Leadership",
    year: "2024",
    description:
      "Led a cross-functional development team to successfully hit a 90% project milestone, optimising workflow transparency and collaboration. Gathered requirements, managed timelines, and facilitated smooth sprint delivery.",
    tech: ["Agile", "Jira", "Project Management", "Stakeholder Comm."],
    color: "#b8f0c8",
  },
  {
    id: 2,
    title: "Predictive Analytics Engine — LCH",
    tag: "Data / Analytics",
    year: "2024",
    description:
      "Developed an analytics engine to forecast facility wait times for Live Campus Hub, directly streamlining campus traffic and boosting student engagement. Translated complex data insights into actionable project requirements.",
    tech: ["Python", "SQL", "Data Analysis", "Requirements Engineering"],
    color: "#b8dff0",
  },
  {
    id: 3,
    title: "QA Test Automation Suite",
    tag: "Quality Assurance",
    year: "2024",
    description:
      "Designed and implemented a comprehensive test automation suite covering unit, integration, and system testing layers. Reduced manual regression time by 40% and improved defect detection rate significantly.",
    tech: ["Java", "JUnit", "Selenium", "CI/CD"],
    color: "#f0e4b8",
  },
  {
    id: 4,
    title: "Campus Resource Booking System",
    tag: "Full Stack",
    year: "2025",
    description:
      "Built a full-stack room and resource booking platform for university students. Features real-time availability, conflict detection, and admin dashboard with reporting capabilities.",
    tech: ["Java", "Python", "SQL", "MS Excel"],
    color: "#f0b8d4",
  },
  {
    id: 5,
    title: "Encrypted File Transfer Tool",
    tag: "Security",
    year: "2025",
    description:
      "Implemented a cross-platform CLI tool for secure file transfer with AES-256 encryption. Supports Windows and Linux, with logging, integrity verification, and batch processing.",
    tech: ["Python", "Encryption", "Cross-platform", "OS"],
    color: "#d4b8f0",
  },
];

const SKILLS = [
  { group: "Languages", items: ["Java", "Python", "SQL", "JavaScript", "HTML", "CSS"] },
  { group: "Tools", items: ["MS Excel", "Git", "Jira", "Postman", "Selenium", "Confluence"] },
  {
    group: "Testing",
    items: ["Unit Testing", "Integration Testing", "System Testing"],
  },
  {
    group: "Domain",
    items: [
      "Project Management",
      "Business Analysis",
      "Networking Basics",
      "Encryption",
      "Operating Systems",
      "Cross-platform Software",
    ],
  },
  { group: "Soft Skills", items: ["Critical Thinking", "Time Management"] },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((n) => ({
        id: n,
        el: document.getElementById(n),
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("nithirapeiris.me@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.root}>
      {/* ── NAV ── */}
      <nav style={styles.nav}>
        <span style={styles.navLogo} onClick={() => scrollTo("About")}>ND</span>
        <div style={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                ...styles.navLink,
                ...(activeSection === l ? styles.navLinkActive : {}),
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <button style={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_LINKS.map((l) => (
            <button key={l} style={styles.mobileLink} onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="About" style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroContent}>
          <div style={styles.heroTag}>Business Analyst · QA Specialist</div>
          <h1 style={styles.heroName}>
            Nithira<br />Dinujaya
          </h1>
          <p style={styles.heroSub}>
            CS undergraduate at University of Wolverhampton. I bridge the gap
            between business requirements and technical execution — with a sharp
            eye for quality and a love for clean systems.
          </p>
          <div style={styles.heroActions}>
            <button style={styles.btnPrimary} onClick={() => scrollTo("Projects")}>
              View Projects
            </button>
            <button style={styles.btnGhost} onClick={() => scrollTo("Contact")}>
              Get in Touch
            </button>
          </div>
          <div style={styles.heroMeta}>
            <span>📍 Ragama, Sri Lanka</span>
            <span>🎓 Wolverhampton · 2024–present</span>
            <span>💼 QA @ Global Solutions</span>
          </div>
        </div>
        <div style={styles.heroArt}>
          <div style={styles.artCircle1} />
          <div style={styles.artCircle2} />
          <div style={styles.artInitials}>ND</div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" style={styles.section}>
        <FadeIn>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>01</span>
            <h2 style={styles.sectionTitle}>Skills & Tools</h2>
          </div>
        </FadeIn>
        <div style={styles.skillsGrid}>
          {SKILLS.map((grp, gi) => (
            <FadeIn key={grp.group} delay={gi * 0.08} style={{ height: "100%" }}>
              <div style={styles.skillCard}>
                <div style={styles.skillGroup}>{grp.group}</div>
                <div style={styles.skillItems}>
                  {grp.items.map((item) => (
                    <span key={item} style={styles.skillPill}>{item}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="Projects" style={{ ...styles.section, background: "#0d0d0d" }}>
        <FadeIn>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>02</span>
            <h2 style={styles.sectionTitle}>Projects</h2>
          </div>
        </FadeIn>
        <div style={styles.projectsGrid}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.07} style={{ height: "100%" }}>
              <div
                style={{
                  ...styles.projectCard,
                  borderTop: `3px solid ${p.color}`,
                }}
                onClick={() => setActiveProject(p)}
              >
                <div style={styles.projectTop}>
                  <span style={{ ...styles.projectTag, color: p.color }}>{p.tag}</span>
                  <span style={styles.projectYear}>{p.year}</span>
                </div>
                <h3 style={styles.projectTitle}>{p.title}</h3>
                <p style={styles.projectDesc}>{p.description.slice(0, 110)}…</p>
                <div style={styles.techRow}>
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} style={styles.techChip}>{t}</span>
                  ))}
                  {p.tech.length > 3 && (
                    <span style={styles.techChip}>+{p.tech.length - 3}</span>
                  )}
                </div>
                <div style={{ ...styles.viewMore, color: p.color }}>
                  View details →
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE / EDUCATION ── */}
      <section id="Experience" style={styles.section}>
        <FadeIn>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>03</span>
            <h2 style={styles.sectionTitle}>Experience & Education</h2>
          </div>
        </FadeIn>
        <div style={styles.timeline}>
          {[
            {
              year: "Present",
              role: "Quality Assurance Technician",
              org: "Global Solutions International Pvt Ltd",
              type: "work",
              desc: "Executing comprehensive testing strategies across unit, integration, and system layers to ensure software quality and reliability.",
            },
            {
              year: "2024 – Present",
              role: "B.Sc. (Hons) in Computer Science",
              org: "University of Wolverhampton",
              type: "edu",
              desc: "Pursuing honours degree with focus on software engineering, data structures, and systems design.",
            },
            {
              year: "2023",
              role: "Engineering Foundation Program",
              org: "CINEC Campus",
              type: "edu",
              desc: "Completed intensive engineering foundation covering mathematics, physics, and programming fundamentals.",
            },
            {
              year: "2023",
              role: "English Certificate Course",
              org: "Aquinas College",
              type: "cert",
              desc: "Certified English proficiency course focusing on professional and academic communication.",
            },
            {
              year: "Current",
              role: "English Certificate Course",
              org: "British Council",
              type: "cert",
              desc: "Ongoing advanced English language training with the British Council.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={styles.timelineItem}>
                <div style={styles.timelineDot}>
                  <span style={styles.timelineDotInner} />
                </div>
                <div style={styles.timelineBody}>
                  <div style={styles.timelineYear}>{item.year}</div>
                  <div style={styles.timelineRole}>{item.role}</div>
                  <div style={styles.timelineOrg}>{item.org}</div>
                  <p style={styles.timelineDesc}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" style={{ ...styles.section, background: "#0d0d0d" }}>
        <FadeIn>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>04</span>
            <h2 style={styles.sectionTitle}>Get In Touch</h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={styles.contactCard}>
            <p style={styles.contactIntro}>
              Whether you're looking for a QA specialist, business analyst, or a
              collaborative project partner — I'd love to connect.
            </p>
            <div style={styles.contactItems}>
              <div style={styles.contactRow}>
                <span style={styles.contactIcon}>📧</span>
                <span style={styles.contactVal}>nithirapeiris.me@gmail.com</span>
                <button style={styles.copyBtn} onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={styles.contactRow}>
                <span style={styles.contactIcon}>📞</span>
                <span style={styles.contactVal}>+94 766 678 127</span>
              </div>
              <div style={styles.contactRow}>
                <span style={styles.contactIcon}>📍</span>
                <span style={styles.contactVal}>495/1 Heenkenda, Ragama, Sri Lanka</span>
              </div>
            </div>
            <div style={styles.contactActions}>
              <a
                href="mailto:nithirapeiris.me@gmail.com"
                style={styles.btnPrimary}
              >
                Send Email
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <span style={styles.footerLogo}>ND</span>
        <span style={styles.footerText}>
          © 2025 Nithira Dinujaya · Built with passion
        </span>
      </footer>

      {/* ── PROJECT MODAL ── */}
      {activeProject && (
        <div style={styles.modalOverlay} onClick={() => setActiveProject(null)}>
          <div
            style={{
              ...styles.modal,
              borderTop: `4px solid ${activeProject.color}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={styles.modalClose}
              onClick={() => setActiveProject(null)}
            >
              ✕
            </button>
            <span
              style={{
                ...styles.projectTag,
                color: activeProject.color,
                fontSize: "0.75rem",
              }}
            >
              {activeProject.tag} · {activeProject.year}
            </span>
            <h2 style={styles.modalTitle}>{activeProject.title}</h2>
            <p style={styles.modalDesc}>{activeProject.description}</p>
            <div style={{ marginTop: "1.5rem" }}>
              <div style={styles.skillGroup}>Technologies Used</div>
              <div style={styles.techRowModal}>
                {activeProject.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      ...styles.techChip,
                      background: activeProject.color + "22",
                      color: activeProject.color,
                      border: `1px solid ${activeProject.color}44`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────── STYLES ────────────── */
const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "#111111",
    color: "#e8e4dc",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 3rem",
    background: "rgba(17,17,17,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #2a2a2a",
  },
  navLogo: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#c9b99a",
    cursor: "pointer",
    letterSpacing: "0.1em",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
  },
  navLink: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "0.85rem",
    cursor: "pointer",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "color 0.2s",
    padding: "4px 0",
  },
  navLinkActive: {
    color: "#c9b99a",
    borderBottom: "1px solid #c9b99a",
  },
  burger: {
    display: "none",
    background: "none",
    border: "none",
    color: "#c9b99a",
    fontSize: "1.3rem",
    cursor: "pointer",
  },
  mobileMenu: {
    position: "fixed",
    top: "60px",
    left: 0,
    right: 0,
    background: "#181818",
    zIndex: 99,
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    borderBottom: "1px solid #2a2a2a",
  },
  mobileLink: {
    background: "none",
    border: "none",
    color: "#e8e4dc",
    fontSize: "1rem",
    padding: "0.8rem 1rem",
    cursor: "pointer",
    textAlign: "left",
    borderBottom: "1px solid #2a2a2a",
  },

  /* HERO */
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "8rem 8% 4rem",
    position: "relative",
    overflow: "hidden",
    gap: "4rem",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at 70% 50%, rgba(201,185,154,0.07) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  heroContent: {
    maxWidth: "600px",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
  },
  heroTag: {
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9b99a",
    marginBottom: "1.5rem",
    fontFamily: "'Georgia', serif",
  },
  heroName: {
    fontSize: "clamp(3.5rem, 8vw, 7rem)",
    fontWeight: "400",
    lineHeight: 1,
    color: "#f0ebe0",
    margin: "0 0 1.5rem 0",
    fontFamily: "'Georgia', serif",
    letterSpacing: "-0.02em",
  },
  heroSub: {
    fontSize: "1.05rem",
    lineHeight: 1.8,
    color: "#999",
    maxWidth: "500px",
    marginBottom: "2.5rem",
  },
  heroActions: {
    display: "flex",
    gap: "1rem",
    marginBottom: "3rem",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  heroMeta: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    fontSize: "0.8rem",
    color: "#666",
  },
  heroArt: {
    position: "relative",
    width: "340px",
    height: "340px",
    flexShrink: 0,
    zIndex: 2,
    marginRight: "10vw",
  },
  artCircle1: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "1px solid rgba(201,185,154,0.25)",
    animation: "spin 20s linear infinite",
  },
  artCircle2: {
    position: "absolute",
    inset: "30px",
    borderRadius: "50%",
    border: "1px solid rgba(201,185,154,0.12)",
    animation: "spin 14s linear infinite reverse",
  },
  artInitials: {
    position: "absolute",
    inset: "60px",
    borderRadius: "50%",
    background: "rgba(201,185,154,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    color: "#c9b99a",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.05em",
    border: "1px solid rgba(201,185,154,0.15)",
  },

  /* BUTTONS */
  btnPrimary: {
    background: "#c9b99a",
    color: "#111",
    border: "none",
    padding: "0.85rem 2rem",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    textDecoration: "none",
    display: "inline-block",
    transition: "background 0.2s",
  },
  btnGhost: {
    background: "transparent",
    color: "#c9b99a",
    border: "1px solid #c9b99a",
    padding: "0.85rem 2rem",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    transition: "background 0.2s",
  },

  /* SECTIONS */
  section: {
    padding: "6rem 5rem",
    background: "#111111",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "1.5rem",
    marginBottom: "3.5rem",
    borderBottom: "1px solid #2a2a2a",
    paddingBottom: "1.5rem",
  },
  sectionNum: {
    fontSize: "0.75rem",
    color: "#c9b99a",
    fontFamily: "monospace",
    letterSpacing: "0.1em",
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: "400",
    color: "#f0ebe0",
    margin: 0,
    fontFamily: "'Georgia', serif",
  },

  /* SKILLS */
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  skillCard: {
    background: "#181818",
    border: "1px solid #2a2a2a",
    padding: "2rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  skillGroup: {
    fontSize: "0.85rem",
    fontWeight: "bold",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#c9b99a",
    marginBottom: "1.5rem",
    fontFamily: "'Georgia', serif",
  },
  skillItems: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
  },
  skillPill: {
    background: "rgba(201, 185, 154, 0.05)",
    border: "1px solid rgba(201, 185, 154, 0.15)",
    color: "#d4c8b2",
    padding: "0.4rem 1rem",
    fontSize: "0.8rem",
    borderRadius: "4px",
    fontFamily: "monospace",
  },

  /* PROJECTS */
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  projectCard: {
    background: "#181818",
    border: "1px solid #2a2a2a",
    padding: "2rem",
    cursor: "pointer",
    transition: "border-color 0.2s, transform 0.2s",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  projectTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  projectTag: {
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  projectYear: {
    fontSize: "0.75rem",
    color: "#555",
    fontFamily: "monospace",
  },
  projectTitle: {
    fontSize: "1.05rem",
    fontWeight: "400",
    color: "#f0ebe0",
    margin: "0 0 0.75rem 0",
    fontFamily: "'Georgia', serif",
    lineHeight: 1.4,
  },
  projectDesc: {
    fontSize: "0.85rem",
    color: "#777",
    lineHeight: 1.7,
    marginBottom: "1.25rem",
  },
  techRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    marginBottom: "1rem",
  },
  techChip: {
    background: "#222",
    border: "1px solid #333",
    color: "#888",
    padding: "0.2rem 0.6rem",
    fontSize: "0.72rem",
    borderRadius: "2px",
    fontFamily: "monospace",
  },
  viewMore: {
    fontSize: "0.78rem",
    letterSpacing: "0.05em",
    fontFamily: "monospace",
    marginTop: "auto",
    paddingTop: "1.5rem",
  },

  /* TIMELINE */
  timeline: {
    position: "relative",
    paddingLeft: "2rem",
    borderLeft: "1px solid #2a2a2a",
  },
  timelineItem: {
    position: "relative",
    marginBottom: "3rem",
    paddingLeft: "2.5rem",
  },
  timelineDot: {
    position: "absolute",
    left: "-2.5rem",
    top: "0.3rem",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#c9b99a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timelineDotInner: {},
  timelineBody: {},
  timelineYear: {
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    color: "#c9b99a",
    textTransform: "uppercase",
    fontFamily: "monospace",
    marginBottom: "0.3rem",
  },
  timelineRole: {
    fontSize: "1.1rem",
    color: "#f0ebe0",
    fontFamily: "'Georgia', serif",
    marginBottom: "0.2rem",
  },
  timelineOrg: {
    fontSize: "0.85rem",
    color: "#888",
    marginBottom: "0.6rem",
  },
  timelineDesc: {
    fontSize: "0.85rem",
    color: "#666",
    lineHeight: 1.7,
    maxWidth: "600px",
  },

  /* CONTACT */
  contactCard: {
    background: "#181818",
    border: "1px solid #2a2a2a",
    padding: "3rem",
    maxWidth: "700px",
    margin: "0 auto",
  },
  contactIntro: {
    fontSize: "1.05rem",
    color: "#999",
    lineHeight: 1.8,
    marginBottom: "2.5rem",
    maxWidth: "500px",
  },
  contactItems: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2.5rem",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  contactIcon: {
    fontSize: "1.1rem",
    width: "28px",
  },
  contactVal: {
    fontSize: "0.9rem",
    color: "#bbb",
    flex: 1,
  },
  copyBtn: {
    background: "none",
    border: "1px solid #333",
    color: "#c9b99a",
    padding: "0.2rem 0.7rem",
    fontSize: "0.72rem",
    cursor: "pointer",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'Georgia', serif",
  },
  contactActions: {
    display: "flex",
    gap: "1rem",
  },

  /* FOOTER */
  footer: {
    padding: "2rem 5rem",
    borderTop: "1px solid #2a2a2a",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#0d0d0d",
  },
  footerLogo: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.2rem",
    color: "#c9b99a",
    letterSpacing: "0.1em",
  },
  footerText: {
    fontSize: "0.78rem",
    color: "#444",
  },

  /* MODAL */
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(8px)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  modal: {
    background: "#181818",
    border: "1px solid #2a2a2a",
    padding: "2.5rem",
    maxWidth: "580px",
    width: "100%",
    position: "relative",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  modalClose: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: "400",
    color: "#f0ebe0",
    fontFamily: "'Georgia', serif",
    margin: "0.75rem 0 1rem 0",
    lineHeight: 1.4,
  },
  modalDesc: {
    fontSize: "0.95rem",
    color: "#999",
    lineHeight: 1.8,
  },
  techRowModal: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.75rem",
  },
};
