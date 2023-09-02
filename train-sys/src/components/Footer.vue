<template>
  <v-layout>
    <v-footer absolute class="text-center d-flex flex-column b-0">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>

        <v-btn
          icon
          variant="text"
          class="mx-4"
          href="https://www.linkedin.com/in/leoreiis/"
          target="_blank"
        >
          <v-icon>mdi-linkedin</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <div>
        {{ new Date().getFullYear() }} —
        <strong> Saiya Gym</strong>
      </div>
    </v-footer>
  </v-layout>
</template>

<script></script>

<style></style>
