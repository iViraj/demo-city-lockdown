function initAudio(){

const btn = document.getElementById("startBtn");
const bgm = document.getElementById("bgm");

btn.addEventListener("click",()=>{

bgm.volume = 0.5;
bgm.play();

btn.style.display="none";

});

}
