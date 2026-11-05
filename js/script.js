const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const EMAIL = "chikkuduv3@gmail.com";
function toast(t) { const e = $("#toast"); e.textContent = t; e.classList.add("show"); setTimeout(() => e.classList.remove("show"), 2200) }
$("#y").textContent = new Date().getFullYear();

/* theme */
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t } catch (e) { }
$("#theme").onclick = () => { const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches; const n = dark ? "light" : "dark"; root.dataset.theme = n; try { localStorage.setItem("theme", n) } catch (e) { } };

/* mobile menu */
$("#menu").onclick = () => $("#nav").classList.toggle("open");
$$("#nav a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));

/* typing */
const roles = ["Software Engineer", "React Developer", "Python Developer", "AI & ML Graduate"];
let ri = 0, ci = 0, del = false;
(function tick() {
    const w = roles[ri]; $("#tw").textContent = w.slice(0, ci);
    if (!del && ci === w.length) { del = true; return setTimeout(tick, 1500) }
    if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length }
    ci += del ? -1 : 1; setTimeout(tick, del ? 40 : 80)
})();

/* skills */
const skills = { Languages: ["Python", "JavaScript", "SQL"], Frontend: ["React", "HTML5", "CSS3", "Responsive Web Design"], "Backend & Data": ["REST APIs", "API Integration", "SQL"], Tools: ["Git", "GitHub", "VS Code"], Concepts: ["Object-Oriented Programming", "Data Structures", "Version Control", "Software Development Lifecycle"] };
let sk = "All";
function drawSkills() {
    $("#stabs").innerHTML = ["All", ...Object.keys(skills)].map(k => `<button class="tab ${k === sk ? "on" : ""}" data-k="${k}">${k}</button>`).join("");
    const list = sk === "All" ? [...new Set(Object.values(skills).flat())] : skills[sk];
    $("#schips").innerHTML = list.map((s, i) => `<span class="chip" style="animation-delay:${i * 40}ms">${s}</span>`).join("");
    $$("#stabs .tab").forEach(b => b.onclick = () => { sk = b.dataset.k; drawSkills() })
}
drawSkills();

/* projects */
const projects = [
    { t: "Task Tracker Application", d: "A task management app for organizing daily activities and improving productivity.", tags: ["React", "REST API"], f: ["Task creation, editing and deletion", "Completion tracking", "Interactive UI powered by React and REST API integration", "Modular component architecture with maintainable code practices"] },
    { t: "Portfolio Website", d: "A responsive personal portfolio showcasing projects, technical skills and professional achievements.", tags: ["HTML5", "CSS3", "JavaScript"], f: ["Responsive layouts for desktop and mobile", "Built with a focus on performance and accessibility", "Clean user interface design"] }];
let pf = "All";
function drawProj() {
    const tags = ["All", ...new Set(projects.flatMap(p => p.tags))];
    $("#ptabs").innerHTML = tags.map(k => `<button class="tab ${k === pf ? "on" : ""}" data-k="${k}">${k}</button>`).join("");
    $("#pgrid").innerHTML = projects.map((p, i) => ({ p, i })).filter(o => pf === "All" || o.p.tags.includes(pf)).map(({ p, i }) => `<div class="card proj" data-i="${i}"><h3>${p.t}</h3><p>${p.d}</p><div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div><div class="more">View details →</div></div>`).join("");
    $$("#ptabs .tab").forEach(b => b.onclick = () => { pf = b.dataset.k; drawProj() });
    $$(".proj").forEach(c => c.onclick = () => { const p = projects[c.dataset.i]; $("#mc").innerHTML = `<h3>${p.t}</h3><p>${p.d}</p><ul style="color:var(--muted);padding-left:18px">${p.f.map(x => `<li style="margin-bottom:6px">${x}</li>`).join("")}</ul><div class="tags" style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0">${p.tags.map(t => `<span>${t}</span>`).join("")}</div><button class="btn s" id="close" style="margin:0">Close</button>`; $("#modal").classList.add("open"); $("#close").onclick = () => $("#modal").classList.remove("open") })
}
drawProj();
$("#modal").onclick = e => { if (e.target.id === "modal") e.currentTarget.classList.remove("open") };
addEventListener("keydown", e => { if (e.key === "Escape") $("#modal").classList.remove("open") });

/* accordion */
$("#acb").onclick = () => { const o = $("#acl").classList.toggle("open"); $("#acb").textContent = o ? "Hide responsibilities ▴" : "Show responsibilities ▾" };

/* contact */
$("#copy").onclick = () => { try { navigator.clipboard.writeText(EMAIL).then(() => toast("Email copied"), () => toast(EMAIL)) } catch (e) { toast(EMAIL) } };
$("#send").onclick = () => {
    const n = $("#fn").value.trim(), m = $("#fm").value.trim(); if (!m) return toast("Please write a message");
    location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Portfolio enquiry" + (n ? " from " + n : "")) + "&body=" + encodeURIComponent(m)
};

/* reveal, progress, scroll-spy */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }), { threshold: .12 });
$$(".rv").forEach(e => io.observe(e));
const links = $$("#nav a"), secs = links.map(a => $(a.getAttribute("href")));
addEventListener("scroll", () => {
    const h = document.documentElement; $("#bar").style.width = (scrollY / (h.scrollHeight - innerHeight || 1) * 100) + "%";
    let cur = -1; secs.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = i }); links.forEach((a, i) => a.classList.toggle("on", i === cur))
}, { passive: true });
