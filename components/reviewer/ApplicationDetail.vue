<template>
    <nav class="right">
        <button @click="close">x</button>
    </nav>
    <section>
        <div class="field">
            <label class="label">Application Name</label>
            <div class="control">
                <p>{{ app.name }}</p>
            </div>
        </div>
        <div class="field">
            <label class="label">Public data</label>
            <div class="control">
                <p>{{ app.public_data }}</p>
            </div>
        </div>
        <div class="field">
            <label class="label">Sensitive data</label>
            <div class="control">
                <ReviewerSensitiveDataField :encrypted-value="(app.sensitive_data as EncryptedStructure)" />
            </div>
        </div>
    </section>
</template>

<style>
nav.right {
    text-align: right;
}
</style>

<script setup lang="ts">
import { Application } from "@/domain/entities/Application";
import { EncryptedStructure } from "@/domain/entities/SensitiveData";

const props = defineProps<{ app: Application }>();
const app = ref(props.app);
const emits = defineEmits(["closed"]);

function close() {
    emits("closed");
}
</script>