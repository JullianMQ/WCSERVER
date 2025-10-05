<script lang="js">
export default {
  name: 'Blog',
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Getting Started with Vue',
          author: 'Jullian Q.',
          date: 'Sept 20, 2025',
          content: 'Vue makes building interactive UIs simple and fun.',
          likes: 3,
        },
        {
          id: 2,
          title: 'Bootswatch for Styling',
          author: 'Guest Author',
          date: 'Sept 18, 2025',
          content: 'Bootswatch themes give Bootstrap a quick facelift.',
          likes: 5,
        },
      ],
    }
  },
  methods: {
    likePost(id) {
      this.posts = this.posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    },
  },
}
</script>

<template>
  <h1 class="mb-4 text-center">My Simple Blog</h1>

  <div v-for="post in posts" :key="post.id" class="card mb-4 shadow-sm">
    <div class="card-body">
      <h4 class="card-title">{{ post.title }}</h4>
      <p class="card-text text-muted small">By {{ post.author }} · {{ post.date }}</p>
      <p class="card-text">{{ post.content }}</p>
      <button class="btn btn-primary btn-sm" @click="likePost(post.id)">👍 {{ post.likes }}</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.class {
  font-size: 64px;
}
</style>
