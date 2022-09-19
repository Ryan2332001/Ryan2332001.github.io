

   let media = document.getElementById("media");
   let controls = document.getElementsByClassName("controls")[0];
   
   let play = document.getElementsByClassName("play")[0];
   let stop = document.getElementsByClassName("stop")[0];
   let rwd = document.getElementsByClassName("rwd")[0];
   let fwd = document.getElementsByClassName("fwd")[0];
   
   let timerWrapper = document.getElementsByClassName("timer")[0];
   let timer = document.getElementsByClassName("timer-span")[0];
   let timerBar = document.getElementsByClassName("timer-bar")[0];
   
   
   let intervalFwd;
   let intervalRwd;
   
  
   media.removeAttribute("controls");
   controls.style.visibility = "visible";
   
   
   
   play.addEventListener('click', playPauseMedia);
   
   function playPauseMedia(){
     
     
     rwd.classList.remove('active');
     fwd.classList.remove('active');
     clearInterval(intervalRwd);
     clearInterval(intervalFwd);
   
   
     if(media.paused){
       play.setAttribute('data-icon', 'u');
       media.play();
     } else {
       play.setAttribute('data-icon', 'P');
       media.pause();
     }
   }
   
   
   
   stop.addEventListener("click", stopMedia);
   media.addEventListener("ended", stopMedia);
   
   function stopMedia() {
     media.pause();
     
     media.currentTime = 0;
     play.setAttribute('data-icon', 'P');
     rwd.classList.remove('active');
     fwd.classList.remove('active');
     clearInterval(intervalRwd);
     clearInterval(intervalFwd);
   }
   
  
   rwd.addEventListener("click", mediaBackward);
   fwd.addEventListener("click", mediaForward);
   
   function mediaBackward() {
    
     clearInterval(intervalFwd);
     fwd.classList.remove("active");
     
     if(rwd.classList.contains("active")) {
       rwd.classList.remove("active");
       clearInterval(intervalRwd);
      
       media.play();
     } else {
       rwd.classList.add("active");
       media.pause();
      
       intervalRwd = setInterval(windBackward, 200);
     }
   }
   
   
   function mediaForward() {
     clearInterval(intervalRwd);
     rwd.classList.remove("active");
   
     if(fwd.classList.contains("active")) {
       fwd.classList.remove("active");
       clearInterval(intervalFwd);
       media.play();
     } else {
       fwd.classList.add("active");
       media.pause();
       intervalFwd = setInterval(windForward, 200);
     }
   }
   
   function windBackward(){
     
     if(media.currentTime <=3) {
       stopMedia();
     } else {
       media.currentTime -= 3;
     }
   }
   
   function windForward(){
     
     if(media.currentTime >= media.duration - 3) {
       stopMedia();
     } else {
       media.currentTime += 3;
     }
   }
   
  
   
   media.addEventListener("timeupdate", setTime);
   
   function setTime(){
     console.log("update")
     let minutes = Math.floor(media.currentTime / 60);
     let seconds = Math.floor(media.currentTime - minutes * 60);
   
     let minuteValue = minutes.toString().padStart(2, "0");
     let secondValue = seconds.toString().padStart(2, "0");
   
    
   
     let mediaTime = `${minuteValue}:${secondValue}`;
     
     timer.textContent = mediaTime;
   
     let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
     timerBar.style.width = `${barLength}px`;
   }
   
   let listVideo = document.querySelector('.video-list .vid');
   let mainVideo = document.querySelector('.main-boddy video');
   let title = document.querySelectorAll('.main-boddy .title');

   listVideo.forEach(video =>{
    video.onclick=() =>{
      listVideo.forEach(vid=> vid .classList.remove('active'));
      video.classList.add('active');
    };
   });
   