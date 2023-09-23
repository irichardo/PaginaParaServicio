import fs from 'fs';
import path from 'path';

const modelsContainer:any = []
const basename = path.basename(__filename);

fs.readdirSync(path.join(__dirname,'../models'))
// Si el punto existe entonces, voy a hacer slice -3, luego de ello creare un .js 
.filter((file)=>file.indexOf('.') !== 0 && (basename !== file) &&( file.indexOf('.js') !== 3 || file.indexOf('.ts') !== 3))
.forEach(async(file)=>{
   modelsContainer.push(require(path.join(__dirname,'../models',file)));
})

modelsContainer.forEach((model:any)=>{
    if(modelsContainer.associate){
        model.associate(modelsContainer);
    }
})