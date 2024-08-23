
/*way-2 */
async function getSongs(){
    
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let res = await a.text(); //page ki html fetch ho jaegi
    // console.log(res);

    let divElement = document.createElement('div');
    divElement.innerHTML = res;
    let anchors = divElement.querySelectorAll('a');

    let songs=[];
    for (let i = 0; i < anchors.length; i++) {
        const element = anchors[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }        
    }
    return songs;
}


// convert seconds to mm:ss
function convertSecondsToTime(seconds) {
     // Calculate minutes and seconds
     const minutes = Math.floor(seconds / 60);
     const remainingSeconds = parseInt((seconds % 60).toFixed(2));
     
     // Format minutes and seconds with leading zeros
     const formattedMinutes = minutes.toString().padStart(2, '0');
     const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    
     // Return formatted time as a string
     return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  let songs;

  let currentSong = new Audio(); 
  let play = document.getElementById('btn-play');
  let myProgressBar = document.getElementById('myProgressBar');
  let gif_playing = document.getElementById('gif-playing');

  let next=document.getElementById('btn-next');
  let previous=document.getElementById('btn-previous');
  
  function playMusic(track, pause=false){
    currentSong.src ="/songs/"+ track;
    if(!pause){
        currentSong.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        gif_playing.style.opacity = 1;
    }
  }

  async function main(){
    
    //get list of all the songs
    songs = await getSongs();
    playMusic(songs[0], true);

    
    
    //show all the songs in playlist dynamically
    let songUL=document.querySelector('.box').getElementsByTagName('ul')[0];
    for (const song of songs) {
        songUL.innerHTML=songUL.innerHTML+`
                                            <li>
                                                <i class="fa-solid fa-music"></i>
                                                <div class="info">${song.replaceAll("%20"," ")}</div>
                                                <span>Play now</span>
                                                <i class="fa-solid fa-circle-play"></i>
                                            </li>
                                        `
    }


    //attach an event listener to each song
    Array.from(document.querySelector(".box").getElementsByTagName("li")).forEach((e)=>{
        e.addEventListener('click', ()=>{
            playMusic(e.querySelector('.info').innerHTML.trim())
            
            document.querySelector(".album-title p").innerHTML = currentSong.src.split("/songs/")[1].replaceAll("%20"," "); //title update on playing the song
        })
    })


    //attach event listener to play
    play.addEventListener('click', ()=>{
        if(currentSong.paused || currentSong.currentTime<=0){
            currentSong.play();
            play.classList.remove('fa-circle-play');    //play wala button hata do
            play.classList.add('fa-circle-pause');    //pause wala button laga do
            gif_playing.style.opacity = 1;
            
        }else{
            currentSong.pause();
            play.classList.remove('fa-circle-pause');    //pause wala button hata do
            play.classList.add('fa-circle-play');    //play wala button laga do
            gif_playing.style.opacity = 0;
        }
    })


    //listen for timeupdate event
    currentSong.addEventListener('timeupdate', (e) => {
         document.getElementById('current-time').innerHTML = convertSecondsToTime(currentSong.currentTime);
         document.getElementById('total-time').innerHTML = convertSecondsToTime(currentSong.duration);

         
        // Update Seekbar (run seekbar )
        let  progress = parseInt((currentSong.currentTime/currentSong.duration)* 100);   //percentage=(current time/total time)*100
        myProgressBar.value = progress;
    })


    //jab seekbar ke bich me click kre to song time update ho jayega
    myProgressBar.addEventListener('change', ()=>{
        currentSong.currentTime = myProgressBar.value * currentSong.duration/100; //current time = (percentage * total time)/100
    })


    //next button event listener
    next.addEventListener('click', ()=>{
        let index = songs.indexOf(currentSong.src.split("/")[4]);        
        if((index+1) < songs.length){
            playMusic(songs[index+1]);
            document.querySelector(".album-title p").innerHTML = currentSong.src.split("/songs/")[1].replaceAll("%20"," "); //title update on playing the song
        }
    })


    //previous button event listener
    previous.addEventListener('click', ()=>{
        let index = songs.indexOf(currentSong.src.split("/")[4]);
        if((index-1) >= 0){
            playMusic(songs[index-1]);
            document.querySelector(".album-title p").innerHTML = currentSong.src.split("/songs/")[1].replaceAll("%20"," "); //title update on playing the song
        }
    })


    //add an event listener to volume
    let volume = document.getElementById('volume');
    volume.addEventListener('change', (e)=>{
        currentSong.volume = parseInt(e.target.value)/100;
    })

}

main();





/*responsive design*/
console.log("hi");

let sidebar = document.querySelector(".sidebar");
let hamburger = document.querySelector("#hamburger");
let btncross = document.querySelector(".fa-xmark");

console.log(sidebar.style);

hamburger.addEventListener('click', ()=>{
    sidebar.style.left = "0";
    sidebar.style.zIndex = 23;
    sidebar.style.transition = "0.6s";
    btncross.style.display = "block";
})

btncross.addEventListener('click', ()=>{
    sidebar.style.left = "-100%";
    sidebar.style.zIndex = 0;
    btncross.style.display = "none";
})































/* way-1*/
/*
// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/song1.mp3');
let masterPlay = document.getElementById('btn-play');
let myProgressBar = document.getElementById('myProgressBar');
let gif_playing = document.getElementById('gif-playing');


let allSongs=[
    {songName: "Despacito", filePath: "/songs/song1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Shape of You", filePath: "/songs/song2.mp3", coverPath: "covers/2.jpg"},
];


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){ //agar audio pause hai ya currentTime 0 hai to play karega
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');    //play wala button hata do
        masterPlay.classList.add('fa-circle-pause');    //pause wala button laga do
        gif_playing.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');    //pause wala button hata do
        masterPlay.classList.add('fa-circle-play');    //play wala button laga do
        gif_playing.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', (e) => {
    console.log('timeupdate');

    // Update Seekbar (run seekbar )
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);   //percentage=(current time/total time)*100
    myProgressBar.value = progress;
    
})


//jab seekbar ke bich me click kre to song time update ho jayega
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100; //current time = (percentage * total time)/100
})


*/