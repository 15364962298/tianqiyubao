
let citys
$.ajax({
    url:"https://www.toutiao.com/stream/widget/local_weather/city/",
    type:"get",             //?????
    dataType:"jsonp",   //????????????
    success:function(e){   //??????????????
        citys=e.data   //???????data??
        let str="";
        // console.log(citys);
        for(key in citys){
            str+=`<h2>${key}</h2>`
            str+=`<div class="con">`
            for(key2 in citys[key]){
               str+=`<div class="city">${key2}<span></span></div>`
            }
            str+=`</div>`
        }
        $(str).appendTo($(".cityBox"))
    }
})


$(function(){
    let cityBox=$(".cityBox")
    $("header").click(function(){
        cityBox.slideDown()
    })
    // $(".search button").click(function(){
    //     cityBox.slideUp()
    // })
    cityBox.on("touchstart",function(event){
        // if(event.target.className=="city"){
        //     $("header span").text(event.target.innerText);
        //     cityBox.slideUp()
        // }
        let city=event.target.innerText
        $.ajax({
            url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${city}`,
            data:{"city":city},
            type:"get",             //?????
            dataType:"jsonp",   //????????????
            success:function(e){
                console.log(e.data)
                updata(e.data)
                cityBox.slideUp()
            }
        })

    })

})
$.ajax({
    url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=city`,
    data:{"city":"太原"},
    type:"get",             //?????
    dataType:"jsonp",   //????????????
    success:function(e){
        console.log(e.data)
        updata(e.data)
    }
})
function updata(data) {
    $("header span").text(data.city)
    $("#current_condition").text(data.weather.current_condition)
    $("#aqi").text(data.weather.aqi)
    $("#quality_level").text(data.weather.quality_level)
    $("#current_temperature").text(data.weather.current_temperature)
    $("#wind_direction").text(data.weather.wind_direction+" "+data.weather.wind_level)
    $("#dat_high_temperature").text(data.weather.dat_high_temperature+"/"+data.weather.dat_low_temperature)
    $("#tomorrow_high_temperature").text(data.weather.tomorrow_high_temperature+"/"+data.weather.tomorrow_low_temperature)
    $("#dat_condition").text(data.weather.dat_condition)
    $("#tomorrow_condition").text(data.weather.tomorrow_condition)
    $("#dat_weather_icon_id").attr("src",`img/${data.weather.dat_weather_icon_id}.png`)
    $("#tomorrow_weather_icon_id").attr("src",`img/${data.weather.tomorrow_weather_icon_id}.png`)

    for(obj of data.weather.hourly_forecast){
        console.log(obj);
        let long=$("#hour")
        for(let i=0;i<long.length;i++){
            console.log(i)
        }
        // $("#hour").text(data.weather.obj.hour)
    }
}

$(function(){
    $(".audioBtn").click(function(event){
        event.stopPropagation()
        let speech=window.speechSynthesis
        let speechset=new SpeechSynthesisUtterance()
        let text=$("header span").text()+"当前温度"+$("#current_temperature").text()+"摄氏度"
        console.log(text)
        speechset.text=text
        speech.speak(speechset)
    })
})
