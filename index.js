// Base64 解密函數
function decodeBase64(encoded) {
    return decodeURIComponent(
        atob(encoded)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
}

// Base64 加密的 Webhook URL (請替換為您的 Webhook URL 的加密值)
const encryptedWebhookUrl = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTIzNDU2Nzg5MC95b3Vyd2ViaG9va3Rva2Vu";

// 解密 Webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1313677838238482532/0k9CE857ia-DVSa-FN8WwgNakS3tycsTBFjGKO3c-X3rmzeAgC5w34apMZFfnTy4nshI'; //decodeBase64(encryptedWebhookUrl); 

document.getElementById('webhookForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // 防止表單重新加載頁面
    
    const messageContent = document.getElementById('messageContent').value;

    if (!encryptedWebhookUrl) {
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
