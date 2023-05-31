const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const https=require("https");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const query=req.body.city;
    const apikey= "7f904029eeca277e12b39ad1fc1c6151";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey ;

    https.get(url,function(response){
     console.log(response.statusCode)
     response.on("data",function(data){
        const dataa=JSON.parse(data);
        const temp=dataa.main.temp;
        const description=dataa.weather[0].description;
       res.write("<h1>the current weather data is</h1> "+temp);
       res.write(description);
       res.send()
        
    })})
    
})


app.listen(3000,function(){
    console.log("server is connected succesfully");
});