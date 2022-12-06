import { Application } from "@/domain/entities/Application"

export const useApplications = () => {
    const demodata: Application[] = [
        { name: "app1", public_data: "you can see1", sensitive_data: { kid: "key1", dk: "hoge", payload: "huga" } },
        { name: "app2", public_data: "you can see2", sensitive_data: { kid: "key1", dk: "xxx", payload: "yyy" } },
        { name: "app5", public_data: "you can see3", sensitive_data: { kid: "key2", dk: "333", payload: "uuuu" } }
    ];
    const initial = demodata;
    return useState("applications", () => initial);
}

export const useKeyPair = () => {
    const initial = { privateKey: "", publicKey: "" }
    return useState("keyPair", () => initial);
}