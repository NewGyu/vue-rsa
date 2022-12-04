import { SensitiveData } from "./SensitiveData";

export interface Application {
    name: String,
    public_data: String,
    sensitive_data: SensitiveData,
}