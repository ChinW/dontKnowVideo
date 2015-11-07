// function saveVideoModeChanges() {
//     // 获取表单中保存的值。
//     var theValue = $("#switch-background").prop('checked');
//     console.log("设置已经保存:"+theValue);
//     if (theValue === undefined ) {
//       $('.cookie.nag').nag('show').html("保存出错，请重新打开应用再试");
//       return;
//     }
//     chrome.storage.local.set({'videoMode': theValue}, function() {
//       // 通知保存完成。
//       // $("#status").html("设置已经保存:"+theValue);
//     });
// }

// function saveRepeatModeChanges() {
//     // 获取表单中保存的值。
//     var theValue = $("#repeat-background").prop('checked');
//     console.log("设置已经保存:"+theValue);
//     if (theValue === undefined ) {
//       $('.cookie.nag').nag('show').html("保存出错，请重新打开应用再试");
//       return;
//     }
//     chrome.storage.local.set({'repeatMode': theValue}, function() {
//       // 通知保存完成。
//       $("#status").html("设置已经保存:"+theValue);
//     });
// }

// function cleanHistory(){
//     chrome.storage.local.set({'steps': ""}, function() {
//       // 通知保存完成。
//       $('.cookie.nag').nag('show').html("删除足迹成功");
//       setTimeout(function(){
//         $('.cookie.nag').nag('hide');
//       },1000);
//       $("#count").html(0);
//     });
// }
// function historyCount(){
//   chrome.storage.local.get('steps', function (result) {
//       var history = result.steps;
//       history = eval("(" + history + ")");
//       console.log(history);
//       $("#count").html(Object.keys(history).length);
//   });
// }

// function upload_doc(target){
//     $.ajaxFileUpload({
//       url:$(target).data("action"),
//       secureuri:false,
//       fileElementId:"doc_upload",
//       dataType: 'json',
//       data:{},
//       success:function(data,status){
//         if(data.status==true){
//           $(target).attr("disabled",false);
//           trigger.html("已选:"+data.info.doc_upload.name);
//           $("#doc_savename").val(data.info.doc_upload.savename);
//         }else{
//           trigger.html(originalText);
//           alert(data.info);
//         }
//       },
//       error:function(data,status,e){
//         console.log(data);
//       }
//     });
//     $(target).attr("disabled",true);
//   }
$("#attachmentName").bind("change",function(){
  console.log($(this).val());
  $.ajaxFileUpload({
    url:"http://localhost/signup/home/Upload/mp4",
    secureuri:false,
    fileElementId:"attachmentName",
    dataType: 'json',
    data:{},
    success:function(data,status){
      console.log("success");
    },
    error:function(data,status,e){
      console.log(data);
    }
  });
});
// $("#submitMP4").click(function(){
//   $.ajaxFileUpload({
//     url:"http://localhost/signup/home/Upload/mp4",
//     secureuri:false,
//     fileElementId:"attachmentName",
//     dataType: 'json',
//     data:{},
//     success:function(data,status){
//       console.log("success");
//     },
//     error:function(data,status,e){
//       console.log(data);
//     }
//   });
// });
// $(function(){
	
// 	$('.ui.checkbox').checkbox();
	
// 	$("#switch-background").bind("change",function(){
// 		$("#status").html(1);
// 		saveVideoModeChanges();
// 	});

// 	$("#repeat-background").bind("change",function(){
// 		saveRepeatModeChanges();
// 	});

//   $("#cleanHistory").bind("click",function(){
//     cleanHistory();
//   });
// 	var videoMode = "";
// 	var repeatMode = "";
//   historyCount();
// 	chrome.storage.local.get('videoMode', function (result) {
//         videoMode = result.videoMode;
//         if(videoMode){
//          	$("#status").html("videoMode2:"+videoMode);
//         	$("#videoMode-checkbox").checkbox('check');
//         }
//     });

//     chrome.storage.local.get('repeatMode', function (result) {
//         repeatMode = result.repeatMode;
//         if(repeatMode){
//          	$("#status").html("repeatMode:"+repeatMode);
//         	$("#repeatMode-checkbox").checkbox('check');
//         }
//     });
// })