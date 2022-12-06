import { describe, test, expect, beforeAll } from "vitest";
import { Encrypter, Decrypter, KeyEncryption, DataEncryption, B64ToByte, byteToB64 } from "../domain/infra/MyCrypto";
import { subtle } from "crypto";


describe("Base64", () => {
    test("string case", () => {
        const b = new TextEncoder().encode("hello");
        const b64encoded = byteToB64(b);
        expect(b64encoded).toBe(btoa("hello"));
        expect(B64ToByte(b64encoded)).toStrictEqual(b);
    });

    test("binary case", () => {
        const b = new Uint8Array([0x11, 0xF2, 0x54]);
        const b64encoded = byteToB64(b);
        expect(b64encoded).toBe("EfJU");
        expect(B64ToByte(b64encoded)).toStrictEqual(b);
    });
})

describe("Key Encryption", () => {
    let keyPair: CryptoKeyPair;
    beforeAll(async () => {
        keyPair = await KeyEncryption.generateKeyPair();
    });

    test("enc", async () => {
        const aeskey = await DataEncryption.generateKey();
        const encryptedKey = await KeyEncryption.encrypt(aeskey, keyPair.publicKey);
        const decodedKey = KeyEncryption.decrypt(encryptedKey, keyPair.privateKey);
    });
});

describe("Encrypt & Decrypt", () => {
    let keyPair: CryptoKeyPair;
    let encrypter: Encrypter;
    let decrypter: Decrypter;

    beforeAll(async () => {
        keyPair = await KeyEncryption.generateKeyPair();
        encrypter = new Encrypter(keyPair.publicKey);
        await encrypter.init();

        decrypter = new Decrypter(keyPair.privateKey);
    });

    test("Encrypt", async () => {
        //When
        const clearText = "hello!";
        const clearBytes = new TextEncoder().encode(clearText);
        const encrypted = await encrypter.encrypt(clearBytes);
        console.log(encrypted)

        //then
        expect(encrypted.dek).toBeTypeOf("string");
        expect(encrypted.iv).toBeTypeOf("string");
        expect(encrypted.payload).toBeTypeOf("string");

        //When
        const decrypted = await decrypter.decrypt(encrypted);
        //Then
        expect(decrypted).toStrictEqual(clearBytes);
    })
});
