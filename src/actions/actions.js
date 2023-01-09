import { useContext } from "react"
import { CertificateContext } from "../contexts/certificate"



export function OpenDownloadModal(){ 
    const [state, certdispatch] = useContext(CertificateContext)
    return alert("Coming from the actions file")
}

export function courseValidation(data, id){ 
    let k=false
    for(var i=0; i < data.length; i++){
        if(id == data[i]["id"] && data[i]["completed"] == true){
            return data[i]["completed"]
        }
        else{
            return false
        }
    }
    
   
}