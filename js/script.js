
num_devices=0;	
theMarker = {};
atualizaCook();
function atualizaCook(){
    var cookil=getCookie("mapat");
    if(cookil == "on"){
    document.getElementById("loader").style.display = 'none';
    document.getElementById("telaLogin").style.display = 'none';
    document.getElementById("telaMapa").style.display = 'block';
    CarregarJSON();
    }else if(cookil == "loader"){
    document.getElementById("loader").style.display = 'block';   
    document.getElementById("telaLogin").style.display = 'none';
    document.getElementById("telaMapa").style.display = 'none';  
    }else{
    document.getElementById("loader").style.display = 'none';   
    document.getElementById("telaLogin").style.display = 'block';
    document.getElementById("telaMapa").style.display = 'none';
    }
}


function block(x,z){
  
		if(confirm("Tem certeza que deseja Desbloquear o veiculo "+devices[z]["name"]+" ?")){
			if(positions[z]["protocol"] == "mxt"){
				if(x){
					var json = JSON.stringify({
										id:33,
										attributes:{data:"01a733637215002010211021d30004"},
										deviceId:devices[z]["id"],
										type:"custom",
										description:"BLOQUEAR#"
									 })
								}else{
									var json = JSON.stringify({
										id:34,
										attributes:{data:"01a733637216002010210020fe04"},
										deviceId:devices[z]["id"],
										type:"custom",
										description:"DESBLOQUEAR#"
									 })
								}
							}else if(positions[z]["protocol"] == "gt06" || positions[z]["protocol"] == "suntech"){
								if(x){
									var json = JSON.stringify({
										id:5,
										attributes:{},
										deviceId:devices[z]["id"],
										type:"engineStop",
										description:"BLOQUEAR"
									 })
								}else{
									var json = JSON.stringify({
										id:6,
										attributes:{},
										deviceId:devices[z]["id"],
										type:"engineResume",
										description:"DESBLOQUEAR"
									 })
								}
							}else{
							
							
							var json = null;
							
	
							}
							
							$.ajax({
									url: "https://rastrear.sategur.com.br/api/commands/send",
									dataType: "json",
									contentType: "application/json",
									type: "POST",
									data: json,
									beforeSend: function (xhr) {
										xhr.setRequestHeader ("Authorization", "Basic " + btoa(userCookieOn + ":" + passCookieOn));
									},
									error: function(res){
									    if(res.status == 400)alert("OPS ALGO DEU ERRADO /n COMANDO NÃO ENVIADO");
									},
									success: function(res){
									    alert("COMANDO ENVIADO");
									}
							});
							
							
					
						}
}

    var devices = [];
    var positions = [];
    var vetorName=[200];                 
    var objectLength;
    var inc = 0;
    var latajax;
    var longajax;
    var nameVeicle;
    var latOni = -5.800275,longOni = -35.238264;

    var map = L.map('location-map').setView([latOni, longOni], 11);
    gomap1();
        function gomap1(){

              L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{ maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'] }).addTo(map);
        }
    
var myIconGreen = L.icon({
    iconUrl: 'imgs/green.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -45],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});

var myIconYellow = L.icon({
    iconUrl: 'imgs/yellow.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -45],
   // shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});
var myIconRed = L.icon({
    iconUrl: 'imgs/red.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -45],
   // shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});
var userCookieOn;
var passCookieOn;

function CarregarJSON() {
	    var bufferIg = new Array();
		var i,j;
		userCookieOn = getCookie("usert");
		passCookieOn = getCookie("passt");

		$.ajax({
			type: "get",
			url: 'https://rastrear.sategur.com.br/api/positions/', // link de exemplo
			headers: {
			"Authorization": "Basic " + btoa(userCookieOn + ":" + passCookieOn)
        },
        error: function(response) {
		//if( response.status = 400)alert("ero na Api"+response.status);
		//if( response.status = 401)alert("ero na Api"+response.status);
		//window.location.reload();
        },
		success: function(data) {
		            positions=data;
		    		$.ajax({
        			type: "get",
        			url: 'https://rastrear.sategur.com.br/api/devices/', // link de exemplo
        			headers: {
        			"Authorization": "Basic " + btoa(userCookieOn + ":" + passCookieOn)
                        },
                        error: function(response2) {
                		//if(response.status = 401)document.getElementById('div1').innerHTML ="Ops usuario nao autorizado";
                		//window.location.reload();
                        },
                		success: function(data2) {
                		devices=data2;
                		var n;
				num_devices = Object.keys(devices).length;
                    		for(var i=0;i < Object.keys(devices).length;i++){
                    		    for(n = 0;n < Object.keys(positions).length;n++){
                    		        if(devices[i]["positionId"] == positions[n]["id"]){ //se existie posiçao valida para o device
                    		            
                    		            
                                        
                                		var toltipPoint = L.point(0, -23);
                                        if(devices[i]["positionId"] != 0){
                                        
                                            latajax = positions[n]["latitude"];
                                            longajax = positions[n]["longitude"];
                                            
                                            nameVeicle = devices[i]["name"];
                                            var intvel = parseInt(positions[n]["speed"]);
                                            
                                                if (theMarker[i] == undefined) {
                                                    theMarker[i] = L.marker([latajax,longajax])
                                                        .bindTooltip(nameVeicle, 
                                                                {
                                                                    className: 'myCSSClass',
                                                                    permanent: true, 
                                                                    offset:toltipPoint,
                                                                    direction: "right"
                                                                })
                                                    
                                                    .addTo(map);
                                                }
                                            
                                            var ign = undefined;
                                            var ig = positions[n]["attributes"]["ignition"];
                
                                            if(ig != undefined){
                                                if(ig){ign = 'Ligada';}else{ign = 'Desligada';}
                                                var ignPrint = '<br>Ignição: '+ign;
                                            }else
                                                {var ignPrint='';}
                                                
                                            var str = positions[n]["deviceTime"];
                                            var d = str.substr(8, 2);
                                            var M = str.substr(5, 2);
                                            var a = str.substr(0, 4);
                                            var h = str.substr(13, 6);
                                            var stringHora = str.substr(11,2);
                                            var stringInt = parseInt(stringHora);
                                            if(stringInt >= 3){stringInt = stringInt - 3;}else{
                                                if(stringInt==0)stringInt=21;
                                                if(stringInt==1)stringInt=22;
                                                if(stringInt==2)stringInt=23;
                                            }
                                            
											
                                            var block = undefined;
                                            var block = positions[n]["attributes"]["blocked"];
											
											
											if(block!= undefined){
                                                if(block){
												theMarker[i].setIcon(myIconRed);
												}else{
													if(ig){
													theMarker[i].setIcon(myIconYellow);
													}
													else{
													theMarker[i].setIcon(myIconGreen);
													}
												}
											}else{
												if(ig){
												theMarker[i].setIcon(myIconYellow);
												}
												else{
												theMarker[i].setIcon(myIconGreen);
												}
											
											
											}
                                            
                                            var linhaBateria="";
                                            if(devices[i]["attributes"]["battery"]!=undefined){linhaBateria='<br><b>Bateria: </b>'+devices[i]["attributes"]["battery"].toFixed(2)+' Volts';}else{linhaBateria="";}
                                             
                                            theMarker[i].setLatLng([latajax, longajax], {pane:"aa",alt:"ss"}).update().bindPopup(
                                                
												'<b>Data & Hora:</b> '+d+'-'+M+'-'+a+' '+stringInt+h+
                                                '<br><b>Velocidade:</b> '+intvel*2+' Km/h.'+linhaBateria+
                                                ' <br> <input type="button" onclick="block(1,'+i+')" class="buttSair  fas fa-lock redButt"/> <input type="button" onclick="block(0,'+i+')" class="buttSair  fas fa-unlock-alt float greenButt"/>'
                                                );
                                             
                                        }// caso dispositivo tenha posiçao valida
                    		        }// caso tenha  posiçao valida para cada dispositivo
                    		    }
                    		}
                		}
                	});
			}// end susses
			
			
		
		});
	
	setTimeout(CarregarJSON, 2000);	
	}

function editRoutes(){
		document.cookie="mapat=off";
		document.cookie="usert=nulo";
		document.cookie="passt=nulo";
		window.location.reload();
	}
	
	


///////////////////////////////////////////////////////////////////////////////////////////////////////@@@@@@@@@@@@@@@@@@/////////////////////////////////////////////////////////////////
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////@@@@@@@@@@@@@@@@@@/////////////////////////////////////////////////////////////////

function deleteCookie(name) {
       if (getCookie(name)) {
              document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
       }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////@@@@@@@@@@@@@@@@@@/////////////////////////////////////////////////////////////////

function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);
 
    if (begin == -1) {
 
        begin = cookies.indexOf(prefix);
         
        if (begin != 0) {
            return null;
        }
 
    } else {
        begin += 2;
    }
 
    var end = cookies.indexOf(";", begin);
     
    if (end == -1) {
        end = cookies.length;                        
    }
 
    return unescape(cookies.substring(begin + prefix.length, end));
}
///////////////////////////////////////////////////////////////////////////////////////////////////////@@@@@@@@@@@@@@@@@@/////////////////////////////////////////////////////////////////



$(document).ready(function(){
    var auxCookir=getCookie("mapat");
    if(auxCookir != "on")document.cookie="mapat=off";

	var form = document.getElementById('formulario');
	var user = document.getElementById('user');
	var pass = document.getElementById('pass');
	var logim = document.getElementById('logim');
	var sair = document.getElementById('sair');
	

	$("#linkTeste").click(function(e){
	    document.cookie="mapat=loader";
	    atualizaCook();
        e.preventDefault();
        
		$.ajax({
		method: "post",			
		url:'https://rastrear.sategur.com.br/api/session/', // link de exemplo			 
		data: { email:user.value, password:pass.value },
		error: function(response) {
		if(response.status = 401)document.getElementById('div1').innerHTML ="Ops usuario nao autorizado";
		document.cookie="mapat=off";
		atualizaCook();
		},
		success: function(response) {
			setCookie("mapat", "on",180000);
			setCookie("usert",user.value,180000);
			setCookie("passt",pass.value,180000);
			atualizaCook();
			//alert("");
		}
		}) .done(function( datas ) {

		window.location.reload();
		});
	});

});
