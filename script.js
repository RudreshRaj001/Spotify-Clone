console.log("Welcome to Spotify");


//Initialized the variable
let songIndex = 0;
let audioElement = new Audio(`songs/${songIndex + 1}.mp3`);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let playGif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
// let songItems = document.getElementsByClassName('songItem');
// let timeStamp- = document.getElementsByClassName('timeStamp');
let masterBox = document.querySelector('.masterBox');


let songs = [
  {songName: "Midnight Serenade", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
  {songName: "Echoes of Eternity", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
  {songName: "Solar Symphony", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
  {songName: "Whispers in the Mist", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
  {songName: "Celestial Harmony", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
  {songName: "Serendipity's Melody", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
  {songName: "Celestial Whispers", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
  {songName: "Ethereal Melancholy", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
  {songName: "Harmonic Dream-scape", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
  {songName: "Serenade of the Cosmos", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

// Generating Html Song List through js

//-----------------------------MY METHOD-----------------------------
let songItemContainer = document.querySelector('.songItemContainer'); // Put this in Initialized Variable column

let productsHTML = '';

songs.forEach((songs,i) => {
  productsHTML += `
        <!-- Song Card ${1} -->
            <div class="songItem">
            <img src="${songs.coverPath}" alt="1">
            <span class="songName">${songs.songName}</span>
              <span class="songlistplay"><span class="timeStamp">05:34 </span><i id="${i}" class="far fa-2x songItemPlay fa-play-circle"></i></span>
            </div>
`
});

songItemContainer.innerHTML += productsHTML;
console.log(songItemContainer.innerHTML);

//------------------------- Updating all Info in the list

// Array.from(document.getElementsByClassName('timeStamp')).forEach((element,i)=>{
//   var oldIndex = songIndex;
//   songIndex = i+1;
//   // element.innerText = (audioElement.duration);
//   console.log(parseInt(audioElement.duration));
//   songIndex = oldIndex;
// })





// audioElement.play(); // For playing AudioElement

//handle Play/Pause click
masterPlay.addEventListener("click", ()=>{
  if(audioElement.paused || audioElement.currentTime <=0){
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.play();
    AddGIF();
  } else if (audioElement.play()){
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    audioElement.pause();
    makeAllPlays();
    RemoveGIF();
  }
});

//Listen To Events
audioElement.addEventListener('timeupdate', ()=>{
  // console.log(audioElement.currentTime);
  //Update Seek-bar
  progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
  // console.log(progress);
  myProgressBar.value = progress; 
});

//Handle Click on seek bar
myProgressBar.addEventListener('change', ()=>{
  audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})


// For clicking any song to play in the list ----
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    //console.log(e.target); // e gives the pointer event
    // in pointer event e.target stores the whole element by class-name

    makeAllPlays();
    songIndex = parseInt(e.target.id); // we extracted the ID from the element through pointer event which represented the index of different songs in the object

      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      songChange(songIndex);
      AddGIF();
    

  })
})


// Previous button 
document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex <= 0){
    songIndex = 5;
  } else{
    songIndex -= 1;
  }
    songChange(songIndex);
    AddGIF();
})

// Next button 
document.getElementById('next').addEventListener('click',()=>{
  if(songIndex >= 5){
    songIndex=0;
  } else{
    songIndex += 1;
  }
    songChange(songIndex);
    AddGIF();
})





// DECLARING FUNCTIONS

// ... SONG CHANGE FUNCTION
const songChange = (songIndex)=>{
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;

  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');

  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  masterBox.innerHTML = `<img src="${songs[songIndex].coverPath}" alt="" id="masterBoxImg">
  <span id="masterBoxName">${songs[songIndex].songName}</span>`;
}

// ... FUNCTION to convert all the other non-playing songs pause buttons to play 
const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
      element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');
  })
};


//PLAY GIF
const AddGIF = ()=>{
  playGif.style.opacity = 1;
}
//PAUSE GIF
const RemoveGIF = ()=>{
  playGif.style.opacity = 0;
}
