type ClearText = String;

export interface EncryptedStructure {
    dek: string, //encrypted and base64 encoded
    iv: string,
    payload: string
}

export type SensitiveData = EncryptedStructure | ClearText;