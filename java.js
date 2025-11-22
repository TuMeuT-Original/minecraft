var Bukkit = Java.type('org.bukkit.Bukkit');
var URL = Java.type('java.net.URL');
var HttpURLConnection = Java.type('java.net.HttpURLConnection');
var InputStreamReader = Java.type('java.io.InputStreamReader');
var BufferedReader = Java.type('java.io.BufferedReader');
var OutputStreamWriter = Java.type('java.io.OutputStreamWriter');
var JSONObject = Java.type('org.json.JSONObject');

// Функция для получения внешнего IP
function getServerIP() {
    try {
        var url = new URL("http://checkip.amazonaws.com");
        var conn = url.openConnection();
        var reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        var ip = reader.readLine();
        reader.close();
        return ip.trim();
    } catch (e) {
        try {
            // Альтернативный сервис если первый не работает
            var url2 = new URL("http://api.ipify.org");
            var conn2 = url2.openConnection();
            var reader2 = new BufferedReader(new InputStreamReader(conn2.getInputStream()));
            var ip2 = reader2.readLine();
            reader2.close();
            return ip2.trim();
        } catch (e2) {
            return "Не удалось получить IP";
        }
    }
}

// Функция для отправки сообщения в Discord
function sendToDiscord(ip) {
    try {
        var webhookUrl = "https://discord.com/api/webhooks/1441768121223348236/w-SPavWF7tuGkBuDd_8xjkp21S5dwCoDawKMtCMd9FnsNB0q-bLsLMnFcG6mfixfIsuc";
        var url = new URL(webhookUrl);
        var connection = url.openConnection();
        
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("User-Agent", "Minecraft-Server");
        connection.setDoOutput(true);
        
        var json = new JSONObject();
        json.put("content", "🌐 **IP адрес сервера:** `" + ip + "`\n⏰ **Время:** " + new Date().toString());
        
        var writer = new OutputStreamWriter(connection.getOutputStream());
        writer.write(json.toString());
        writer.flush();
        writer.close();
        
        var responseCode = connection.getResponseCode();
        
        if (responseCode == 204) {
            Bukkit.getLogger().info("IP адрес успешно отправлен в Discord: " + ip);
        } else {
            Bukkit.getLogger().warning("Ошибка отправки в Discord. Код: " + responseCode);
        }
        
    } catch (e) {
        Bukkit.getLogger().severe("Ошибка при отправке в Discord: " + e.toString());
    }
}

// Основная функция
function main() {
    var serverIP = getServerIP();
    Bukkit.getLogger().info("Получен внешний IP: " + serverIP);
    sendToDiscord(serverIP);
}

// Запуск
main();
