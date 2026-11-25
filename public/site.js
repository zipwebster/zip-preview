

const pages=[...document.querySelectorAll('[data-page]')];
let activePage;
function route(){
 const raw=location.hash.slice(1);
 const name=raw==='/people'?'people':raw==='/programmes'?'programmes':raw==='/latest'?'latest':raw==='/about'||raw==='approach'?'about':'home';
 const page=pages.find(p=>p.dataset.page===name);
 if(page!==activePage){
  pages.forEach(p=>p.hidden=p!==page);
  activePage=page;
  document.body.dataset.page=name;
  document.title=name==='home'?'ZIP — We build good things.':name[0].toUpperCase()+name.slice(1)+' — ZIP';
  window.scrollTo({top:0,behavior:'instant'});
  page.setAttribute('tabindex','-1');page.focus({preventScroll:true});
  page.classList.remove('page-enter');void page.offsetWidth;page.classList.add('page-enter');
 }
 document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')==='#/'+name)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 if(raw==='approach')requestAnimationFrame(()=>document.querySelector('#approach').scrollIntoView());
}
addEventListener('hashchange',route);route();
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const programmeOverview=document.querySelector('#programme-overview');
document.querySelectorAll('[data-programme]').forEach(button=>button.addEventListener('click',()=>{
document.querySelector('#programme-overview-title').textContent=button.dataset.programme;
const content=document.getElementById(button.dataset.overview);
if(content) document.querySelector('.programme-overview-body').innerHTML=content.innerHTML;
document.querySelector('#programme-placeholder-note').hidden=button.dataset.placeholder!=='true';
programmeOverview.showModal();programmeOverview.scrollTop=0;document.body.style.overflow='hidden';
}));
programmeOverview.addEventListener('close',()=>{document.body.style.overflow=''});
programmeOverview.addEventListener('click',event=>{const r=programmeOverview.getBoundingClientRect();if(event.target===programmeOverview&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))programmeOverview.close()});



addEventListener('scroll',()=>document.body.classList.toggle('scrolled',scrollY>20),{passive:true});

const architectureMotion=document.querySelector('.architecture-motion');
const architectureHero=document.querySelector('.architecture-hero');
let architecturePaused=false;
function updateArchitectureMotion(){
 const stop=architecturePaused||reduced.matches;
 architectureHero.classList.toggle('motion-off',stop);
 architectureMotion.textContent=reduced.matches?'Motion off':stop?'Resume motion':'Pause motion';
 architectureMotion.setAttribute('aria-pressed',String(stop));
 architectureMotion.disabled=reduced.matches;
}
architectureMotion.addEventListener('click',()=>{architecturePaused=!architecturePaused;updateArchitectureMotion()});
reduced.addEventListener('change',updateArchitectureMotion);updateArchitectureMotion();
const menu=document.querySelector('#mobile-nav'),menuButton=document.querySelector('#menu-toggle');function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menu +'}menuButton.onclick=()=>{menu.hidden=!menu.hidden;menuButton.setAttribute('aria-expanded',String(!menu.hidden));menuButton.textContent=menu.hidden?'Menu +':'Close ×'};menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));addEventListener('hashchange',closeMenu);addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const panel=document.querySelector('#contact-panel');document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>{closeMenu();panel.showModal();document.body.style.overflow='hidden'}));panel.addEventListener('close',()=>{document.body.style.overflow=''});panel.addEventListener('click',e=>{const r=panel.getBoundingClientRect();if(e.target===panel&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))panel.close()});



const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');revealObserver.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.step,.news-card,.person,.team-member,.about>*,.partners').forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--delay',(i%3)*100+'ms');revealObserver.observe(el)});
