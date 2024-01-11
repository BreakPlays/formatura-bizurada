
let currentAudio;
let isLoop = false;
let audioPath;


document.addEventListener("orientationchange", function(event){
    switch(window.orientation) 
    {  
        case -90: case 90:
            
            break; 
        default:
			alert("Mude a orientção do seu dispositivo para o modo paisagem")
    }
});


$('th').on('click', function(){
	let folderName = $(this).parent().attr('class')
	
	if($(this).text() == ""){
		return
	}
	
	
	let command = $(this).text().toLowerCase().replaceAll(' ','')
	
	
	
	if (command == "ordinariomarche"){
		folderName = "mixed"
	}
	
	if (command.indexOf("loop") > 0){
		isLoop = 1
	}
	$('#audioPlayingName').text(`"${$(this).text()}"`)
	
	
	
	
	let toque = new Audio(`sounds/${folderName}/${command}.wav`)
	currentAudio = toque
	if (isLoop){
		audioPath = `sounds/${folderName}/${command}.wav`
		
		loopify(audioPath, function(err,loop) {

		  if (err) {
			return console.err(err);
		  }
		  loop.play();
		})

	}else{
		currentAudio.play()	
	}
	
	
	
	$('#currentAudioPlaying').css('opacity','1')
	$('#currentAudioPlaying').css('pointer-events','all')
	
	if(isLoop){
		loopAudio()
		return
	}
	
	toque.onended = function(){
		$('#currentAudioPlaying').css('opacity','0')
		$('#currentAudioPlaying').css('pointer-events','none')
	}
	

})



document.addEventListener('keydown', evt => {
	
	if (currentAudio != undefined || currentAudio != null) {
	}else {
		return
	}
	if (evt.key === 'Escape') {
		if(isLoop){
			currentAudio.onended = function(){
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

function pressEsq(){
	console.log("esq")
	currentAudio.pause()
	currentAudio.currentTime = 0
	currentAudio = null
	$('#currentAudioPlaying').css('opacity','0')
	$('#currentAudioPlaying').css('pointer-events','none')
}