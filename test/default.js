var should, fs;

should = require("should");
fs = require("fs");

describe("Module should work properly, in the default configuration", function(){
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
        it("Should not contain a logs directory", function() {
            var exists = fs.existsSync("./logs")
            exists.should.be.False
        })
        it("Instance should be an object", function(done){
            loggerInstance = logger()
            loggerInstance.should.be.a.Object;
            loggerInstance.info("12345");
            done()
        });
        it("Should log output to a file", function(done){
            var log = fs.readFile("./logs/access.log", {encoding: "utf8"}, function(err, data){
                data.should.containDeep("12345")
                done()
            });
        });
    });

    after(function(){
        fs.unlinkSync("./logs/access.log")
        fs.rmdirSync("./logs")
    });
});


//
//var ;
//loggerInstance.info("wtf")