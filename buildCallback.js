import * as fs from 'node:fs';

export default function mobileToBase(rootPath, base) {
  var files = fs.readdirSync(rootPath);

  fs.mkdirSync(`${rootPath}${base}`, (err) => {
    if (err) throw err;
    console.log(`${base} 创建成功`);
  });
  files.forEach((fileName) => {
    if (fileName !== 'index.html') {
      fs.rename(`${rootPath}/${fileName}`, `${rootPath}${base}/${fileName}`, (err) => {
        if (err) throw err;
        console.log(`${fileName} 移动成功`);
      });
    }
  });
}
