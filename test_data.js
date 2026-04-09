// 在浏览器控制台执行
console.log('products数组:', products);
console.log('在途货物:', products.filter(p => p.warehouse && p.warehouse.includes('在途')));
