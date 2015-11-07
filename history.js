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
	chrome.storage.local.get('steps', function (result) {
      var history = result.steps;
      history = eval("(" + history + ")");
      console.log(history);
      $("#count").html(Object.keys(history).length);
      for (var x in history){
        console.log("<tr><td>"+x+"</td><td>"+history[x]+"</td></tr>")
        $("#cus-table-body").append("<tr><td>"+x+"</td><td>"+history[x]+"</td></tr>")
      }
  });
})