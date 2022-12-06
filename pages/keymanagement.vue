<template>
    <h1 class="title">System KeyPair management</h1>
    <div class="tile is-ancestor">
        <div class="tile is-vertical">
            <div class="tile is-parent">
                <button class="button is-primary" @click="generateKeyPair">Generate New Key</button>
                <NuxtLink to="/">
                    <button class="button"> Back to home</button>
                </NuxtLink>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h2 class="title">Private Key</h2>
                    <textarea class="textarea" v-if="keyPair.privateKey">{{ keyPair.privateKey }}</textarea>
                    <div v-else="keyPair.privateKey">no data</div>
                </article>
                <article class="tile is-child box">
                    <h2 class="title">Public Key</h2>
                    <p v-if="keyPairState.publicKey">has been saved into state.</p>
                    <div v-if="keyPair.publicKey">
                        <textarea class="textarea">{{ keyPair.publicKey }}</textarea>
                        <br />
                        <button class="button is-primary" @click="savePublicKey">Save for encryption</button>
                    </div>
                    <div v-else="keyPair.publicKey">no data</div>
                </article>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { KeyEncryption } from "@/domain/infra/MyCrypto";

const keyPairState = useKeyPair();
const keyPair = ref({
    privateKey: keyPairState.value.privateKey,
    publicKey: keyPairState.value.publicKey
});

async function generateKeyPair() {
    const kp = await KeyEncryption.generateKeyPair();
    keyPair.value.privateKey = JSON.stringify(await KeyEncryption.exportKeyAsJwk(kp.privateKey));
    keyPair.value.publicKey = JSON.stringify(await KeyEncryption.exportKeyAsJwk(kp.publicKey));
}

function savePublicKey() {
    keyPairState.value.publicKey = keyPair.value.publicKey;
}
</script>

<style scoped>
.right {
    text-align: right;
}
</style>