const fs = require("fs");
const path = require("path");
function loadData(rout) {
    filepath = path.join(__dirname, `../data/${rout}.json`);
    try {
        let data = fs.readFileSync(filepath, "utf8");
       
        // console.log("Прочитанные данные:", JSON.parse(data));
        return data;
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log("Файл не существует");
          return null;
        }
        console.error("Ошибка", error);
      }
}

async function updateData(data,rout) {
    filepath = path.join(__dirname, `../data/${rout}.json`);
    try {
        let existedData = fs.readFileSync(filepath, "utf8");
        existedData = JSON.parse(existedData);
          res=data;
          fs.writeFileSync(filepath, JSON.stringify(res, null, 2));
        
      } catch (error) {
        console.error("Ошибка при обновлении файла:", error);
      }
  
}
module.exports={loadData,updateData}