
let currentAudio;
let isLoop = false;
let audioPath;
let loopAudioFile;
let hasToFadeOut = false;
let fadeOutCounter = 0;
let isMarch = false
let extension = "wav"



document.addEventListener("orientationchange", function(event){
    switch(window.orientation) 
    {  
        case -90: case 90:
            
            break; 
        default:
			alert("Mude a orientção do seu dispositivo para o modo paisagem")
    }
});


$('th').on('click', function(parameterCommand){
	extension = "wav"
	let folderName = $(this).parent().attr('class')
	
	if($(this).text() == ""){
		return
	}
	
	let command = $(this).text().toLowerCase().replaceAll(' ','')

	if(command == "ordinariomarche"){
		isMarch = true
		console.log("marche")
	}
	
	if(command == "continência" || command == "fundosmusicais"){
		return
	}
	if (command == "ordinariomarche"){
		folderName = "mixed"
	}
	
	if(folderName == "banda" || command == "entregademedalhas" || command == "hinoacaxias" || folderName == "cancao"){
		hasToFadeOut = true
		console.log("has to fade")
	}
	
	
	
	if(command.indexOf("comcancao") > 0){
		extension = "mp3"
	}
	
	if (command.indexOf("loop") > 0){
		isLoop = true
	}
	$('#audioPlayingName').text(`"${$(this).text()}"`)
	
	let toque = new Audio(`sounds/${folderName}/${command}.${extension}`)
	
	currentAudio = toque
	if (isLoop){
		audioPath = `sounds/${folderName}/${command}.wav`
		
		loopify(audioPath, function(err, loop) {

		  if (err) {
			return console.err(err);
		  }
		  loopAudio = loop
		  loopAudioFile.play();
		})

	}else{
		currentAudio.play()	
	}
	currentAudio.play()	
	
	$('#currentAudioPlaying').css('opacity','1')
	$('#currentAudioPlaying').css('pointer-events','all')
	
	if(isLoop){
		loopAudio()
		return
	}
	
	toque.onended = function(){
		pressEsq()/*
		$('#currentAudioPlaying').css('opacity','0')
		$('#currentAudioPlaying').css('pointer-events','none')*/
	}
	

})



document.addEventListener('keydown', evt => {
	
	if (currentAudio == undefined || currentAudio == null) {
		return
	}
	if (evt.key === 'Escape') {
		
		if(isLoop){
			currentAudio.onended = function(){
				window.clearInterval(window.myInterval)
				pressEsq()
			}
			return
		}
     	pressEsq()
    }
})


function loopAudio(){
	currentAudio.onended = function(){
		currentAudio.play()
	}
}


function makeFadeOut(){
	
	
	
	console.log(currentAudio.volume)
	console.log(currentAudio.volume >= 0)
	
	
	if(fadeOutCounter == 5){
		$("#stopPlaying").text("PARAR DE TOCAR")
		currentAudio.volume = 0
		fadeOutCounter = 0
		hasToFadeOut = false
		
		window.clearInterval(window.myInterval)
		window.clearInterval(window.myInterval)
		window.clearInterval(window.myInterval)
		window.clearInterval(window.myInterval)
		window.clearInterval(window.myInterval)
		window.clearInterval(window.myInterval)
		window.clearInterval(window.myInterval)
		window.clearInterval(window.myInterval)
		
		pressEsq(true)
		return
	}
	fadeOutCounter++
	currentAudio.volume -= 0.20
	
}

function pressEsq(cameFromFadeOut){
	$("#stopPlaying").text("PARAR DE TOCAR")
	window.clearInterval(window.myInterval)
	console.log("esq to marche")
	isLoop = false
	
	if(hasToFadeOut){
		$("#stopPlaying").text("PARANDO DE TOCAR, AGUARDE (OU PRESSIONE NOVAMENTE)")
		hasToFadeOut = false
		window.myInterval = setInterval(makeFadeOut, 1000)
		return
	}

	currentAudio.pause()
	currentAudio.currentTime = 0
	currentAudio = null
	
	if(loopAudioFile != undefined && loopAudioFile!= null){
		loopAudioFile.stop()
	}
	
	
	$('#currentAudioPlaying').css('opacity','0')
	$('#currentAudioPlaying').css('pointer-events','none')
	
	if(isMarch){
		console.log("is to march")
		isMarch = false
		$('.caixaEBumbo').click()
	}
}

$( window ).on( "load", function() {
  if(screen.width < 700){
	 // $(".leak").append($("#secondBugle"))
  }
} );
