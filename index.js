document.getElementById('webhookForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    //const webhookUrl = document.getElementById('webhookUrl').value;
    const webhookUrl = "https://discord.com/api/webhooks/1234567890/yourwebhooktoken";
    const messageContent = document.getElementById('messageContent').value;

     if (!webhookUrl) {
         alert('請提供合法的 Webhook URL!');
         return;
     }
            
    if (!messageContent) {
        alert("請填寫訊息內容！");
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: messageContent }),
        });

        if (response.ok) {
            document.getElementById('responseMessage').textContent = "訊息已成功發送！";
            document.getElementById('responseMessage').style.color = "green";
        } else {
            const error = await response.json();
            document.getElementById('responseMessage').textContent = `錯誤: ${error.message}`;
            document.getElementById('responseMessage').style.color = "red";
        }
    } catch (err) {
        document.getElementById('responseMessage').textContent = `請求失敗: ${err.message}`;
        document.getElementById('responseMessage').style.color = "red";
    }
});
