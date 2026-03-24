var curEl=document.getElementById('cur'),crEl=document.getElementById('cr');
document.addEventListener('mousemove',function(e){curEl.style.left=e.clientX+'px';curEl.style.top=e.clientY+'px';crEl.style.left=e.clientX+'px';crEl.style.top=e.clientY+'px';});
document.querySelectorAll('a,button,.skitem,.cc,.pcard,.achr,.scard').forEach(function(el){el.addEventListener('mouseenter',function(){crEl.classList.add('big');});el.addEventListener('mouseleave',function(){crEl.classList.remove('big');});});
var nm='UDAY DIXIT',inEl=document.getElementById('iname');
nm.split('').forEach(function(ch,i){var s=document.createElement('span');s.className='il';s.textContent=(ch===' ')?'\u00a0':ch;s.style.animationDelay=(0.06*i+0.18)+'s';inEl.appendChild(s);});
setTimeout(function(){document.getElementById('intro').classList.add('hide');setTimeout(function(){document.getElementById('intro').style.display='none';},900);},2700);
window.addEventListener('scroll',function(){document.getElementById('nav').classList.toggle('scrolled',window.scrollY>40);var cur='';document.querySelectorAll('section[id]').forEach(function(s){if(window.scrollY>=s.offsetTop-200)cur=s.id;});document.querySelectorAll('#nl a').forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur);});});
var hamEl=document.getElementById('ham'),nlEl=document.getElementById('nl');
hamEl.addEventListener('click',function(){nlEl.classList.toggle('open');});
nlEl.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nlEl.classList.remove('open');});});
var ro=new IntersectionObserver(function(entries){entries.forEach(function(e,i){if(e.isIntersecting){setTimeout(function(){e.target.classList.add('on');},i*60);ro.unobserve(e.target);}});},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(function(el){ro.observe(el);});



function sk(id){var el=document.getElementById(id);if(el){el.textContent='—';el.classList.add('skeleton');}}
function unsk(id,val){var el=document.getElementById(id);if(el){el.classList.remove('skeleton');el.textContent=val;}}
function loadGitHub(){
  sk('gh-repos');sk('gh-followers');sk('gh-following');sk('gh-gists');
  var bio=document.getElementById('gh-bio');bio.textContent='Loading...';bio.classList.add('skeleton');
  fetch('https://api.github.com/users/uday2327')
    .then(function(r){return r.json();})
    .then(function(d){
      bio.classList.remove('skeleton');
      unsk('gh-repos',d.public_repos||0);
      unsk('gh-followers',d.followers||0);
      unsk('gh-following',d.following||0);
      unsk('gh-gists',d.public_gists||0);
      bio.textContent=d.bio||'Full Stack & Cloud Engineer | MERN · AWS · Kubernetes';
      if(d.avatar_url){var row=document.getElementById('gh-avatar-row');var ph=document.getElementById('gh-avatar-ph');if(ph){var img=document.createElement('img');img.className='scard-avatar';img.src=d.avatar_url;img.alt='GitHub';row.replaceChild(img,ph);}}
    })
    .catch(function(){
      bio.classList.remove('skeleton');
      unsk('gh-repos','10+');unsk('gh-followers','—');unsk('gh-following','—');unsk('gh-gists','—');
      bio.textContent='Full Stack & Cloud Engineer | MERN · AWS · Kubernetes';
    });
}
function animateDonut(e,m,h,tot){
  var C=2*Math.PI*48,ep=tot>0?e/tot:0,mp=tot>0?m/tot:0,hp=tot>0?h/tot:0;
  var el=C*ep,ml=C*mp,hl=C*hp;
  var aE=document.getElementById('lc-arc-easy'),aM=document.getElementById('lc-arc-med'),aH=document.getElementById('lc-arc-hard');
  aE.style.strokeDasharray='0 '+C;aM.style.strokeDasharray='0 '+C;aH.style.strokeDasharray='0 '+C;
  aE.style.strokeDashoffset=0;aM.style.strokeDashoffset=(-el);aH.style.strokeDashoffset=(-(el+ml));
  setTimeout(function(){
    aE.style.transition='stroke-dasharray 1s ease';aM.style.transition='stroke-dasharray 1s ease .2s';aH.style.transition='stroke-dasharray 1s ease .4s';
    aE.style.strokeDasharray=el+' '+(C-el);aM.style.strokeDasharray=ml+' '+(C-ml);aH.style.strokeDasharray=hl+' '+(C-hl);
  },300);
}
function loadLeetCode(){
  sk('lc-easy');sk('lc-med');sk('lc-hard');sk('lc-rank');
  var tot=document.getElementById('lc-tot');tot.textContent='—';tot.classList.add('skeleton');
  fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `
        query {
          userProfileUserQuestionProgressV2(userSlug: "uday__1") {
            numAcceptedQuestions {
              difficulty
              count
            }
          }
          userContestRanking(username: "uday__1") {
            globalRanking
          }
        }
      `
    })
  })
    .then(function(r){return r.json();})
    .then(function(d){
      tot.classList.remove('skeleton');
      var progress = d.data.userProfileUserQuestionProgressV2;
      var ranking = d.data.userContestRanking;
      var easy = 0, med = 0, hard = 0, total = 0;
      if (progress && progress.numAcceptedQuestions) {
        progress.numAcceptedQuestions.forEach(function(q) {
          if (q.difficulty === 'EASY') easy = q.count;
          else if (q.difficulty === 'MEDIUM') med = q.count;
          else if (q.difficulty === 'HARD') hard = q.count;
          total += q.count;
        });
      }
      unsk('lc-easy', easy);
      unsk('lc-med', med);
      unsk('lc-hard', hard);
      unsk('lc-rank', ranking && ranking.globalRanking ? '#' + ranking.globalRanking : '—');
      tot.textContent = total;
      animateDonut(easy, med, hard, total);
    })
    .catch(function(){
      tot.classList.remove('skeleton');
      unsk('lc-easy',120);unsk('lc-med',130);unsk('lc-hard',50);unsk('lc-rank','—');
      tot.textContent='300+';animateDonut(120,130,50,300);
    });
}
loadGitHub();loadLeetCode();
var EJS_SVC='YOUR_SERVICE_ID',EJS_TPL='YOUR_TEMPLATE_ID',EJS_KEY='YOUR_PUBLIC_KEY';
var ejsScript=document.createElement('script');ejsScript.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';ejsScript.onload=function(){if(EJS_KEY!=='YOUR_PUBLIC_KEY')emailjs.init(EJS_KEY);};document.head.appendChild(ejsScript);
document.getElementById('cf').addEventListener('submit',function(e){
  e.preventDefault();
  var btn=document.getElementById('fb'),st=document.getElementById('fst');
  var n=document.getElementById('fn').value.trim(),em=document.getElementById('fe').value.trim(),s=document.getElementById('fs').value.trim(),m=document.getElementById('fm').value.trim();
  btn.textContent='Sending\u2026';btn.disabled=true;st.className='fstat';st.style.display='none';
  if(EJS_SVC==='YOUR_SERVICE_ID'){window.location.href='mailto:dixitjiuday@gmail.com?subject='+encodeURIComponent(s||'Portfolio Contact')+'&body='+encodeURIComponent('Name: '+n+'\nEmail: '+em+'\n\n'+m);btn.textContent='Send Message \u2192';btn.disabled=false;return;}
  emailjs.send(EJS_SVC,EJS_TPL,{from_name:n,from_email:em,subject:s||'Portfolio Contact',message:m,to_email:'dixitjiuday@gmail.com'}).then(function(){st.textContent='\u2713 Message sent \u2014 I\'ll reply shortly.';st.className='fstat ok';document.getElementById('cf').reset();}).catch(function(){st.textContent='\u2717 Failed. Email: dixitjiuday@gmail.com';st.className='fstat err';}).finally(function(){btn.textContent='Send Message \u2192';btn.disabled=false;});
});
// Certificate Lightbox Modal
(function(){
  var modal=document.getElementById('cert-modal'),modalImg=document.getElementById('modal-img'),closeBtn=document.getElementById('cert-modal-close');
  function openModal(src){modalImg.src=src;modal.classList.add('active');document.body.style.overflow='hidden';}
  function closeModal(){modal.classList.remove('active');document.body.style.overflow='';setTimeout(function(){modalImg.src='';},350);}
  document.querySelectorAll('.cc').forEach(function(card){
    card.addEventListener('click',function(){
      var img=card.querySelector('.cimg img');
      if(img&&img.src){openModal(img.src);}
    });
  });
  closeBtn.addEventListener('click',function(e){e.stopPropagation();closeModal();});
  modal.addEventListener('click',function(e){if(e.target===modal){closeModal();}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('active')){closeModal();}});
})();
