
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
  });   const contactFloater=document.createElement('div');
  contactFloater.className='contact-floater';
  contactFloater.innerHTML=`
    <details>
      <summary aria-label="Open contact options">Contact</summary>
      <nav class="contact-floater-links" aria-label="Contact options">
        <a href="mailto:Olusola40@gmail.com">Email</a>
        <a href="https://wa.me/2349015934337" target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="https://www.linkedin.com/in/ayodeji-ezekiel-olusola/" target="_blank" rel="noreferrer">LinkedIn</a>
      </nav>
    </details>`;
  document.body.appendChild(contactFloater);

  const contactDetails=contactFloater.querySelector('details');
  const contactSummary=contactFloater.querySelector('summary');
  const contactLinks=contactFloater.querySelector('.contact-floater-links');
  contactLinks.style.display='none';

  contactDetails.addEventListener('toggle',()=>{
    contactLinks.style.display=contactDetails.open?'grid':'none';
    contactSummary.setAttribute('aria-label',contactDetails.open?'Close contact options':'Open contact options');
  });

  contactLinks.addEventListener('click',()=>{contactDetails.open=false;});
  document.addEventListener('click',e=>{
    if(contactDetails.open&&!contactFloater.contains(e.target)) contactDetails.open=false;
  });
    let dragStartX=0,dragStartY=0,floaterStartLeft=0,floaterStartTop=0;
  let contactDragging=false,contactWasDragged=false;

  contactSummary.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    const rect=contactSummary.getBoundingClientRect();
    dragStartX=e.clientX;
    dragStartY=e.clientY;
    floaterStartLeft=rect.left;
    floaterStartTop=rect.top;
    contactDragging=true;
    contactWasDragged=false;
    contactSummary.style.cursor='grabbing';
    contactSummary.setPointerCapture(e.pointerId);
  });

  contactSummary.addEventListener('pointermove',e=>{
    if(!contactDragging)return;

    const deltaX=e.clientX-dragStartX;
    const deltaY=e.clientY-dragStartY;

    if(!contactWasDragged&&Math.hypot(deltaX,deltaY)>5){
      contactWasDragged=true;
      contactDetails.open=false;
    }

    if(!contactWasDragged)return;

    const maxLeft=window.innerWidth-contactSummary.offsetWidth-8;
    const maxTop=window.innerHeight-contactSummary.offsetHeight-8;

    contactFloater.style.right='auto';
    contactFloater.style.bottom='auto';
    contactFloater.style.left=`${Math.max(8,Math.min(maxLeft,floaterStartLeft+deltaX))}px`;
    contactFloater.style.top=`${Math.max(8,Math.min(maxTop,floaterStartTop+deltaY))}px`;
  });

  const endContactDrag=e=>{
    if(!contactDragging)return;
    contactDragging=false;
    contactSummary.style.cursor='grab';

    if(contactSummary.hasPointerCapture(e.pointerId)){
      contactSummary.releasePointerCapture(e.pointerId);
    }
  };

  contactSummary.addEventListener('pointerup',endContactDrag);
  contactSummary.addEventListener('pointercancel',endContactDrag);

    contactSummary.addEventListener('click',e=>{
    if(contactWasDragged){
      e.preventDefault();
      contactWasDragged=false;
    }
  });

  const footerInfo=document.querySelector('.footer-grid > div');

  if(footerInfo){
    const backToTop=document.createElement('a');
    backToTop.className='pill back-to-top';
    backToTop.href='#';
    backToTop.textContent='Back to top ↑';
    backToTop.setAttribute('aria-label','Back to top');

    backToTop.addEventListener('click',e=>{
      e.preventDefault();
      window.scrollTo({top:0,behavior:'smooth'});
    });

    footerInfo.appendChild(backToTop);
  }
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
