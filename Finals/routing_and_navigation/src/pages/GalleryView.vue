<script lang="js">
export default {
  name: "Gallery",
  data() {
    return {
      images: [
        { title: "Mountain View", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
        { title: "City Skyline", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
        { title: "Forest Path", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3" },
        { title: "Ocean Waves", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
        { title: "Desert Dunes", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixid=M3" },
        { title: "Snowy Peaks", url: "https://images.unsplash.com/photo-1518684079-9a02d3f48db4" }
      ]
    }
  }
}
</script>

<template>
  <h1 class="mb-4 text-center">Photo Gallery</h1>

  <div class="row g-3">
    <div v-for="(img, i) in images" :key="i" class="col-md-4 col-sm-6">
      <div class="card shadow-sm h-100">
        <img :src="img.url" :alt="img.title" class="card-img-top">
        <div class="card-body">
          <h6 class="card-title">{{ img.title }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.class {
  font-size: 64px;
}
</style>
