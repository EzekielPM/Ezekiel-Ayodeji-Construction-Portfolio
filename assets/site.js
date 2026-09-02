
(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('construction-theme');
  if(saved) root.dataset.theme=saved;
  document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const next=root.dataset.theme==='dark'?'light':'dark';
      root.dataset.theme=next;localStorage.setItem('construction-theme',next);
      btn.setAttribute('aria-label',next==='dark'?'Switch to light mode':'Switch to dark mode');
    });
  });
  const modal=document.querySelector('.modal');
  if(modal){
    const modalImg=modal.querySelector('img');
    const close=()=>{modal.classList.remove('open');modalImg.removeAttribute('src');};
    document.querySelectorAll('[data-lightbox]').forEach(img=>img.addEventListener('click',()=>{modalImg.src=img.src;modalImg.alt=img.alt;modal.classList.add('open');}));
    modal.querySelector('button').addEventListener('click',close);
    modal.addEventListener('click',e=>{if(e.target===modal)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }
})();
