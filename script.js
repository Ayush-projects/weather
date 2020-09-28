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
      info();
      document.getElementById("btn").disabled = false;
    document.getElementById("btn").innerHTML = "Processed";
    
    })

}
//
// fetch("http://api.worldweatheronline.com/premium/v1/weather.ashx?key=4040d4398cdf4708882190352202709&q=48.85,2.35&num_of_days=2&tp=3&mca=yes&huformat=xml").then(data => {
//     var c = await data.json();
//     console.log(c);
    

// })
async function info(){
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
     document.getElementById("output").innerHTML = `<ul>
       <li> Average Minimum Temperature : ${temp1} °C</li>
       <li>Average Maximum Temparature : ${temp2} °C</li>
     </ul>`
     
    
    
   
    

}




