import { Application } from "@/domain/entities/Application";
import { Encrypter, KeyEncryption } from "@/domain/infra/MyCrypto"

export const useApplications = () => {
    const initial = new Array<Application>();
    const apps = useState("applications", () => initial);
    const addNewApp = async (newApp: Application, publicKey: string) => {
        const k = await KeyEncryption.importKeyFromJwk(JSON.parse(publicKey));
        const encryptor = new Encrypter(k);
        await encryptor.init();
        const bytes = new TextEncoder().encode(newApp.sensitive_data as string);
        const encrypted = await encryptor.encrypt(bytes);
        newApp.sensitive_data = encrypted;
        apps.value.push(newApp);
    }
    return {
        apps,
        addNewApp
    }
}

export const useKeyPair = () => {
    const initial = { privateKey: "", publicKey: "" }
    return useState("keyPair", () => initial);
}