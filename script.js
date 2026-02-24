const canvas=document.getElementById("canvas");
const fileInput=document.getElementById("inputFile");
const brightnessBtn=document.getElementById("brightness");
const contrastBtn=document.getElementById("contrast");
const saturationBtn=document.getElementById("saturation");
const blurBtn=document.getElementById("blur");
const grayScaleBtn=document.getElementById("grayScale");
const sepiaBtn=document.getElementById("sepia");
const resetBtn=document.getElementById("reset");
const downloadBtn=document.getElementById("downloadBtn");
const ctx=canvas.getContext("2d")
let image=new Image();
let isSepia=false;
const activeBtnColor="#4896fcff";
const btnColor="#ffdab3"

const brightnessValue=document.getElementById("brightnessValue");
const contrastValue=document.getElementById("contrastValue");
const saturationValue=document.getElementById("saturationValue");
const blurValue=document.getElementById("blurValue");
const placeholder=document.getElementById("placeholder");

fileInput.addEventListener("change",(e)=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    image.src=reader.result;
  }
  reader.readAsDataURL(file)
})
image.onload=()=>{
  canvas.height=image.height;
  canvas.width=image.width;
  ctx.drawImage(image,0,0,canvas.width,canvas.height)
  canvas.classList.add("active");
  placeholder.classList.add("hidden");
}

function applyBrightness(){
   const brightnessVal=brightnessBtn.value;
   const saturationVal=saturationBtn.value;
   const contrastVal=contrastBtn.value;
   const blurVal=blurBtn.value;
   const sepiavalue=isSepia?100:0;
   ctx.filter=`brightness(${brightnessVal}%)saturate(${saturationVal}%)contrast(${contrastVal}%)blur(${blurVal}px)sepia(${sepiavalue}%)`;
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.drawImage(image,0,0,canvas.width,canvas.height)
   if(saturationVal ==0){
     grayScaleBtn.style.backgroundColor=activeBtnColor
   }
   else{
     grayScaleBtn.style.backgroundColor=btnColor
   }
}

function updateSliderValue(slider, display) {
  display.textContent = slider.value;
}

function handleReset(){
  brightnessBtn.value=100;
  contrastBtn.value=100;
  saturationBtn.value=100;
  blurBtn.value=0;
  
  brightnessValue.textContent=100;
  contrastValue.textContent=100;
  saturationValue.textContent=100;
  blurValue.textContent=0;
  
  if(isSepia){
     handleSepiaFilter()
  }
  applyBrightness();
}
function grayScale(){
  saturationBtn.value=0;
  saturationValue.textContent=0;
  applyBrightness();
}

function handleSepiaFilter(){
  isSepia=!isSepia;
  applyBrightness()
  if(isSepia){
     sepiaBtn.style.backgroundColor=activeBtnColor
   }
   else{
     sepiaBtn.style.backgroundColor=btnColor
   }
}

function handleDownload(){
  const imageData=canvas.toDataURL("image/png");
  const anchorTag=document.createElement("a");
  anchorTag.href=imageData;
  anchorTag.download="Photo.png"
  document.body.appendChild(anchorTag)
  anchorTag.click()
  document.body.removeChild(anchorTag)
}

brightnessBtn.addEventListener("input",()=>{
  updateSliderValue(brightnessBtn, brightnessValue);
  applyBrightness();
});
contrastBtn.addEventListener("input",()=>{
  updateSliderValue(contrastBtn, contrastValue);
  applyBrightness();
});
saturationBtn.addEventListener("input",()=>{
  updateSliderValue(saturationBtn, saturationValue);
  applyBrightness();
});
blurBtn.addEventListener("input",()=>{
  updateSliderValue(blurBtn, blurValue);
  applyBrightness();
});

grayScaleBtn.addEventListener("click",grayScale)
resetBtn.addEventListener("click",handleReset)
sepiaBtn.addEventListener("click",handleSepiaFilter)
downloadBtn.addEventListener("click",handleDownload)

