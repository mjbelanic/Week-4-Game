//Need to make:
//Character objects (image needed)
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

	var Luke = new Character( 1 , "Luke Skywalker", 125, 10, 5, "assets/images/Luke.jpg");
	var ObiWan = new Character(2, "Obi Wan Kenobi" , 140, 9, 7, "assets/images/ObiWan.jpg");
	var Emperor = new Character(3, "Emperor Palpatine", 180, 3, 18, "assets/images/Palpatine.png");
	var DarthVader = new Character(4, "Darth Vader", 150, 5, 15, "assets/images/Vader.jpg");
	var characterArray = [Luke, ObiWan, Emperor, DarthVader]
	var player;
	var enemy;
	var baseAttack;
	var playerHP;
	var enemyHP;
	$("#messages").attr("style", "color: Blue");

	function CharacterSelectMaker(array){
	    for (var i = 0; i < array.length; i++) {
	     	//Make div and give it id
	        var characterDiv = $("<div>");
	        characterDiv.attr("class" , "character");
	        characterDiv.attr("id" , array[i].id);
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
	        characterHealth.attr("id" , "HP");
	        characterHealth.html(array[i].health);
	        characterDiv.append(characterHealth);
	    }
	    $("#menuDiv").attr("style", "display: inline");
	    $("#attackBtn").attr("style" , "display: inline-block");
	    $("#restartBtn").attr("style" , "display: none");
	}

	CharacterSelectMaker(characterArray);


	// Move player's choice into player div
	// Move remaining characters into enemy div
	function ChooseCharacter(charID, array){
		var playerCharacter = $("<div>");
		$("#player").append("<p> Your Character </p>");
		$("#player")
		$("#player").append(playerCharacter);
		playerCharacter.attr("id" , "playerCharacter");
		$("#" + charID).appendTo(playerCharacter);
		$(".character:not(#" + charID +")").attr("class" , "enemyCharacters")
		$(".enemyCharacters").appendTo("#enemySelect")
		$("#enemies").attr("style", "display:block");
		$("#menuDiv").attr("style" , "display:none");
		//Set base attack
		var characterID = parseInt(charID)
		for (var i = 0; i < array.length; i++){
			if(array[i].id === characterID){
				baseAttack = array[i].attack;
				playerHP = array[i].health;
			}
		}
	}

	function ChooseEnemy(enemyID, array){
		$("#defPos").append("<p> Defender </p>");
		$("#" + enemyID).appendTo("#defPos");
		$("#" + enemyID).attr("class","currentEnemy");
		var enId = parseInt(enemyID)
		for (var i = 0; i < array.length; i++){
			if(array[i].id === enId){
				enemyHP = array[i].health;
			}
		}

	}

	function Attack(array, playerId , enemyId){
		enemyId = parseInt(enemyId);
		playerId = parseInt(playerId);
		for (var i = 0; i < array.length; i++){
			if(array[i].id === playerId){
				player = array[i];
			}
		}
		for (var i = 0; i < array.length; i++){
			if(array[i].id === enemyId){
				enemy = array[i];
			}
		}
		enemyHP = enemyHP - baseAttack;
		playerHP = playerHP - enemy.counter;
		$("#messages").html("You attack the enemy for " + baseAttack + " points of damage. <br/>" + 
			"The enemy counters and damges you for " + enemy.counter  + " points of damage");
		baseAttack += player.attack;
		
		if(enemyHP > 0){
			$( "#" + enemyId + " #HP").html(enemyHP);
		
		}else{
			//empty enemy div
			$("#defPos").empty();
			$("#enemies").attr("style" ,"display: block");
			
			if( !$.trim( $('#enemySelect').html() ).length){
				$("#player").empty();
				$("#defPos").empty();
				$("#enemySelect").empty();
				$("#attackBtn").attr("style" , "display: none");
				$("#messages").attr("style", "color: green");
				$("#messages").html("Congrats on your victory!");
				$("#restartBtn").attr("style" , "display:inline-block");
			}else{
				$("#messages").html("Select new opponent");
			}
		}

		if(playerHP > 0){
			$( "#" + playerId + " #HP").html(playerHP);
		}else{
			$("#player").empty();
			$("#defPos").empty();
			$("#enemySelect").empty();
			$("#attackBtn").attr("style" , "display: none");
			$("#messages").attr("style" , "color: red");
			$("#messages").html("You have been defeated. Try again");
			$("#restartBtn").attr("style" , "display:inline-block");
		}
		

	}

	//Click a div, get that character
	$(document).on("click", "div.character" , function(){
		//ONLY if enemySelect div is empty set up game board / else do nothing
		if( !$.trim( $('#enemySelect').html() ).length &&  !$.trim( $('#defPos').html() ).length){
			ChooseCharacter(this.id , characterArray);
		}
	});


	$(document).on("click", "div.enemyCharacters" ,function(){
	//ONLY if enemySelect div is empty set up game board / else do nothing
		if( !$.trim( $('#defPos').html() ).length){
			ChooseEnemy(this.id, characterArray);
			$("#enemies").attr("style" , "display: none")
		}
	});


	$("#restartBtn").click(function(){
		$("#characterSelect").empty();
		$("#enemySelect").empty();
		$("#messages").attr("style", "color: blue");
		$("#messages").html("");
		CharacterSelectMaker(characterArray);
	});

	$("#attackBtn").click(function(){
		if( !$.trim( $('#defPos').html() ).length){
			$("#messages").html("No enemy selected");
		}else{
			//Since the class is added dynamically, you need to use event delegation to register the event handler
			$("#messages").html("");
			Attack(characterArray, $(".character").attr("id") , $(".currentEnemy").attr("id"));
		}
	});

});