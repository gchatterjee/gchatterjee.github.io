(()=>{const e=document.querySelectorAll("section");function n(){const n=window.innerHeight,t=window.scrollY;e.forEach((e=>{const{top:o,bottom:d}=e.getBoundingClientRect(),i=o+t<n+t&&d+t>t||"jumbotron"===e.id?"add":"remove";e.classList[i]("active")}))}window.addEventListener("load",n),document.addEventListener("scroll",n),window.addEventListener("resize",n)})();
//# sourceMappingURL=postload.js.map