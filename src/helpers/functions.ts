//import AES from 'crypto-js/aes';



//export const encriptarSenhar = (password: string) => AES.encrypt(password, 'AES-256-CBC').toString()

export const makePassord = () => {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 5;
    var passwordNew = "";

    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        passwordNew += chars.substring(randomNumber, randomNumber + 1);
    }
    return passwordNew
}