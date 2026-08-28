(function(){
const cfg=window.PSH_CONFIG||{},endpoint=(cfg.formEndpoint||'').trim(),wa=cfg.whatsappNumber||'966561584191';
function data(form){const x={};new FormData(form).forEach((v,k)=>x[k]=String(v).trim());return x}
function fallback(x){const lines=[x.type==='interest'?'إظهار اهتمام بمنتج':'طلب اتصال',`المنتج: ${x.product||'-'}`,`اسم الشركة: ${x.company||'-'}`,`الاسم: ${x.name||'-'}`,`رقم الهاتف: ${x.phone||'-'}`,x.email?`البريد: ${x.email}`:'',x.message?`ملاحظات: ${x.message}`:''].filter(Boolean);window.open(`https://wa.me/${wa}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener')}
async function submit(form,success){const x=data(form);x.source=location.href;x.timestamp=new Date().toISOString();if(endpoint){try{await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(x)});if(success){success.textContent='تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.';success.style.display='block'}form.reset();return}catch(e){console.warn(e)}}if(success){success.textContent='سيتم فتح واتساب الآن لإرسال بيانات الطلب.';success.style.display='block'}fallback(x)}
const modal=document.getElementById('callbackModal'),open=document.getElementById('openCallbackModal'),close=document.getElementById('closeCallbackModal'),form=document.getElementById('callbackForm'),ok=document.getElementById('callbackSuccess');
if(open&&modal)open.addEventListener('click',()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')});
if(close&&modal)close.addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')});
if(modal)modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}});
if(form)form.addEventListener('submit',e=>{e.preventDefault();submit(form,ok)});
const interest=document.getElementById('interestForm'),interestOk=document.getElementById('interestSuccess');
if(interest)interest.addEventListener('submit',e=>{e.preventDefault();submit(interest,interestOk)});
})();