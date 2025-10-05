<script lang="js">
export default {
  name: "Contact",
  data() {
    return {
      form: { name: "", email: "", message: "" },
      submitted: false
    }
  },
  methods: {
    submitForm() {
      this.submitted = true
      this.form = { name: "", email: "", message: "" }
    }
  }
}
</script>

<template>
  <h1 class="mb-4 text-center">Contact Me</h1>

  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">Get in Touch</h5>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input v-model="form.name" type="text" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Message</label>
          <textarea v-model="form.message" rows="3" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </div>
  </div>

  <div v-if="submitted" class="alert alert-success mt-3">
    ✅ Thank you, {{ form.name }}! I’ll get back to you soon.
  </div>
</template>

<style lang="css" scoped>
.class {
  font-size: 64px;
}
</style>
