<template>
    <div class="content">
        <a href="#" @click="showDialog">show rowdata</a>
        <pre>{{ decrypted || props.encryptedValue }}</pre>
    </div>
    <div class="modal" :class="{ 'is-active': showDecryptForm }">
        <div class="modal-background" @click="closeDialog"></div>
        <div class="modal-content">
            <div class="box">
                <textarea v-model="private_key_jwk" cols="30" rows="10"></textarea>
                <button class="button" @click="decryptApp">Decrypt</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Decrypter, KeyEncryption } from "@/domain/infra/MyCrypto";
import { EncryptedStructure } from "@/domain/entities/SensitiveData";

const props = defineProps<{ encryptedValue: EncryptedStructure }>();
const decrypted = ref("");
const private_key_jwk = ref("");
const showDecryptForm = ref(false);

function showDialog() {
    showDecryptForm.value = true;
}

function closeDialog() {
    showDecryptForm.value = false;
}

async function decryptApp() {
    const k = await KeyEncryption.importKeyFromJwk(JSON.parse(private_key_jwk.value));
    const decryptor = new Decrypter(k);
    const decryptedBytes = await decryptor.decrypt(props.encryptedValue);
    const clearText = new TextDecoder().decode(decryptedBytes);
    decrypted.value = clearText;
    closeDialog();
}

</script>

<style scoped>
.content pre {
    overflow: scroll;
    width: 40rem;
}
</style>
