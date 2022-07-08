score=0;
cross=true;
f=0;
g=0;
highscore=0;
audio=new Audio('cartoon-audio.mp3');
document.onkeydown = function(e){
    if(e.key=='Enter' && g==0)
    {
        audio.play();
        audio.loop=true;
        obstacle=document.querySelector('.obstacle');
        obstacle.classList.add('obsani');
        gameover.innerHTML="Game start---play now";
        g=1;
        para.style.visibility='hidden';
        scorecount.style.visibility='visible';
        highscorecount.style.visibility='visible';
        if(localStorage.getItem('high')==null)
        highscorecount.innerHTML="Your High Score is : 0";
        else
        {
        highscorecount.innerHTML="Your High Score is : "+localStorage.getItem('high');
        highscore=parseInt(localStorage.getItem('high'));
        }
    }
    if(e.key=='ArrowUp' && g==1 && f==0)
    {
       dino=document.querySelector('.dino');
       dino.classList.add('animatedino');
       setTimeout(()=>{
        dino.classList.remove('animatedino');
       },700);
    }
    if(e.key=='ArrowRight' && g==1 && f==0)
    {
        dino=document.querySelector('.dino');
        dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinox+150+'px';
    }
    if(e.key=='ArrowLeft' && g==1 && f==0)
    {
        dino=document.querySelector('.dino');
        dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinox-150+'px';
    }
    if(e.key=='r' && f==1)
    {
        location.reload();
    }
}
setInterval(()=>{
    dino=document.querySelector('.dino');
    obstacle=document.querySelector('.obstacle');
    gameover=document.querySelector('.gameover');
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
    offsetx=Math.abs(dx-ox);
    offsety=Math.abs(dy-oy);
    if(offsetx<113 && offsety<52)
    {
    gameover.innerHTML="Game over reload to play again and press small r to reload";
    obstacle.classList.remove('obsani');
    obstacle.style.left=ox+'px';
    dino.style.bottom=-136+'px';
    f=1;
    audio.pause();
    }
    else if(offsetx<100 && cross && f==0)
    {
      score+=1;
      updatescore(score);
      cross=false;
      setTimeout(()=>{
      cross=true;
      },1000);
      setTimeout(()=>{
      anidur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
      newdur=anidur-0.1;
      if(newdur>3.5)
      obstacle.style.animationDuration=newdur+'s';
      else
      obstacle.style.animationDuration=5+'s';
      },1000);
    }
},10);
function updatescore(score){
scorecount.innerHTML="Your Score is : "+score;
if(score>highscore){
    highscore=score;
    localStorage.setItem('high',highscore);
    highscorecount.innerHTML="Your High Score is : "+localStorage.getItem('high');
}
}