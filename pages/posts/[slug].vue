<template>
  <div class="flex flex-col justify-center items-center">
    <div class="mt-6 flex flex-col gap-6 w-full p-2 md:w-max" v-if="blog != null">
      <div class="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <div class="flex gap-1">
          <NuxtImg
            :src="blog.user.avatar"
            :placeholder="img(`/nuxtImg.png`, { h: 10, f: 'png', blur: 2, q: 50 })"
            class="w-12 h-12 rounded-full mr-4"
            :alt="blog.user.id"
            loading="lazy"
          />
          <div class="flex flex-col">
            <h1 class="text-lg font-bold">
              {{ blog.user.firstName }} {{ blog.user.lastName }}
            </h1>
            <p class="text-base">{{ formatDate(blog.publishedAt) }}</p>
          </div>
        </div>
        <button
          @click="router.back()"
          class="text-xl text-purple-600 font-semibold py-2 px-16 hover:bg-gray-400 bg-gray-200 rounded-xl"
        >
          Back
        </button>
      </div>
      <div class="text-gray-900 font-extrabold md:text-2xl text-lg mb-2">
        {{ blog.title }}
      </div>
      <NuxtImg
        :src="blog.image"
        :placeholder="img(`/nuxtImg.png`, { h: 10, f: 'png', blur: 2, q: 50 })"
        :alt="blog.title"
        class="h-auto w-[550px] object-cover lg:rounded-none rounded-t lg:rounded-l"
        loading="lazy"
      />
      <div class="flex flex-col prose" v-html="blog.content"></div>
    </div>
    <div class="text-base text-gray-600" v-if="loading"> Loading.... </div>
    <!-- <div>
      <h1 class="text-2xl">Display the Individual Post Here</h1>
      <ul class="list-disc list-inside ml-10">
        <li>Keep seo in mind</li>
        <li>Make sure to display optimized images</li>
        <li>Make it look good 💪</li>
      </ul>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Post } from "@/types";

const blog = ref<Post | null>(null);
const loading = ref<boolean>(false);
const img = useImage();

const route = useRoute();
const router = useRouter();
const fetchData = async (slug: string) => {
  loading.value = true;
  fetch(`/api/posts/${slug}?include=user`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => (blog.value = data))
    .catch((error) => {
      console.log("error", error);
      router.push("/posts/no-exist");
    })
    .finally(() => (loading.value = false));
};
console.log("blog", blog);

onMounted(() => {
  const blogSlug = route.params.slug;
  fetchData(blogSlug as string);
});

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};
</script>
