<template>
    <section class="hero is-primary">
        <div class="hero-head">
            <h1 class="title">An example</h1>
        </div>
        <div class="hero-foot">
            <Mynav />
        </div>
    </section>
    <section class="section">
        <slot />
    </section>
</template>

<style scoped>
.hero {
    padding: 0.5rem;
}
</style>