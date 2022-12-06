import crypto from "crypto";
const jscrypto = globalThis.crypto ?? crypto;
import { EncryptedStructure } from "../entities/SensitiveData";

type Base64String = string;
type Base64IV = string;
type AESKey = CryptoKey;
type PrivateKey = CryptoKey;
type PublicKey = CryptoKey;
type EncryptedDataKey = Base64String;
type EncryptedData = Base64String;


/**
 * This class focus on our encryption method
 */
export class Encrypter {
    readonly publicKey: PublicKey;
    private _aesKey?: AESKey;

    constructor(key: PublicKey) {
        this.publicKey = key;
    }

    async init() {
        this._aesKey = await DataEncryption.generateKey();
    }

    get aesKey(): AESKey {
        if (!this._aesKey) {
            throw new Error("Yet initialized. Have to call init.");
        }
        return this._aesKey;
    }

    async encrypt(data: Uint8Array): Promise<EncryptedStructure> {
        const [encrypted, iv] = await DataEncryption.encrypt(data, this.aesKey);
        const encryptedDataKey = await KeyEncryption.encrypt(this.aesKey, this.publicKey);
        return {
            dek: encryptedDataKey,
            iv: byteToB64(iv),
            payload: byteToB64(new Uint8Array(encrypted))
        }
    }
}

/**
 * This class focus on our encryption method
 */
export class Decrypter {
    readonly privateKey: PrivateKey;

    constructor(key: PrivateKey) {
        this.privateKey = key;
    }

    async decrypt(encrypted: EncryptedStructure): Promise<Uint8Array> {
        const aesKey = await KeyEncryption.decrypt(encrypted.dek, this.privateKey);
        return await DataEncryption.decrypt(encrypted.payload, aesKey, encrypted.iv);
    }
}


/**
 * A module which includes methods to encrypt data-keys.
 */
export namespace KeyEncryption {
    export async function generateKeyPair() {
        return await jscrypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 4096,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256"
            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    /**
     * Encrypt data-key
     * @param dataKey  AESKey object
     * @param key publicKey
     * @returns encrypted and base64 encoded format
     */
    export async function encrypt(dataKey: AESKey, key: PublicKey): Promise<EncryptedDataKey> {
        const buff = await jscrypto.subtle.exportKey("raw", dataKey);
        const encrypted = await jscrypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            key,
            buff
        );
        return byteToB64(new Uint8Array(encrypted));
    }

    /**
     * Decrypt base64 encoded data-key 
     * @param encryptedKey base64 encoded and encrypted data-key
     * @param key privateKey
     * @returns AESKey object
     */
    export async function decrypt(encryptedKey: EncryptedDataKey, key: PrivateKey): Promise<AESKey> {
        const encryptedBytes = B64ToByte(encryptedKey);
        const decrypted = await jscrypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            key,
            encryptedBytes
        );
        return await DataEncryption.importKeyFrom(new Uint8Array(decrypted));
    }

    export async function exportKeyAsJwk(key: CryptoKey) {
        return await jscrypto.subtle.exportKey("jwk", key);
    }

    export async function importKeyFromJwk(jwk: JsonWebKey) {
        if (!(jwk.key_ops && jwk.key_ops.length === 1)) {
            new Error("Unexpected key format.");
        }
        const key_ops = jwk.key_ops! as KeyUsage[];

        return await jscrypto.subtle.importKey(
            "jwk",
            jwk,
            { name: "RSA-OAEP", hash: "SHA-256" },
            true,
            key_ops
        );
    }
}

/**
 * A module which includes methods for data encryption.
 */
export namespace DataEncryption {
    export async function generateKey() {
        return await jscrypto.subtle.generateKey(
            {
                name: "AES-CBC",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    /**
     * Convert key from AESKey object to row byte array
     * @param key AESKey object
     * @returns byte array which is AES Key
     */
    export async function exportKeyAsBytes(key: AESKey): Promise<Uint8Array> {
        return new Uint8Array(await jscrypto.subtle.exportKey("raw", key));
    }

    /**
     * Convert from row bytes format key to AESKey object
     * @param bytes byte array which is AES Key
     * @returns AESKey object
     */
    export async function importKeyFrom(bytes: Uint8Array): Promise<AESKey> {
        return await jscrypto.subtle.importKey(
            "raw",
            bytes,
            "AES-CBC",
            true,
            ["encrypt", "decrypt"]
        );
    }

    /**
     * encrypt row data to encrypted base64 format
     * @param data row data bytes
     * @param key AESKey
     * @returns encrypted bytes and initial vector
     */
    export async function encrypt(data: Uint8Array, key: AESKey): Promise<[ArrayBuffer, Uint8Array]> {
        const iv = jscrypto.getRandomValues(new Uint8Array(16));
        const encrypted = await jscrypto.subtle.encrypt(
            { name: "AES-CBC", iv },
            key,
            data
        );
        return [encrypted, iv]
    }

    /**
     * decrypt data which is encrypted and base64 encoded
     * @param encryptedData  encrypted and base64 encoded
     * @param key AESKey object
     * @param iv base64 encoded IV
     */
    export async function decrypt(encryptedData: Base64String, key: AESKey, iv: Base64IV): Promise<Uint8Array> {
        const encryptedDataBytes = B64ToByte(encryptedData);
        const ivBytes = B64ToByte(iv);
        const decrypted = await jscrypto.subtle.decrypt(
            { name: "AES-CBC", iv: ivBytes },
            key,
            encryptedDataBytes
        );
        return new Uint8Array(decrypted);
    }
}

export function byteToB64(bytes: Uint8Array): Base64String {
    return btoa([...bytes].map(b => String.fromCharCode(b)).join(""));
}

export function B64ToByte(b64: Base64String): Uint8Array {
    const b = atob(b64);
    const x = [...b].map(s => s.charCodeAt(0));
    return new Uint8Array(x);
}

