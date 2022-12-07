import{a as u,r as h,b as s,e,k as v,l as K,u as i,t as r,j as m,F as b,m as f,q as k,s as x,o as a,h as g}from"./entry.a1ba4f1d.js";import{a as w,K as l}from"./state.3bc6624c.js";const o=n=>(k("data-v-fd29f762"),n=n(),x(),n),P=o(()=>e("h1",{class:"title"},"System KeyPair management",-1)),S={class:"tile is-ancestor"},N={class:"tile is-vertical"},C={class:"tile is-parent"},B=o(()=>e("button",{class:"button"}," Back to home",-1)),I={class:"tile is-parent"},J={class:"tile is-child box"},V=o(()=>e("h2",{class:"title"},"Private Key",-1)),A={key:0,class:"textarea",rows:"10"},E={key:1},F={class:"tile is-child box"},O=o(()=>e("h2",{class:"title"},"Public Key",-1)),j={key:0},q={key:1},D={class:"textarea",rows:"10"},G=o(()=>e("br",null,null,-1)),L={key:2},z=u({__name:"keymanagement",setup(n){const c=w(),t=h({privateKey:c.value.privateKey,publicKey:c.value.publicKey});async function y(){const _=await l.generateKeyPair();t.value.privateKey=JSON.stringify(await l.exportKeyAsJwk(_.privateKey)),t.value.publicKey=JSON.stringify(await l.exportKeyAsJwk(_.publicKey))}function d(){c.value.publicKey=t.value.publicKey}return(_,H)=>{const p=f;return a(),s(b,null,[P,e("div",S,[e("div",N,[e("div",C,[e("button",{class:"button is-primary",onClick:y},"Generate New Key"),v(p,{to:"/"},{default:K(()=>[B]),_:1})]),e("div",I,[e("article",J,[V,i(t).privateKey?(a(),s("textarea",A,r(i(t).privateKey),1)):(a(),s("div",E,"no data"))]),e("article",F,[O,i(c).publicKey?(a(),s("p",j,"has been saved into state.")):m("",!0),i(t).publicKey?(a(),s("div",q,[e("textarea",D,r(i(t).publicKey),1),G,e("button",{class:"button is-primary",onClick:d},"Save for encryption")])):(a(),s("div",L,"no data"))])])])])],64)}}});const R=g(z,[["__scopeId","data-v-fd29f762"]]);export{R as default};
