<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
     </button>

      <RouterLink to="/about">Go to About</RouterLink>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/blog">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/gallery">Gallery</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/contact">Contact</RouterLink>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-sm-2" type="search" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
    <main>
      <RouterView />
    </main>
</template>

<style scoped></style>
