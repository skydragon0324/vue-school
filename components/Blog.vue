<template>
  <div
    class="flex flex-col gap-5 p-8 border border-gray-300 rounded-xl shadow-md"
  >
    <div class="flex justify-between items-center">
      <div class="flex gap-1 items-center">
        <NuxtImg src="../public/svgs/article.svg" width="16" height="16" loading="lazy" />
        <p>Article</p>
      </div>
      <div class="text-gray-600">
        {{ getPeriod(blog.publishedAt) }}
      </div>
    </div>
    <NuxtImg
      :src="blog.image"
      :alt="blog.title"
      :placeholder="img(`/nuxtImg.png`, { h: 10, f: 'png', blur: 2, q: 50 })"
      class="lg:h-auto object-cover rounded-t lg:rounded-xl"
      loading="lazy"
      densities="x1 x2"
    />
    <div
      class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div>
        <div class="text-gray-900 font-extrabold md:text-2xl text-lg mb-2">
          {{ blog.title }}
        </div>
        <p class="text-gray-700 text-base">{{ blog.excerpt }}</p>
      </div>
      <div
        class="flex md:flex-row flex-col justify-between text-gray-900 leading-none md:font-extrabold font-bold text-base"
      >
        <div class="flex items-center">
          <NuxtImg
          :src="blog.user.avatar"
            :placeholder="img(`/nuxtImg.png`, { h: 60, f: 'png', blur: 2, q: 50 })"
            class="rounded-full mr-4 w-7 h-7"
            width="30" height="30"
            loading="lazy"
            :alt="blog.user.id"
          />
          <a class="hover:text-blue-800" :href="'mailto:' + blog.user.email"
            >{{ blog.user.firstName }} {{ blog.user.lastName }}</a
          >
        </div>
        <div
          class="flex gap-2 items-center w-full md:w-max hover:underline justify-center"
        >
          <NuxtLink :to="'/posts/' + blog.id" class="">Read more</NuxtLink>
          <img src="../public/svgs/arrow-right.svg" class="w-6 h-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Post } from "@/types";

const img = useImage()

const props = defineProps<{
  blog: Post;
}>();



const getPeriod = (timestamp: number) => {
  const currentTime = new Date();
  const elapsedTime = currentTime.getTime() - timestamp;

  const millisecondsPerMinute = 1000 * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;
  const millisecondsPerMonth = millisecondsPerDay * 30;
  const millisecondsPerYear = millisecondsPerDay * 365;

  if (elapsedTime < millisecondsPerMinute) {
    const seconds = Math.floor(elapsedTime / 1000);
    return `${seconds} second${seconds === 1 ? "" : "s"}`;
  } else if (elapsedTime < millisecondsPerHour) {
    const minutes = Math.floor(elapsedTime / millisecondsPerMinute);
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  } else if (elapsedTime < millisecondsPerDay) {
    const hours = Math.floor(elapsedTime / millisecondsPerHour);
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else if (elapsedTime < millisecondsPerMonth) {
    const days = Math.floor(elapsedTime / millisecondsPerDay);
    return `${days} day${days === 1 ? "" : "s"}`;
  } else if (elapsedTime < millisecondsPerYear) {
    const months = Math.floor(elapsedTime / millisecondsPerMonth);
    return `${months} month${months === 1 ? "" : "s"}`;
  } else {
    const years = Math.floor(elapsedTime / millisecondsPerYear);
    return `${years} year${years === 1 ? "" : "s"}`;
  }
};
</script>
