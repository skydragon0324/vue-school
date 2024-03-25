<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-8xl font-extrabold text-gray-800 mb-4">404</h1>
    <p class="text-3xl text-black font-bold">Post not be found.</p>
    <p class="text-md text-gray-400">
      Sorry, we can't find that page. You'll find lots to explore on the home
      page
    </p>
    <NuxtLink
      to="/posts"
      class="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >Back to Homepage</NuxtLink
    >
  </div>
</template>

<script setup>
document.title = "No Exist | Dev Blog";
</script>
