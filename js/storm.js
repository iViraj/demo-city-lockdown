function initStorm(){

const storm = document.getElementById("storm-bg");

setInterval(()=>{

const flash = document.createElement("div");

flash.style.position="absolute";

flash.style.width="100%";
flash.style.height="100%";

flash.style.background="white";
flash.style.opacity="0.2";

storm.appendChild(flash);

setTimeout(()=>{

flash.remove();

},100)

},5000);

}
