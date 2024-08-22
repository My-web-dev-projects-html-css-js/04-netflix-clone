// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/song1.mp3');
let masterPlay = document.getElementById('btn-play');
let myProgressBar = document.getElementById('myProgressBar');


let allSongs=[
    {songName: "Despacito", filePath: "/songs/song1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Shape of You", filePath: "/songs/song2.mp3", coverPath: "covers/2.jpg"},
];


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){ //agar audio pause hai ya currentTime 0 hai to play karega
        audioElement.play();
    }
})


myProgressBar.addEventListener('timeupdate', (e) => {
    console.log('timeupdate');
})

