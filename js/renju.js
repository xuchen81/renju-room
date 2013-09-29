var serve;

function init() {
	serve = 0;
	var rows =  document.all('row');
	for (var i = 0; i < rows.length; i++){
		var cols = rows[i].getElementsByTagName('div');
		for (var j = 0; j < cols.length; j++){
			cols[j].setAttribute('class', 'cell');
			cols[j].setAttribute('onclick', 'action(event)');
			cols[j].setAttribute('onmouseover', 'showSelection(event)');
			cols[j].setAttribute('onmouseout', 'hideSelection(event)');
		}
	}
}

function blackServe(){
	var whitego = document.getElementById("whitego");
	var chess = document.getElementById("chess");
	whitego.removeChild(chess);
	var blackgo = document.getElementById("blackgo");
	var blackChess = document.createElement('img');
	blackChess.setAttribute("id", "chess");
	blackChess.setAttribute("src", "/img/black.png");
	blackgo.appendChild(blackChess);
	
}

function whiteServe(){
	var blackgo = document.getElementById("blackgo");
	var chess = document.getElementById("chess");
	blackgo.removeChild(chess);
	var whitego = document.getElementById("whitego");
	var whiteChess = document.createElement('img');
	whiteChess.setAttribute("id", "chess");
	whiteChess.setAttribute("src", "/img/white.png");
	whitego.appendChild(whiteChess);
}

function disableOnclick(){
	var rows =  document.all('row');
	for (var i = 0; i < rows.length; i++){
		var cols = rows[i].getElementsByTagName('div');
		for (var j = 0; j < cols.length; j++){
			cols[j].setAttribute('onclick', '');
		}
	}
}

function showSelection(event){
	var currCell = event.currentTarget;
	currCell.style.width = '38px';
	currCell.style.height = '38px';
	currCell.style.border = '1px solid #ff0000';
}

function hideSelection(event){
	var currCell = event.currentTarget;
	currCell.style.width = '40px';
	currCell.style.height = '40px';
	currCell.style.border = null;
}

function action(event){
	var currCell = event.currentTarget;
	if (serve % 2 == 0 ){
		
		whiteServe();
		currCell.className = "cell black";
		if (win(currCell)){
			disableOnclick();
			document.getElementById('win').innerHTML = "Black Won";
			setTimeout('winMess()' ,100);
		}
	}
	else if (serve % 2 == 1){
		blackServe();
		currCell.className = "cell white";
		if (win(currCell)){
			disableOnclick();
			document.getElementById('win').innerHTML = "White Won";
			setTimeout('winMess()' ,100);
		}
	}
	currCell.setAttribute('onclick','');
	serve += 1;
	if(serve == 225){
		document.getElementById('ui-dialog-title-dialog').innerHTML = 'Tie !';
		document.getElementById('win').innerHTML = "Tie Game";
		setTimeout('winMess()' ,100);
	}
	
}

function getCell(row, col){
	return document.all('row')[row - 1].getElementsByTagName('div')[col - 1];
}

function win(currCell){
	colParent = currCell.parentNode;
	currRow = colParent.getElementsByTagName('div');
	currCol = document.all(currCell.id);
	return rowLeftCount(currCell, currRow) + 1 + rowRightCount(currCell, currRow) >= 5 ||
	       colUpCount(currCell, currCol) + 1 + colDownCount(currCell, currCol) >= 5 || 
	       topLeftCount(currCell) + 1 + bottomRightCount(currCell) >= 5 ||
	       topRightCount(currCell) + 1 + bottomLeftCount(currCell) >= 5;
}

function rowLeftCount(currCell, currRow){
	var leftCount = 0;
	if (currCell.id.substring(3) != 1){
		var checkLeftCell = currRow[currCell.id.substring(3) - 2];
		while (checkLeftCell.className == currCell.className){
			leftCount += 1;
			if (checkLeftCell.id.substring(3) == 1){break;}
			checkLeftCell = currRow[checkLeftCell.id.substring(3) - 2]; 
		}
	}
	return leftCount;
}

function rowRightCount(currCell, currRow){
	var rightCount = 0;
	if (currCell.id.substring(3) != 15){
		var checkRightCell = currRow[currCell.id.substring(3)];
		while (checkRightCell.className == currCell.className){
			rightCount += 1;
			if (checkRightCell.id.substring(3) == 15){break;}
			checkRightCell = currRow[checkRightCell.id.substring(3)];
		}
	}
	return rightCount;
}

function colUpCount(currCell, currCol){
	var currCellAtRow = currCell.parentNode.className;
	var upCount = 0;
	if (currCellAtRow != 1){
		var checkUpCell = currCol[currCellAtRow - 2];
		while (checkUpCell.className == currCell.className){
			upCount += 1;
			currCellAtRow = checkUpCell.parentNode.className;
			if (currCellAtRow == 1){break;}
			checkUpCell = currCol[currCellAtRow - 2];
		}
	}
	return upCount;
}

function colDownCount(currCell, currCol){
	var currCellAtRow = currCell.parentNode.className;
	var checkDownCell = currCol[currCellAtRow];
	var downCount = 0;
	if (currCellAtRow != 15){
		while (checkDownCell.className == currCell.className){
			downCount += 1;
			currCellAtRow = checkDownCell.parentNode.className;
			if (currCellAtRow == 15){break;}
			checkDownCell = currCol[currCellAtRow];
		}
	}
	return downCount;
}

function topLeftCount(currCell){
	var atRow = currCell.parentNode.className - 1;
	var atCol = currCell.id.substring(3) - 1;
	var topLeftCount = 0;
	if (atRow != 0 && atCol != 0){
		var checkTopLeftCell = getCell(atRow, atCol);
		while (checkTopLeftCell.className == currCell.className){
			topLeftCount += 1;
			atRow = checkTopLeftCell.parentNode.className - 1;
			atCol = checkTopLeftCell.id.substring(3) - 1;
			if (atRow == 0 || atCol == 0){break;}
			checkTopLeftCell = getCell(atRow, atCol);
		}
	}
	return topLeftCount;
}


function bottomRightCount(currCell){
	var atRow = currCell.parentNode.className;
	var atCol = currCell.id.substring(3);
	var bottomRightCount = 0;
	if(atRow != 15 && atCol != 15){
		var checkBottomRightCell = getCell(parseInt(atRow) + 1, parseInt(atCol) + 1);
		while (checkBottomRightCell.className == currCell.className){
			bottomRightCount += 1;
			atRow = checkBottomRightCell.parentNode.className;
			atCol = checkBottomRightCell.id.substring(3);
			if (atRow == 15 || atCol == 15){break;}
			checkBottomRightCell = getCell(parseInt(atRow) + 1, parseInt(atCol) + 1);
		}
	}
	return bottomRightCount;
}


function topRightCount(currCell){
	var atRow = currCell.parentNode.className;
	var atCol = currCell.id.substring(3);
	var topRightCount = 0;
	if(atRow != 1 && atCol != 15){
		var checkTopRightCell = getCell(parseInt(atRow) - 1, parseInt(atCol) + 1);
		while (checkTopRightCell.className == currCell.className){
			topRightCount += 1;
			atRow = checkTopRightCell.parentNode.className;
			atCol = checkTopRightCell.id.substring(3);
			if (atRow == 1 || atCol == 15){break;}
			checkTopRightCell = getCell(parseInt(atRow) - 1, parseInt(atCol) + 1);
		}
	}
	return topRightCount;	
}


function bottomLeftCount(currCell){
	var atRow = currCell.parentNode.className;
	var atCol = currCell.id.substring(3);
	var bottomLeftCount = 0;
	if(atRow != 15 && atCol != 1){
		var checkBottomLeftCell = getCell(parseInt(atRow) + 1, parseInt(atCol) - 1);
		while (checkBottomLeftCell.className == currCell.className){
			bottomLeftCount += 1;
			atRow = checkBottomLeftCell.parentNode.className;
			atCol = checkBottomLeftCell.id.substring(3);
			if (atRow == 15 || atCol == 1){break;}
			checkBottomLeftCell = getCell(parseInt(atRow) + 1, parseInt(atCol) - 1);
		}
	}
	return bottomLeftCount;	
}



















