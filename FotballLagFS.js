		   <script>
      			   
			          var xmlhttp;
					  var nykobling;
					  var lag = ["FFK","ØIL","SIL"];
					  var navnSpiller = document.getElementById("navnListe");
					  var klubbListe = document.getElementById("fklubbListe");
					  var distrikt = document.getElementById("fDistrikt");
					  var pos = document.getElementById("fPosisjon"); 
					  var aar = document.getElementById("aarsKull") 
					  
					  window.onload = start;
					 
				    function start() {
					     //Fyller select ID fklubbListe med verdier fra array LAG
					       for(var j = 0; j < lag.length; j++){
						        var lagListe = lag[j]; 
							      var li = document.createElement("option");
								  li.textContent = lagListe;
								  //li.innerHTML = lagListe;
								  fklubbListe.appendChild(li);
							   }
					
						//Setter opp en kobling, henter kontaktinfo fra en json fil  
					      nykobling = new XMLHttpRequest();
						  nykobling.onreadystatechange = hentNavn;
						  nykobling.open("GET","kontaktinfo.json?id="+Math.random(),true); 
						  nykobling.send();
						  
				   }
                    function hentNavn(){
                     //Sjekker først om kobling er suksess NB.VIKTIG for at det skal fungere. 
                      if(nykobling.readyState === 4 && nykobling.status === 200){
						     navnSpiller = JSON.parse(nykobling.responseText); 
								for(var i = 0; i < navnSpiller.length; i++){
							       var el = document.createElement("option");
								   el.value = navnSpiller[i].id;
								   el.innerHTML = navnSpiller[i].navn;
								   document.getElementById("navnListe").appendChild(el);
						      }
				  }
                           if(navnSpiller.length > 1){							  
							  document.getElementById("regBt").onclick = regSpiller;
							  
							  }	
                  }
					function regSpiller(){
					    //Unikt problem, fikk undefined om jeg lot regnavn = ID som de andre under.
					     var navnTxt = document.getElementById("navnListe");
						 var regNavn = navnTxt.options[navnTxt.selectedIndex].text;
						
						 //Deklarer disse lokalt, viktig for å ikke få "Object:Object i utskrift fila
					   var regListe = klubbListe.value;
						 var regDistrikt = distrikt.value;
						 var regpos = pos.value; 
						 var regaar = aar.value; 
					     
						//registrer Informasjonen nå, sjekker alder
						if(regaar < 2000){
						 xmlhttp = new XMLHttpRequest(); 
						 xmlhttp.onreadystatechange = regFeed;
						 xmlhttp.open("GET","registrer.php?regNavn="+regNavn+'&regListe='+
						 regListe+'&regDistrikt='+regDistrikt+
						 '&regpos='+regpos+'&regaar='+regaar, true);
						 xmlhttp.send();  
						 } 
						  else {
						      alert("du er for ung, ta kontakt med barneleder Per Nansen");
						 }
				}
					
				     //Sjekk om alt er i orden. 
					function regFeed(){
					 
					        if(xmlhttp.readyState===4 && xmlhttp.status===200){
							   var uSkrift = document.getElementById("utskrift");
							  
					           uSkrift.innerHTML = "Registrering OK"; 
							 
					    }
					  
					}
