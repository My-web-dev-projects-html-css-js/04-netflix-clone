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
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

