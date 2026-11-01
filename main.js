(function(){
var root=document.documentElement,btn=document.getElementById('theme');
function cur(){var t=root.getAttribute('data-theme');if(t)return t;return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
function label(){btn.setAttribute('aria-label','Switch to '+(cur()==='dark'?'light':'dark')+' theme')}
try{var s=localStorage.getItem('theme');if(s)root.setAttribute('data-theme',s)}catch(e){}
label();
btn.addEventListener('click',function(){var n=cur()==='dark'?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}label()});
var f=document.getElementById('f');if(!f)return;
var msg=document.getElementById('msg'),go=f.querySelector('button[type=submit]'),busy=false;
/* Web3Forms access keys are public by design. Restrict the key to your domain in the Web3Forms dashboard. */
var KEY='YOUR_WEB3FORMS_ACCESS_KEY',TO='contact.nihalsinghrai@gmail.com';
f.addEventListener('submit',function(e){
e.preventDefault();if(busy)return;
var d=new FormData(f),ok=true;
function er(k,t){f.querySelector('[data-for="'+k+'"]').textContent=t;if(t)ok=false}
er('name',d.get('name').trim()?'':'Please enter your name.');
er('email',/^\S+@\S+\.\S+$/.test(d.get('email').trim())?'':'Please enter a valid email address.');
er('service',d.get('service').trim().length>=3?'':'Please describe the automation you need.');
er('details',d.get('details').trim().length>=10?'':'Please add a few details about your project.');
if(!ok){msg.textContent='Please fix the highlighted fields.';return}
if(d.get('website'))return;
var subject='Project enquiry: '+d.get('service').trim().slice(0,60);
var body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nBusiness: '+(d.get('business')||'-')+'\nAutomation needed: '+d.get('service')+'\nBudget: '+(d.get('budget')||'-')+'\n\n'+d.get('details');
var mail='mailto:'+TO+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
busy=true;go.disabled=true;msg.textContent='Sending your enquiry…';
location.href=mail;
function end(ok){busy=false;go.disabled=false;msg.textContent=ok?'Your enquiry was received. An email draft has also opened in your email app.':'The automatic notification could not be confirmed. Please send the email draft that opened, or write to '+TO+'.'}
if(KEY.indexOf('YOUR_')===0){end(false);return}
fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:KEY,subject:subject,name:d.get('name'),email:d.get('email'),business:d.get('business'),service:d.get('service'),budget:d.get('budget'),message:d.get('details'),botcheck:''})})
.then(function(r){return r.json()}).then(function(j){end(j.success===true)}).catch(function(){end(false)});
});
})();
