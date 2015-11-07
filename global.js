function saveVideoModeChanges() {
    // 获取表单中保存的值。
    var theValue = $("#switch-background").prop('checked');
    console.log("设置已经保存:"+theValue);
    if (theValue === undefined ) {
      $('.cookie.nag').nag('show').html("保存出错，请重新打开应用再试");
      return;
    }
    chrome.storage.local.set({'videoMode': theValue}, function() {
      // 通知保存完成。
      // $("#status").html("设置已经保存:"+theValue);
    });
}
function saveRepeatModeChanges() {
    // 获取表单中保存的值。
    var theValue = $("#repeat-background").prop('checked');
    console.log("设置已经保存:"+theValue);
    if (theValue === undefined ) {
      $('.cookie.nag').nag('show').html("保存出错，请重新打开应用再试");
      return;
    }
    chrome.storage.local.set({'repeatMode': theValue}, function() {
      // 通知保存完成。
      $("#status").html("设置已经保存:"+theValue);
    });
}
$(function(){
	
	$('.ui.checkbox').checkbox();
	
	$("#switch-background").bind("change",function(){
		$("#status").html(1);
		saveVideoModeChanges();
	});

	$("#repeat-background").bind("change",function(){
		saveRepeatModeChanges();
	});

	var videoMode = "";
	var repeatMode = "";

	chrome.storage.local.get('videoMode', function (result) {
        videoMode = result.videoMode;
        if(videoMode){
         	$("#status").html("videoMode2:"+videoMode);
        	$("#videoMode-checkbox").checkbox('check');
        }
    });

    chrome.storage.local.get('repeatMode', function (result) {
        repeatMode = result.repeatMode;
        if(repeatMode){
         	$("#status").html("repeatMode:"+repeatMode);
        	$("#repeatMode-checkbox").checkbox('check');
        }
    });
})