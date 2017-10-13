var apiconnWsdl = require("apiconnect-wsdl");
var fs = require("fs");
var args = require('yargs').argv;

var target = args.target || '.';

if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
}
apiconnWsdl.getJsonForWSDL(args.wsdl).then(function (wsdls) {
    var serviceData = apiconnWsdl.getWSDLServices(wsdls);
    for (var item in serviceData.services) {
        var serviceName = serviceData.services[item].service;
        var wsdlId = serviceData.services[item].filename;
        var wsdlEntry = apiconnWsdl.findWSDLForServiceName(wsdls, serviceName);
        var swagger = apiconnWsdl.getSwaggerForService(wsdlEntry, serviceName, wsdlId);
        fs.writeFile(target + '/' + serviceName + '.json', JSON.stringify(swagger))
    }
}, function (error) {
    console.log(error.message)
});

