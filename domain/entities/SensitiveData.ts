type KekId = String;
type DataKey = String;
type EncryptedContent = String;
type ClearText = String;

interface EncryptedStructure {
    kid: KekId,
    dk: DataKey,
    payload: EncryptedContent
}

export type SensitiveData = EncryptedStructure | ClearText;