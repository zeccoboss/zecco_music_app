(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const Y=()=>{document.querySelectorAll(".active_nav").forEach(t=>{t.classList.remove("active_nav")})},Q=()=>{document.querySelectorAll(".active_section").forEach(t=>{t.classList.remove("active_section")})};class Ts{#e="ZeccoMusicApp";#s="ZECCO";#t=["ZECCO"];#n=document;#i="http://localhost:3500";#r=null;get appName(){return this.#e}set pageTitle(t="Home"){this.#n.title=t}get pageTitle(){return this.#n.title}get apiUrl(){return this.#r??this.#i}get getAppData(){return{appName:this.#e,creator:this.#s,developers:this.#t}}get date(){return new Date}}const S=new Ts,it={mobileScreen:matchMedia("(min-width: 300px) and (max-width: 620px)"),bigScreen:matchMedia("(min-width: 621px) and (max-width: 940px)"),largeScreen:matchMedia("(min-width: 941px)")},j=it.mobileScreen,ke=it.bigScreen,Re=it.largeScreen;class b{static instances=new Set;constructor(t,s,n){this.element=document.createElement(`${t}`),n?this.element.innerHTML=n:s&&(this.element.innerText=s),b.instances.add(this.element)}static getInstances(){return b.instances}setAttribute(t,s){if(typeof t!="string"){console.warn(`${t}, Not a valid attribute`);return}else this.element.setAttribute(t,s)}append(...t){this.element.append(...t)}appendChild(t){this.element.appendChild(t)}appendContent(...t){t.forEach(s=>{if(s instanceof Node)this.appendChild(s);else if(typeof s=="string"){const n=document.createElement("template");n.innerHTML=s,this.element.append(n.content)}else console.warn("Unknown content type: ",s)})}addEvent(t,s){this.element.addEventListener(`${t}`,s)}remove(){this.element.remove()}getElement(){return this.element}getChild(t){return this.element.querySelector(`${t}`)}getChildren(t){return this.element.querySelectorAll(`${t}`)}set type(t){t&&this.element.setAttribute("type",t)}disableElement(t){this.element.disabled=t}setId(t){this.element.id=t}addClass(...t){t.forEach(s=>{s!==""&&this.element.classList.add(s)})}hasClass(t){return!!this.element.classList.contains(t)}removeClass(...t){t.forEach(s=>{s!==""&&this.element.classList.remove(s)})}placeholder(t){this.element.placeholder=t}columns(t){this.element.cols=t}rows(t){this.element.rows=t}setValue(t){this.element.value=t}clearValue(t=""){this.element.value=t}set innerText(t){t&&(this.element.innerText=t)}set innerHTML(t){!t||typeof t!="string"||(this.element.innerHTML=t)}get outerHTML(){return this.element.outerHTML}style(t,s){if(!t||!s||typeof t!="string"||typeof s!="string"){console.warn("Invalid style");return}this.element.style[t]=s}}function x(e,t){return!e||typeof e!="string"?(console.error("Required selector string, value passed: ",e),null):document.querySelector(`${e}`)}function et(e,t){const s=!(t instanceof b)&&t instanceof Node;if(!e||typeof e!="string")return console.error("Required selector string, value passed: ",e),null;if(t){if(t instanceof b)return Array.from(t?.getChild(`${e}`));if(s)return Array.from(t.querySelectorAll(`${e}`))}else return Array.from(document.querySelectorAll(`${e}`))}const ie=(e,t)=>{if(j.matches){if(!e&&!t){console.error("Not valid values");return}const s=x("#header-title");s&&(s.innerHTML=e);const n=et(".header_btn_wrappers");for(const r of n)r.style.display="none",r.classList.contains(t)&&(r.style.display="flex")}else return},xs=async()=>{const e=document.querySelector(".home_section");S.pageTitle="Music",Q(),Y(),ie("Music","home_btns_ctn"),e.classList.add("active_section")},z=(e,t)=>!!t.target.closest(e),te=(e,t)=>!!t.target.matches(e),ks=e=>{x(".header");const t=x(".library_btns_ctn");e.addEventListener("click",s=>{switch(!0){case z(".uploaded_tab",s):console.log("uploaded tab ");break;case z(".liked_tab",s):console.log("liked tab");break;case z(".recent-play_tab",s):console.log("recently play tab tab");break;case z(".lib_playlist_card",s):console.log("Playlist");break;case z(".lib_artist_card",s):console.log("Artist");break}}),t.addEventListener("click",s=>{const n=et(".lib_secs",e),r=et(".lib_card");function a(l){for(const p of n)p.style.display="block",p.classList.contains("user_library")||(p.style.display="none");for(const p of r)p.style.display="grid",p.classList.contains(l)||(p.style.display="none")}function i(l){for(const p of n)p.style.display="block",p.classList.contains(l)||(p.style.display="none")}switch(!0){case te(".all_tab_btn"):for(const l of n)l.style.display="block";for(const l of r)l.style.display="grid";break;case te(".liked_tab_btn"):a("liked_tab");break;case te(".uploaded_tab_btn"):a("uploaded_tab");break;case te(".recent_play_tab_btn"):a("recent_play_tab");break;case te(".lib_playlists_btn"):i("lib_playlist_sec");break;case te(".lib_artist_btn"):i("lib_artist_sec");break}})},Rs=async()=>{const e=x(".library_section");S.pageTitle="Library",Q(),Y(),ie("Library","library_btns_ctn"),ks(e),e.classList.add("active_section")},ot=`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
  		<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
	</svg>
`,Ps=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
    <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
  </svg>
`,Os=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
  </svg>
`,Jt=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
  </svg>
`,Ms=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
    <path fill-rule="red" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
  </svg>
`,he=`
 	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house">
		<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
		<path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
	</svg>	
`,$s=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16">
    <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2"/>
    <path fill-rule="evenodd" d="M12 3v10h-1V3z"/>
    <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z"/>
    <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"/>
  </svg>
`,Wt=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button-wide" viewBox="0 0 16 16">
    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"/>
    <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
  </svg>
`,pe=`
  <svg xmlns=="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
  </svg>
`,Bs=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
     <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
  </svg>
`,Hs=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>
`,Ns=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
  </svg>
`,Fs=`
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
    </svg>
`,Us=`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note" viewBox="0 0 16 16">
		<path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2"/>
		<path fill-rule="evenodd" d="M9 3v10H8V3z"/>
		<path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z"/>
	</svg>
`,Ds=`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-start" viewBox="0 0 16 16">
  <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0zm7.5.633L5.696 8l5.804 3.367z"/>
</svg>
`,Is=`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-end" viewBox="0 0 16 16">
  <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0zM5 4.633 10.804 8 5 11.367z"/>
</svg>
`,ue=`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
	</svg>

`,$e=`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
		<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
	</svg>
`,qs=`
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
  		<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
	</svg>
`,zs=`
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
		<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
	</svg>
`,Ee=`
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Left-Panel-Open--Streamline-Rounded-Material" height="24" width="24">
		<desc>
			Left Panel Open Streamline Icon: https://streamlinehq.com
		</desc>
  		<path  d="M13.175 9.5v5c0 0.16535 0.07915 0.2775 0.2375 0.3365s0.29585 0.03015 0.4125 -0.0865l2.225 -2.225c0.15 -0.15 0.225 -0.325 0.225 -0.525s-0.075 -0.375 -0.225 -0.525l-2.225 -2.225c-0.11665 -0.11665 -0.25415 -0.1455 -0.4125 -0.0865s-0.2375 0.17115 -0.2375 0.3365ZM4.5 21c-0.4125 0 -0.765585 -0.1469 -1.05925 -0.44075C3.146915 20.2656 3 19.9125 3 19.5V4.5c0 -0.4125 0.146915 -0.765665 0.44075 -1.0595C3.734415 3.146835 4.0875 3 4.5 3h15c0.4125 0 0.76565 0.146835 1.0595 0.4405C20.85315 3.734335 21 4.0875 21 4.5v15c0 0.4125 -0.14685 0.7656 -0.4405 1.05925C20.26565 20.8531 19.9125 21 19.5 21H4.5Zm3.675 -1.5V4.5H4.5v15h3.675Zm1.5 0H19.5V4.5H9.675v15Z" stroke-width="0.5"></path>
</svg>
`,vt=`
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Left-Panel-Open--Streamline-Rounded-Material" height="24" width="24">
		<desc>
			Left Panel Open Streamline Icon: https://streamlinehq.com
		</desc>
 		<path d="M13.175 9.5v5c0 0.16535 0.07915 0.2775 0.2375 0.3365s0.29585 0.03015 0.4125 -0.0865l2.225 -2.225c0.15 -0.15 0.225 -0.325 0.225 -0.525s-0.075 -0.375 -0.225 -0.525l-2.225 -2.225c-0.11665 -0.11665 -0.25415 -0.1455 -0.4125 -0.0865s-0.2375 0.17115 -0.2375 0.3365ZM4.5 21c-0.4125 0 -0.765585 -0.1469 -1.05925 -0.44075C3.146915 20.2656 3 19.9125 3 19.5V4.5c0 -0.4125 0.146915 -0.765665 0.44075 -1.0595C3.734415 3.146835 4.0875 3 4.5 3h15c0.4125 0 0.76565 0.146835 1.0595 0.4405C20.85315 3.734335 21 4.0875 21 4.5v15c0 0.4125 -0.14685 0.7656 -0.4405 1.05925C20.26565 20.8531 19.9125 21 19.5 21H4.5Zm3.675 -1.5V4.5H4.5v15h3.675Zm1.5 0H19.5V4.5H9.675v15Z" stroke-width="0.5"></path>
	</svg>
`,js=`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
		<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
		<path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
	</svg>
`,Vs=`
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
		<path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
		<path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
		<path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
	</svg>
`,Js=`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera-icon lucide-camera">
		<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/>
		<circle cx="12" cy="13" r="3"/>
	</svg>
`,Ws=`
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil svg_pencil" viewBox="0 0 16 16">
		<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
	</svg>
`,N=new b("div");N.addClass("button_loading_spinner");N.setId("button-loading-spinner");function Zt(e,t){return function(){return e.apply(t,arguments)}}const{toString:Zs}=Object.prototype,{getPrototypeOf:lt}=Object,{iterator:Be,toStringTag:Kt}=Symbol,He=(e=>t=>{const s=Zs.call(t);return e[s]||(e[s]=s.slice(8,-1).toLowerCase())})(Object.create(null)),$=e=>(e=e.toLowerCase(),t=>He(t)===e),Ne=e=>t=>typeof t===e,{isArray:oe}=Array,ae=Ne("undefined");function fe(e){return e!==null&&!ae(e)&&e.constructor!==null&&!ae(e.constructor)&&P(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Xt=$("ArrayBuffer");function Ks(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Xt(e.buffer),t}const Xs=Ne("string"),P=Ne("function"),Gt=Ne("number"),me=e=>e!==null&&typeof e=="object",Gs=e=>e===!0||e===!1,Le=e=>{if(He(e)!=="object")return!1;const t=lt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Kt in e)&&!(Be in e)},Ys=e=>{if(!me(e)||fe(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Qs=$("Date"),en=$("File"),tn=$("Blob"),sn=$("FileList"),nn=e=>me(e)&&P(e.pipe),rn=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||P(e.append)&&((t=He(e))==="formdata"||t==="object"&&P(e.toString)&&e.toString()==="[object FormData]"))},an=$("URLSearchParams"),[on,ln,cn,dn]=["ReadableStream","Request","Response","Headers"].map($),un=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function ge(e,t,{allOwnKeys:s=!1}={}){if(e===null||typeof e>"u")return;let n,r;if(typeof e!="object"&&(e=[e]),oe(e))for(n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else{if(fe(e))return;const a=s?Object.getOwnPropertyNames(e):Object.keys(e),i=a.length;let l;for(n=0;n<i;n++)l=a[n],t.call(null,e[l],l,e)}}function Yt(e,t){if(fe(e))return null;t=t.toLowerCase();const s=Object.keys(e);let n=s.length,r;for(;n-- >0;)if(r=s[n],t===r.toLowerCase())return r;return null}const Z=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Qt=e=>!ae(e)&&e!==Z;function tt(){const{caseless:e,skipUndefined:t}=Qt(this)&&this||{},s={},n=(r,a)=>{const i=e&&Yt(s,a)||a;Le(s[i])&&Le(r)?s[i]=tt(s[i],r):Le(r)?s[i]=tt({},r):oe(r)?s[i]=r.slice():(!t||!ae(r))&&(s[i]=r)};for(let r=0,a=arguments.length;r<a;r++)arguments[r]&&ge(arguments[r],n);return s}const hn=(e,t,s,{allOwnKeys:n}={})=>(ge(t,(r,a)=>{s&&P(r)?e[a]=Zt(r,s):e[a]=r},{allOwnKeys:n}),e),pn=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),fn=(e,t,s,n)=>{e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),s&&Object.assign(e.prototype,s)},mn=(e,t,s,n)=>{let r,a,i;const l={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),a=r.length;a-- >0;)i=r[a],(!n||n(i,e,t))&&!l[i]&&(t[i]=e[i],l[i]=!0);e=s!==!1&&lt(e)}while(e&&(!s||s(e,t))&&e!==Object.prototype);return t},gn=(e,t,s)=>{e=String(e),(s===void 0||s>e.length)&&(s=e.length),s-=t.length;const n=e.indexOf(t,s);return n!==-1&&n===s},bn=e=>{if(!e)return null;if(oe(e))return e;let t=e.length;if(!Gt(t))return null;const s=new Array(t);for(;t-- >0;)s[t]=e[t];return s},_n=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&lt(Uint8Array)),vn=(e,t)=>{const n=(e&&e[Be]).call(e);let r;for(;(r=n.next())&&!r.done;){const a=r.value;t.call(e,a[0],a[1])}},wn=(e,t)=>{let s;const n=[];for(;(s=e.exec(t))!==null;)n.push(s);return n},yn=$("HTMLFormElement"),Cn=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(s,n,r){return n.toUpperCase()+r}),wt=(({hasOwnProperty:e})=>(t,s)=>e.call(t,s))(Object.prototype),Sn=$("RegExp"),es=(e,t)=>{const s=Object.getOwnPropertyDescriptors(e),n={};ge(s,(r,a)=>{let i;(i=t(r,a,e))!==!1&&(n[a]=i||r)}),Object.defineProperties(e,n)},En=e=>{es(e,(t,s)=>{if(P(e)&&["arguments","caller","callee"].indexOf(s)!==-1)return!1;const n=e[s];if(P(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+s+"'")})}})},Ln=(e,t)=>{const s={},n=r=>{r.forEach(a=>{s[a]=!0})};return oe(e)?n(e):n(String(e).split(t)),s},An=()=>{},Tn=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function xn(e){return!!(e&&P(e.append)&&e[Kt]==="FormData"&&e[Be])}const kn=e=>{const t=new Array(10),s=(n,r)=>{if(me(n)){if(t.indexOf(n)>=0)return;if(fe(n))return n;if(!("toJSON"in n)){t[r]=n;const a=oe(n)?[]:{};return ge(n,(i,l)=>{const p=s(i,r+1);!ae(p)&&(a[l]=p)}),t[r]=void 0,a}}return n};return s(e,0)},Rn=$("AsyncFunction"),Pn=e=>e&&(me(e)||P(e))&&P(e.then)&&P(e.catch),ts=((e,t)=>e?setImmediate:t?((s,n)=>(Z.addEventListener("message",({source:r,data:a})=>{r===Z&&a===s&&n.length&&n.shift()()},!1),r=>{n.push(r),Z.postMessage(s,"*")}))(`axios@${Math.random()}`,[]):s=>setTimeout(s))(typeof setImmediate=="function",P(Z.postMessage)),On=typeof queueMicrotask<"u"?queueMicrotask.bind(Z):typeof process<"u"&&process.nextTick||ts,Mn=e=>e!=null&&P(e[Be]),o={isArray:oe,isArrayBuffer:Xt,isBuffer:fe,isFormData:rn,isArrayBufferView:Ks,isString:Xs,isNumber:Gt,isBoolean:Gs,isObject:me,isPlainObject:Le,isEmptyObject:Ys,isReadableStream:on,isRequest:ln,isResponse:cn,isHeaders:dn,isUndefined:ae,isDate:Qs,isFile:en,isBlob:tn,isRegExp:Sn,isFunction:P,isStream:nn,isURLSearchParams:an,isTypedArray:_n,isFileList:sn,forEach:ge,merge:tt,extend:hn,trim:un,stripBOM:pn,inherits:fn,toFlatObject:mn,kindOf:He,kindOfTest:$,endsWith:gn,toArray:bn,forEachEntry:vn,matchAll:wn,isHTMLForm:yn,hasOwnProperty:wt,hasOwnProp:wt,reduceDescriptors:es,freezeMethods:En,toObjectSet:Ln,toCamelCase:Cn,noop:An,toFiniteNumber:Tn,findKey:Yt,global:Z,isContextDefined:Qt,isSpecCompliantForm:xn,toJSONObject:kn,isAsyncFn:Rn,isThenable:Pn,setImmediate:ts,asap:On,isIterable:Mn};function g(e,t,s,n,r){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),s&&(this.config=s),n&&(this.request=n),r&&(this.response=r,this.status=r.status?r.status:null)}o.inherits(g,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:o.toJSONObject(this.config),code:this.code,status:this.status}}});const ss=g.prototype,ns={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{ns[e]={value:e}});Object.defineProperties(g,ns);Object.defineProperty(ss,"isAxiosError",{value:!0});g.from=(e,t,s,n,r,a)=>{const i=Object.create(ss);o.toFlatObject(e,i,function(c){return c!==Error.prototype},d=>d!=="isAxiosError");const l=e&&e.message?e.message:"Error",p=t==null&&e?e.code:t;return g.call(i,l,p,s,n,r),e&&i.cause==null&&Object.defineProperty(i,"cause",{value:e,configurable:!0}),i.name=e&&e.name||"Error",a&&Object.assign(i,a),i};const $n=null;function st(e){return o.isPlainObject(e)||o.isArray(e)}function rs(e){return o.endsWith(e,"[]")?e.slice(0,-2):e}function yt(e,t,s){return e?e.concat(t).map(function(r,a){return r=rs(r),!s&&a?"["+r+"]":r}).join(s?".":""):t}function Bn(e){return o.isArray(e)&&!e.some(st)}const Hn=o.toFlatObject(o,{},null,function(t){return/^is[A-Z]/.test(t)});function Fe(e,t,s){if(!o.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,s=o.toFlatObject(s,{metaTokens:!0,dots:!1,indexes:!1},!1,function(m,f){return!o.isUndefined(f[m])});const n=s.metaTokens,r=s.visitor||c,a=s.dots,i=s.indexes,p=(s.Blob||typeof Blob<"u"&&Blob)&&o.isSpecCompliantForm(t);if(!o.isFunction(r))throw new TypeError("visitor must be a function");function d(h){if(h===null)return"";if(o.isDate(h))return h.toISOString();if(o.isBoolean(h))return h.toString();if(!p&&o.isBlob(h))throw new g("Blob is not supported. Use a Buffer instead.");return o.isArrayBuffer(h)||o.isTypedArray(h)?p&&typeof Blob=="function"?new Blob([h]):Buffer.from(h):h}function c(h,m,f){let C=h;if(h&&!f&&typeof h=="object"){if(o.endsWith(m,"{}"))m=n?m:m.slice(0,-2),h=JSON.stringify(h);else if(o.isArray(h)&&Bn(h)||(o.isFileList(h)||o.endsWith(m,"[]"))&&(C=o.toArray(h)))return m=rs(m),C.forEach(function(E,w){!(o.isUndefined(E)||E===null)&&t.append(i===!0?yt([m],w,a):i===null?m:m+"[]",d(E))}),!1}return st(h)?!0:(t.append(yt(f,m,a),d(h)),!1)}const u=[],_=Object.assign(Hn,{defaultVisitor:c,convertValue:d,isVisitable:st});function y(h,m){if(!o.isUndefined(h)){if(u.indexOf(h)!==-1)throw Error("Circular reference detected in "+m.join("."));u.push(h),o.forEach(h,function(C,T){(!(o.isUndefined(C)||C===null)&&r.call(t,C,o.isString(T)?T.trim():T,m,_))===!0&&y(C,m?m.concat(T):[T])}),u.pop()}}if(!o.isObject(e))throw new TypeError("data must be an object");return y(e),t}function Ct(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(n){return t[n]})}function ct(e,t){this._pairs=[],e&&Fe(e,this,t)}const as=ct.prototype;as.append=function(t,s){this._pairs.push([t,s])};as.toString=function(t){const s=t?function(n){return t.call(this,n,Ct)}:Ct;return this._pairs.map(function(r){return s(r[0])+"="+s(r[1])},"").join("&")};function Nn(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function is(e,t,s){if(!t)return e;const n=s&&s.encode||Nn;o.isFunction(s)&&(s={serialize:s});const r=s&&s.serialize;let a;if(r?a=r(t,s):a=o.isURLSearchParams(t)?t.toString():new ct(t,s).toString(n),a){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+a}return e}class St{constructor(){this.handlers=[]}use(t,s,n){return this.handlers.push({fulfilled:t,rejected:s,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){o.forEach(this.handlers,function(n){n!==null&&t(n)})}}const os={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Fn=typeof URLSearchParams<"u"?URLSearchParams:ct,Un=typeof FormData<"u"?FormData:null,Dn=typeof Blob<"u"?Blob:null,In={isBrowser:!0,classes:{URLSearchParams:Fn,FormData:Un,Blob:Dn},protocols:["http","https","file","blob","url","data"]},dt=typeof window<"u"&&typeof document<"u",nt=typeof navigator=="object"&&navigator||void 0,qn=dt&&(!nt||["ReactNative","NativeScript","NS"].indexOf(nt.product)<0),zn=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",jn=dt&&window.location.href||"http://localhost",Vn=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:dt,hasStandardBrowserEnv:qn,hasStandardBrowserWebWorkerEnv:zn,navigator:nt,origin:jn},Symbol.toStringTag,{value:"Module"})),A={...Vn,...In};function Jn(e,t){return Fe(e,new A.classes.URLSearchParams,{visitor:function(s,n,r,a){return A.isNode&&o.isBuffer(s)?(this.append(n,s.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)},...t})}function Wn(e){return o.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Zn(e){const t={},s=Object.keys(e);let n;const r=s.length;let a;for(n=0;n<r;n++)a=s[n],t[a]=e[a];return t}function ls(e){function t(s,n,r,a){let i=s[a++];if(i==="__proto__")return!0;const l=Number.isFinite(+i),p=a>=s.length;return i=!i&&o.isArray(r)?r.length:i,p?(o.hasOwnProp(r,i)?r[i]=[r[i],n]:r[i]=n,!l):((!r[i]||!o.isObject(r[i]))&&(r[i]=[]),t(s,n,r[i],a)&&o.isArray(r[i])&&(r[i]=Zn(r[i])),!l)}if(o.isFormData(e)&&o.isFunction(e.entries)){const s={};return o.forEachEntry(e,(n,r)=>{t(Wn(n),r,s,0)}),s}return null}function Kn(e,t,s){if(o.isString(e))try{return(t||JSON.parse)(e),o.trim(e)}catch(n){if(n.name!=="SyntaxError")throw n}return(s||JSON.stringify)(e)}const be={transitional:os,adapter:["xhr","http","fetch"],transformRequest:[function(t,s){const n=s.getContentType()||"",r=n.indexOf("application/json")>-1,a=o.isObject(t);if(a&&o.isHTMLForm(t)&&(t=new FormData(t)),o.isFormData(t))return r?JSON.stringify(ls(t)):t;if(o.isArrayBuffer(t)||o.isBuffer(t)||o.isStream(t)||o.isFile(t)||o.isBlob(t)||o.isReadableStream(t))return t;if(o.isArrayBufferView(t))return t.buffer;if(o.isURLSearchParams(t))return s.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(a){if(n.indexOf("application/x-www-form-urlencoded")>-1)return Jn(t,this.formSerializer).toString();if((l=o.isFileList(t))||n.indexOf("multipart/form-data")>-1){const p=this.env&&this.env.FormData;return Fe(l?{"files[]":t}:t,p&&new p,this.formSerializer)}}return a||r?(s.setContentType("application/json",!1),Kn(t)):t}],transformResponse:[function(t){const s=this.transitional||be.transitional,n=s&&s.forcedJSONParsing,r=this.responseType==="json";if(o.isResponse(t)||o.isReadableStream(t))return t;if(t&&o.isString(t)&&(n&&!this.responseType||r)){const i=!(s&&s.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(l){if(i)throw l.name==="SyntaxError"?g.from(l,g.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:A.classes.FormData,Blob:A.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};o.forEach(["delete","get","head","post","put","patch"],e=>{be.headers[e]={}});const Xn=o.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Gn=e=>{const t={};let s,n,r;return e&&e.split(`
`).forEach(function(i){r=i.indexOf(":"),s=i.substring(0,r).trim().toLowerCase(),n=i.substring(r+1).trim(),!(!s||t[s]&&Xn[s])&&(s==="set-cookie"?t[s]?t[s].push(n):t[s]=[n]:t[s]=t[s]?t[s]+", "+n:n)}),t},Et=Symbol("internals");function de(e){return e&&String(e).trim().toLowerCase()}function Ae(e){return e===!1||e==null?e:o.isArray(e)?e.map(Ae):String(e)}function Yn(e){const t=Object.create(null),s=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=s.exec(e);)t[n[1]]=n[2];return t}const Qn=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function je(e,t,s,n,r){if(o.isFunction(n))return n.call(this,t,s);if(r&&(t=s),!!o.isString(t)){if(o.isString(n))return t.indexOf(n)!==-1;if(o.isRegExp(n))return n.test(t)}}function er(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,s,n)=>s.toUpperCase()+n)}function tr(e,t){const s=o.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+s,{value:function(r,a,i){return this[n].call(this,t,r,a,i)},configurable:!0})})}let O=class{constructor(t){t&&this.set(t)}set(t,s,n){const r=this;function a(l,p,d){const c=de(p);if(!c)throw new Error("header name must be a non-empty string");const u=o.findKey(r,c);(!u||r[u]===void 0||d===!0||d===void 0&&r[u]!==!1)&&(r[u||p]=Ae(l))}const i=(l,p)=>o.forEach(l,(d,c)=>a(d,c,p));if(o.isPlainObject(t)||t instanceof this.constructor)i(t,s);else if(o.isString(t)&&(t=t.trim())&&!Qn(t))i(Gn(t),s);else if(o.isObject(t)&&o.isIterable(t)){let l={},p,d;for(const c of t){if(!o.isArray(c))throw TypeError("Object iterator must return a key-value pair");l[d=c[0]]=(p=l[d])?o.isArray(p)?[...p,c[1]]:[p,c[1]]:c[1]}i(l,s)}else t!=null&&a(s,t,n);return this}get(t,s){if(t=de(t),t){const n=o.findKey(this,t);if(n){const r=this[n];if(!s)return r;if(s===!0)return Yn(r);if(o.isFunction(s))return s.call(this,r,n);if(o.isRegExp(s))return s.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,s){if(t=de(t),t){const n=o.findKey(this,t);return!!(n&&this[n]!==void 0&&(!s||je(this,this[n],n,s)))}return!1}delete(t,s){const n=this;let r=!1;function a(i){if(i=de(i),i){const l=o.findKey(n,i);l&&(!s||je(n,n[l],l,s))&&(delete n[l],r=!0)}}return o.isArray(t)?t.forEach(a):a(t),r}clear(t){const s=Object.keys(this);let n=s.length,r=!1;for(;n--;){const a=s[n];(!t||je(this,this[a],a,t,!0))&&(delete this[a],r=!0)}return r}normalize(t){const s=this,n={};return o.forEach(this,(r,a)=>{const i=o.findKey(n,a);if(i){s[i]=Ae(r),delete s[a];return}const l=t?er(a):String(a).trim();l!==a&&delete s[a],s[l]=Ae(r),n[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const s=Object.create(null);return o.forEach(this,(n,r)=>{n!=null&&n!==!1&&(s[r]=t&&o.isArray(n)?n.join(", "):n)}),s}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,s])=>t+": "+s).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...s){const n=new this(t);return s.forEach(r=>n.set(r)),n}static accessor(t){const n=(this[Et]=this[Et]={accessors:{}}).accessors,r=this.prototype;function a(i){const l=de(i);n[l]||(tr(r,i),n[l]=!0)}return o.isArray(t)?t.forEach(a):a(t),this}};O.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);o.reduceDescriptors(O.prototype,({value:e},t)=>{let s=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(n){this[s]=n}}});o.freezeMethods(O);function Ve(e,t){const s=this||be,n=t||s,r=O.from(n.headers);let a=n.data;return o.forEach(e,function(l){a=l.call(s,a,r.normalize(),t?t.status:void 0)}),r.normalize(),a}function cs(e){return!!(e&&e.__CANCEL__)}function le(e,t,s){g.call(this,e??"canceled",g.ERR_CANCELED,t,s),this.name="CanceledError"}o.inherits(le,g,{__CANCEL__:!0});function ds(e,t,s){const n=s.config.validateStatus;!s.status||!n||n(s.status)?e(s):t(new g("Request failed with status code "+s.status,[g.ERR_BAD_REQUEST,g.ERR_BAD_RESPONSE][Math.floor(s.status/100)-4],s.config,s.request,s))}function sr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function nr(e,t){e=e||10;const s=new Array(e),n=new Array(e);let r=0,a=0,i;return t=t!==void 0?t:1e3,function(p){const d=Date.now(),c=n[a];i||(i=d),s[r]=p,n[r]=d;let u=a,_=0;for(;u!==r;)_+=s[u++],u=u%e;if(r=(r+1)%e,r===a&&(a=(a+1)%e),d-i<t)return;const y=c&&d-c;return y?Math.round(_*1e3/y):void 0}}function rr(e,t){let s=0,n=1e3/t,r,a;const i=(d,c=Date.now())=>{s=c,r=null,a&&(clearTimeout(a),a=null),e(...d)};return[(...d)=>{const c=Date.now(),u=c-s;u>=n?i(d,c):(r=d,a||(a=setTimeout(()=>{a=null,i(r)},n-u)))},()=>r&&i(r)]}const Pe=(e,t,s=3)=>{let n=0;const r=nr(50,250);return rr(a=>{const i=a.loaded,l=a.lengthComputable?a.total:void 0,p=i-n,d=r(p),c=i<=l;n=i;const u={loaded:i,total:l,progress:l?i/l:void 0,bytes:p,rate:d||void 0,estimated:d&&l&&c?(l-i)/d:void 0,event:a,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(u)},s)},Lt=(e,t)=>{const s=e!=null;return[n=>t[0]({lengthComputable:s,total:e,loaded:n}),t[1]]},At=e=>(...t)=>o.asap(()=>e(...t)),ar=A.hasStandardBrowserEnv?((e,t)=>s=>(s=new URL(s,A.origin),e.protocol===s.protocol&&e.host===s.host&&(t||e.port===s.port)))(new URL(A.origin),A.navigator&&/(msie|trident)/i.test(A.navigator.userAgent)):()=>!0,ir=A.hasStandardBrowserEnv?{write(e,t,s,n,r,a,i){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];o.isNumber(s)&&l.push(`expires=${new Date(s).toUTCString()}`),o.isString(n)&&l.push(`path=${n}`),o.isString(r)&&l.push(`domain=${r}`),a===!0&&l.push("secure"),o.isString(i)&&l.push(`SameSite=${i}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function or(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function lr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function us(e,t,s){let n=!or(t);return e&&(n||s==!1)?lr(e,t):t}const Tt=e=>e instanceof O?{...e}:e;function X(e,t){t=t||{};const s={};function n(d,c,u,_){return o.isPlainObject(d)&&o.isPlainObject(c)?o.merge.call({caseless:_},d,c):o.isPlainObject(c)?o.merge({},c):o.isArray(c)?c.slice():c}function r(d,c,u,_){if(o.isUndefined(c)){if(!o.isUndefined(d))return n(void 0,d,u,_)}else return n(d,c,u,_)}function a(d,c){if(!o.isUndefined(c))return n(void 0,c)}function i(d,c){if(o.isUndefined(c)){if(!o.isUndefined(d))return n(void 0,d)}else return n(void 0,c)}function l(d,c,u){if(u in t)return n(d,c);if(u in e)return n(void 0,d)}const p={url:a,method:a,data:a,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:l,headers:(d,c,u)=>r(Tt(d),Tt(c),u,!0)};return o.forEach(Object.keys({...e,...t}),function(c){const u=p[c]||r,_=u(e[c],t[c],c);o.isUndefined(_)&&u!==l||(s[c]=_)}),s}const hs=e=>{const t=X({},e);let{data:s,withXSRFToken:n,xsrfHeaderName:r,xsrfCookieName:a,headers:i,auth:l}=t;if(t.headers=i=O.from(i),t.url=is(us(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&i.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),o.isFormData(s)){if(A.hasStandardBrowserEnv||A.hasStandardBrowserWebWorkerEnv)i.setContentType(void 0);else if(o.isFunction(s.getHeaders)){const p=s.getHeaders(),d=["content-type","content-length"];Object.entries(p).forEach(([c,u])=>{d.includes(c.toLowerCase())&&i.set(c,u)})}}if(A.hasStandardBrowserEnv&&(n&&o.isFunction(n)&&(n=n(t)),n||n!==!1&&ar(t.url))){const p=r&&a&&ir.read(a);p&&i.set(r,p)}return t},cr=typeof XMLHttpRequest<"u",dr=cr&&function(e){return new Promise(function(s,n){const r=hs(e);let a=r.data;const i=O.from(r.headers).normalize();let{responseType:l,onUploadProgress:p,onDownloadProgress:d}=r,c,u,_,y,h;function m(){y&&y(),h&&h(),r.cancelToken&&r.cancelToken.unsubscribe(c),r.signal&&r.signal.removeEventListener("abort",c)}let f=new XMLHttpRequest;f.open(r.method.toUpperCase(),r.url,!0),f.timeout=r.timeout;function C(){if(!f)return;const E=O.from("getAllResponseHeaders"in f&&f.getAllResponseHeaders()),k={data:!l||l==="text"||l==="json"?f.responseText:f.response,status:f.status,statusText:f.statusText,headers:E,config:e,request:f};ds(function(R){s(R),m()},function(R){n(R),m()},k),f=null}"onloadend"in f?f.onloadend=C:f.onreadystatechange=function(){!f||f.readyState!==4||f.status===0&&!(f.responseURL&&f.responseURL.indexOf("file:")===0)||setTimeout(C)},f.onabort=function(){f&&(n(new g("Request aborted",g.ECONNABORTED,e,f)),f=null)},f.onerror=function(w){const k=w&&w.message?w.message:"Network Error",F=new g(k,g.ERR_NETWORK,e,f);F.event=w||null,n(F),f=null},f.ontimeout=function(){let w=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const k=r.transitional||os;r.timeoutErrorMessage&&(w=r.timeoutErrorMessage),n(new g(w,k.clarifyTimeoutError?g.ETIMEDOUT:g.ECONNABORTED,e,f)),f=null},a===void 0&&i.setContentType(null),"setRequestHeader"in f&&o.forEach(i.toJSON(),function(w,k){f.setRequestHeader(k,w)}),o.isUndefined(r.withCredentials)||(f.withCredentials=!!r.withCredentials),l&&l!=="json"&&(f.responseType=r.responseType),d&&([_,h]=Pe(d,!0),f.addEventListener("progress",_)),p&&f.upload&&([u,y]=Pe(p),f.upload.addEventListener("progress",u),f.upload.addEventListener("loadend",y)),(r.cancelToken||r.signal)&&(c=E=>{f&&(n(!E||E.type?new le(null,e,f):E),f.abort(),f=null)},r.cancelToken&&r.cancelToken.subscribe(c),r.signal&&(r.signal.aborted?c():r.signal.addEventListener("abort",c)));const T=sr(r.url);if(T&&A.protocols.indexOf(T)===-1){n(new g("Unsupported protocol "+T+":",g.ERR_BAD_REQUEST,e));return}f.send(a||null)})},ur=(e,t)=>{const{length:s}=e=e?e.filter(Boolean):[];if(t||s){let n=new AbortController,r;const a=function(d){if(!r){r=!0,l();const c=d instanceof Error?d:this.reason;n.abort(c instanceof g?c:new le(c instanceof Error?c.message:c))}};let i=t&&setTimeout(()=>{i=null,a(new g(`timeout ${t} of ms exceeded`,g.ETIMEDOUT))},t);const l=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(a):d.removeEventListener("abort",a)}),e=null)};e.forEach(d=>d.addEventListener("abort",a));const{signal:p}=n;return p.unsubscribe=()=>o.asap(l),p}},hr=function*(e,t){let s=e.byteLength;if(s<t){yield e;return}let n=0,r;for(;n<s;)r=n+t,yield e.slice(n,r),n=r},pr=async function*(e,t){for await(const s of fr(e))yield*hr(s,t)},fr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:s,value:n}=await t.read();if(s)break;yield n}}finally{await t.cancel()}},xt=(e,t,s,n)=>{const r=pr(e,t);let a=0,i,l=p=>{i||(i=!0,n&&n(p))};return new ReadableStream({async pull(p){try{const{done:d,value:c}=await r.next();if(d){l(),p.close();return}let u=c.byteLength;if(s){let _=a+=u;s(_)}p.enqueue(new Uint8Array(c))}catch(d){throw l(d),d}},cancel(p){return l(p),r.return()}},{highWaterMark:2})},kt=64*1024,{isFunction:Se}=o,mr=(({Request:e,Response:t})=>({Request:e,Response:t}))(o.global),{ReadableStream:Rt,TextEncoder:Pt}=o.global,Ot=(e,...t)=>{try{return!!e(...t)}catch{return!1}},gr=e=>{e=o.merge.call({skipUndefined:!0},mr,e);const{fetch:t,Request:s,Response:n}=e,r=t?Se(t):typeof fetch=="function",a=Se(s),i=Se(n);if(!r)return!1;const l=r&&Se(Rt),p=r&&(typeof Pt=="function"?(h=>m=>h.encode(m))(new Pt):async h=>new Uint8Array(await new s(h).arrayBuffer())),d=a&&l&&Ot(()=>{let h=!1;const m=new s(A.origin,{body:new Rt,method:"POST",get duplex(){return h=!0,"half"}}).headers.has("Content-Type");return h&&!m}),c=i&&l&&Ot(()=>o.isReadableStream(new n("").body)),u={stream:c&&(h=>h.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(h=>{!u[h]&&(u[h]=(m,f)=>{let C=m&&m[h];if(C)return C.call(m);throw new g(`Response type '${h}' is not supported`,g.ERR_NOT_SUPPORT,f)})});const _=async h=>{if(h==null)return 0;if(o.isBlob(h))return h.size;if(o.isSpecCompliantForm(h))return(await new s(A.origin,{method:"POST",body:h}).arrayBuffer()).byteLength;if(o.isArrayBufferView(h)||o.isArrayBuffer(h))return h.byteLength;if(o.isURLSearchParams(h)&&(h=h+""),o.isString(h))return(await p(h)).byteLength},y=async(h,m)=>{const f=o.toFiniteNumber(h.getContentLength());return f??_(m)};return async h=>{let{url:m,method:f,data:C,signal:T,cancelToken:E,timeout:w,onDownloadProgress:k,onUploadProgress:F,responseType:R,headers:qe,withCredentials:we="same-origin",fetchOptions:pt}=hs(h),ft=t||fetch;R=R?(R+"").toLowerCase():"text";let ye=ur([T,E&&E.toAbortSignal()],w),ce=null;const J=ye&&ye.unsubscribe&&(()=>{ye.unsubscribe()});let mt;try{if(F&&d&&f!=="get"&&f!=="head"&&(mt=await y(qe,C))!==0){let q=new s(m,{method:"POST",body:C,duplex:"half"}),ee;if(o.isFormData(C)&&(ee=q.headers.get("content-type"))&&qe.setContentType(ee),q.body){const[ze,Ce]=Lt(mt,Pe(At(F)));C=xt(q.body,kt,ze,Ce)}}o.isString(we)||(we=we?"include":"omit");const B=a&&"credentials"in s.prototype,gt={...pt,signal:ye,method:f.toUpperCase(),headers:qe.normalize().toJSON(),body:C,duplex:"half",credentials:B?we:void 0};ce=a&&new s(m,gt);let I=await(a?ft(ce,pt):ft(m,gt));const bt=c&&(R==="stream"||R==="response");if(c&&(k||bt&&J)){const q={};["status","statusText","headers"].forEach(_t=>{q[_t]=I[_t]});const ee=o.toFiniteNumber(I.headers.get("content-length")),[ze,Ce]=k&&Lt(ee,Pe(At(k),!0))||[];I=new n(xt(I.body,kt,ze,()=>{Ce&&Ce(),J&&J()}),q)}R=R||"text";let As=await u[o.findKey(u,R)||"text"](I,h);return!bt&&J&&J(),await new Promise((q,ee)=>{ds(q,ee,{data:As,headers:O.from(I.headers),status:I.status,statusText:I.statusText,config:h,request:ce})})}catch(B){throw J&&J(),B&&B.name==="TypeError"&&/Load failed|fetch/i.test(B.message)?Object.assign(new g("Network Error",g.ERR_NETWORK,h,ce),{cause:B.cause||B}):g.from(B,B&&B.code,h,ce)}}},br=new Map,ps=e=>{let t=e&&e.env||{};const{fetch:s,Request:n,Response:r}=t,a=[n,r,s];let i=a.length,l=i,p,d,c=br;for(;l--;)p=a[l],d=c.get(p),d===void 0&&c.set(p,d=l?new Map:gr(t)),c=d;return d};ps();const ut={http:$n,xhr:dr,fetch:{get:ps}};o.forEach(ut,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Mt=e=>`- ${e}`,_r=e=>o.isFunction(e)||e===null||e===!1;function vr(e,t){e=o.isArray(e)?e:[e];const{length:s}=e;let n,r;const a={};for(let i=0;i<s;i++){n=e[i];let l;if(r=n,!_r(n)&&(r=ut[(l=String(n)).toLowerCase()],r===void 0))throw new g(`Unknown adapter '${l}'`);if(r&&(o.isFunction(r)||(r=r.get(t))))break;a[l||"#"+i]=r}if(!r){const i=Object.entries(a).map(([p,d])=>`adapter ${p} `+(d===!1?"is not supported by the environment":"is not available in the build"));let l=s?i.length>1?`since :
`+i.map(Mt).join(`
`):" "+Mt(i[0]):"as no adapter specified";throw new g("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return r}const fs={getAdapter:vr,adapters:ut};function Je(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new le(null,e)}function $t(e){return Je(e),e.headers=O.from(e.headers),e.data=Ve.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),fs.getAdapter(e.adapter||be.adapter,e)(e).then(function(n){return Je(e),n.data=Ve.call(e,e.transformResponse,n),n.headers=O.from(n.headers),n},function(n){return cs(n)||(Je(e),n&&n.response&&(n.response.data=Ve.call(e,e.transformResponse,n.response),n.response.headers=O.from(n.response.headers))),Promise.reject(n)})}const ms="1.13.2",Ue={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Ue[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const Bt={};Ue.transitional=function(t,s,n){function r(a,i){return"[Axios v"+ms+"] Transitional option '"+a+"'"+i+(n?". "+n:"")}return(a,i,l)=>{if(t===!1)throw new g(r(i," has been removed"+(s?" in "+s:"")),g.ERR_DEPRECATED);return s&&!Bt[i]&&(Bt[i]=!0,console.warn(r(i," has been deprecated since v"+s+" and will be removed in the near future"))),t?t(a,i,l):!0}};Ue.spelling=function(t){return(s,n)=>(console.warn(`${n} is likely a misspelling of ${t}`),!0)};function wr(e,t,s){if(typeof e!="object")throw new g("options must be an object",g.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let r=n.length;for(;r-- >0;){const a=n[r],i=t[a];if(i){const l=e[a],p=l===void 0||i(l,a,e);if(p!==!0)throw new g("option "+a+" must be "+p,g.ERR_BAD_OPTION_VALUE);continue}if(s!==!0)throw new g("Unknown option "+a,g.ERR_BAD_OPTION)}}const Te={assertOptions:wr,validators:Ue},H=Te.validators;let K=class{constructor(t){this.defaults=t||{},this.interceptors={request:new St,response:new St}}async request(t,s){try{return await this._request(t,s)}catch(n){if(n instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const a=r.stack?r.stack.replace(/^.+\n/,""):"";try{n.stack?a&&!String(n.stack).endsWith(a.replace(/^.+\n.+\n/,""))&&(n.stack+=`
`+a):n.stack=a}catch{}}throw n}}_request(t,s){typeof t=="string"?(s=s||{},s.url=t):s=t||{},s=X(this.defaults,s);const{transitional:n,paramsSerializer:r,headers:a}=s;n!==void 0&&Te.assertOptions(n,{silentJSONParsing:H.transitional(H.boolean),forcedJSONParsing:H.transitional(H.boolean),clarifyTimeoutError:H.transitional(H.boolean)},!1),r!=null&&(o.isFunction(r)?s.paramsSerializer={serialize:r}:Te.assertOptions(r,{encode:H.function,serialize:H.function},!0)),s.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?s.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:s.allowAbsoluteUrls=!0),Te.assertOptions(s,{baseUrl:H.spelling("baseURL"),withXsrfToken:H.spelling("withXSRFToken")},!0),s.method=(s.method||this.defaults.method||"get").toLowerCase();let i=a&&o.merge(a.common,a[s.method]);a&&o.forEach(["delete","get","head","post","put","patch","common"],h=>{delete a[h]}),s.headers=O.concat(i,a);const l=[];let p=!0;this.interceptors.request.forEach(function(m){typeof m.runWhen=="function"&&m.runWhen(s)===!1||(p=p&&m.synchronous,l.unshift(m.fulfilled,m.rejected))});const d=[];this.interceptors.response.forEach(function(m){d.push(m.fulfilled,m.rejected)});let c,u=0,_;if(!p){const h=[$t.bind(this),void 0];for(h.unshift(...l),h.push(...d),_=h.length,c=Promise.resolve(s);u<_;)c=c.then(h[u++],h[u++]);return c}_=l.length;let y=s;for(;u<_;){const h=l[u++],m=l[u++];try{y=h(y)}catch(f){m.call(this,f);break}}try{c=$t.call(this,y)}catch(h){return Promise.reject(h)}for(u=0,_=d.length;u<_;)c=c.then(d[u++],d[u++]);return c}getUri(t){t=X(this.defaults,t);const s=us(t.baseURL,t.url,t.allowAbsoluteUrls);return is(s,t.params,t.paramsSerializer)}};o.forEach(["delete","get","head","options"],function(t){K.prototype[t]=function(s,n){return this.request(X(n||{},{method:t,url:s,data:(n||{}).data}))}});o.forEach(["post","put","patch"],function(t){function s(n){return function(a,i,l){return this.request(X(l||{},{method:t,headers:n?{"Content-Type":"multipart/form-data"}:{},url:a,data:i}))}}K.prototype[t]=s(),K.prototype[t+"Form"]=s(!0)});let yr=class gs{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let s;this.promise=new Promise(function(a){s=a});const n=this;this.promise.then(r=>{if(!n._listeners)return;let a=n._listeners.length;for(;a-- >0;)n._listeners[a](r);n._listeners=null}),this.promise.then=r=>{let a;const i=new Promise(l=>{n.subscribe(l),a=l}).then(r);return i.cancel=function(){n.unsubscribe(a)},i},t(function(a,i,l){n.reason||(n.reason=new le(a,i,l),s(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const s=this._listeners.indexOf(t);s!==-1&&this._listeners.splice(s,1)}toAbortSignal(){const t=new AbortController,s=n=>{t.abort(n)};return this.subscribe(s),t.signal.unsubscribe=()=>this.unsubscribe(s),t.signal}static source(){let t;return{token:new gs(function(r){t=r}),cancel:t}}};function Cr(e){return function(s){return e.apply(null,s)}}function Sr(e){return o.isObject(e)&&e.isAxiosError===!0}const rt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(rt).forEach(([e,t])=>{rt[t]=e});function bs(e){const t=new K(e),s=Zt(K.prototype.request,t);return o.extend(s,K.prototype,t,{allOwnKeys:!0}),o.extend(s,t,null,{allOwnKeys:!0}),s.create=function(r){return bs(X(e,r))},s}const v=bs(be);v.Axios=K;v.CanceledError=le;v.CancelToken=yr;v.isCancel=cs;v.VERSION=ms;v.toFormData=Fe;v.AxiosError=g;v.Cancel=v.CanceledError;v.all=function(t){return Promise.all(t)};v.spread=Cr;v.isAxiosError=Sr;v.mergeConfig=X;v.AxiosHeaders=O;v.formToJSON=e=>ls(o.isHTMLForm(e)?new FormData(e):e);v.getAdapter=fs.getAdapter;v.HttpStatusCode=rt;v.default=v;const{Axios:La,AxiosError:Aa,CanceledError:Ta,isCancel:xa,CancelToken:ka,VERSION:Ra,all:Pa,Cancel:Oa,isAxiosError:Ma,spread:$a,toFormData:Ba,AxiosHeaders:Ha,HttpStatusCode:Na,formToJSON:Fa,getAdapter:Ua,mergeConfig:Da}=v;function L(e,t,s,n){t.innerHTML="",t.remove(),t.innerHTML=e,s.insertBefore(t,n.nextElementSibling)}const Er=async(e,t={})=>{const s=new URL(e,S.apiUrl);v.defaults.withCredentials=!0;try{return await v.post(s,t)}catch(n){return console.log(n.response.data),n.response??{status:500,data:{error:"Network error"}}}},Lr=e=>{const t=e.getElement(),s=e.getChild(".lg_user_pwd","class"),n=e.getChild(".lg_user_name","class"),r=e.getChild("#lg-submit-btn","id"),a=new b("span","Feed holder");a.addClass("feed_holder"),r.addEventListener("click",async i=>{i.preventDefault();const l=n.value.trim().toLocaleLowerCase(),p=s.value.trim().toLocaleLowerCase();if(l)a.remove(),n.style.outline="1px solid var(--clear-border-warning)";else{L("All fields are required!",a.getElement(),t,n),a.addClass("error_color"),a.removeClass("warning_color"),n.style.outline="1px solid var(--error-border)";return}if(p)a.remove(),s.style.outline="1px solid var(--clear-border-warning)";else{L("All fields are required!",a.getElement(),t,s),a.addClass("error_color"),a.removeClass("warning_color"),s.style.outline="1px solid var(--error-border)";return}if(l&&p){const d={identifier:l,password:p};r.disabled=!0,r.appendChild(N.getElement());const c=await Er("auth/login",d);setTimeout(()=>{if(r.disabled=!1,N.remove(),c.status===404){a.removeClass("form_feed"),L(c.data.error,a.getElement(),t,s),a.getElement().style="text-align: center",s.style.outline="1px solid var(--error-border)",n.style.outline="1px solid var(--error-border)",a.addClass("error_color"),a.removeClass("warning_color");return}else if(c.status===403){a.removeClass("form_feed"),L(c.data.error,a.getElement(),t,s),s.style.outline="1px solid var(--error-border)",n.style.outline="1px solid var(--error-border)",a.addClass("error_color"),a.removeClass("warning_color");return}else if(c.status===400){L(c.data.error,a.getElement(),t,s),a.removeClass("error_color"),a.addClass("warning_color");return}else if(c.status===500){L("500 Network error",a.getElement(),t,s),a.removeClass("error_color"),a.addClass("warning_color");return}else c.status===202&&(L("Processing... Login successful",a.getElement(),t,s),s.style.outline="1px solid var(--clear-border-warning)",n.style.outline="1px solid var(--clear-border-warning)",a.addClass("clear_error_color"),setTimeout(()=>{console.log("[SUCCESS]: Login successful")},3e3))},1e3)}})},se=new b("forms"),Ar=()=>(se.addClass("login_form","forms"),se.setId("login-form"),se.innerHTML=`
		<a href="/" id="form-nav-link" class="form_nav_link form_links">${he} Home</a>	
		<h2 class="form_heading">
			<span class="first-child">Zecco</span><span class="second-child">Music</span>
		</h2>
		<h4 class="form_message">Welcome back, Please login to continue.</h4>

		<label for="lg-user-name">Email address:</label>
		<input type="text" name="" id="lg-user-name" class="lg_user_name" placeholder="youremail@example.com" required />
		<label for="lg-user-pwd">Password:</label>
		<input type="password" name="password" id="lg-user-pwd" class="lg_user_pwd" placeholder="Enter Password" required />
	
		<div class="form_links_wrapper">
			<a href="/password/reset" class="form_links lg_frgt_pwd_lnk" id="lg-frgt-pwd-lnk">Forgotten password?</a>	
		</div>
	
		<button type="submit" id="lg-submit-btn" class="form_btn">Login</button>

		<div class="form_links_wrapper_two">
			<a href="/register" class="form_links">Don't have account? Sign up.</a>
		</div>
	`,Lr(se),se.getElement());function Tr(e){if(!e||!e.includes("@"))return console.error("[Prompt Config:Error] Valid email required!"),null;const t=2,s=e.slice(0,e.indexOf("@")),n=e.slice(e.indexOf("@"),e.indexOf(".")),r=e.slice(e.indexOf(".")),a=s.slice(0,t),l=s.slice(t).split("").map((d,c,u)=>c<u.length-1?"*":u[c]).join("");return`${a}${l}${n}${r}`}const xr={regFormConn:{id:"reg-form-prompt",class:"reg_form_prompt",title:"Signup success",success:!0,_mail:null,set mail(e){if(console.log(e),!e||!e.includes("@")){console.error("[Prompt Config:Error] Not a valid mail!");return}this._mail=e},get mail(){return Tr(this._mail)},get message(){return`Your account was created successfully and a mail has been sent to ${this.mail}.`},actions:[{label:"Resend email",to:"#"}]}},M=new b("div");M.addClass("overlay");const We=()=>M.getElement(),kr=async(e,t={})=>{const s=new URL(e,S.apiUrl);v.defaults.withCredentials=!0;try{return await v.post(s,t)}catch(n){return console.log(n.response),n.response??{status:500,data:{error:"Network error"}}}};class Rr{constructor(){this.modal=new b("div")}open(t={},s){return this.modal.setId(t.id),this.modal.addClass("prompt_modal",t.class),t.mail=s,this.modal.innerHTML=`
			<h2 class="modal_title">${t.title} ${t.success?qs:zs}</h2>
			<p class="modal_message">${t.message}</p>
			<div class="modal_actions">
				${t.actions.map(n=>`<a href="${n.to}" class="modal_actn_lnks">${n.label}</a>`).join(" ")}
			</div>
		`,this.#e(),{modal:this.modal.getElement(),modalInstance:this.modal}}close(){this.modal.remove(),M.removeClass("show_overlay")}#e(){const t=this.modal.getChildren(".reg_frm_prompt_btn","class");for(const s of t)s.addEventListener("click",n=>{n.preventDefault(),V.navigateTo(n.target.getAttribute("href"))})}}const Pr=async e=>{const t=new Rr,s=e.getChild("#register-next-btn","id"),n=e.getChild("#register-submit-btn","id"),r=e.getChild("#register-return-btn","id"),a=e.getChild(".user_details_container","class"),i=e.getChild(".user_password_container","class"),l=e.getChild(".signup_username","class"),p=e.getChild(".signup_email","class"),d=e.getChild("#create-pwd-input","id"),c=e.getChild("#confirm-pwd-input","id"),u=new b("span","Feed holder");u.addClass("feed_holder");function _(y){const h=d.value.trim().toLocaleLowerCase(),m=c.value.trim().toLocaleLowerCase(),f=6;if(h.length<f){L(`Password must be more than ${f} characters!`,u.getElement(),i,y.currentTarget),u.addClass("warning_color"),u.removeClass("error_color"),d.style.outline="1px solid var(--warning-border)",c.style.outline="1px solid var(--warning-border)";return}else u.remove(),d.style.outline="1px solid var(--clear-border-warning)",c.style.outline="1px solid var(--clear-border-warning)";if(h!==m){L("Password don't match",u.getElement(),i,y.currentTarget),u.addClass("error_color"),u.removeClass("warning_color"),d.style.outline="1px solid var(--error-border)",c.style.outline="1px solid var(--error-border)";return}else u.remove(),d.style.outline="1px solid var(--clear-border-warning)",c.style.outline="1px solid var(--clear-border-warning)"}d.addEventListener("input",_),c.addEventListener("input",_),s.addEventListener("click",y=>{y.preventDefault();const h=p.value.trim().toLocaleLowerCase(),m=l.value.trim().toLocaleLowerCase();if(m)u.remove(),l.style.outline="1px solid hsl(226, 60%, 50%)";else{L("Username required!",u.getElement(),a,l),u.addClass("error_color"),u.removeClass("warning_color"),l.style.outline="1px solid var(--error-border)";return}if(h)p.style.outline="1px solid var(--clear-border-warning)";else{L("Email Address required!",u.getElement(),a,p),u.addClass("error_color"),u.removeClass("warning_color"),p.style.outline="1px solid var(--error-border)";return}m&&h&&(s.disabled=!0,y.currentTarget.appendChild(N.getElement())),setTimeout(()=>{s.disabled=!1,N.remove(),a.style.display="none",i.style.display="grid",n.style.display="inline-block",s.style.display="none"},1e3)}),n.addEventListener("click",async y=>{y.preventDefault();const h=p.value.trim().toLocaleLowerCase(),m=l.value.trim().toLocaleLowerCase(),f=d.value.trim(),C=c.value.trim();if(f!==C){L("Password don't match",u.getElement(),i,c),u.addClass("error_color"),u.removeClass("warning_color"),d.style.outline="1px solid var(--error-border)",c.style.outline="1px solid var(--error-border)";return}if(!f||!C){L("Password is required!",u.getElement(),i,c),u.addClass("error_color"),u.removeClass("warning_color"),d.style.outline="1px solid var(--error-border)",c.style.outline="1px solid var(--error-border)";return}const T=f===C?C:null;if(m&&h&&T){u.remove();const E={email:h,username:m,password:T};n.disabled=!0,n.appendChild(N.getElement());const w=await kr("/auth/register",E);setTimeout(()=>{if(n.disabled=!1,N.remove(),w.status===409)n.disabled=!1,u.style("text-align: center"),L(w.data.error,u.getElement(),i,c),u.addClass("warning_color"),n.style.display="none",r.style.display="inline-block";else if(w.status===400)L(w.data.error,u.getElement(),i,c),u.addClass("error_color"),u.removeClass("warning_color");else if(w.status===500)L("Network error",u.getElement(),i,c),u.removeClass("error_color"),u.addClass("warning_color");else if(w.status===201){document.querySelector(".overlay").innerHTML="";const k=w?.data?.email;if(!k)return console.error("Can't get the email address");const{regFormConn:F}=xr,{modal:R}=t.open(F,k);M.addClass("show_overlay"),M.append(R),console.log(w.data.email),s.disabled=!1,u.style="text-align: unset",u.removeClass("warning_color"),u.removeClass("error_color"),u.addClass("clear_error_color"),console.log(w),L(`${w?.data?.message??"Registration successful."}`,u.getElement(),i,c),Or(w.data)}},1e3)}r.addEventListener("click",E=>{s.disabled=!1,n.disabled=!1,r.disabled=!0,E.currentTarget.appendChild(N.getElement()),setTimeout(()=>{d.value="",c.value="",r.disabled=!1,N.remove(),a.style.display="grid",i.style.display="none",n.style.display="none",r.style.display="none",s.style.display="inline-block"},1e3)})})};function Or(e){console.log(e.user)}const ne=new b("forms"),Mr=()=>(ne.addClass("signup_form","forms"),ne.setId("register-form"),ne.innerHTML=`
		<a href="/"  id="form-nav-link" class="form_nav_link form_links">${he} Home</a>	
		<h2 class="form_heading">
			<span class="first-child">Zecco</span><span class="second-child">Music</span>
		</h2>
		<h4 class="form_message">Welcome! Please enter details below to continue</h4>

		<div class="user_details_container">
			<label for="register-username">Username:</label>
			<input type="text" id="register-username" class="signup_username" placeholder="Username" required />

			<label for="register-email">Email Address:</label>
			<input type="email" id="register-email" class="signup_email" placeholder="youremail@example.com" required />
		</div>

		<div class="user_password_container">
			<label for="create-pwd-input">Create password:</label>
			<input type="password" name="password" id="create-pwd-input" class="signup_pwd_input" placeholder="Create password" required />

			<label for="confirm-pwd-input">Confirm password:</label>
			<input type="password" name="password" id="confirm-pwd-input" class="signup_pwd_input" placeholder="Confirm password" required />
		</div>

		<div class="form_links_wrapper">
			<a href="/login" class="form_links">Already have account? Login</a>
		</div>

		<button type="submit" id="register-next-btn" class="form_btn next_btn">Next</button>
		<button type="submit" id="register-submit-btn" class="form_btn submit_btn">Submit</button>
		<button type="submit" id="register-return-btn" class="form_btn return_btn">Return</button>
	`,Pr(ne),ne.getElement()),re=new b("form"),$r=()=>(re.addClass("frt_pwd_frm"),re.setId("frt-pwd-frm"),re.innerHTML=`
		<a href="/"  id="form-nav-link" class="form_nav_link form_links">${he} Home</a>	
		<h2 class="form_heading">
			<span class="first-child">Reset Password</span>
		</h2>
		<h4 class="form_message">Fill required data to continue reset</h4>

		<div class="">
			<label for="reset-email">Email Address:</label>
			<input type="email" id="reset-email-input	" class="reset_email" placeholder="youremail@example.com" required />
		</div>

		<button type="submit" id="reset-next-btn" class="form_btn re_next_btn">Next</button>
		<button type="submit" id="reset-submit-btn" class="form_btn re_submit_btn">Submit</button>
		<button type="submit" id="reset-return-btn" class="form_btn re_return_btn">Return</button>	
	`,re.getChildren("a","element"),re.getElement()),G=new b("div");G.addClass("frt_pwd_frm_page");G.setId("frt-pwd-frm-page");const Ze=()=>{const e=new b("div");e.addClass("frt_pwd_ctn"),e.setId("frt-pwd-ctn"),e.innerHTML=`
		An email has been sent to example@example.com
	`;const t=re.getChildren("a","element");for(const s of t)s.addEventListener("click",n=>{n.preventDefault();const r=n.currentTarget,a=r.getAttribute("href");if(r.id==="form-nav-link"){_e(1500,form,"reset"),V.navigateTo(a);return}V.navigateTo(a)});return G.append($r(),e.getElement()),G.getElement()},U=new b("div");U.setId("form-page");U.addClass("form_page","");const Ke=()=>(U.append(Ar(),Mr()),U.getElement()),Br="/assets/logo-DbQzCrIJ.jpg",_e=(e,t,s)=>{M.addClass("show_overlay"),M.innerHTML="",M.innerHTML=`
		<div class="overlay_logo_container">
			<img src="${Br}" alt="" height="300" width="300" class="overlay_logo"/>
		</div>
	`,t.removeClass("show_form_page");const n=document.querySelectorAll(".forms");for(const r of n)r.classList.remove("active_form");switch(s){case"login":se.addClass("active_form"),setTimeout(()=>{M.removeClass("show_overlay"),t.addClass("show_form_page")},e);break;case"register":ne.addClass("active_form"),setTimeout(()=>{M.removeClass("show_overlay"),t.addClass("show_form_page")},e);break;case"reset":t.removeClass("show_form_page"),setTimeout(()=>{M.removeClass("show_overlay"),t.addClass("show_form_page")},e);break;case"home":setTimeout(()=>{M.removeClass("show_overlay"),G.removeClass("show_form_page"),U.removeClass("show_form_page")},e);break;default:console.error("Can't navigate form, no flag passed! Required ('login' || 'home' || 'register' || 'reset')");break}},Hr=()=>{S.pageTitle="Login",_e(1500,U,"login")},Nr=()=>{S.pageTitle="Upload Music",console.log("RenderMusicUploadPage Rendered")},D=new b("div");D.addClass("no_resource_page");D.setId("no-resource-page");D.innerHTML=`
	<h1>404</h1>	
	<p>Resource not found</p>
	<a href="/" class="nfp-link">Return Home</a>
`;const Fr=D.getChild(".nfp-link");Fr.addEventListener("click",e=>{e.preventDefault(),D.hasClass("show_no_resource_page")&&D.removeClass("show_no_resource_page")});const Xe=()=>D.getElement(),Ur=()=>{S.pageTitle="Resource Not Found",M.removeClass("show_overlay"),D.removeClass("show_no_resource_page"),D.addClass("show_no_resource_page")},Ht=()=>{const e=x(".profile_section");S.pageTitle="Profile",Q(),Y(),ie("Profile","profile_btns_ctn"),e.classList.add("active_section")},Dr=async()=>{S.pageTitle="Register User",_e(1500,U,"register")},Nt=async()=>{S.pageTitle="Reset Password",_e(1500,G,"reset")},Ir=async()=>{S.pageTitle="Search";const e=x(".search_section");Q(),Y(),ie("Search","search_btns_ctn"),e.classList.add("active_section")},_s=e=>JSON.parse(localStorage.getItem(`${S.appName}-${e}`))||null,W=(e,t)=>{localStorage.setItem(`${S.appName}-${e}`,JSON.stringify(`${t}`))};class qr{#e=document.documentElement;#s=x("#app");#t=_s("Theme");#n=window.matchMedia("(prefers-color-scheme: dark)");#i={Dark:{"--background":"hsl(0, 0%, 10%)","--text":"hsl(0, 3%, 89%)","--accent":"hsl(213, 100%, 50%)","--muted":"rgb(187, 187, 187)","--svg-color":"rgb(221, 221, 221)"},Light:{"--background":"hsl(0, 0%, 100%)","--text":"hsl(0, 2%, 12%)","--accent":"hsl(213, 100%, 50%)","--muted":"rgb(86, 85, 85)","--svg-color":"rgb(21, 20, 20)"}};#r=()=>this.#a("Dark","System");#o=()=>this.#a("Light","System");#l=t=>{t.matches?this.#r():this.#o()};#c(t){Object.entries(this.#i[t]).forEach(([n,r])=>this.#e.style.setProperty(n,r))}#d(...t){for(const s of t)this.#s.removeAttribute("data-theme",s);W("Theme","")}#a(t,s){this.#c(t),this.#d("Dark","Light","System"),this.#s.setAttribute("data-theme",s??t),W("Theme",s??t),(t==="Dark"&&!s||t==="Light"&&!s)&&this.#n.removeEventListener("change",this.#l),this.#u(s??t)}#u(t){const s=x(".theme_btn_dark"),n=x(".theme_btn_light"),r=x(".theme_btn_system"),a=x("[data-theme-placeholder]");a.innerHTML=t;const i=()=>`<span>${t}</span>${Ns}`;s.innerHTML=t==="Dark"?i():"Dark",n.innerHTML=t==="Light"?i():"Light",r.innerHTML=t==="System"?i():"System"}init(){if(this.#t==="Dark")return this.setDark();if(this.#t==="Light")return this.setLight();if(this.#t==="System")return this.setSystem()}setSystem(){this.#n.matches?this.#r():this.#o(),this.#n.addEventListener("change",this.#l)}setLight=()=>this.#a("Light");setDark=()=>this.#a("Dark")}const xe=new qr,zr=e=>{e.addEventListener("click",t=>{switch(!0){case z(".theme_btn_dark",t):xe.setDark();break;case z(".theme_btn_light",t):xe.setLight();break;case z(".theme_btn_system",t):xe.setSystem();break}})},jr=async()=>{S.pageTitle="Settings";const e=x(".settings_section");Q(),Y(),ie("Settings","settings_btns_ctn"),zr(e),e.classList.add("active_section")},Vr=async(e,t={})=>{const s=new URL(e,S.apiUrl);v.defaults.withCredentials=!0;try{return await v.post(s,t)}catch(n){return console.log(n.response),n.response??{status:500,data:{error:"Network error"}}}},Jr=async()=>{S.pageTitle="Verify User";const e=location.pathname;await Vr("/auth/verify",e)},Ft=[{pattern:/^\/$/,handler:xs},{pattern:/^\/library$/,handler:Rs},{pattern:/^\/search$/,handler:Ir},{pattern:/^\/profile\/?id=([A-Za-z0-9/-_.]{10,50})$/,handler:Ht},{pattern:/^\/profile$/,handler:Ht},{pattern:/^\/settings$/,handler:jr},{pattern:/^\/login$/,handler:Hr},{pattern:/^\/register$/,handler:Dr},{pattern:/^\/media\/audio\/upload$/,handler:Nr},{pattern:/^\/media\/image\/profile\/upload$/,handler:null},{pattern:/^\/media\/image\/profile\/upload$/,handler:null},{pattern:/^\/verify-email\/?token=([A-Za-z0-9/-_.]{20,500})$/,handler:Jr},{pattern:/^\/forgot-password$/,handler:Nt},{pattern:/^\/reset-password\/?token=([A-Za-z0-9/-_.]{20,500})$/,handler:Nt},{pattern:404,handler:Ur}];class Wr{#e=Ft;#s(t,s=!1){let n=!1;for(const r of this.#e){const a=t.match(r.pattern);if(a){r.handler({token:a[1]??a[2]??a[3]}),n=!0;break}}n||Ft.find(a=>a.pattern===404).handler(),s||history.pushState({},"",t)}#t(){const t=window.location.pathname;this.#s(t)}initRoutes(){window.onpopstate=()=>this.#t(),this.#t()}navigateTo(t){this.#s(t,!1)}}const V=new Wr,Zr=e=>{document.querySelector(".home_section"),document.querySelector(".extra_content"),document.querySelector(".overlay");const t=e.currentTarget.getAttribute("href");e.currentTarget,V.navigateTo(t)},Kr=e=>{const t=e.currentTarget.getAttribute("href");e.currentTarget,Q(),Y(),V.navigateTo(t)},Xr=()=>{const e=document.querySelector(".search_section"),t=document.querySelector("#search-link");Q(),Y(),e.classList.add("active_section"),t.classList.add("active_nav")},Ut=()=>{const e=new b("aside","Aside");e.setId("aside"),e.addClass("aside"),e.innerHTML=`
		<nav class="nav">
			<ul class="nav_list">
				<li id="home" class="home active_nav">
					<a href="/" id="home-links" class="nav_links first_nav_link">
						${he}
						<span>Home</span>
					</a>
				</li>

				<li id="library" class="library">
					<a href="/library" class="nav_links library_nav">
						${Wt}
						<span>Library</span>
					</a>
				</li>

				<li id="search" class="search" >
					<a href="/search" id="search-link" class="nav_links">
						${pe}
						<span>Search</span>
					</a>
				</li>
			</ul>
		</nav>
	`;const t=e.getChild(".library_nav"),s=e.getChild("#home-links"),n=e.getChild("#search-link");s.addEventListener("click",Zr),t.addEventListener("click",Kr),n.addEventListener("click",Xr);const r=e.getElement().querySelectorAll("svg");for(const a of r)a.setAttribute("width","30"),a.setAttribute("height","30");return e.getElement()},Dt=async(e,t)=>{const s=new b("div");return s.addClass("container"),s.setId("container"),s.getElement().append(t(),await e()),s.getElement()},De="/assets/favicon-B6lTlLgw.png";function Gr(e,t=50,s=27,n=20,r){e.forEach(a=>{a.classList.contains("pause")||a.classList.contains("play")?(a.setAttribute("width",`${t}`),a.setAttribute("height",`${t}`)):a.classList.contains("next")||a.classList.contains("back")?(a.setAttribute("width",`${s}`),a.setAttribute("height",`${s}`)):(a.setAttribute("width",`${n}`),a.setAttribute("height",`${n}`),a.fill=r)})}function Yr(e,t=20){e.forEach(s=>{s.classList.contains("home")&&(s.setAttribute("width",`${t+10}`),s.setAttribute("height",`${t+10}`)),s.setAttribute("width",`${t}`),s.setAttribute("height",`${t}`)})}function Ge(e,t=20){e.forEach(s=>{s.setAttribute("width",`${t}`),s.setAttribute("height",`${t}`)})}const It=()=>{const e=new b("footer","Footer");e.addClass("footer"),e.setId("footer"),e.innerHTML=`
		<div class="footer_container">
			<section class="music_data">
				<figure class="music_image_container">
					<img src="${De}" alt="Music cover image" class="music_image_cover" id="music-image-cover" loading="lazy" width="100" height="100"/>
					<figcaption class="music_cover_caption">Music cover</figcaption>
				</figure>

				<div class="music_details">
					<h3 class="song_title" id="song-title">Song Title</h3>
					<p class="artist_name" id="artist-name">Artist Name</p>
				</div>
			</section>

			<section class="action_btns_ctnr">
				<div class="action_btns">
					<button aria-label="/Shuffle" class="random_btn" id="random-button">
						${Os}
					</button>

					<button aria-label="Previous" class="previous_btn" id="previous-button">
						${Ds}
					</button>

					<button aria-label="Play/Pause" class="play_pause_btn" id="play-pause-btn">
						${ot}
					</button>

					<button aria-label="Next" class="next_btn" id="next-button">
						${Is}
					</button>

					<button aria-label="Repeat/Loop" class="sleep_timer_btn" id="sleep-timer-button">
						${Ps}
					</button>
				</div>

				<input type="range" name="" value="0" id="" min="0" max="100" class="music_range_input" aria-label="Music progress range"/>
			</section>

			<div class="music_controls">
				<div class="duration_container">
					<span class="current_time">0:00</span> / <span class="current_time">0:00</span>
				</div>

				<button aria-label="Add song to playlist button" class="add_to_playlist_btn" id="add-to-playlist-btn">
					${Bs}
				</button> 

				<button aria-label="Favorite song button" class="fave_btn" id="fave-button">
					${Jt}
				</button>

				<button aria-label="menu song button" class="menu_btn" id="menu-button">
					${$e}
				</button>
			</div>
		</div>
 	`;const t=e.getChildren("svg");return Gr(t,50,30,20,"white"),e.getElement()},qt=()=>{const e=new b("header","Header");e.addClass("header"),e.setId("header"),e.innerHTML=`
		<div class="header_logo_container">
			<div class="sidebar_toggle_container">
				<button class="sidebar_toggle_btn">${Ee}</button>	
				<small class="sidebar_toggle_tooltip" arial-label="Toggle sidebar">Toggle sidebar</small>
			</div>
			<div href="/" class="logo">${Us}<span>ZeccoMusic</span></div>
		</div>

		<form action="" class="search_form">
			${pe}
			<input type="search" name="search" id="search-input" class="search_input" placeholder="Search..." />
		</form>

		<div class="header_sign_btn">
			<button class="header_signup_btn">
				<a href="/register">Sign Up</a>
			</button>
			<button class="header_signin_btn">
				<a href="/login">Login</a>
			</button>
		</div>
	`;const t=e.getChild(".bi-music-note");return e.getChild(".search_input").addEventListener("input",n=>{n.preventDefault();const r=n.target.value;alert(r)}),(ke.matches||Re.matches)&&(t.setAttribute("width","35"),t.setAttribute("height","35")),e.getElement()},Qr=async(e,t={})=>{const s=new URL(e,S.apiUrl);v.defaults.withCredentials=!0;try{const n=await v.get(s,S.apiUrl);return n.failed=!1,n}catch(n){return console.log(n.message),{status:500,error:"Network error",failed:!0}}},ea=(e=null)=>{const t=new b("div");t.addClass("music_card"),t.setId(e._id??null),t.innerHTML=`
		 <div class="card_img_container">
			<img src="${e?.hasCover?`http://127.0.0.1:9000/${e.coverUrl}`:e?.coverUrl}" class="card_img" alt="Music card image" srcset="" width="50" height="50" loading="lazy"/>
			<div class="card_overlay">
				${ot}
			</div>
		</div>

		<div class="card_music_details">
			<h4 class="card_artist_name">${e?.artist??"Unknown artist"}</h4>
			<p class="card_music_title">${e?.title??"Unknown title"}</p>
		</div>

		<div class="music_card_control">
			<button class="card_lick_btn">${Jt}</button>
			<button class="card_options_btn">${$e}</button>
		</div>
	`;const s=t.getChildren("svg","element");j.matches?Ge(s,16):(ke.matches||Re.matches)&&Ge(s,18);const n=t.getChild(".bi-play-fill","class");return n.setAttribute("height","35"),n.setAttribute("width","35"),t.addEvent("mouseover",r=>{const a=r.currentTarget.querySelector(".card_overlay");a.style.cssText=`
			z-index: 10;
		`}),t.addEvent("mouseout",r=>{const a=r.currentTarget.querySelector(".card_overlay");a.style.cssText=`
			z-index: 0;
		`}),t.getElement()},Oe=new b("div");Oe.addClass("home_btns_ctn");Oe.setId("home-btns-ctn");const ta=j.matches,sa=`
	<div class="home_btns_ctn header_btn_wrappers">
		<button class="header_action_btns home_btns">All</button>
		<button class="header_action_btns home_btns">For you</button>
		<button class="header_action_btns home_btns">Explore</button>
	</div>
`,vs=`
	<div class="library_btns_ctn header_btn_wrappers">
		<button class="header_action_btns lib_btns all_tab_btn">All</button>
		<button class="header_action_btns lib_btns liked_tab_btn">Liked</button>
		<button class="header_action_btns lib_btns uploaded_tab_btn">Uploaded</button>
		<button class="header_action_btns lib_btns recent_play_tab_btn">Recently Played</button>
		<button class="header_action_btns lib_btns lib_playlists_btn	">Playlists</button>
		<button class="header_action_btns lib_btns lib_artist_btn">Following</button>
	</div>
`,na=`
	<div class="profile_btns_ctn header_btn_wrappers">
		<a href="/settings" class="header_action_btns profile_btns">Settings</a>
		<button class="header_action_btns profile_btns">Edit Profile</button>
	</div>
`,ra=`
	<div class="search_btns_ctn header_btn_wrappers">
		<button class="header_action_btns home_btns search_toggler">
			${pe}
			<span class="search_toggler_placeholder">Search music...</span>
			${Hs}
		</button>
	</div>
`,aa=`
	<div class="settings_btns_ctn header_btn_wrappers">
		<button class="header_action_btns profile_btns">${pe}</button>
		<a href="/profile" class="header_action_btns profile_btns">Profile</a>
		<button class="header_action_btns profile_btns">Edit Profile</button>
	</div>
`,ia=()=>(ta&&Oe.appendContent(sa,vs,ra,na,aa),Oe.getElement()),oa={libraryBtns:vs},Ie=new b("div");Ie.addClass("home_skeleton","skeleton");Ie.setId("music-card-skeleton");const ws=`
	<div class="music_card_skeleton">
		<div class="mcs_img"></div>

		<div class="msc_content">
			<div class="msc_artist"></div>
			<div class="msc_title"></div>
		</div>

		<div class="mcs_controls"></div>
	</div>
`,la=20;let ys=ws;for(let e=0;e<la;e++)ys+=ws;Ie.appendContent(ys);const ca=Ie.getElement(),Cs=async()=>{const e=new b("section"),t=new b("section");e.addClass("home_section","main_sections","active_section"),e.setId("home-section"),t.setId("music-card-container"),t.addClass("music_card_container"),e.appendChild(ca);try{let s=5;const n=setInterval(async()=>{try{const r=await Qr("/api/media/audio");if(!r)return clearInterval(n);if(r?.data?.length>0&&!r?.failed){const a=x("#music-card-container");t.style("scroll-x","none");for(const i of r.data)t.append(ea(i));clearInterval(n)}r.failed&&s===5&&(console.warn("Could not connect to server..."),clearInterval(n)),s++}catch(r){console.error(r)}},500)}catch(s){console.log(s)}return e.getElement()},zt=(e,t,s)=>{const n=new b("div");return n.addClass("lib_playlist_card"),n.addClass("lib-playlist-card"),n.innerHTML=`
		<div class="lib_playlist_cover_ctn">
			<img src="${De}" alt="Playlist cover" class="lib_playlist_cover_img"/>
		</div>
		<div class="lib_playlist_content">
			<h3 class="title">Playlist Name</h3>
			<small class="label">Playlist</small>
		</div>
		<div>
			${$e}
		</div>
	`,n.outerHTML},jt=()=>{const e=new b("section");return e.addClass("lib_artist_card"),e.setId("lib-artist-card"),e.innerHTML=`
		<div class="lib_artist_cover_ctn">
			<img src="${De}" alt="artist cover" class="lib_artist_cover_img" width="100" heigh="100"/>
		</div>
		<div>
			<h3 class="title">Artist Name</h3>
			<small class="label">Artist </small>
		</div>
		<div>
			${$e}
		</div>
	`,e.outerHTML},Ss=()=>{const e=new b("section"),t=new b("section");e.addClass("library_section","main_sections"),e.setId("library-section"),t.addClass("library_content","show_lib_content"),t.setId("library-content");const s=`
		<section class="user_library lib_secs">
			<div class ="lib_sec_header">
				<h3 class="">Your Library</h3> 
				<!-- ${ue} -->
			</div>

			<div class="liked_tab lib_card" 	data-action="liked_tab">
				<div class="lib_card_cover">
					${Ms}
				</div>
				<div class="lib_crd_content">
					<h3>Liked Songs</h3>
					<p><span>0</span> songs</p>
				</div>	
			</div>

			<div class="uploaded_tab lib_card">
				<div class="lib_card_cover">
					${js}
				</div>
				<div class="lib_crd_content">
					<h3>Uploaded Tracks</h3>
					<p><span>0</span> Uploads</p>
				</div>
			</div>

			<div class="recent_play_tab lib_card">
				<div class="lib_card_cover">
					${Vs}
				</div>
				<div class="lib_crd_content">
					<h3>Recently Played</h3>
					<p>0 Played songs</p>
				</div>
			</div>
		</section>

		<section class="lib_secs lib_playlist_sec">
			<div class ="lib_sec_header">
				<h3 class="">Your Playlists</h3>
				${ue}
			</div>

			<div class="lib_playlist_ctn">
				${zt()}
				${zt()}
			</div>
		</section>

		<section class="lib_secs lib_artist_sec">
			<div class ="lib_sec_header">	
				<h3 class="">Following</h3>
				${ue}
			</div>

			<div class="lib_artist_ctn">
				${jt()}
				${jt()}
			</div>
		</section>
	`;j.matches?t.appendContent(s):t.appendContent(oa.libraryBtns,s);const n=`
	<section class="empty_lib_content" id="empty-library">
		<h2>Library</h2>

		<div class="empty_lib_container">
			<h3>No content in your library.</h3>
			<p>To access your library  
				<strong><a href="/register" class="empty_lib_links muted_link">Sign up</a></strong> to continue or <strong><a href="/login" class="empty_lib_links muted_link">Login</a></strong> to access all features.</p>
			<div class="lib_lnks_ctn">
				<a href="/register" class="empty_lib_links">Sign up</a>
				<a href="/login" class="empty_lib_links">Login</a> 
			</div>
		</div>
	</section>
`;return t.getChildren(".lib_card_cover").forEach(a=>{const i=a.querySelector("svg");i.setAttribute("width","25"),i.setAttribute("height","25")}),e.appendContent(t.getElement(),n),e.getElement()},Me="/assets/default-profile-BW6rucFx.png",Es=()=>{const e=`${S.date.getDate()}-${S.date.getMonth()}-${S.date.getFullYear()}`,t=new b("section");t.addClass("profile_section","main_sections"),t.setId("profile-section");const s=`
		<div class="profile_header">
			<div class="profile_cover_wrapper">
				<figure class="profile_cover_ctn">
					<img src="${Me}" class="profile_cover" width="500" height="400" alt="Profile cover">
					<figcaption>Profile cover</figcaption>
					<button class="profile_cover_btn">${Js}</button>
				</figure>
			</div>

			<div class="profile_pic_ctn">
				<figure class="profile_pic_wrapper">
					<img src="${Me}" class="profile_pic" width="100" height="100" alt="Profile picture">
					<figcaption>Profile Picture</figcaption>
				</figure>
			</div>
		</div>
	`;return t.innerHTML=`
		<div class="profile_containers" data-private-profile>
			${s}

			<div class="profile_info">
				<div id="" class="profile_user_data">
					<div>
						<h3 class="user_name" data-user-placeholder>ZECCOBOSS</h3>
						<p class="user_id">User ID: <span data-user-id=>478984397664387298</span></p>
					</div>
					<div>
						<button class="st_prf_card_wrapper">${Ws}</button>
					</div>
				</div>

				<div class="profile_details">
					<div>
						<h2>0</h2>
						<p>Following</p>
					</div>
					<div>
						<h2>0</h2>
						<p>Followers</p>
					</div>
					<div>
						<h2>0</h2>
						<p>Uploads</p>
					</div>
				</div>

				<div class="profile_data">
					<div>
						<span>Bio: </span><p>About me</p>
					</div>
					<div>
						<span>Member Since: </span><span>${e}</span>
					</div>
				</div>
			</div>

			<div class="profile_content">
				<div profile-content-header>
					<h3>Playlists</h3>
				</div>
			</div>
		</div>

		<div class="profile_containers" style="display:none" data-public-profile>
			${s}

		</div>
	`,t.getElement()},at=()=>{const e=new b("section");return e.addClass("search_section","main_sections"),e.setId("search-section"),e.innerHTML=`
		<div class="recent_search_container">
			<p>No search yet...</p>
		</div>
	`,e.getElement()},Ls=()=>{`${S.date.getDate()}${S.date.getMonth()}${S.date.getFullYear()}`;const e=new b("section");e.addClass("settings_section","main_sections");const t=`
	<div class="settings_header" data-settings-header>
		<div class="settings_profile_card">
			<div class="st_prf_card_wrapper">
				<figure class="st_profile_ctn">
					<img src="${Me}" alt="Settings profile pic" class="st_profile_pic"/>
					<figcaption class="figcaption">Settings profile picture</figcaption>
				</figure>
				<h4>ZECCOBOSS</h4>
			</div>
			<button>${ue}</button>
		</div>
	</div>

	<div class="settings_content" data-settings-content>
		<div class="theme_container">
			<div class="theme_container_header">
				<p>Appearance</p>  

				<div class="" data-toggle-theme-container>
					<span data-theme-placeholder>System</span>
					${ue}
				</div>
			</div>
			<div class="theme_container_content"> 
				<button class="theme_actions_btn theme_btn_dark"><span>Dark</span></button>
				<button class="theme_actions_btn theme_btn_light"><span>Light</span></button>
				<button class="theme_actions_btn theme_btn_system"><span>System</span></button>
			</div>
		</div>
	</div>
`;return e.appendContent(t),e.getElement()},Vt=async()=>{const e=new b("main");return e.addClass("main"),e.setId("main"),e.append(await Cs(),Ss(),at(),Es(),Ls()),e.getElement()},da=()=>{const e=new b("footer");e.addClass("mobile_footer"),e.setId("mobile-footer"),e.innerHTML=`
		<nav class="footer_nav">
			<ul class="footer_nav_list">
				<li id="home" class="home active_nav">
					<a href="/" class="nav_links">
						${he}
						<span>Home</span>
					</a>
				</li>

				<li id="/search" class="search">
					<a href="/search" id="search-link" class="nav_links">
						${pe}
						<span>Search</span>
					</a>
				</li>

				<li id="library" class="library">
					<a href="/library" class="nav_links">
						${Wt}
						<span>Library</span>
					</a>
				</li>

				<li id="/profile" class="profile">
					<a href="/profile" class="nav_links">
						${Fs}
						<span>Profile</span>
					</a>
				</li>
			</ul>
		</nav>
	`;const t=e.getChildren("svg","element");return j.matches&&Yr(t,25),e.getElement()},ua=()=>{const e=new b("header");return e.addClass("mobile_header",""),e.setId("mobileHeaderInstance"),e.innerHTML=`
		<div class="header_content">
			<h1 id="header-title" class="header_title">Music</h1>
			<ul id="header-list" class="header_list">
				<li id="header-plus-btn" class="header_li_items">
					<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16"
					> 
						<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
						<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
					</svg>
				</li>

				<li id="header-li-items" class="header_li_items">
					<figure class="header_img_wrapper">
						<img src="${Me}" alt="User
						profile" width="50" height="50 loading="lazy"
						class="header_img">
						<figcaption>User header image</figcaption>
					</figure>
				</li>
			</ul>
		</div>

		<!-- <div id="header-btns-ctn" class="header_btns_ctn"></div> -->
	`,e.append(ia()),ie("Music","header_btns_ctn"),e.getElement()},ve=new b("section");ve.addClass("mini_player");ve.setId("playing-banner");ve.innerHTML=`
	<figure>
		<img src="${De}" alt="Playing" class="playing_banner_music_photo" id="playing-banner-music-photo" aria-label="Playing banner image" width="50" height="50" loading="lazy"/>
		<figcaption class="banner_music_img_caption">
			Currently Playing Cover
		</figcaption>
	</figure>

	<div class="playing_banner_btns">
		<button aria-label="Play/Pause" class="play_pause_button">
			${ot}
		</button>

		<button class="banner_music_list_btn">${$s}</button>
	</div>
`;const ha=ve.getChildren("svg","element");ha.forEach(e=>{e.setAttribute("width","20"),e.setAttribute("height","20")});const pa=()=>ve.getElement(),fa=async()=>{const e=new b("main");return e.addClass("mobile_main"),e.setId("mobile-main"),e.append(await Cs(),Ss(),at(),at(),pa(),Es(),Ls()),e.getElement()},ma="<li>No content passed</li>",ga=(e="no_content",t="no_content")=>{const s=new b("ul");return s.setId(e),s.addClass(t),s.innerHTML=ma,s},ba=`
	<li id="hd-crt-playlist-btn">Create new playlist</li>
	<li id="hd-upload-music-btn">Upload Music</li>
`,_a=()=>{const e=ga("header-add-list","header_add_list");e.innerHTML=ba;const t=document.querySelector("header"),s=document.getElementById("header-plus-btn");s&&(s.style.position="relative",s.appendChild(e.getElement())),t.addEventListener("click",n=>{n.stopPropagation(),n.target===s?e.getElement().classList.toggle("show_header_add_list"):e.getElement().classList.contains("show_header_add_list")&&e.removeClass("show_header_add_list")}),s&&s.addEventListener("click",n=>{const r=document.querySelector("#hd-crt-playlist-btn"),a=document.querySelector("#hd-upload-music-btn");n.target===r?console.log("Create new playlist"):n.target===a&&console.log("Upload music")})};function va(){const e=document.querySelectorAll("a");Array.from(document.getElementsByTagName("input")).forEach(s=>{s.value=""});for(const s of e)s.addEventListener("click",n=>{n.preventDefault();const r=n.currentTarget;if(r.id==="form-nav-link"){const a=U.hasClass("show_form_page")?U:G;_e(1500,a,"home"),V.navigateTo(r.getAttribute("href"));return}else V.navigateTo(r.getAttribute("href"))})}const wa=()=>{const e=x(".sidebar_toggle_btn"),t=x(".container"),s=_s("SideBar");s?s==="expand"?(t.classList.remove("shrink_sidebar"),e.innerHTML=Ee,W("SideBar","expand")):s==="shrink"&&(t.classList.add("shrink_sidebar"),e.innerHTML=vt,W("SideBar","shrink")):(t.classList.remove("shrink_sidebar"),e.innerHTML=Ee,W("SideBar","expand")),e.addEventListener("click",n=>{const r=n.currentTarget;t.classList.contains("shrink_sidebar")?(t.classList.remove("shrink_sidebar"),r.innerHTML=Ee,W("SideBar","expand")):(t.classList.add("shrink_sidebar"),r.innerHTML=vt,W("SideBar","shrink"))})};function ya(){document.addEventListener("click",e=>{e.preventDefault()})}const Ye=async e=>{console.log(e),V.initRoutes(),ya(),va(),_a(),xe.init(),j.matches||wa()},ht=new b("div");ht.setId("verification-page");ht.addClass("verification_page","");const Qe=()=>ht.getElement(),Ca=()=>{const e=()=>{const r=document.querySelector("#app");r.innerHTML=""},t=async r=>{console.warn("Clearing app.."),e(),console.warn("Appending app content..."),app.append(ua(),await fa(),da(),We(),Xe(),Qe(),Ke(),Ze()),console.warn(r),document.addEventListener("DOMContentLoaded",Ye("Starting Application...")),console.log("")},s=async r=>{console.warn("Clearing app..."),e(),console.warn("Appending app content..."),app.append(qt(),await Dt(Vt,Ut),It(),We(),Xe(),Qe(),Ke(),Ze()),console.warn(r),document.addEventListener("DOMContentLoaded",Ye("Starting Application...")),console.log("")},n=async r=>{console.warn("Clearing app..."),e(),console.warn("Appending app content..."),app.append(qt(),await Dt(Vt,Ut),It(),We(),Xe(),Qe(),Ze(),Ke()),console.warn(r),document.addEventListener("DOMContentLoaded",Ye("Starting Application...")),console.log("")};j.matches?t("[Screen Size]: Mobile screen!"):ke.matches?s("[Screen Size]: Big screen!"):Re.matches&&n("[Screen Size]: Large screen!"),j.addEventListener("change",r=>{r.target.matches&&t("[Mobile Screen]: Listened and changed to mobile device screen.")}),ke.addEventListener("change",r=>{r.target.matches&&s("[Big Screen]: Listened and changed to device Big device screen.")}),Re.addEventListener("change",r=>{r.target.matches&&n("[Large Screen]: Listened and changed to device Large device screen.")})};Ca();
