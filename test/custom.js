var should, fs;

should = require("should");
fs = require("fs");

describe("Module should work properly, with a custom configuration", function(){
    var logger = require("../index.js");

    describe("Require the module", function(){

        it("Require should return a function", function(){
            logger.should.be.a.Function;
        });
    });


    describe("Instantiate the module", function(){
        var loggerInstance;
        before(function(){
            process.chdir("./test");
        });
        it("Should not contain a custom/ directory", function() {
            var exists = fs.existsSync("./custom");
            return exists.should.be.False;
        })
        it("Instance should be an object", function(done){
            loggerInstance = logger("./custom");
            loggerInstance.should.be.a.Object;
            loggerInstance.info("12345");
            done();
        });
        it("Should log output to a file", function(done){
            var log = fs.readFile("./custom/logs/access.log", {encoding: "utf8"}, function(err, data){
                data.should.containDeep("12345");
                done();
            });
        });
    });

    after(function(){
        fs.unlinkSync("./custom/logs/access.log");
        fs.rmdirSync("./custom/logs");
        fs.rmdirSync("./custom");
    });
});


//
//var ;
//loggerInstance.info("wtf")