<template>
    <ReviewerApplicationList v-if="!showDetail()" @selected="appSelected" />
    <LazyReviewerApplicationDetail v-if="showDetail()" :app="currentApp" @closed="detailClosed" />
</template>

<script setup lang="ts">
import { Application } from '@/domain/entities/Application';

const currentApp = ref<Application>(null);

function showDetail() {
    return currentApp.value !== null;
}

function appSelected(app: Application) {
    currentApp.value = app;
}

function detailClosed() {
    currentApp.value = null;
}
</script>