var latitude, longitude;
function locate()
{
	document.getElementById("btn").disabled = true;
    document.getElementById("btn").innerHTML = "Processing...";
    if("geolocation" in navigator)
    navigator.geolocation.getCurrentPosition(function(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      document.getElementById("lat").innerHTML = "Current Latitude : " + latitude;
      document.getElementById("long").innerHTML = "Current Longitude : " + longitude;
      temp();
      document.getElementById("btn").disabled = false;
    document.getElementById("btn").innerHTML = "Processed";
    clay();
    
    })

}

    

// })
async function temp(){
    let data = await fetch(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=4040d4398cdf4708882190352202709&q=${latitude},${longitude}&num_of_days=2&tp=3&mca=yes&format=json`);
    let b = await data.json();
    console.log(b);
    
    
    var i =0;
    var temp1 = 0.1, temp2 = 0.1;
    for(i =0; i<12; i++)
    {
      temp1 += parseFloat(b.data.ClimateAverages[0].month[i].avgMinTemp);
      temp2 += parseFloat(b.data.ClimateAverages[0].month[i].absMaxTemp);
        

    }
     temp1 = temp1 - 0.1;
     temp1 = temp1/12;
     temp2 = temp2 - 0.1;
     temp2 = temp2/12;
     temp1 = Math.round(temp1*100)/100;
     temp2 = Math.round(temp2*100)/100;
     document.getElementById("1").innerHTML = temp1;
     document.getElementById("2").innerHTML = temp2;
       
     
    
    
   
    

}
function clay() {




const lat = latitude;
const lng = longitude;
const params = 'iron,nitrate,chlorophyll,oxygen,phosphate,silicate,soilMoisture,soilTemperature,surfaceTemperature';

fetch(`https://api.stormglass.io/v2/bio/point?lat=${lat}&lng=${lng}&params=${params}`, {
  headers: {
    'Authorization': '624fe824-01bc-11eb-a78a-0242ac130002-624fe928-01bc-11eb-a78a-0242ac130002'
  }
}).then((response) => response.json()).then((jsonData) => {
  console.log(jsonData);
  let a = jsonData.hours[0].surfaceTemperature.noaa;
  let b = jsonData.hours[0].soilMoisture.noaa;
  let c = jsonData.hours[0].soilTemperature.noaa;
  console.log(a);
  
  console.log(b);
  console.log(c);
  document.getElementById("3").innerHTML=  a + " °C";
  document.getElementById("4").innerHTML=  b + " MU";
  document.getElementById("5").innerHTML=  c +  "  °C";

 
  
});
}


