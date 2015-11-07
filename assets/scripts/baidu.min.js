// var filepath = "resource/legalhigh/legal_high_ep01 ",
//     fileExtension = ".jpg",
//     filesCount = 275,
//     startIndex = 1,
//     currentIndex = startIndex,
//     speed = 33,
//     imgTarget = "#gif";
// var format = function(number, form) {
//     var forms = form.split('.'),
//         number = '' + number,
//         numbers = number.split('.'),
//         leftnumber = numbers[0].split(''),
//         exec = function(lastMatch) {
//             if (lastMatch == '0' || lastMatch == '#') {
//                 if (leftnumber.length) {
//                     return leftnumber.pop();
//                 } else if (lastMatch == '0') {
//                     return lastMatch;
//                 } else {
//                     return '';
//                 }
//             } else {
//                 return lastMatch;
//             }
//         },
//         string

//     string = forms[0].split('').reverse().join('').replace(/./g, exec).split('').reverse().join('');
//     string = leftnumber.join('') + string;

//     if (forms[1] && forms[1].length) {
//         leftnumber = (numbers[1] && numbers[1].length) ? numbers[1].split('').reverse() : [];
//         string += '.' + forms[1].replace(/./g, exec);
//     }
//     return string.replace("//.$/", '');
// };

// function runVideo(currentIndex, total, path, extension) {
//     var name = path + format(currentIndex, "000") + extension;
//     // console.log(name);
//     // console.log(chrome.extension.getURL(name));
//     $(imgTarget).attr("src", chrome.extension.getURL(name));
//     if (currentIndex < total) {
//         currentIndex++;
//         setTimeout("runVideo(" + currentIndex + "," + total + ",'" + path + "','" + extension + "')", speed);
//     }else{
//     	$("#suspend").remove();
//     }
// }

// $(function(){
// 	// alert(1);
// 	$("#container").append(
// 		$("<div></div>").addClass("suspend").attr("id","suspend").append(
// 			$("<img>").attr("id","gif")
// 		)
// 	);
// 	// console.log("hi("+currentIndex+","+filesCount+",'"+filepath+"','"+fileExtension+"')");
// 	setTimeout("runVideo("+currentIndex+","+filesCount+",'"+filepath+"','"+fileExtension+"')",speed);
// });
var last = "";
var eventTester = function(e){
 document.getElementById("dkVideo").addEventListener(e,function(){
 	$("#suspend").remove()
 },false);
}
var allowWords = {"干物妹小埋":"yonimo.mp4","legalhigh":"legalhigh.mp4","傲慢与偏见":"pnp.mp4","silicon":"silicon.mp4"};
var mode =2;//2
console.log(allowWords);
console.log(allowWords["legalhigh"])
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (last != request.keyword) {
		last = request.keyword;
		console.log(last);
		console.log(allowWords[request.keyword]);
		if(allowWords[request.keyword] !== undefined){
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
		}
	}
});