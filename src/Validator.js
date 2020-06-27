export const isPresent = (param) => {
    if(param.length === 0 || param === ''){
        return false
    }
    return true

}

export const validLength = (param,length)=>{
    if(param.length < length){
        return false
    }
    return true
}

export const equalValues = (param1,param2)=>{
    if(param1 !== param2 ){
        return false
    }
    return true
}

export const validEmailFormat=(mail)=> 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

export const isNumber = (n) =>{
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
