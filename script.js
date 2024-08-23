
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



let currentSong = new Audio(); 

async function main(){
    
    //get list of all the songs
    let songs = await getSongs();
    
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
            // let audio = new Audio("songs/"+ e.querySelector('.info').innerHTML.trim());
            currentSong.src="songs/"+ e.querySelector('.info').innerHTML.trim()
            currentSong.play();
        })
    })
}

main();



































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