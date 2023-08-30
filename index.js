const options = {
  headers: {
    "X-RapidAPI-Key": "d630950690msh2bd4a536c2945dap1f5ee8jsnd20f26df0e0f",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

async function fetchWeather(){
	let Input=document.getElementById("input").value;
	let temperature=document.querySelector(".temperature");
	let wind_details=document.querySelector("#wind-details");
	let humidity_details=document.querySelector('#humidity-details');
	let weather_description=document.querySelector(".description");
	let weather_images=document.querySelector(".images");
	let City=document.querySelector(".city");
	let sunrise_details=document.getElementById("sunrise-details");
	let sunset_details=document.getElementById("sunset-details");
	let response="";
	let data="";

		if(Input==""){

		response =await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=karachi`,options)
		data=await response.json();
		City.innerHTML="Karachi"
		
	}else{
		
		response =await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${Input}`,options)
		data=await response.json();
		City.innerHTML=`${Input}`;
		document.getElementById("input").value="";
	}

	const sunrise = new Date(data.sunrise * 1000);
    const hours = sunrise.getHours();
    const minutes = sunrise.getMinutes();
    const seconds = sunrise.getSeconds();
	const formattedTime = `${String((hours%12)).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	sunrise_details.innerHTML=`${formattedTime} <b>AM</b>`;
	
	const sunset = new Date(data.sunset * 1000);
    const hour = sunset.getHours();
    const minute = sunset.getMinutes();
    const second = sunset.getSeconds();
	const formatteTime = `${String(hour%12).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
	sunset_details.innerHTML=`${formatteTime} <b>PM</b>`;
	
	temperature.innerHTML=`${data.temp} <sup>°C</sup>`;
	wind_details.innerHTML=`${data.wind_speed}<span >km/h</span>`;
	humidity_details.innerHTML=`${data.humidity}<span >%</span>`;
	if(data.temp>25){
		weather_description.innerHTML="Sunny"
		weather_images.src="/images/sunny.png";
		
	}
	else if(data.temp<25 && data.temp>=20){
		console.log("clouds");
		weather_description.innerHTML="Clouds"
		weather_images.src="/images/clouds.png";
		
	}
	else if(data.temp<20 && data.temp>15){
		console.log("rainny");
		weather_description.innerHTML="Rainny"
		weather_images.src="/images/rainny.png";
		
	}
	else if(data.temp<15 && data.temp>0){
		console.log("Windy");
		weather_images.src="/images/windy.png";
		weather_description.innerHTML="Windy"
		
	}
	else if(data.temp<0){
		console.log("Cold");
		weather_images.src="/images/Cold.png";
		weather_description.innerHTML="Cold"
		
	}
	else if(data.error){
		
	weather_description.innerHTML="-----"
	weather_images.src="/images/error.png";
	weather_images.style.height="210px"
	temperature.innerHTML=` <sup>0°C</sup>`;
	wind_details.innerHTML=`<span >--km/h</span>`;
	humidity_details.innerHTML=`<span >--%</span>`;
	sunset_details.innerHTML=`--<b>PM</b>`;
	sunrise_details.innerHTML=`-- <b>AM</b>`;
}

}
