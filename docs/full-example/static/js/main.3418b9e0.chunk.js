(this["webpackJsonpbumblebee-full-example"]=this["webpackJsonpbumblebee-full-example"]||[]).push([[0],[,,,,,,,,,,,function(e,t,n){var o=n(13),s=n(14),a=n(24),i=n(26),r=n(15),l=n(27),c=n(6),u=n(29),d=n(30),h=n(31),w={bumblebee:n(32),grasshopper:n(33),hey_edison:n(34),porcupine:n(35),terminator:n(36)},p=function(e){"use strict";function t(){var e;return o(this,t),(e=a(this,i(t).call(this))).hotword=null,e.hotwords={},e.setMicVolume(1),e.setMuted(!1),e.setSensitivity(.5),e.setWorkersPath("/"),e.setVoiceProcessor(d),e._detectionCallback=e.detectionCallback.bind(r(e)),e._errorCallback=e.errorCallback.bind(r(e)),e._audioProcessCallback=e.audioProcessCallback.bind(r(e)),e._audioAnalyserCallback=e.audioAnalyserCallback.bind(r(e)),e}return l(t,e),s(t,[{key:"setVoiceProcessor",value:function(e){this.webVoiceProcessor=e}},{key:"addHotword",value:function(e,t,n){if(t||e in w&&(t=w[e]),!t)throw new Error("no hotword data");this.hotwords[e]={data:t,sensitivity:n||this.defaultSensitivity}}},{key:"setHotword",value:function(e){if(null===e||""===e)this.hotword=null;else{if(!(Object.keys(this.hotwords).indexOf(e)>-1))throw new Error("invalid hotword");this.hotword=e}}},{key:"setSensitivity",value:function(e){this.defaultSensitivity=e}},{key:"stop",value:function(){this.porcupineManager&&this.porcupineManager.stop(),this.started=!1}},{key:"setWorkersPath",value:function(e){this.webWorkersPath=e}},{key:"detectionCallback",value:function(e){e&&(console.log("bumblebee keyword",e),null===this.hotword||e===this.hotword?this.emit("hotword",e):console.log("wrong hotword:",e))}},{key:"errorCallback",value:function(e){this.emit("error",e)}},{key:"audioProcessCallback",value:function(e,t){this.emit("data",e,t)}},{key:"audioAnalyserCallback",value:function(e,t){this.gainNode=t,this.emit("analyser",e)}},{key:"start",value:function(){if(!this.started){this.started=!0,this.porcupineManager=u(this.webVoiceProcessor,this.webWorkersPath+"/porcupine_worker.js",this.webWorkersPath+"/downsampling_worker.js");var e={},t=[];for(var n in this.hotwords){var o=this.hotwords[n];e[n]=o.data,t.push(o.sensitivity)}this.porcupineManager.start(e,new Float32Array(t),this._gain,this._detectionCallback,this._errorCallback,this._audioProcessCallback,this._audioAnalyserCallback)}}},{key:"setMuted",value:function(e){this.muted=e,this.gainNode&&(e?(this._gain=this.gainNode.gain.value,this.gainNode.gain.value=0):this.gainNode.gain.value=this._gain||1)}},{key:"setMicVolume",value:function(e){this._gain=e,this.gainNode&&(this.gainNode.gain.value=e)}}]),t}(c);e.exports=p,e.exports.SpectrumAnalyser=h},,,,,,function(e,t,n){e.exports=n(38)},,,,,function(e,t,n){},,,,,,,function(e,t){e.exports=function(e,t,n){var o;return{start:function(s,a,i,r,l,c,u){(o=new Worker(t)).postMessage({command:"init",keywordIDs:s,sensitivities:a}),o.onmessage=function(e){r(e.data.keyword)},e.start([this],i,n,l,c,u)},processFrame:function(e){o.postMessage({command:"process",inputFrame:e})},stop:function(){e.stop(),o.postMessage({command:"release"})}}}},function(e,t){var n,o,s,a,i,r,l,c=!1;e.exports={start:function(e,t,u,d,h,w){n||navigator.mediaDevices.getUserMedia({audio:!0}).then((function(d){a=new(window.AudioContext||window.webkitAudioContext),i=a.createMediaStreamSource(d),r=d,l=a.createGain(),i.connect(l),l.gain.value=t||1,(o=a.createScriptProcessor(4096,1,1)).onaudioprocess=function(e){if(c){var t=e.inputBuffer.getChannelData(0);n.postMessage({command:"process",inputFrame:t})}},l.connect(o),o.connect(a.destination),n=new Worker(u);var p=i.context.sampleRate;n.postMessage({command:"init",inputSampleRate:p}),n.onmessage=function(t){e.forEach((function(e){e.processFrame(t.data)})),h&&h(t.data)},s=a.createAnalyser(),l.connect(s),w(s,l)})).catch(d),c=!0},stop:function(){c=!1,s&&s.disconnect(),o&&o.disconnect(),l&&l.disconnect(),r&&r.getTracks()[0].stop(),a&&a.close(),n&&n.postMessage({command:"reset"}),n=null}}},function(e,t,n){var o=n(13),s=n(14),a=function(){"use strict";function e(t,n){o(this,e),this.analyser=t,this.canvas=n,this.drawing=!1,t.fftSize=2048,this.bufferLength=t.frequencyBinCount,this.dataArray=new Uint8Array(this.bufferLength),this.ctx=n.getContext("2d"),this.setColors("#fff","#000"),this.ctx.lineWidth=1.5,this._draw=this.draw.bind(this)}return s(e,[{key:"setColors",value:function(e,t){this.setLineColor(e),this.setBackgroundColor(t)}},{key:"setLineColor",value:function(e){e&&(this.ctx.strokeStyle=e)}},{key:"setBackgroundColor",value:function(e){this.bgColor=e}},{key:"draw",value:function(){var e=this.canvas,t=this.bufferLength,n=this.ctx;this.analyser.getByteTimeDomainData(this.dataArray),this.bgColor?(n.fillStyle=this.bgColor,n.fillRect(0,0,e.width,e.height)):n.clearRect(0,0,e.width,e.height),this.muted&&(n.fillStyle=n.strokeStyle,n.font="14px Arial",n.fillText("MUTED",e.width/2-25,e.height/2-10)),n.beginPath();for(var o=1*e.width/t,s=0,a=0;a<t;a++){var i=this.dataArray[a]/128*e.height/2;0===a?n.moveTo(s,i):n.lineTo(s,i),s+=o}n.lineTo(e.width,e.height/2),n.stroke(),this.drawing&&requestAnimationFrame(this._draw)}},{key:"start",value:function(){this.drawing=!0,this.draw()}},{key:"stop",value:function(){this.drawing=!1}},{key:"setMuted",value:function(e){this.muted=e}}]),e}();e.exports=a},function(e,t){e.exports=new Uint8Array([140,20,139,111,75,233,106,137,144,225,192,133,238,96,238,92,238,77,124,58,215,21,175,49,127,74,52,213,106,111,236,227,15,116,168,49,25,247,70,183,184,63,166,55,113,59,20,242,220,165,61,139,6,132,219,145,71,186,73,108,204,114,81,20,173,53,233,81,39,112,154,74,124,38,52,44,103,80,171,64,246,219,196,149,250,86,199,18,85,196,46,148])},function(e,t){e.exports=new Uint8Array([63,248,199,1,109,188,92,184,74,145,14,22,249,165,250,179,207,178,252,133,86,172,230,209,98,241,143,227,200,83,60,167,45,13,95,90,213,80,112,255,65,225,156,169,157,118,148,239,165,208,231,177,62,45,149,9,59,64,139,235,98,25,229,88,181,113,42,199,112,77,58,240,149,86,90,227,52,64,191,20,105,148,239,171,232,140,108,207,85,184,139,140,149,90,224,129])},function(e,t){e.exports=new Uint8Array([105,69,143,223,200,90,236,178,53,186,112,1,230,239,211,95,128,49,177,144,54,213,58,205,94,36,172,243,234,84,68,102,34,225,183,184,20,252,163,212,29,115,74,102,176,170,244,132,226,77,131,75,93,209,186,12,32,161,150,39,59,106,156,83,18,73,194,32,243,78,173,141,73,3,23,188,39,83,237,173,41,255,104,235,182,11,147,70,210,18,207,32])},function(e,t){e.exports=new Uint8Array([141,79,23,119,186,166,54,242,32,198,156,106,85,144,162,180,200,158,73,76,215,80,192,250,113,157,118,40,73,11,45,237,135,229,8,120,190,205,55,228,64,21,161,93,247,158,240,49,61,220,151,240,45,226,237,13,142,208,244,50,134,90,193,131,66,124,41,29,103,3,26,24,130,104,28,95,242,0,100,108,4,122,180,141,153,142,89,116,25,200,144,72,49,136,201,9])},function(e,t){e.exports=new Uint8Array([182,182,228,225,214,60,163,39,189,99,130,22,200,205,11,116,209,231,163,158,236,230,42,62,120,46,115,253,67,24,5,23,51,7,82,8,122,47,50,68,25,74,153,130,181,254,180,241,115,233,201,172,82,170,53,141,208,81,50,236,244,12,227,166,185,237,78,31,137,77,23,70,32,233,186,71,88,73,159,180,27,58,246,244,124,36,48,89,246,46,206,38])},,function(e,t,n){"use strict";n.r(t);var o=n(0),s=n.n(o),a=n(16),i=n.n(a),r=(n(22),n(1)),l=n(2),c=n(4),u=n(3),d=n(5),h=n(10),w=n.n(h),p=n(11),f=new(n.n(p).a);f.setWorkersPath("./bumblebee-workers"),f.addHotword("bumblebee"),f.addHotword("grasshopper"),f.addHotword("hey_edison"),f.addHotword("porcupine"),f.addHotword("terminator"),f.setHotword("bumblebee"),w.a.setWorkers({espeak:"webworkers/espeak-en-worker.js"});var v=new w.a({language:"en",profile:"Jack"}),y=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={hotwords:Object.keys(f.hotwords),bumblebee_started:!1,spokenHotwords:[],selectedHotword:null,sensivitiyChanged:!1,sensitivity:.5,action:"sounds",muted:!1},e.sounds={bumblebee:new Audio("sounds/bumblebee-on.mp3"),hey_edison:new Audio("sounds/hey_edison.mp3"),grasshopper:new Audio("sounds/grasshopper.mp3"),porcupine:new Audio("sounds/porcupine.mp3"),terminator:new Audio("sounds/terminator.mp3")},f.on("hotword",(function(t){e.recognizeHotword(t)})),e}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.setHotword(this.state.selectedHotword),f.on("analyser",(function(t){console.log("analyser",t);var n=document.getElementById("oscilloscope");e.analyser=new p.SpectrumAnalyser(t,n),e.state.muted&&(f.setMuted(!0),e.analyser.setMuted(!0)),e.analyser.start()}))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App"},"Hotword: ",s.a.createElement("select",{value:this.state.selectedHotword||"",onChange:function(t){return e.changeHotword(t)}},this.renderHotwordOptions()),s.a.createElement("br",null),"Sensitivity: ",s.a.createElement("select",{value:this.state.sensitivity||"",onChange:function(t){return e.changeSensitivity(t)}},this.renderSensitivities()),s.a.createElement("br",null),"Action: ",s.a.createElement("select",{value:this.state.action||"",onChange:function(t){return e.changeAction(t)}},s.a.createElement("option",{value:"sounds"},"Sounds"),s.a.createElement("option",{value:"texttospeech"},"Speech To Text")),s.a.createElement("br",null),s.a.createElement("button",{onClick:function(t){return e.toggleHotword()}},this.state.bumblebee_started?"Stop":"Start"),s.a.createElement("button",{onClick:function(t){return e.toggleMuted()}},this.state.muted?"Unmute":"Mute"),s.a.createElement("br",null),s.a.createElement("canvas",{id:"oscilloscope",width:"800",height:"100"}),this.renderSay(),this.renderBumblebees())}},{key:"renderSay",value:function(){if(this.state.bumblebee_started)return this.state.selectedHotword?s.a.createElement("h3",null,'Say "',this.state.selectedHotword,'":'):s.a.createElement("h4",null,"Say any of the following: ",this.state.hotwords.join(", "),":")}},{key:"renderHotwordOptions",value:function(){var e=this.state.hotwords.map((function(e,t){return s.a.createElement("option",{key:t,value:e},e)}));return e.unshift(s.a.createElement("option",{key:"null",value:""},"* Any *")),e}},{key:"renderSensitivities",value:function(e){for(var t=[],n=0;n<=10;n++){var o=n/10,a=10*n;t.push(s.a.createElement("option",{key:n,value:o},a,"%"))}return t}},{key:"changeAction",value:function(e){var t=e.target.options[e.target.selectedIndex].value;this.setState({action:t})}},{key:"changeSensitivity",value:function(e){var t=e.target.options[e.target.selectedIndex].value;this.state.sensivitiyChanged?alert("Sensitivity can only be set before .start(), reload and try again"):(this.setState({sensitivity:t}),f.setSensitivity(t))}},{key:"changeHotword",value:function(e){var t=e.target.options[e.target.selectedIndex].value;f.setHotword(t),this.setState({selectedHotword:t,spokenHotwords:[]})}},{key:"toggleHotword",value:function(){var e=this.state.selectedHotword;this.state.bumblebee_started?(f.stop(),this.setState({bumblebee_started:!1,spokenHotwords:[]})):(console.log("starting",e),this.setState({bumblebee_started:!0,spokenHotwords:[],sensivitiyChanged:!0}),f.start())}},{key:"toggleMuted",value:function(){var e=this,t=!this.state.muted;this.setState({muted:t},(function(){f.setMuted(t),e.analyser&&e.analyser.setMuted(t)}))}},{key:"recognizeHotword",value:function(e){if(e!==this.state.selectedHotword&&this.state.selectedHotword)console.log("did not recognize",e);else{"sounds"===this.state.action?this.sounds[e].play():"texttospeech"===this.state.action&&v.say(e+"detected");var t=this.state.spokenHotwords;t.push(e),console.log("recognized hotword",e),this.setState({spokenHotwords:t})}}},{key:"renderBumblebees",value:function(){var e=this.state.spokenHotwords.map((function(e,t){return s.a.createElement("li",{key:t},e)}));return s.a.createElement("ul",null,e)}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[17,1,2]]]);
//# sourceMappingURL=main.3418b9e0.chunk.js.map