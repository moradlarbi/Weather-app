var cityName = 'London';
var key = 'b7e4ab2baafa6c84da8b9ddd3ddca65f';
var city = document.querySelector('.cityName');
var desc = document.querySelector('.description');
var temp = document.querySelector('.num');
var lon;
var lat;
var date = new Date();
function miseajour(){
    document.querySelector('.changeVal').style.borderColor = '#DF8E00';
    document.querySelector('.error').style.visibility = 'hidden';
    cityName = document.querySelector(".changeVal").value;
    if (cityName !== ''){
        fetch(`https:\\api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
        .then(res => {
            
            res.json()
            .then(data => {
                
                if (data.cod == 200){
                    city.innerHTML = data.name;
                    lon = data.coord.lon;
                    lat = data.coord.lat;
                    console.log(lon,lat);
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly&appid=${key}`)
                    .then(res => res.json()
                    .then(data => {
                        console.log("hey1");
                        var i =0;
                        console.log(data.daily);
                        desc.innerHTML = data.daily[i].weather[0].main;
                        temp.innerHTML = Math.floor(data.daily[i].temp.day)+'°';
                        i++;
                        const tab = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                        var list = document.querySelectorAll(".dayel");
                        var j = date.getDay();
                        j++;
                        list.forEach( item => {
                            item.querySelector(".day").innerHTML = tab[j];
                            item.querySelector(".tempNum").innerHTML = Math.floor(data.daily[i].temp.day)+'°';
                            var icon = data.daily[i].weather[0].icon;
                            item.querySelector(".icon").innerHTML = `<img src=\"http://openweathermap.org/img/w/${icon}.png\">`
                            i++;
                            j++;
                            if (j>6){
                                j = 0;
                            }
                        })           
                    })
                    )
                }
                else{
                    document.querySelector('.changeVal').style.borderColor = '#e74c3c';
                    document.querySelector('.error').style.visibility = 'visible';
                }
            })
        }
        )

        //document.querySelector(".changeVal").value = '';

    }
    
}
fetch(`https:\\api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
.then(res => res.json()
.then(data => {
    city.innerHTML = data.name;
    lon = data.coord.lon;
    lat = data.coord.lat;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly&appid=${key}`)
    .then(res => res.json()
    .then(data => {
        var i =0;
        desc.innerHTML = data.daily[i].weather[0].main;
        temp.innerHTML = Math.floor(data.daily[i].temp.day)+'°';
        i++;
        const tab = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var list = document.querySelectorAll(".dayel");
        var j = date.getDay();
        j++;
        list.forEach( item => {
            item.querySelector(".day").innerHTML = tab[j];
            item.querySelector(".tempNum").innerHTML = Math.floor(data.daily[i].temp.day)+'°';
            var icon = data.daily[i].weather[0].icon;
            item.querySelector(".icon").innerHTML = `<img src=\"http://openweathermap.org/img/w/${icon}.png\">`
            i++;
            j++;
            if (j>6){
                j = 0;
            }
        })
        
        
    })
    )
    
})
)
var form = document.querySelector('.btn');
form.addEventListener("click",miseajour)


