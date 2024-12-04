import init, { get_discord_webhook_url } from './pkg/discord_webhook.js';

const dom_respMessage = document.getElementById('responseMessage');

async function sendWebhook() {
    await init(); // 初始化 WebAssembly 模組

    // 調用 WebAssembly 函數獲取 URL
    const webhookUrl = get_discord_webhook_url();
    if (!webhookUrl) {
        alert('請提供合法的 Webhook URL!');
        return;
    }
    
    const messageContent = document.getElementById('messageContent').value;
    if (!messageContent) {
        alert("請填寫訊息內容！");
        return;
    }
    
    // 發送參數
    const payload = {
        content: messageContent,
        username: "Webhook Bot"
    };

    // 發送請求
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('response');
        let ctx = '';
        let color = '';
        
        if (response.ok) {
            ctx = "訊息已成功發送！";
            color = "green";
        } else {
            let error = new Error(`HTTP 錯誤: ${response.statusText}`);
            ctx = `錯誤: ${error.message}`;
            color = "red";
        }

        dom_respMessage.textContent = ctx;
        dom_respMessage.style.color = color;
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.error('Err');
        
        dom_respMessage.textContent = `請求失敗: ${err.message}`;
        dom_respMessage.style.color = "red";
    });
}

// 綁定按鈕事件
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendWebhook').addEventListener('click', sendWebhook);
});
