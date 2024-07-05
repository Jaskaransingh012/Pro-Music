function duration_setter(){
    let song = document.querySelectorAll(".song")
    song.forEach(element => {
        let duration = element.querySelector(".duration")
        element.querySelector('.song-audio').onloadedmetadata = function() {
            var audioDuration = this.duration;
            duration.innerHTML = `${Math.floor(audioDuration)} s`
        };
      
    });
}

function audioGenerator(){
    audioElement = sing.querySelector('.song-audio')
    newSrc =  sing.querySelector('.track-image').getAttribute("src")  
    currentlyPlayingImage.setAttribute("src", newSrc)
    currentlyPlayingSongName.innerHTML = `${sing.querySelector('.song-name').innerText} by - ${sing.querySelector('.artist-name').innerText}`
    audioElement.play()
    waves.style.opacity = "1"
    playPause.classList.remove("fa-play")
    playPause.classList.add("fa-pause")
    playPauseIcon.addEventListener("click", handlePlayPause)  
    progressBar()
    
}
function nextaudioGenerator(){
   sing = audioElement.parentElement.parentElement.nextElementSibling
   if(sing != undefined){
        song.forEach(element => {
            element.classList.remove("selected")
        });
        sing.classList.add("selected")
        stop_music()
        audioGenerator() 
   }
}
function prevaudioGenerator(){
    
   sing = audioElement.parentElement.parentElement.previousElementSibling
   if(sing != undefined){
        song.forEach(element => {
            element.classList.remove("selected")
        });
        sing.classList.add("selected")
        stop_music()
        audioGenerator()
   }    
}

function progressBar(){
    audioElement.addEventListener("timeupdate", ()=>{
        myProgressBar.value = audioElement.currentTime / audioElement.duration * 100
        if(audioElement.currentTime == audioElement.duration && shuffle == true){
            next()
        }
        if(audioElement.currentTime == audioElement.duration && loop == true){

            setTimeout(()=>{
                audioElement.currentTime = 0
                audioElement.play()
            }, 2000)
        }
    })
    myProgressBar.addEventListener("change", ()=>{
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
    }) 
}

// Handle Play Pause


function handlePlayPause(){
    if(audioElement.paused){
        playPause.classList.add("fa-pause")
        playPause.classList.remove("fa-play")
        audioElement.play()
        waves.style.opacity = "1"
    }
    else{
        playPause.classList.remove("fa-pause")
        playPause.classList.add("fa-play")
        audioElement.pause()
        waves.style.opacity = "0"

    }
}
function stop_music(){
   if(audioElement != null){
        audioElement.currentTime = 0
        audioElement.pause()
        audioElement = null
    } 
}
function next(){
    // stop_music();
    nextaudioGenerator() 
}
function prev(){
    // stop_music();
    prevaudioGenerator() 
}


function searchEngine(){
    let songName = document.querySelectorAll(".song-name")
    songName.forEach(element => {
        parent = element.parentElement.parentElement.parentElement.parentElement
        parent.style.display = "none";
        if(event.target.value == " " ) {
            event.target.value = ""
            // parent.style.display = "grid"
        }
        else if (element.innerText.toLowerCase().includes(event.target.value.toLowerCase())){
                parent.style.display = "grid"
        }
    }); 
}

duration_setter();
let song = document.querySelectorAll('.song')
let currentlyPlayingImage = document.querySelector('.currently-playing-img')
let currentlyPlayingSongName = document.querySelector('.currently-playing-song-name')
let playPauseIcon = document.querySelector('.play-pause-icon')
let playPause = document.getElementById("playPause")
var audioElement = null
let myProgressBar = document.getElementById("myProgressBar")
let waves = document.querySelector(".waves-img")
let nextBtn = document.querySelector(".fa-forward-step")
let prevBtn = document.querySelector(".fa-backward-step")
let shuffleIcon =  document.querySelector(".fa-shuffle")
let loopIcon = document.querySelector(".fa-person-walking-arrow-loop-left")

shuffle = true
loop = false


song.forEach(element => {
    stop_music()
    element.addEventListener("click" , ()=>{
        if(audioElement != null){
            audioElement.currentTime = 0
            audioElement.pause()
            audioElement = null
        }
       
        song.forEach(element => {
            element.classList.remove("selected")
        });
        element.classList.add("selected")
        sing = element
        audioGenerator()  
        nextBtn.addEventListener("click", next)
        prevBtn.addEventListener("click", prev)

    })

});
shuffleIcon.addEventListener("click", ()=>{
    shuffleIcon.classList.add("icon-selected")
    loopIcon.classList.remove("icon-selected")
    shuffle = true
    loop = false
})
loopIcon.addEventListener("click", ()=>{
    shuffleIcon.classList.remove("icon-selected")
    loopIcon.classList.add("icon-selected")
    loop = true
    shuffle = false
})






