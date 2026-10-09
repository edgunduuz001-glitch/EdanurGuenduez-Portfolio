'use strict';
document.documentElement.classList.toggle('windows-desktop',/Windows/i.test(navigator.userAgentData?.platform||navigator.platform||navigator.userAgent));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const sourceMap={shoco:'assets/media/shoco.mp4',afterimage:'assets/media/afterimage-smooth.mp4',steal:'assets/media/steal.mp4',multiwars:'assets/media/multiwars.mp4'};
document.querySelectorAll('.hero-video').forEach(video=>{
 video.src=video.dataset.videoKey==='afterimage'&&matchMedia('(max-width:760px)').matches?'assets/media/afterimage-mobile-smooth.mp4':sourceMap[video.dataset.videoKey];video.preload=video.dataset.videoKey==='afterimage'?'auto':'metadata';video.poster='assets/media/'+video.dataset.videoKey+'.jpg';video.muted=true;video.autoplay=!reduced.matches;
 const toggle=document.createElement('button');toggle.type='button';toggle.className='video-toggle';const icon=document.createElement('span');icon.className='video-control-icon';icon.setAttribute('aria-hidden','true');toggle.append(icon);video.parentElement.append(toggle);
 let manualPause=false,inView=true;
 if(video.dataset.videoKey==='afterimage'){const compact=matchMedia('(max-width:760px)');compact.addEventListener('change',()=>{video.pause();video.src=compact.matches?'assets/media/afterimage-mobile-smooth.mp4':sourceMap.afterimage;video.load();video.addEventListener('loadeddata',()=>{if(!manualPause&&inView&&!document.hidden&&!reduced.matches)video.play().catch(()=>{})},{once:true})})}
const sync=()=>{toggle.dataset.state=video.paused?'paused':'playing';const label=video.paused?'Play animation':'Stop animation';toggle.setAttribute('aria-label',label);toggle.title=label;};
 toggle.addEventListener('click',async()=>{if(video.paused){manualPause=false;await video.play().catch(()=>{});}else{manualPause=true;video.pause();}sync()});video.addEventListener('play',sync);video.addEventListener('pause',sync);video.addEventListener('error',()=>{video.hidden=true;toggle.hidden=true});sync();if(!reduced.matches)video.play().catch(sync);const playback=()=>{if(document.hidden||!inView||reduced.matches||manualPause)video.pause();else video.play().catch(()=>{})};document.addEventListener('visibilitychange',playback);reduced.addEventListener('change',playback);new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;playback()},{threshold:.05}).observe(video.parentElement);
});
if('IntersectionObserver'in window){document.documentElement.classList.add('site-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.case-section>div,.case-section>p').forEach(n=>{if(!n.closest('.site-nav,.case-hero,.context-grid,.site-footer')){n.classList.add('fade-in');observer.observe(n)}});}

// Preserve the back-to-top link and add the next project at the lower right.
const projects=[['shoco','ShoCo','shoco-scroll-story.html'],['afterimage','Afterimage','afterimage-scroll-story.html'],['steal','Steal & Seal','steal-and-seal-scroll-story.html'],['multiwars','Card UI Design','multiwars-scroll-story.html'],['foody','Foody','foody-scroll-story.html']];
const current=projects.findIndex(p=>p[0]===document.body.dataset.page);const footer=document.querySelector('.site-footer');
if(current>=0&&footer){const next=projects[(current+1)%projects.length];const nav=document.createElement('nav');nav.className='footer-nav';nav.setAttribute('aria-label','Project navigation');const link=document.createElement('a');link.href=next[2];link.className='next-project';const small=document.createElement('small');small.textContent='Next project';link.append(small,document.createTextNode(next[1]+' ↗'));const back=footer.querySelector('a[href="#top"]');nav.append(link);if(back)nav.append(back);footer.append(nav);}
// Enlarged selected TCG cards: native dialog supports Escape and focus return.
if(document.body.dataset.page==='multiwars'){
 const gallery=document.querySelector('[data-node-id="212:696"]');const dialog=document.createElement('dialog');dialog.className='card-lightbox';dialog.setAttribute('aria-label','Selected Multiwars card');const close=document.createElement('button');close.type='button';close.className='lightbox-close';close.textContent='×';close.setAttribute('aria-label','Close enlarged card');const figure=document.createElement('figure'),image=document.createElement('img'),caption=document.createElement('figcaption');figure.append(image,caption);dialog.append(close,figure);document.body.append(dialog);
 close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 if(gallery)gallery.querySelectorAll('.image-slot').forEach(slot=>{const original=slot.querySelector('img');if(!original)return;const button=document.createElement('button');for(const attr of slot.attributes)button.setAttribute(attr.name,attr.value);button.type='button';button.classList.add('card-zoom');const label=slot.parentElement.querySelector('p')?.textContent.trim()||original.alt;button.setAttribute('aria-label','Enlarge '+label);button.setAttribute('aria-haspopup','dialog');while(slot.firstChild)button.append(slot.firstChild);slot.replaceWith(button);button.addEventListener('click',()=>{image.src=original.src;image.alt=label;caption.textContent=label;dialog.showModal()});});
}
if(document.body.dataset.page==='steal'){
 const host=document.querySelector('[data-node-id="212:580"]');const before=host?.querySelector('img');const after=host?.querySelectorAll('img')[1];
 if(before&&after){const compare=document.createElement('div');compare.className='artwork-compare';const final=after.cloneNode();const early=before.cloneNode();early.className='compare-before';final.className='compare-after';const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.value='50';range.className='compare-control';range.setAttribute('aria-label','Compare early wireframe and developed game UI');range.setAttribute('aria-valuetext','50 percent wireframe');const line=document.createElement('span');line.className='compare-line';line.setAttribute('aria-hidden','true');const label=(cls,text)=>{const l=document.createElement('span');l.className='compare-label '+cls;l.textContent=text;return l};compare.append(final,early,label('before','Early wireframe'),label('after','Developed UI'),line,range);host.replaceChildren(compare);host.style.height='auto';range.addEventListener('input',()=>{compare.style.setProperty('--split',range.value+'%');range.setAttribute('aria-valuetext',range.value+' percent wireframe')});}
}
if(document.body.dataset.page==='foody'){
 const host=document.querySelector('[data-node-id="239:136"]');const originals=host?[...host.querySelectorAll('img')]:[];
 if(originals.length===2){const sources=originals.map(i=>i.src),demo=document.createElement('div');demo.className='theme-demo';const buttons=document.createElement('div');buttons.className='theme-buttons';buttons.setAttribute('role','group');buttons.setAttribute('aria-label','Foody appearance');const img=document.createElement('img');img.className='theme-preview';img.src=sources[0];img.alt='Foody home in light mode';const caption=document.createElement('p');caption.className='theme-caption';caption.textContent='Light · A warm starting point';['Light','Dark'].forEach((name,i)=>{const button=document.createElement('button');button.type='button';button.textContent=name;button.setAttribute('aria-pressed',String(i===0));button.addEventListener('click',()=>{img.src=sources[i];img.alt='Foody home in '+name.toLowerCase()+' mode';caption.textContent=i?'Dark · The same familiar structure':'Light · A warm starting point';buttons.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))});buttons.append(button)});demo.append(buttons,img,caption);host.replaceChildren(demo);}
}
if(document.body.dataset.page==='afterimage'){
 const preview=document.querySelector('[data-node-id="212:461"] img');
 const items=['212:452','212:455','212:458'].map(id=>document.querySelector(`[data-node-id="${id}"]`));
 if(preview&&items.every(Boolean)){
  const sources=[preview.getAttribute('src'),'assets/afterimage/capture-home.webp','assets/afterimage/import-home.webp'];
  const labels=['Draw','Capture','Import'];let selected=0;
  sources.forEach(src=>{const image=new Image();image.src=src;image.decode?.().catch(()=>{})});
  const select=i=>{selected=i;preview.src=sources[i];preview.alt=labels[i]+' selected on the Afterimage home screen';items.forEach((item,j)=>item.setAttribute('aria-pressed',String(i===j)))};
  items.forEach((item,i)=>{item.tabIndex=0;item.setAttribute('role','button');item.setAttribute('aria-label',labels[i]+' workflow');item.addEventListener('mouseenter',()=>select(i));item.addEventListener('focus',()=>select(i));item.addEventListener('click',()=>select(i));item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i)}else if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();items[(i+(e.key==='ArrowDown'?1:2))%3].focus()}})});
  select(0);
 }
}
// Shared autoplay tracks stay swipeable and respect manual input and reduced motion.
function makeStoryCarousel(track,{label,delay=1500,finalDelay=delay}={}){
 if(!track)return;
 track.classList.add('story-carousel');
 const slides=[...track.children],count=slides.length;if(count<2)return;
 slides.forEach(slide=>{const clone=slide.cloneNode(true);clone.setAttribute('aria-hidden','true');
 [clone,...clone.querySelectorAll('[data-node-id]')].forEach(n=>n.removeAttribute('data-node-id'));
 track.append(clone)});const all=[...track.children];
 let index=0,timer,settle,visible=false,drag=false,paused=reduced.matches,automatic=false,manualUntil=0,startX,startLeft,moved=false;
 const offset=i=>all[i].offsetLeft-all[0].offsetLeft;
 track.tabIndex=0;track.setAttribute('role','region');track.setAttribute('aria-label',label);
 const controls=document.createElement('div');controls.className='iteration-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label',label+' controls');
 const stop=()=>clearTimeout(timer);
 const schedule=()=>{stop();if(!visible||drag||paused||document.hidden)return;timer=setTimeout(()=>go(index+1,true),Math.max(index===count-1?finalDelay:delay,manualUntil-Date.now()))};
 const settleAtNearest=()=>{clearTimeout(settle);index=all.reduce((best,s,i)=>Math.abs(track.scrollLeft-offset(i))<Math.abs(track.scrollLeft-offset(best))?i:best,0);if(index>=count){index=0;track.scrollTo({left:0,behavior:'instant'})}automatic=false;schedule()};
 const go=(next,auto=false)=>{stop();if(!auto)manualUntil=Date.now()+5000;index=next<0?count-1:Math.min(next,count);automatic=true;track.scrollTo({left:offset(index),behavior:reduced.matches?'instant':'smooth'});clearTimeout(settle);settle=setTimeout(settleAtNearest,650)};
 const make=(label,text,fn)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label);b.title=label;b.textContent=text;b.addEventListener('click',fn);controls.append(b);return b};
 make('Previous screen','←',()=>go(index-1));
 const toggle=make('Stop slideshow','■',()=>{paused=!paused;sync();schedule()});
 const sync=()=>{toggle.textContent=paused?'▶':'■';toggle.setAttribute('aria-label',paused?'Play slideshow':'Stop slideshow');toggle.title=toggle.getAttribute('aria-label');toggle.setAttribute('aria-pressed',String(paused))};sync();
 make('Next screen','→',()=>go(index+1));
 if(track.parentElement.classList.contains('scroll-scene')){const wrapper=document.createElement('div');wrapper.className='scene-media carousel-media';track.before(wrapper);track.classList.remove('scene-media');wrapper.append(track,controls)}else track.after(controls);
 track.addEventListener('scroll',()=>{stop();if(!automatic)manualUntil=Date.now()+5000;clearTimeout(settle);settle=setTimeout(settleAtNearest,160)},{passive:true});
 track.addEventListener('wheel',()=>{automatic=false;manualUntil=Date.now()+5000;stop()},{passive:true});
 track.addEventListener('pointerdown',e=>{automatic=false;manualUntil=Date.now()+5000;stop();if(e.pointerType==='touch')return;drag=true;moved=false;startX=e.clientX;startLeft=track.scrollLeft;track.setPointerCapture(e.pointerId)});
 track.addEventListener('pointermove',e=>{if(!drag)return;const delta=e.clientX-startX;if(Math.abs(delta)>4){moved=true;track.classList.add('dragging');track.scrollLeft=startLeft-delta}});
 const end=()=>{if(!drag)return;drag=false;track.classList.remove('dragging');settleAtNearest()};track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);
 track.addEventListener('dragstart',e=>e.preventDefault());track.addEventListener('click',e=>{if(moved){e.preventDefault();moved=false}});
 track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(index+(e.key==='ArrowRight'?1:-1))}});
 document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',()=>{paused=reduced.matches;sync();schedule()});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.1}).observe(track);
 let width=track.clientWidth;new ResizeObserver(()=>{if(track.clientWidth&&track.clientWidth!==width){width=track.clientWidth;go(Math.min(index,count-1),true)}}).observe(track);
}
if(document.body.dataset.page==='multiwars')makeStoryCarousel(document.querySelector('[data-node-id="212:749"]'),{label:'Card design evolution. Swipe, drag or use arrow keys.',delay:1200,finalDelay:3600});
if(document.body.dataset.page==='foody'){
 makeStoryCarousel(document.querySelector('[data-node-id="239:130"]'),{label:'Food buddy invitation and conversation. Swipe, drag or use arrow keys.',delay:2400});
 const host=document.querySelector('[data-node-id="239:55"]');
 if(host){const stage=document.createElement('div');stage.className='foody-hero-stage';[...host.children].forEach((n,i)=>{n.classList.add('hero-phone');n.style.animationDelay=(-i*2.3)+'s';stage.append(n)});host.append(stage);const fit=()=>{if(!host.clientWidth)return;const scale=Math.min(1,(host.clientWidth-12)/775);stage.style.setProperty('--phone-scale',scale);host.style.height=(660*scale+20)+'px'};new ResizeObserver(fit).observe(host);fit();}
}
// Steal & Seal: cycle the three HUD priorities directly over the game image.
if(document.body.dataset.page==='steal'){
 const stage=document.querySelector('[data-node-id="212:620"]');
 if(stage){
  stage.classList.add('hud-demo');
  const targets=[{id:'212:623',box:[23,19,54,55],label:'01 / WORKSPACE'},{id:'212:626',box:[23,77,54,14],label:'02 / WRAPPING TOOLS'},{id:'212:629',box:[0,3,100,14],label:'03 / TIME & PROGRESS'}];
  const focus=document.createElement('div');focus.className='hud-focus';focus.setAttribute('aria-hidden','true');const label=document.createElement('span');label.className='hud-focus-label';focus.append(label);
  const timerFocus=document.createElement('div');timerFocus.className='hud-timer-focus';timerFocus.setAttribute('aria-hidden','true');stage.append(focus,timerFocus);
  let active=0,interval,visible=false,paused=reduced.matches,holdUntil=0;const buttons=[];
  const stop=()=>clearTimeout(interval);
  const schedule=()=>{stop();if(!visible||paused||document.hidden)return;interval=setTimeout(()=>select((active+1)%targets.length),Math.max(3200,holdUntil-Date.now()))};
  const select=i=>{active=i;const target=targets[i];['left','top','width','height'].forEach((key,j)=>focus.style[key]=target.box[j]+'%');label.textContent=target.label;stage.dataset.hudFocus=String(i);buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));schedule()};
  targets.forEach((target,i)=>{const text=document.querySelector(`[data-node-id="${target.id}"]`);if(!text)return;const button=document.createElement('button');button.type='button';button.className='hud-priority';button.textContent=text.textContent;button.setAttribute('aria-pressed','false');text.replaceChildren(button);buttons.push(button);const choose=()=>{holdUntil=Date.now()+5000;select(i)};button.addEventListener('click',choose);button.addEventListener('mouseenter',choose);button.addEventListener('focus',choose)});
  const toggle=document.createElement('button');toggle.type='button';toggle.className='hud-toggle';stage.append(toggle);
  const sync=()=>{toggle.textContent=paused?'▶':'■';toggle.setAttribute('aria-label',paused?'Play HUD highlights':'Stop HUD highlights');toggle.title=toggle.getAttribute('aria-label')};
  toggle.addEventListener('click',()=>{paused=!paused;sync();schedule()});sync();select(0);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.25}).observe(stage);
  document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',()=>{paused=reduced.matches;sync();schedule()});
 }
}

if(document.body.dataset.page==='multiwars'){const gallery=document.querySelector('[data-node-id="212:696"]');if(gallery){const note=document.createElement("p");note.className="card-art-credit";note.textContent="AI tools helped create the card artwork. My contribution focused on the card interface and visual layout.";gallery.after(note)}}
