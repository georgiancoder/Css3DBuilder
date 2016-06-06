function CSSBUILDER(){
	this.divs = new Array();
	this.zIndex = 0;
	this.divId = (this.divs.length > 0)? this.divs.length : 0;
	this.activeDiv;
	this.createDiv = function (width,height,bgColor,border,borderColor,scene) {
		this.zIndex++;
		var div = document.createElement("div");
		div.setAttribute("id","div" + this.divId);
		div.setAttribute("class","block")
		div.setAttribute("onclick","select(this)");
		div.style.width = width + "px";
		div.style.height = height + "px";
		div.style.backgroundColor = bgColor;
		div.style.border = border + "px solid " + borderColor;
		div.style.position = "absolute";
		div.style.zIndex = this.zIndex;
		div.style.left = "calc(50% - " + (parseInt(width)/2) + "px)";
		div.style.top = "calc(50% - " + (parseInt(height)/2) + "px)";
		this.divs.push(div);
		this.divId++;
	}
	this.moveDiv = function(id){

	}
	this.rotateX = function(divId,amount,scene){
		var index = parseInt(divId.substr(3));
		this.activeDiv = document.getElementById(divId);
		this.transform(divId,amount,scene,"rotateX");
		this.divs[index] = this.activeDiv;
		//this.redraw(scene);
	}
	this.rotateY = function(divId,amount,scene){
		var index = parseInt(divId.substr(3));
		this.activeDiv = document.getElementById(divId);
		this.transform(divId,amount,scene,"rotateY");
		this.divs[index] = this.activeDiv;
		//this.redraw(scene);
	}
	this.rotateZ = function(divId,amount,scene){
		var index = parseInt(divId.substr(3));
		this.activeDiv = document.getElementById(divId);
		this.transform(divId,amount,scene,"rotateZ");
		this.divs[index] = this.activeDiv;
		//this.redraw(scene);
	}
	this.moveX = function(divId,amount,scene){
		var index = parseInt(divId.substr(3));
		this.activeDiv = document.getElementById(divId);
		this.transform(divId,amount,scene,"translateX");
		this.divs[index] = this.activeDiv;
		//this.redraw(scene);
	}
	this.moveY = function(divId,amount,scene){
		var index = parseInt(divId.substr(3));
		this.activeDiv = document.getElementById(divId);
		this.transform(divId,amount,scene,"translateY");
		this.divs[index] = this.activeDiv;
		//this.redraw(scene);
	}
	this.moveZ = function(divId,amount,scene){
		var index = parseInt(divId.substr(3));
		this.activeDiv = document.getElementById(divId);
		this.transform(divId,amount,scene,"translateZ");
		this.divs[index] = this.activeDiv;
		//this.redraw(scene);
	}
	this.transform = function(divId,amount, scene, command){
		var transformStyle = (this.activeDiv.style.transform == "") ? "transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(0px)" : this.activeDiv.style.transform;
		var rotateXstr = (transformStyle.match(/rotateX\([0-9]+deg\)/) == null) ? " rotateX(0deg) " : transformStyle.match(/rotateX\([0-9]+deg\)/);
		var rotateYstr = (transformStyle.match(/rotateY\([0-9]+deg\)/) == null) ? " rotateY(0deg) " : transformStyle.match(/rotateY\([0-9]+deg\)/);
		var rotateZstr = (transformStyle.match(/rotateZ\([0-9]+deg\)/) == null) ? " rotateZ(0deg) " : transformStyle.match(/rotateZ\([0-9]+deg\)/);
		var translateXstr = (transformStyle.match(/translateX\([0-9]+px\)/) == null) ? " translateX(0px) " : transformStyle.match(/translateX\([0-9]+px\)/);
		var translateYstr = (transformStyle.match(/translateY\([0-9]+px\)/) == null) ? " translateX(0px) " : transformStyle.match(/translateY\([0-9]+px\)/);
		var translateZstr = (transformStyle.match(/translateZ\([0-9]+px\)/) == null) ? " translateX(0px) " : transformStyle.match(/translateZ\([0-9]+px\)/);
		switch(command){
			case 'rotateX':
				document.getElementById(divId).style.transform = "rotateX(" + amount + "deg) " + rotateYstr[0] + " " + rotateZstr[0] + " " + translateXstr[0] + " " + translateYstr[0] + " " + translateZstr[0];
			break;
			case 'rotateY':
				document.getElementById(divId).style.transform = rotateXstr[0] + " rotateY(" + amount + "deg) " + rotateZstr[0] + " " + translateXstr[0] + " " + translateYstr[0] + " " + translateZstr[0];
			break;
			case 'rotateZ':
				document.getElementById(divId).style.transform = rotateXstr[0] + rotateYstr[0] + " rotateZ(" + amount + "deg) " + translateXstr[0] + " " + translateYstr[0] + " " + translateZstr[0];
			break;
			case 'translateX':
				document.getElementById(divId).style.transform = rotateXstr[0] + " " + rotateYstr[0] + " " + rotateZstr[0] + " translateX(" + amount + "px) " + translateYstr[0] + " " + translateZstr[0];
			break;
			case 'translateY':
				document.getElementById(divId).style.transform = rotateXstr + rotateYstr + rotateZstr + translateXstr + " translateY(" + amount + "px) " + translateZstr;
			break;
			case 'translateZ':
				document.getElementById(divId).style.transform = rotateXstr + rotateYstr + rotateZstr + translateXstr + translateYstr + " translateZ(" + amount + "px)";
			break;
		}
	}
	this.redraw = function(scene){
		scene.innerHTML = "";
		for(i = 0; i < this.divs.length; i++){
			scene.appendChild(this.divs[i]);
		}
	}
}

window.onload = function() {	
	var scene = document.getElementById("scene");
	var create = document.getElementById("create");
	var blocks = document.getElementsByClassName("block");
	var rotate = document.getElementById("rotateDiv");
	var move = document.getElementById("moveDiv");
	var createDiv = document.getElementById("createDiv");
	var rotatex = document.getElementById("rotatex");
	var rotatey = document.getElementById("rotatey");
	var rotatez = document.getElementById("rotatez");
	var divId = ""; 
	
	var divs = document.getElementsByClassName("block");

	var CssBuilder = new CSSBUILDER();

	rotatex.onchange = function(e){
		e.stopPropagation();
		CssBuilder.rotateX(divId,e.target.value,scene);
	}

	rotatey.onchange = function(e){
		e.stopPropagation();
		CssBuilder.rotateY(divId,e.target.value,scene);
	}

	rotatez.onchange = function(e){
		e.stopPropagation();
		CssBuilder.rotateZ(divId,e.target.value,scene);
	}

	movex.onchange = function(e){
		e.stopPropagation();
		CssBuilder.moveX(divId,e.target.value,scene);
	}

	movey.onchange = function(e){
		e.stopPropagation();
		CssBuilder.moveY(divId,e.target.value,scene);
	}

	movez.onchange = function(e){
		e.stopPropagation();
		CssBuilder.moveZ(divId,e.target.value,scene);
	}

	scene.style.height = window.innerHeight + "px";

	create.onclick = function(e){
		e.stopPropagation();
		var width = document.getElementById("width");
		var height = document.getElementById("height");
		var bgColor = document.getElementById("bgColor");
		var border = document.getElementById("border");
		var borderColor = document.getElementById("borderColor");
		CssBuilder.createDiv(width.value,height.value,bgColor.value,border.value,borderColor.value,scene);
		CssBuilder.redraw(scene);
		listenselect(divs,move);
		divs = document.getElementsByClassName("block");
	}


	scene.onclick = function(e){
		e.stopPropagation();
		move.style.display = "none";
		rotate.style.display = "none";
		createDiv.style.display = "block";
	}
	
	function listenselect(divs){
		try{
			for (var i = 0; i <= divs.length; i++) {
				divs[i].addEventListener("click", select, false);
			}
		}
		catch(e){
			console.log(e);
		}
		
	}

	function select(e){
		e.stopPropagation();
		divId = e.target.id;
		move.style.display = "block";
		rotate.style.display = "block";
		createDiv.style.display = "none";
	}	

}



