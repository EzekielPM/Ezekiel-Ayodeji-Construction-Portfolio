
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
