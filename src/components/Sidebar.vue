<template>
  <div class="sidebar">
    <h4>Produkte</h4>
    <ul>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'all', productType: 'PLANT', name: 'none' },
          }"
          >Pflanzen</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'all', productType: 'TABLE', name: 'none' },
          }"
          >Tische</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'all', productType: 'CHAIR', name: 'none' },
          }"
          >Stühle</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'all', productType: 'BED', name: 'none' },
          }"
          >Betten</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'all', productType: 'DECORATION', name: 'none' },
          }"
          >Deko</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'all', productType: 'COUCH', name: 'none' },
          }"
          >Sofa/Couch</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: {
              room: 'all',
              productType: 'CLOSET',
              name: 'none',
            },
          }"
          >Schränke/Kommoden</router-link
        >
      </li>
    </ul>

    <br />

    <h4>Räume</h4>
    <ul>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'BATHROOM', productType: 'all', name: 'none' },
          }"
          >Bad</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'BEDROOM', productType: 'all', name: 'none' },
          }"
          >Schlafzimmer</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'KITCHEN', productType: 'all', name: 'none' },
          }"
          >Küche</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'LIVINGROOM', productType: 'all', name: 'none' },
          }"
          >Wohnzimmer</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'DININGROOM', productType: 'all', name: 'none' },
          }"
          >Esszimmer</router-link
        >
      </li>
      <li>
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'BUREAU', productType: 'all', name: 'none' },
          }"
          >Arbeitszimmer</router-link
        >
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  text-align: left;
  color: black;
  float: left;
  background-color: #f3f3f3;
  padding: 1.5%;
  max-width: 15%;
  margin-left: 20px;
  margin-right: 30px;
  margin-top: 15px;
  border-radius: 5px;
  position: fixed;
}
ul {
  list-style-type: none;
  margin: 0px;
}
#link {
  color: black;
  text-decoration: none;
  list-style: none;
  list-style-type: none;
}
#link:hover {
  color: #6f492d;
  text-decoration: none;
}
li {
  font-size: 1.25vw;
}
h4 {
  font-size: 1.5vw;
  margin: 10px;
}
</style>