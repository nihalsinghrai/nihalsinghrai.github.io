// Behaviour: marquee, skills chips, scroll reveal, parallax shapes.
// To change skills edit the arrays T (marquee) and S (stack) below.
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const T=["Python","JavaScript","PostgreSQL","MongoDB","Supabase","n8n","REST APIs","WhatsApp API","Telegram Bot API","Gemini API","React","Tailwind CSS"],h=T.map(s=>"<span>"+s+"</span>").join("");
document.getElementById("tk").innerHTML=h+h;
const S=[["languages",["Python","JavaScript","HTML","CSS"]],["databases",["DBMS","PostgreSQL","MongoDB","Supabase","SQL"]],["apis",["REST APIs","GitHub API","WhatsApp Business API","Telegram Bot API","Google Workspace APIs","Gemini API"]],["automation",["n8n","workflow design","error handling","approval flows","AI agents"]],["tools",["GitHub","Google Sheets","Google Drive","Google Calendar","Tally"]],["learning",["React","Vite","Tailwind CSS"]]];
const st=document.getElementById("st");
S.forEach(([t,a])=>{const g=document.createElement("div");g.className="grp rv";const h3=document.createElement("h3");h3.textContent="/ "+t;const c=document.createElement("div");c.className="chips";a.forEach(x=>{const s=document.createElement("span");s.className="chip";s.textContent=x;c.append(s)});g.append(h3,c);st.append(g)});
const io="IntersectionObserver" in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.08}):null;
document.querySelectorAll(".rv").forEach(el=>io?io.observe(el):el.classList.add("in"));
if(!RM){const sh=[...document.querySelectorAll(".sh")];let q=false;addEventListener("scroll",()=>{if(q)return;q=true;requestAnimationFrame(()=>{const y=scrollY;sh.forEach(s=>{const p=+s.dataset.p;s.style.transform="translateY("+y*p+"px) rotate("+y*p*.4+"deg)"});q=false})},{passive:true})}
