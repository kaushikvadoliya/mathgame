let playing = false;
let score;
let timeremaining;
let action;
let answer;
//if click on start game button
document.getElementById("startreset").onclick=function()
{
    //if we are playing
    if(playing == true)
    {
        location.reload();//reaload the page
    }
    else
    {
        //if we are not playing change the mode to playing
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //show count down box
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("trvalue").innerHTML = timeremaining;
        hide("gameover");
        //to change button to reset game 
        document.getElementById("startreset").innerHTML = "Reset Game";
        //show the countdown 
        showcountdown();
        //generate question answer
        generateQA();
    }
}
// show function and hide function
function show(id)
{
    document.getElementById(id).style.display="block";
}
function hide(id)
{
    document.getElementById(id).style.display="none";
}
//function for countdown
function showcountdown()
{
     action  = setInterval(function(){
        timeremaining--;
        document.getElementById("trvalue").innerHTML = timeremaining;
        if(timeremaining==0){
            //means gameover
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").
            innerHTML=`<p>Game Over!</p>
            <p>Your Score is ${score} </p>
            `;
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
     },1000);
}
// function for stopcountdown
function stopCountdown()
{
    clearInterval(action);
}
//function for generate the question answer 
function generateQA()
{
    let x=1+Math.floor(9*Math.random());
    let y=1+Math.floor(9*Math.random());
    correctanswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    let correctrposition = 1+Math.round(3*Math.random());
    //fill the correct box // means ke correct answer chhe te 1 to 4 ma game ema aavi sake tethi multiply 3 karya and +1 karya so 1 to 4 game ema aave
    document.getElementById("box" + correctrposition).innerHTML = correctanswer;
    //fill wrong boxes boxes
    var answer = [correctanswer];
    for (i=1;i<5;i++){
        if(i != correctrposition)
        {
            let wronganswer;
            do{//game random number generate thay javo joiye
                wronganswer = (1+Math.floor(9*Math.random()))*
                (1+Math.floor(9*Math.random()));
                //means correct answer ni jagyae wrong answer na aavvo joiye
            }while(answer.indexOf(wronganswer)> -1);
            answer.push(wronganswer);
            document.getElementById("box"+i).innerHTML = wronganswer;
        }
    }
}
//if we click on answer box tan show the correct
for(i=1;i<5;i++)
{
     document.getElementById("box" + i).onclick=function()
     {
        //if we are playing
        if(playing==true)//yes
        {
            if(this.innerHTML==correctanswer)//means click the correct answer
            //increase the score
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //means sacho answer hase to correct ne show karse and wrong ne hide karse
            hide('wrong');
            show('correct');
            setTimeout(function()
            {
                hide('correct');//1 sec mate correct ne show karava mate
            },1000)
            //immediately next question generate thay javo joiye
            generateQA(); 
        }
        else
        { 
            //click the wrong answer tyare wrong ne show karse and correct ne hide karse
            hide('correct');
            show('wrong');
            setTimeout(function()
            {
                hide('wrong');
            },1000)
        }
     }
}