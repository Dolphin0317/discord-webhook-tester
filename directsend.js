import init, { get_discord_webhook_url } from './pkg/discord_webhook.js';

async function sendWebhook() {
  await init(); // 初始化 WebAssembly 模組
  
  // 調用 WebAssembly 函數獲取 URL
  const webhookUrl = get_discord_webhook_url();  

  // 抓取整個 URL 的查詢參數部分
  const urlParams = new URLSearchParams(window.location.search);

  // 取得指定的參數值
  const messageContent = urlParams.get('message'); 
  if (!messageContent) {
      console.error("請填寫訊息內容！");
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
          console.log(ctx);
      } else {
          let error = new Error(`HTTP 錯誤: ${response.statusText}`);            
          ctx = `錯誤: ${error.message}`;
          console.error(ctx);
      }
  })
  .then(data => {
      console.log(data)
  })
  .catch(err => {
       let err_ctx = `請求失敗: ${err.message}`;
    
      console.error(err_ctx);
  });
}

// 綁定事件
document.addEventListener('DOMContentLoaded', () => {
    sendWebhook();
});
