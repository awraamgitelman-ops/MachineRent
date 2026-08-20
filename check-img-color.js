import fs from 'fs';

// Read the image buffer to inspect dimensions or use a canvas/pure JS png decoder
const imgPath = 'C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.user_uploaded\\media_1787224179789.png';
console.log('Image exists:', fs.existsSync(imgPath), 'size:', fs.statSync(imgPath).size);
