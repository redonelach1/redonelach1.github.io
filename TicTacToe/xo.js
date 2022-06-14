var wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var moveMade = false;
var elements = document.getElementsByClassName("grid-item");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function endGame()
{
    for (var i = 0; i < elements.length; i++) {
        elements[i].removeEventListener('click', playerMove, false);
    }
    for (var i = 0; i < 9; i++)
    {
        var ele = document.getElementById(i.toString());
        ele.style.cursor = "default";
    }
}

var playerMove = async function()
{
    console.log("clicked");
    var attribute = this.getAttribute("id");
    var ele = document.getElementById(attribute);
    if (ele.innerHTML != '')
    {
        alert("spot isn't empty");
    }
    else if (!moveMade)
    {
        ele.innerHTML = 'X';
        moveMade = true;
    }
    if (moveMade)
    {
        var emptyspots=[];
        for (var i = 0; i < 9; i++)
        {
            var ele = document.getElementById(i.toString());
            if (ele.innerHTML === "")
            {
                emptyspots.push(i);
            }
        }
        let random = Math.random();
        let index = Math.floor(random * emptyspots.length);
        var ele = document.getElementById(emptyspots[index]);
        // sleep
        await sleep(300);
        //sleep
        ele.innerHTML = 'O';
        moveMade = false;
    }
    setInterval(checkWin(),10);
};

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', playerMove, false);
}
function checkWin()
{
    var count = 0;
    var status = document.getElementById("status");
    var isWin = false;
    for (var i = 0; i < 9; i++)
    {
        var ele = document.getElementById(i.toString());
        if (ele.innerHTML != "")
        {
            count++;
        }
    }

    for (var i = 0; i<wins.length; i++)
    {
            var ele0 = document.getElementById(wins[i][0].toString()).innerHTML;
            var ele1 = document.getElementById(wins[i][1].toString()).innerHTML;
            var ele2 = document.getElementById(wins[i][2].toString()).innerHTML;
            console.log( ele0 === ele1 && ele0 === ele2 );
            if ( (ele0 === ele1 && ele0 === ele2) && (ele0 != "") )
            {
                console.log("win check");
                if ( ele0 === 'X' )
                {
                    status.innerHTML = "Player Wins";
                }
                else
                {
                    status.innerHTML = "Computer Wins B)";
                }
                    var isWin = true;
                endGame();
            }
    }
    console.log(isWin);
    console.log(count);
    if ( (count == 8) && (isWin == false) )
    {
        status.innerHTML = "Draw";
        endGame();
    }
}

