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
      // $("#status").html("设置已经保存:"+theValue);
    });
}

function cleanHistory(){
    chrome.storage.local.set({'steps': ""}, function() {
      // 通知保存完成。
      $('.cookie.nag').nag('show').html("删除足迹成功");
        setTimeout(function(){
          $('.cookie.nag').nag('hide');
        },1000);
      $("#count").html(0);
    });
}
function historyCount(){
  chrome.storage.local.get('steps', function (result) {
      var history = result.steps;
      // console.log(history); 
      if(history === undefined || history == ""){
        history={}
      }else{
        history = eval("(" + history + ")");
      }
      // console.log(history);
      $("#count").html(Object.keys(history).length);
  });
}

$("#filemp4").bind("change",function(){
  $("#file-dimmer").addClass("active");
  var filename = $(this)[0].files[0].name;
    $.ajaxFileUpload({
      url:$(this).data("action"),
      secureuri:false,
      fileElementId:"filemp4",
      dataType: 'json',
      data:{},
      success:function(data,status,jqXHR){
          $("#file-name").html(filename);
          $("#file-dimmer").removeClass("active");
      },
      error:function(data,status,e){
        console.log(data);
      }
    });
});
function note(str,time){
   $('.cookie.nag').nag('show').html(str);
   setTimeout(function(){
      $('.cookie.nag').nag('hide');
    },time);
}
function setList(list){
    var str = JSON.stringify(list);
   chrome.storage.local.set({'list': str}, function() {
    // 通知保存完成。
    note("影片已经上传，刷新后生效");
  });
}
$("#submitMP4").click(function(){
  var keywords = $("#videoName").val();
  var filename = $("#file-name").html();
  if(keywords==""){
    note("请输入文件名称",1000);
    return;
  }else if (filename=="选择文件"){
    note("请先上传文件",1000);
    return;
  }else{

    chrome.storage.local.get('list', function (result) {
        var list = result.list;
        if(list === undefined){
          list = {"干物妹小埋":"yonimo.mp4","legalhigh":"legalhigh.mp4","傲慢与偏见":"pnp.mp4","silicon":"silicon.mp4","equus":"equus.mp4","午夜凶铃":"wyxl.mp4","奇幻森林":"jungle.mp4","敲门":"yonimo_r.mp4","github":"github.mp4"};
        }else{
           list = eval("("+list+")");
        }
        if(list[keywords] !== undefined){
          note("该关键词对应短片已经存在",1000);
        }else{
          list[keywords] = filename;
          setList(list);
        }
    });
  }
});
$(function(){
	
	$('.ui.checkbox').checkbox();
	
	$("#switch-background").bind("change",function(){
		// $("#status").html(1);
		saveVideoModeChanges();
	});

	$("#repeat-background").bind("change",function(){
		saveRepeatModeChanges();
	});

  $("#cleanHistory").bind("click",function(){
    cleanHistory();
  });
	var videoMode = "";
	var repeatMode = "";
  historyCount();
	chrome.storage.local.get('videoMode', function (result) {
        videoMode = result.videoMode;
        if(videoMode){
         	// $("#status").html("videoMode2:"+videoMode);
        	$("#videoMode-checkbox").checkbox('check');
        }
    });

    chrome.storage.local.get('repeatMode', function (result) {
        repeatMode = result.repeatMode;
        if(repeatMode){
         	// $("#status").html("repeatMode:"+repeatMode);
        	$("#repeatMode-checkbox").checkbox('check');
        }
    });
})
