function saveChanges(target,saveName) {
    // 获取表单中保存的值。
    var theValue = $(target).prop('checked');
    // 确保包含代码。
    if (theValue === undefined ) {
      $('.cookie.nag').nag('show').html("保存出错，请重新打开应用再试");
      return;
    }
    // 使用 Chrome 扩展程序的存储 API 保存它。
    chrome.storage.local.set({saveName: theValue}, function() {
      // 通知保存完成。
      $("#status").html("设置已经保存:"+saveName+":"+theValue);
    });
}
$(function(){
	
	$('.ui.checkbox').checkbox();
	
	$("#switch-background").bind("change",function(){
		saveChanges("#switch-background","videoMode");
	});

	// $("#repeat-background").bind("change",function(){
	// 	saveChanges("#repeat-background","repeatMode");
	// });
	
	var videoMode = "";
	var repeatMode = "";
	chrome.storage.local.get('videoMode', function (result) {
        videoMode = result.videoMode;
        $("#status").html("videoMode2:"+result);
        // if(videoMode){
        //  	$("#status").html("videoMode2:"+videoMode);
        // 	// $("#videoMode-checkbox").checkbox('check');
        // }
    });
    // chrome.storage.local.get('repeatMode', function (result) {

    //     repeatMode = result.repeatMode;
    //     $("#status").html("repeatMode2:"+repeatMode);
    //     if(repeatMode){
    //      	// $("#status").html("videoMode2:"+videoMode);
    //     	$("#repeat-checkbox").checkbox('check');
    //     }
    // });
})