import * as NodeRSA from 'node-rsa';

var myDecrypter = new NodeRSA({b: 512});
myDecrypter.setOptions({encryptionScheme: 'pkcs1'});


class RSAEncryption {
    

    myDecrypter: NodeRSA;
    AesIV: string;

    constructor() {
        myDecrypter.generateKeyPair();
    }
    setKey(key) {
        myDecrypter.importKey(key)
    }

    encrypt(jsonObject){
        const val = JSON.stringify(jsonObject);
       
    }

    decrypt(base64String) {
       
        return JSON.parse('deciphered');
    }
}
export default RSAEncryption;

