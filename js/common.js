	function readURL(input) {
		if($('#sex').val() == "") { 
			alert("성별을 모르겠소..");
			false;
		} else {
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = function(e) {
					$('.request-message').hide();
					$('.title-message').hide();
					$('.result-message').hide();
					$('.image-title-wrap').hide();
					$('#loader').show();
					$('.image-upload-wrap').hide();
					$('.face-req').hide();
					$('.file-upload-image').attr('src', e.target.result);
					$('.file-upload-content').show();
					$('.image-title').html(input.files[0].name);
				};
				reader.readAsDataURL(input.files[0]);
				init().then(()=>{
					predict();	
					$('#loader').hide();
					$('.result-message').show();
					$('.title-message').show();
					$('.image-title-wrap').show();
				})

			} else {
				removeUpload();
			}
		}
	}

	function removeUpload() {
		$('.file-upload-input').replaceWith($('.file-upload-input').clone());
		$('.file-upload-content').hide();
		$('.image-upload-wrap').show();
		$('.request-message').show();
		$('.result-message').hide();
		$('.image-title-wrap').hide();
	}
	$('.image-upload-wrap').bind('dragover', function() {
		$('.image-upload-wrap').addClass('image-dropping');
	});
	$('.image-upload-wrap').bind('dragleave', function() {
		$('.image-upload-wrap').removeClass('image-dropping');
	});
	
	function selectType() {
		var result = $(":input:radio[name=sex_type]:checked").val();
		
		 $('#sex').val(result);
	}
	
