const dropZone = document.getElementById("container");
const fileInput = document.querySelector(".fileInput");

dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
});
dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
});

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("drogover");
     fileInput.files = e.dataTransfer.files;
    console.log("droped", fileInput.files);
})