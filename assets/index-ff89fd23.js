import{ar as N,r as u,g as $,j as e,T as w,ae as D,i as k,N as G,K as F,b as I,S as T,I as O,af as H,B as f,z as U,ap as K,ay as M,ao as Z,m as J,az as V,G as W,R as X}from"./vendor-0bfa93f8.js";import{g as E,u as b,a as z,b as Y}from"./useGetComponentInfo-457f2789.js";import{i as L,S as ee}from"./index-e92b815d.js";async function te(o,t){const i=`/api/stat/${o}`;return await L.get(i,{params:t})}async function ne(o,t){const i=`/api/stat/${o}/${t}`;return await L.get(i)}const{Title:se}=w,oe=o=>{const{selectedComponentId:t,selectedComponentType:i}=o,{id:a=""}=N(),[r,c]=u.useState([]),{run:d}=$(async(n,l)=>ne(n,l),{manual:!0,onSuccess(n){c(n.stat)}});u.useEffect(()=>{t&&d(a,t)},[a,t]);function s(){if(!t)return e.jsx("div",{children:"未选中组件"});const{StatComponent:n}=E(i)||{};return n==null?e.jsx("div",{children:"该组件无统计图表"}):e.jsx(n,{stat:r})}return e.jsxs(e.Fragment,{children:[e.jsx(se,{level:3,children:"图表统计"}),e.jsx("div",{children:s()})]})},ae="_container_1k1nz_1",ce="_selected_1k1nz_17",ie="_component_1k1nz_7",_={container:ae,"component-wrapper":"_component-wrapper_1k1nz_7",selected:ce,component:ie},re=o=>{const{selectedComponentId:t,setSelectedComponentId:i,setSelectedComponentType:a}=o,{componentList:r}=b();return e.jsx("div",{className:_.container,children:r.filter(c=>!c.isHidden).map(c=>{const{fe_id:d,props:s,type:n}=c,l=E(n);if(l==null)return null;const{Component:g}=l,y=_["component-wrapper"],C=_.selected,h=D({[y]:!0,[C]:d===t});return e.jsx("div",{className:h,onClick:()=>{i(d),a(n)},children:e.jsx("div",{className:_.component,children:e.jsx(g,{...s})})},d)})})},le=()=>e.jsx("div",{style:{textAlign:"center"},children:e.jsx(k,{})}),{Title:de}=w,pe=o=>{const{selectedComponentId:t,setSelectedComponentId:i,setSelectedComponentType:a}=o,{id:r=""}=N(),[c,d]=u.useState(1),[s,n]=u.useState(ee),[l,g]=u.useState(0),[y,C]=u.useState([]),{loading:h}=$(async()=>await te(r,{page:c,pageSize:s}),{refreshDeps:[r,c,s],onSuccess(p){const{total:m,list:S=[]}=p;g(m),C(S)}}),{componentList:P}=b(),R=P.map(p=>{const{fe_id:m,title:S,type:q,props:v}=p,B=(v==null?void 0:v.title)||S;return{title:e.jsx("div",{style:{cursor:"pointer"},onClick:()=>{i(m),a(q)},children:e.jsx("span",{style:{color:m===t?"#1890ff":"inherit"},children:B})}),dataIndex:m}}),A=y.map(p=>({...p,key:p._id})),Q=e.jsxs(e.Fragment,{children:[e.jsx(G,{columns:R,dataSource:A,pagination:!1}),e.jsx("div",{style:{textAlign:"center",marginTop:"18px"},children:e.jsx(F,{total:l,pageSize:s,current:c,onChange:p=>d(p),onShowSizeChange:(p,m)=>{d(p),n(m)}})})]});return e.jsxs("div",{children:[e.jsxs(de,{level:3,children:["答卷数量：",!h&&l]}),h&&e.jsx(le,{}),!h&&Q]})},ue="_header_1fyht_1",me="_left_1fyht_11",xe="_right_1fyht_19",he="_main_1fyht_23",j={"header-wrapper":"_header-wrapper_1fyht_1",header:ue,left:me,right:xe,main:he},{Title:je}=w,fe=()=>{const o=I(),{id:t}=N(),{title:i,isPublished:a}=z(),r=u.useRef(null);function c(){const s=r.current;if(!s)return;s.select();const n=s.input.value;navigator.clipboard.writeText(n).then(()=>{J.success("拷贝成功")}).catch(l=>{console.error("拷贝失败:",l)})}const d=u.useMemo(()=>{if(!a)return null;const n=`https://wenjuan.ygqygq2.com/question/${t}`,l=e.jsx("div",{style:{textAlign:"center"},children:e.jsx(V,{value:n,size:150})});return e.jsxs(T,{children:[e.jsx(O,{value:n,style:{width:"300px"},ref:r}),e.jsx(H,{title:"拷贝链接",children:e.jsx(f,{icon:e.jsx(U,{}),onClick:c})}),e.jsx(K,{content:l,children:e.jsx(f,{icon:e.jsx(M,{})})})]})},[t,a]);return e.jsx("div",{className:j["header-wrapper"],children:e.jsxs("div",{className:j.header,children:[e.jsx("div",{className:j.left,children:e.jsxs(T,{children:[e.jsx(f,{type:"link",icon:e.jsx(Z,{}),onClick:()=>o(-1),children:"返回"}),e.jsx(je,{children:i})]})}),e.jsx("div",{className:j.main,children:d}),e.jsx("div",{className:j.right,children:e.jsx(T,{children:e.jsx(f,{type:"primary",onClick:()=>o(`/question/edit/${t}`,{state:{fetchBackendData:!0}}),children:"编辑问卷"})})})]})})},_e="_container_u1pmx_1",ge="_content_u1pmx_8",ye="_left_u1pmx_17",Ce="_main_u1pmx_21",Se="_right_u1pmx_26",x={container:_e,"content-wrapper":"_content-wrapper_u1pmx_8",content:ge,left:ye,main:Ce,right:Se},we=()=>{const o=I(),{loading:t}=Y(!0),{title:i,isPublished:a}=z(),[r,c]=u.useState(""),[d,s]=u.useState("");W(`问卷统计 - ${i}`);const n=e.jsx("div",{style:{textAlign:"center",marginTop:"60px"},children:e.jsx(k,{})});function l(){return typeof a=="boolean"&&!a?e.jsx("div",{style:{flex:"1"},children:e.jsx(X,{status:"warning",title:"该页面未发布",extra:e.jsx(f,{type:"primary",onClick:()=>o(-1),children:"返回"})})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:x.left,children:e.jsx(re,{selectedComponentId:r,setSelectedComponentId:c,setSelectedComponentType:s})}),e.jsx("div",{className:x.main,children:e.jsx(pe,{selectedComponentId:r,setSelectedComponentId:c,setSelectedComponentType:s})}),e.jsx("div",{className:x.right,children:e.jsx(oe,{selectedComponentId:r,selectedComponentType:d})})]})}return e.jsxs("div",{className:x.container,children:[e.jsx(fe,{}),e.jsxs("div",{className:x["content-wrapper"],children:[t&&n,!t&&e.jsx("div",{className:x.content,children:l()})]})]})};export{we as default};
