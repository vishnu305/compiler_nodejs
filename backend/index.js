var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var compiler = require("compilex");
var fs = require('fs');

var app = express();
app.use(bodyParser());

var option = {stats: true};
compiler.init(option);

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"/index.html"));
});

app.post("/compilecode",function(req,res){
    var code = req.body.code;
    var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;
    if(lang==="C"||lang==="C++"){
        if(inputRadio === "true"){
            var envData = {OS:"windows",cmd:"g++",options:{timeout:10000}};
            compiler.compileCPPWithInput(envData,code,input,function(data){
                if(data.error){
                    res.send(data.error);
                }
                else{
                    res.send(data.output);
                }
            })
        }else{
            var envData = {OS:"windows",cmd:"g++",options:{timeout:10000}};
            compiler.compileCPP(envData,code,function(data){
                if(data.error){
                    res.send(data.error);
                }
                else{
                    res.send(data.output);
                }
            })
        }
    }

    if (lang === "Python") {
        if (inputRadio === "true") {
          var envData = { OS: "windows" };
          compiler.compilePythonWithInput(envData, code, input, function (data) {
            if(data.error){
                res.send(data.error);
            }
            else{
                res.send(data.output);
            }
          });
        } else {
          var envData = { OS: "windows" };
          compiler.compilePython(envData, code, function (data) {
            if(data.error){
                res.send(data.error);
            }
            else{
                res.send(data.output);
            }
          });
        }
    }

    if(lang === "Java"){
        if(inputRadio==="true"){
            var envData = {OS:"windows"};
            compiler.compileJavaWithInput(envData,code,input,function(data){
                if(data.error){
                    res.send(data.error);
                }
                else{
                    res.send(data.output);
                }
            })
        }
        else{
            var envData = {OS:"windows"};
            compiler.compileJava(envData,code,function(data){
                if(data.error){
                    res.send(data.error);
                }else{
                    res.send(data.output);
                }
            })
        }
    }


    if(lang === "C#"){
        if(inputRadio==="true"){
            var envData = {OS:"windows"};
            compiler.compileCSWithInput(envData,code,input,function(data){
                if(data.error){
                    res.send(data.error);
                }
                else{
                    res.send(data.output);
                }
            })
        }
        else{
            var envData = {OS:"windows"};
            compiler.compileCS(envData,code,function(data){
                if(data.error){
                    res.send(data.error);
                }else{
                    res.send(data.output);
                }
            })
        }
    }


    if(lang === "Visual Basic"){
        if(inputRadio==="true"){
            var envData = {OS:"windows"};
            compiler.compileVBWithInput(envData,code,input,function(data){
                if(data.error){
                    res.send(data.error);
                }
                else{
                    res.send(data.output);
                }
            })
        }
        else{
            var envData = {OS:"windows"};
            compiler.compileVB(envData,code,function(data){
                if(data.error){
                    res.send(data.error);
                }else{
                    res.send(data.output);
                }
            })
        }
    }



});

app.get("/fullStat", function (req, res) {
    compiler.fullStat(function (data) {
      res.send(data);
    });
  });
  


let port = process.env.PORT;
if (port == null || port == "") {
port = 8000;
}
app.listen(port,()=>{
    console.log(`Example app listnening at http://localhost:${port}`);
});


compiler.flush(function () {
console.log("All temporary files flushed !");
});