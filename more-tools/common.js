function rand(n){ return Math.floor(Math.random()*n); }
function pickN(arr,n){ const copy=[...arr]; const out=[]; for(let i=0;i<n && copy.length;i++){ out.push(copy.splice(rand(copy.length),1)[0]); } return out; }
function downloadCanvas(id, filename){
  const c = document.getElementById(id);
  const a = document.createElement('a');
  a.download = filename;
  a.href = c.toDataURL('image/png');
  a.click();
}
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){ const j=rand(i+1); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  return arr;
}
// A "bag": draws items without repeats until the whole list is used, then reshuffles.
// Prevents the same result popping up again right after it was just shown.
function makeBag(items){
  let bag = [];
  function refill(){ bag = shuffle([...items]); }
  return {
    draw(n=1){
      const out = [];
      for(let i=0;i<n;i++){
        if(bag.length===0) refill();
        out.push(bag.pop());
      }
      return n===1 ? out[0] : out;
    }
  };
}
function hslToHex(h,s,l){
  s/=100; l/=100;
  const k = n => (n + h/30) % 12;
  const a = s * Math.min(l, 1-l);
  const f = n => l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n),1)));
  const toHex = x => Math.round(255*x).toString(16).padStart(2,'0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
// Pressing Enter in any of `elements` triggers a click on `btn` (skips <textarea>, where Enter should add a new line).
function onEnter(elements, btn){
  const list = Array.isArray(elements) ? elements : [elements];
  list.forEach(el=>{
    if(!el || el.tagName === 'TEXTAREA') return;
    el.addEventListener('keydown', e=>{
      if(e.key === 'Enter'){ e.preventDefault(); btn.click(); }
    });
  });
}
// Shows a friendly inline error message instead of a native alert().
function showError(el, message){
  el.textContent = message;
  el.className = 'error-text';
  el.style.display = 'block';
}
function clearMsg(el){
  el.style.display = 'none';
}
