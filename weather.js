window.onload = function(){
  
  //acessing dom elements  
  const input =  document.querySelector(".input-city");
  
  const form = document.querySelector(".form");
     
  const [place,date,temperature,condition]= document.querySelectorAll(".place,.date,.temp,.condition");  
   
  //submit handler   
  form.addEventListener('submit', async(e) =>{
    e.preventDefault();
    const cityName = input.value;
       
    //check if there is not any value        
    if(!cityName|| /\s/g.test(cityName))return input.value="";       
     
    place.textContent="Loading...";
    date.textContent="";
    temperature.textContent="";
    condition.textContent="";
   
    try{
      //Api key
      const apiKey = "76c0f72608729b50bd0a1b90110fd036";
       
      //Url 
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&cnt=5&units=metric`;
      
      const  res = await fetch(url);
      const data =await res.json();
      
      console.log(data);
      
      const {
        name,weather,
        sys:{country},main:{temp}
      } = data; 
                            
      place.textContent =`${name},${country}`;
      date.textContent = new Date().toLocaleString("en-US",{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
   
      temperature.textContent=`${temp.toFixed(0)} °C`;
      condition.textContent=weather[0].main;
      input.value = "";
      
    } catch(err){
        console.log(err.message);
        place.textContent="Try Again With proper country name";
      }
  });
}
