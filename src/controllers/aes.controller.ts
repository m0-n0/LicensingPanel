const crypto1 = require('crypto');
const encryptionType = 'aes-256-cbc';
const encryptionEncoding = 'base64';
const bufferEncryption = 'utf-8';
class AesEncryption {
    

    AesKey: string;
    AesIV: string;

    constructor() {
        this.AesKey = 'ABCDEFGHIJKLMNOP'+new Date().toISOString().substring(0,16);
        this.AesIV =  'ABCDEFGHIJKLMNOP';
    }
    setKey(key, iv) {
        this.AesKey = key;
        this.AesIV = iv;
    }

    encrypt(jsonObject){
        const val = JSON.stringify(jsonObject);
        const key = Buffer.from(this.AesKey, bufferEncryption);
        const iv = Buffer.from(this.AesIV, bufferEncryption);
        const cipher = crypto1.createCipheriv(encryptionType, key, iv);
        let encrypted = cipher.update(val, bufferEncryption, encryptionEncoding);
        encrypted += cipher.final(encryptionEncoding);
        return encrypted;
    }

    decrypt(base64String) {
        const buff = Buffer.from(base64String, encryptionEncoding);
        const key = Buffer.from(this.AesKey, bufferEncryption);
        const iv = Buffer.from(this.AesIV, bufferEncryption);
        const decipher = crypto1.createDecipheriv(encryptionType, key, iv);
        const deciphered = decipher.update(buff) + decipher.final();
        return JSON.parse(deciphered);
    }
}
export default AesEncryption;