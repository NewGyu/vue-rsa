<template>
    <NuxtLink to="keymanagement">
        <button class="button">Key Management</button>
    </NuxtLink>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h2 class="title">Applicant</h2>
                <ApplicantPage />
            </article>

        </div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h2 class="title">Reviewer</h2>
                <ReviewerPage />
            </article>
        </div>
    </div>
</template>

