<script setup>
import { ref } from 'vue'
// const title = ref("The Ledger")
// const author = ref("Joseph Esquivel")
// const age = ref(24)
// const message = ref("Hello Vue")
// const seen = true
//
// const showBooks = ref(true)
// const btitle = "The Ledger"
// const bauthor = "Joseph"
// const year = 2008
// const ok = true
//
// function toggleShowBooks() {
//     showBooks.value = !showBooks.value
// }

const todos = [
     'Clean the House' ,
     'Prepare Breakfast' ,
     'Attend WSERVER Class' ,
]
</script>

<template>

    <div>
        <ol>
            <li v-for="todo in todos">
                {{ todo }}
            </li>
        </ol>
    </div>


    <!--
    <h2>This is my template</h2>
    <p>{{ title }} - {{ author }} - {{ age }}</p>
    <button v-on:click="age++">Get older</button>
    <button v-on:click="age--">Get younger</button>
    <button @click="title = 'The title has changed.'">Change title</button>

    <p>{{ message }}</p>
    <input v-model="message" />

    <div>
        <span v-if="seen">Now you see me</span>
    </div>

    <div v-if="showBooks">
        <p>{{ btitle }} - {{ bauthor }} - {{ year }}</p>
    </div>

    <button @click="toggleShowBooks">
        <span v-if="showBooks">Hide Books</span>
        <span v-else>Show Books</span>
    </button>

    <h1 v-show="ok">Hello!</h1>
    -->
</template>

<style scoped></style>
