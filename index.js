import init, { get_webhook_url } from './pkg/pkg/discord_webhook.js';

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
        if (response.ok) {
            dom_respMessage.textContent = "訊息已成功發送！";
            dom_respMessage.style.color = "green";
        } else {
            let error = new Error(`HTTP 錯誤: ${response.statusText}`);
            dom_respMessage.textContent = `錯誤: ${error.message}`;
            dom_respMessage.style.color = "red";
        }
    })
    .catch(err => {
        dom_respMessage.textContent = `請求失敗: ${err.message}`;
        dom_respMessage.style.color = "red";
    });
}

/ 綁定按鈕事件
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendWebhook').addEventListener('submit', sendWebhook);
});
