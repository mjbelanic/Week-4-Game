//Need to make:
//Character objects
// pick enemy
// attack enemy
// enemy health decrease
// enemy counter
// player health decrease
// player attack increase
// enemy dies
// player dies
// reset game


$(document).ready(function() {

	//Character objects
	var Character = function(id, name, hp, ap, counter, img){
		this.id = id;
		this.name = name;
		this.health = hp;
		this.attack = ap;
		this.counter = counter;
		this.image = img;

	}

	var Luke = new Character( 1 , "Luke", 100, 5, 4, "https://placeholdit.co//i/200x200?");
	var ObiWan = new Character(2, "Obi Wan Kenobi" , 120, 7, 5, "https://placeholdit.co//i/200x200?");
	var Emperor = new Character(3, "Emperor Papaltine", 200, 25, 10, "https://placeholdit.co//i/200x200?");
	var DarthVader = new Character(4, "Darth Vader", 150, 30, 15, "https://placeholdit.co//i/200x200?");
	var characterArray = [Luke, ObiWan, Emperor, DarthVader]

	//Append character to div
	// place holder image currently <img src="https://placeholdit.co//i/200x200?">

	function CharacterSelectMaker(array){
	     for (var i = 0; i < array.length; i++) {
	     	//Make div and give it id
	        var characterDiv = $("<div>");
	        characterDiv.addClass("character");
	        characterDiv.attr("id" , array[i].id);
	        characterDiv.attr("style", "border: 1px solid red");
	        $("#characterSelect").append(characterDiv);
	        //Make and append name
	        var characterName = $("<p>")
	        characterName.html(array[i].name);
	        characterDiv.append(characterName);
	        //Make and append image
	        var characterImg = $("<img>");
	        characterImg.attr("src" , array[i].image);
	        characterDiv.append(characterImg);
	        //Make and append health
	        var characterHealth = $("<p>")
	        characterHealth.html(array[i].health);
	        characterDiv.append(characterHealth);
	    }
	}

	CharacterSelectMaker(characterArray);

	// Move player's choice into player div
	// Move remaining characters into enemy div
	function ChooseCharacter(charID){
		var playerCharacter = $("<div>");
		$("#player").append(playerCharacter);
		playerCharacter.attr("id" , "playerCharacter");
		$("#" + charID).appendTo(playerCharacter);
		$(".character:not(#" + charID +")").attr("class" , "enemyCharacters")
		$(".enemyCharacters").appendTo("#enemySelect")
		$("#menuDiv").attr("style" , "display:none");
	}

	function ChooseEnemy(enemyID){
		$("#" + enemyID).appendTo("#defPos");
		$("#" + enemyID).attr("class","currentEnemy");
		console.log("append should have happened");
	}

	function Attack(array, playerId , enemyId){
		enemyId = parseInt(enemyId);
		playerId = parseInt(playerId);
		for (var i = 0; i < array.length; i++){
			if(array[i].id === playerId){
				console.log("Player found: " + array[i].name);
			}
		}
		for (var i = 0; i < array.length; i++){
			if(array[i].id === enemyId){
				console.log("Enemy found: " + array[i].name);
			}
		}
	}

	//Click a div, get that character
	$(".character").on("click", function(){
		//ONLY if enemySelect div is empty set up game board / else do nothing
		if( !$.trim( $('#enemySelect').html() ).length){
			ChooseCharacter(this.id);
		}
	});


	$(document).on("click", "div.enemyCharacters" ,function(){
	//ONLY if enemySelect div is empty set up game board / else do nothing
		console.log("Click works");
		if( !$.trim( $('#defPos').html() ).length){
			ChooseEnemy(this.id);
		}
	});


	$("button").click(function(){
		if( !$.trim( $('#defPos').html() ).length){
			console.log("No enemy selected");
		}else{
			Attack(characterArray, $(".character").attr("id") , $(".currentEnemy").attr("id"));
		}
	});

});