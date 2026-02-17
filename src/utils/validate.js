export function required(value, massage = "This field is required") {
  return value && String(value).trim() ? "" : massage;
}
export function isEmail(value, message = "email is not valid") {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : message;
}



 export function validater(value,rules =[]){
  for (let rule of rules){
    const error = rule(value);
    if (error) return error;
  }
  return "";

}