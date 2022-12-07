<template>
    <section>
        <div class="field">
            <label class="label">Application Name</label>
            <div class="control">
                <input v-model="newApp.name" class="input" type="text" />
            </div>
        </div>
        <div class="field">
            <label class="label">Public data</label>
            <div class="control">
                <input v-model="newApp.public_data" class="input" type="text" />
            </div>
        </div>
        <div class="field">
            <label class="label">Sensitive data</label>
            <div class="control">
                <input v-model="newApp.sensitive_data" class="input" type="text" />
            </div>
        </div>
        <div id="submit" class="field">
            <div class="control">
                <button class="button" @click="clear">
                    Clear
                </button>
                <button class="button is-primary" :disabled="(!newApp.isValid || !keyPair.publicKey)"
                    @click="submitNew">
                    Submit new
                </button>
            </div>
        </div>
    </section>
    <section>
        <p class="notification is-warning" v-if="!keyPair.publicKey">
            "public key" has not been set to encrypt application.
        </p>
        <p v-else>
            public key: <span id="public-key">{{ keyPair.publicKey.substring(0, 20) + " ..." }}</span> is used for
            encryption.
        </p>
    </section>

</template>

<style>
.button {
    margin-left: 1rem;
}

#submit>.control {
    text-align: right;
}

section {
    margin-bottom: 0.5rem;
}

#public-key {
    background-color: paleturquoise;
}
</style>

<script setup lang="ts">
import { Application } from "@/domain/entities/Application";

class NewApp implements Application {
    name = "";
    public_data = "";
    sensitive_data = "";

    get isValid(): boolean {
        return this.name.length > 0
            && this.public_data.length > 0
            && this.sensitive_data.length > 0;
    }
}

const newApp = ref(new NewApp());

const { addNewApp } = useApplications();
const keyPair = useKeyPair();

async function submitNew() {
    await addNewApp(newApp.value, keyPair.value.publicKey);
    newApp.value = new NewApp();
}

function clear() {
    newApp.value = new NewApp();
}
</script>