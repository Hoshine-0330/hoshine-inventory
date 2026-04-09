// 强制从文件加载数据并保存到localStorage
fetch('/库存数据.json')
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('hoshine_products', JSON.stringify(data));
    localStorage.setItem('hoshine_lastUpdate', new Date().toISOString());
    console.log('已强制加载数据:', data.length, '条');
    location.reload();
  })
  .catch(err => console.error('加载失败:', err));
