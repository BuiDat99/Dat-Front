export const generateRandomCode = (l = 5) => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charsLength = chars.length;
    let string = "";
  
    for (let i = 0; i < l; i++)
      string += chars.charAt(Math.floor(Math.random() * charsLength));
  
    return `${string}`;
}