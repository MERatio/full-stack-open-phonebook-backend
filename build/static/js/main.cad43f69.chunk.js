(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(15),r=t.n(c),o=t(3),a=(t(20),t(2)),i=t(4),u=t.n(i),s="/api/persons",j={getAll:function(){return u.a.get(s).then((function(e){return e.data}))},create:function(e){return u.a.post(s,e).then((function(e){return e.data}))},update:function(e,n){return u.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},deleteObject:function(e){return u.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))}},b=t(0),d=function(e){var n=e.notification;return n.message?Object(b.jsx)("div",{className:"notification ".concat(n.type),children:n.message}):null},l=function(e){var n=e.nameFilter,t=e.onNameFilterChange;return Object(b.jsxs)("div",{children:["filter shown with"," ",Object(b.jsx)("input",{value:n,onChange:t})]})},f=function(e){var n=e.newName,t=e.newNumber,c=e.onNewNameChange,r=e.onNewNumberChange,o=e.onSubmit;return Object(b.jsxs)("form",{onSubmit:o,children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:n,onChange:c})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:t,onChange:r})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},h=function(e){var n=e.person,t=e.onDeletePerson;return Object(b.jsxs)("div",{children:[n.name," ",n.number," ",Object(b.jsx)("button",{type:"button",onClick:function(){return t(n.id)},children:"delete"})]})},m=function(e){var n=e.persons,t=e.onDeletePerson;return Object(b.jsx)("div",{children:n.map((function(e){return Object(b.jsx)(h,{person:e,onDeletePerson:t},e.id)}))})},O=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),i=Object(o.a)(r,2),u=i[0],s=i[1],h=Object(a.useState)(""),O=Object(o.a)(h,2),v=O[0],p=O[1],x=Object(a.useState)(""),g=Object(o.a)(x,2),w=g[0],N=g[1],C=Object(a.useState)({}),S=Object(o.a)(C,2),y=S[0],k=S[1];Object(a.useEffect)((function(){j.getAll().then((function(e){return c(e)}))}),[]);var D=""===u?t:t.filter((function(e){return e.name.toLowerCase().includes(u.toLowerCase())}));return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(d,{notification:y}),Object(b.jsx)(l,{nameFilter:u,onNameFilterChange:function(e){s(e.target.value)}}),Object(b.jsx)("h2",{children:"add a new"}),Object(b.jsx)(f,{newName:v,newNumber:w,onNewNameChange:function(e){p(e.target.value)},onNewNumberChange:function(e){N(e.target.value)},onSubmit:function(e){e.preventDefault();var n={name:v,number:w};j.create(n).then((function(e){c(t.concat(e)),p(""),N(""),k({message:"Added ".concat(e.name),type:"success"}),setTimeout((function(){return k({})}),5e3)}))}}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(m,{persons:D,onDeletePerson:function(e){var n=t.find((function(n){return n.id===e}));if(window.confirm("Delete ".concat(n.name," ?"))){var r=t.filter((function(n){return n.id!==e}));j.deleteObject(e).then((function(e){c(r)})).catch((function(e){c(r);var t="Information of ".concat(n.name," has already been removed from server");console.log(t),k({message:t,type:"error"}),setTimeout((function(){return k({})}),5e3)}))}}})]})};r.a.render(Object(b.jsx)(O,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.cad43f69.chunk.js.map