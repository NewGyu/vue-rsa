<template>
    <table class="table is-fullwidth">
        <caption class="title is-5">received applications</caption>
        <thead>
            <tr>
                <th>App name</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="app in apps">
                <td>{{ app.name }}</td>
                <td>
                    <a class="button is-small" @click="emitShowDetail(app)">
                        show
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { Application } from "@/domain/entities/Application";

const { apps } = useApplications();

const emits = defineEmits(["selected"]);

function emitShowDetail(app: Application) {
    emits("selected", app);
}
</script>