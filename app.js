'use strict';
const menu=document.querySelector('#menu'),opener=document.querySelector('.menu-open'),closer=document.querySelector('.menu-close');
let menuTarget=null;
function closeMenu(){if(menu.open)menu.close();}
opener.addEventListener('click',()=>{menuTarget=null;menu.showModal();document.body.classList.add('menu-locked');opener.setAttribute('aria-expanded','true');closer.focus();});
closer.addEventListener('click',closeMenu);
menu.addEventListener('click',event=>{if(event.target===menu){const r=menu.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeMenu();}});
menu.addEventListener('close',()=>{document.body.classList.remove('menu-locked');opener.setAttribute('aria-expanded','false');if(menuTarget){menuTarget.focus({preventScroll:true});menuTarget.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});menuTarget=null;}else if(opener.getClientRects().length)opener.focus();else document.querySelector('.wordmark').focus();});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',event=>{if(a.hash){event.preventDefault();menuTarget=document.querySelector(a.hash);history.replaceState(null,'',a.hash);}closeMenu();}));
matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const film=document.querySelector('#film-image'),status=document.querySelector('#film-status');
function playFilm(){
  status.hidden=false;
  status.textContent='영상을 불러오고 있습니다.';
  const preload=new Image();
  preload.onload=()=>{
    film.src='assets/film-v2.gif';
    film.alt='바쁜 일상과 잠깐의 쉼을 담은 수린 캐릭터 홍보 영상';
    status.textContent='';
    status.hidden=true;
  };
  preload.onerror=()=>{status.textContent='영상을 불러오지 못해 커버를 표시합니다.';};
  preload.src='assets/film-v2.gif';
}
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){
      observer.disconnect();
      playFilm();
    }
  },{threshold:0.1});
  observer.observe(document.querySelector('.film-frame'));
}else{playFilm();}
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-failed');if(img.id!=='film-image'){const figure=img.closest('figure');if(figure){let caption=figure.querySelector('figcaption');if(caption)caption.textContent='이미지를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';}}}));
