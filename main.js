const char = {
	position: 'cel3e',
	img: '<img src="img/blob.png">',
	life: 10,
	damage: 5
};

const snake = {
	position: 'cel4b',
	img: '<img src="img/snake.png">',
	life: 20,
	damage: 1
};

const zombie = {
	position: 'cel4b',
	img: '<img src="img/zombie.png">',
	life: 15,
	damage: 1
};

function start(){
	for (var i = 1; i <= 5; i++) {
		let idd='cel'+i+'a';
		document.getElementById(idd).innerHTML = '';
	}
	for (var i = 1; i <= 5; i++) {
		let idd='cel'+i+'b';
		document.getElementById(idd).innerHTML = '';
	}
	for (var i = 1; i <= 5; i++) {
		let idd='cel'+i+'c';
		document.getElementById(idd).innerHTML = '';
	}

	char.position = 'cel3e';
	zombie.position = 'cel4b';
	snake.position = 'cel4b';

	while (snake.position == zombie.position) {
		snake.position = iniMob();
		zombie.position = iniMob();
	}

	document.getElementById(char.position).innerHTML = char.img;
	document.getElementById(snake.position).innerHTML = snake.img;
	document.getElementById(zombie.position).innerHTML = zombie.img;
	document.getElementById('life').innerHTML = 'Life: '+ char.life+ ' | ';
	document.getElementById('lifeZombie').innerHTML = 'Zombie: '+zombie.life+' | ';
	document.getElementById('lifeSnake').innerHTML = 'Snake: '+snake.life;
	
};

function iniMob(){
	let position = 'cel';
	position += (Math.floor(Math.random()*5)+1);

	let number = (Math.floor(Math.random()*3)+1);
	switch (number){
	case 1:
		position += 'a';
		break;
	case 2:
		position += 'b';
		break;
	case 3:
		position += 'c';
		break;
	}
	return position;
}

function move(key){
	document.getElementById(char.position).innerHTML = '';
	if (snake.position != 'idx') {
	document.getElementById(snake.position).innerHTML = '';
	}
	if (zombie.position != 'idx') {
	document.getElementById(zombie.position).innerHTML = '';
	}
	let oldChar = char.position;
	let oldZombie = zombie.position;
	let oldSnake = snake.position;
	char.position = positionSplit(oldChar, key);
	key = (Math.floor(Math.random()*4)+1);
	key = keyDecod(key);
	zombie.position = positionSplit(oldZombie, key);
	key = (Math.floor(Math.random()*4)+1);
	key = keyDecod(key);
	snake.position = positionSplit(oldSnake, key);
	
	if (char.position == zombie.position){
		char.position = oldChar;
		zombie.position = oldZombie;
		char.life -= zombie.damage;
		zombie.life -= char.damage;
	}
	if (char.life<1) {
		char.img = '';
		alert('perdeu, mané');
	}
	if (zombie.life<1) {
		zombie.img = 'oi';
		zombie.position = 'idx';
	} else {
		document.getElementById(zombie.position).innerHTML = zombie.img;
	}
	if (char.position == snake.position) {
		char.position = oldChar;
		snake.position = oldSnake;
		char.life -= snake.damage;
		snake.life -= char.damage;
	}
	if (char.life<1) {
		char.img = '';
		alert('perdeu, mané');
	}
	if (snake.life<1) {
		snake.img = 'ola';
		snake.position = 'idx';
	} else {
		document.getElementById(snake.position).innerHTML = snake.img;
	}
	document.getElementById(char.position).innerHTML = char.img;
	document.getElementById('life').innerHTML = 'Life: '+ char.life+ ' | ';
	document.getElementById('lifeZombie').innerHTML = 'Zombie: '+zombie.life+' | ';
	document.getElementById('lifeSnake').innerHTML = 'Snake: '+snake.life;
}

function positionSplit(position, key){
	let resultado = position.split("");
	let col = parseInt(resultado[3]);

	switch (resultado[4]){
		case 'a':
			resultado[4] = '1';
		break;
		case 'b':
			resultado[4] = '2';
		break;
		case 'c':
			resultado[4] = '3';
		break;
		case 'd':
			resultado[4] = '4';
		break;
		case 'e':
			resultado[4] = '5';
		break;
	}
	let line = parseInt(resultado[4]);

	switch (key){
		case 'up':
			line -= 1;
		break;
		case 'left':
			col -= 1;
		break;
		case 'right':
			col += 1;
		break;
		case 'down':
			line += 1;
		break;
	}

	if (line>5) {
		line = 5;
	} else if (line<1) {
		line = 1;
	}

	if (col>5) {
		col = 5;
	} else if (col<1) {
		col = 1;
	}

	switch (line){
		case 1:
			line = 'a';
		break;
		case 2:
			line = 'b';
		break;
		case 3:
			line = 'c';
		break;
		case 4:
			line = 'd';
		break;
		case 5:
			line = 'e';
		break;
	}

	return ('cel'+col+line);
};

function keyDecod(key){
	switch (key){
		case 1:
			key = 'up';
		break;
		case 2:
			col = 'down';
		break;
		case 3:
			col = 'left';
		break;
		case 4:
			line = 'right';
		break;
	}
	return key;
};