var allowWords = {"干物妹小埋":"yonimo.mp4","legalhigh":"legalhigh.mp4","傲慢与偏见":"pnp.mp4","silicon":"silicon.mp4","equus":"equus.mp4","午夜凶铃":"wyxl.mp4","奇幻森林":"jungle.mp4","敲门":"yonimo_r.mp4","github":"github.mp4"};

var mode = 1;//1:background 显示 2:覆盖显示

function getVideoMode(){
	var r = false;
	console.log(2222);
	chrome.storage.local.get('videoMode', function (result) {
		console.log(333);
        r = result.videoMode;
        console.log("getVideoMode"+r);
        if(r){
        	console.log("changeMode");
        	mode = 2;
        }else{
        	mode = 1;
        }
    });
}

var last = "";
var eventTester = function(e){
 document.getElementById("dkVideo").addEventListener(e,function(){
 	$("#suspend").remove()
 },false);
}
console.log(mode);
console.log(allowWords);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	chrome.storage.local.get('list', function (result) { //获取列表
		var list = result.list;
		if(list !== undefined){
			allowWords = eval("("+list+")");
		}
		if (last != request.keyword) {
			last = request.keyword;
			console.log(last);
			console.log(allowWords[request.keyword]);
			if(allowWords[request.keyword] !== undefined){//如果关键字存在
				chrome.storage.local.get('repeatMode', function (result) { //获取重复模式
					var repeatMode = result.repeatMode;
					if(repeatMode){//选择了重复模式
						chrome.storage.local.get("steps",function(result){
							var steps = result.steps;
							if(steps === undefined || steps == ""){
								steps = {}
							}else{
								steps = eval("(" + steps + ")"); //tranform to json
							}
							if(steps[last] === undefined){
								steps[last] = 1;
							}else{
								steps[last]++;
							}
							saveSteps(steps);
						});
						videoMode();
					}else{//不重复，搜索历史
						chrome.storage.local.get("steps",function(result){
							var steps = result.steps;
							if(!steps || steps === undefined){
								steps = "";
								console.log("nnnn");
								videoMode();
								//添加到steps
								var arr = {};
								arr[last] = 1;
								saveSteps(arr);
							}else{
								steps = eval("(" + steps + ")"); //tranform to json
								console.log(steps);
								console.log(last);
								if(steps[last] === undefined){// 如果关键词不存在
									console.log("yyyy");
									videoMode();
									//添加到steps
									steps[last] = 1;
									console.log(steps);
									saveSteps(steps);
								}else{//存在关键词
									
								}
							}

						});
					}
				});
			}
		}
	});
});
//
function saveSteps(arr) {
	console.log("in saveSteps:");
	console.log(arr);
	var str = JSON.stringify(arr);
    chrome.storage.local.set({'steps': str}, function() {
      // 通知保存完成。
      console.log("设置已经保存:"+str)
    });
}
//
function videoMode(){
	chrome.storage.local.get('videoMode', function (result) { //获取视频模式
        r = result.videoMode;
        console.log("getVideoMode"+r);
        if(r){
        	console.log("changeMode");
        	mode = 2;
        }else{
        	mode = 1;
        }
        $("#BMV_BG").remove();
        $("#suspend").remove();
        if(mode == 1){ // background 显示
			$("body").prepend(
				$("<div></div>").attr("id","BMV_BG").append(
					$("<video autoplay='autoplay'></vide>").append(
						$("<source type='video/mp4' />").attr("src",chrome.extension.getURL("resource/"+allowWords[last]))
					)
				)
			);
		}else{//模式二，覆盖显示
			$("#container").append(
				$("<div></div>").addClass("suspend").attr("id","suspend").append(
					$("<video autoplay='autoplay'></vide>").append(
						$("<source type='video/mp4' />").attr("src",chrome.extension.getURL("resource/"+allowWords[last]))
					).attr("id","dkVideo")
				)
			);
			eventTester("ended");
		}
    });
}