import { palette } from "src/libs/textColor"

export default class Console {
        
        static Approved(text:string){
            process.stdout.write(`${palette.green[0]}${text}${palette.green[1]}\n`) 
    }
 static Denied(text:string){
            process.stdout.write(`${palette.red[0]}${text}${palette.red[1]}\n`) 
    }
}