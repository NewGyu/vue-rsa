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
                <button class="button is-primary" :disabled="!newApp.isValid" @click="submitNew">
                    Submit new
                </button>
            </div>
        </div>
    </section>
</template>

<style>
.button {
    margin-left: 1rem;
}

#submit>.control {
    text-align: right;
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

const stored_applications = useApplications();

function submitNew() {
    stored_applications.value.push(newApp.value);
    newApp.value = new NewApp();
}

function clear() {
    newApp.value = new NewApp();
}
</script>