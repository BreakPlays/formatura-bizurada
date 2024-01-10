


$('th').on('click', function(){
	let folderName = $(this).parent().attr('id')
	
	if($(this).text() == ""){
		return
	}
	
	
	let command = $(this).text().toLowerCase().replace(' ','')
	
	
	
	if (command == "ordinariomarche"){
		folderName = "mixed"
	}
	$('#audioPlayingName').text(`"${$(this).text()}"`)
	
	let toque = new Audio(`sounds/${folderName}/${command}.wav`)
	toque.play()
	
	$('#currentAudioPlaying').css('opacity','1')
	$('#currentAudioPlaying').css('pointer-events','all')
	
	toque.onended = function(){
		$('#currentAudioPlaying').css('opacity','0')
		$('#currentAudioPlaying').css('pointer-events','none')
	}
	

})