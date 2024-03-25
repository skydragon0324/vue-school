<template>
  <div class="flex flex-col justify-center items-center gap-5">
    <!-- <div>
      <h1 class="text-2xl">Display The Paginated Posts Here</h1>
      <ul class="list-disc list-inside ml-10">
        <li>Keep performance in mind</li>
        <li>Make sure to display optimized images</li>
        <li>Paginate according to your desired strategy</li>
        <li>Provide a sort order control</li>
        <li>Store the sort order in the URL</li>
        <li>Make it look good 💪</li>
        <li>
          Then
          <NuxtLink class="text-blue-500 underline" to="/posts/hello">
            go to the next task (displaying the individual post)</NuxtLink
          >
        </li>
      </ul>
    </div> -->
    <div
      class="flex-col flex justify-center items-center mx-auto max-w-md my-auto h-[200px] gap-5"
    >
      <h1 class="text-4xl font-extrabold">Our Blog</h1>
      <p class="text-gray-700 text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
        doloremque voluptates maiores esse reiciendis laboriosam vel dolores!
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 justify-end pr-5">
        <input type="checkbox" v-model="newest" />
        <p class="text-base font-serif text-black">Newest to oldest</p>
      </div>
      <div
        class="grid md:grid-cols-2 grid-cols-1 justify-center gap-8 md:w-[1200px] p-5"
      >
        <div class="" v-for="post in blogs" :key="post.id">
          <Blog :blog="post" />
        </div>
      </div>
      <div class="flex justify-center items-center">Loding...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
// import type { Post } from "@/types";
import type { Post } from "@/types";
import Blog from "@/components/Blog.vue";

const blogs = ref<Post[]>([]);
const loading = ref<boolean>(false);
const offset = ref<number>(0);
const newest = ref<boolean>(false);

const fetchData = async () => {
  try {
    loading.value = true;
    const route = useRoute();
    const router = useRouter();
    const order = newest.value ? "newestFirst" : "oldestFirst";
    router.push({
      query: {
        ...route.query,
        order: newest.value ? "newestFirst" : "oldestFirst",
      },
    });
    const response: Post[] = await $fetch(
      `/api/posts?include=user&offset=${offset.value * 10}&limit=10&order=${order}`,
    );
    blogs.value.push(...response);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (
      window.scrollY ===
      document.documentElement.scrollHeight - window.innerHeight
    ) {
      offset.value += 1;
      fetchData();
    }
  });
});

watch(newest, () => {
  offset.value = 0;
  blogs.value = [];
  fetchData();
});

onBeforeMount(() => {
  fetchData();
});
</script>
