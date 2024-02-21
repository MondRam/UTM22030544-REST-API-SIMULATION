import fs from "fs";


export function readJson(jsonPath) {
  try {
    const jsonData = fs.readFileSync(jsonPath);
    const data = JSON.parse(jsonData);
    return (data);

  } catch (error) {
    console.log(error);
  }
};
//console.log(readJson("books.json"));


export function updateJson(jsonPath, newData) {
    try {
      const jsonData = fs.readFileSync(jsonPath);
      const data = JSON.stringify(newData);
      const newJson = fs.writeFileSync(jsonPath, data);
      
      return (newJson);
  
    } catch (error) {
      console.log(error);
    }
  };

















