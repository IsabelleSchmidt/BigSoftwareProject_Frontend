<template>
  <div class="navbar">
    <nav @click="closeFilter()">
      <router-link to="/" @click="closeSearch()">
        <img src="@/assets/logoPFlAMOEHUS.jpg" alt="Logo" id="logo" />
        
      </router-link>
      <ul>
        <li>
          <router-link
            :to="{
              path: '/product',
              query: { room: 'all', productType: 'all', name: 'none' },
            }"
            @click="closeSearch()"
            >Produkte</router-link
          >
          <ul>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: { room: 'all', productType: 'PLANT', name: 'none' },
                }"
                @click="closeSearch()"
                >Pflanzen</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: { room: 'all', productType: 'TABLE', name: 'none' },
                }"
                @click="closeSearch()"
                >Tische</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: { room: 'all', productType: 'CHAIR', name: 'none' },
                }"
                @click="closeSearch()"
                >Stühle</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: { room: 'all', productType: 'BED', name: 'none' },
                }"
                @click="closeSearch()"
                >Betten</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: {
                    room: 'all',
                    productType: 'DECORATION',
                    name: 'none',
                  },
                }"
                @click="closeSearch()"
                >Deko</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: {
                    room: 'all',
                    productType: 'COUCH',
                    name: 'none',
                  },
                }"
                @click="closeSearch()"
                >Sofa/Couch</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: {
                    room: 'all',
                    productType: 'CLOSET',
                    name: 'none',
                  },
                }"
                @click="closeSearch()"
                >Schränke/Kommoden</router-link
              >
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/rooms" @click="closeSearch()">Räume</router-link>
          <ul>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: { room: 'BATHROOM', productType: 'all', name: 'none' },
                }"
                @click="closeSearch()"
                >Bad</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: {
                    room: 'BEDROOM',
                    productType: 'all',
                    name: 'none',
                  },
                }"
                @click="closeSearch()"
                >Schlafzimmer</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: { room: 'KITCHEN', productType: 'all', name: 'none' },
                }"
                @click="closeSearch()"
                >Küche</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: {
                    room: 'LIVINGROOM',
                    productType: 'all',
                    name: 'none',
                  },
                }"
                @click="closeSearch()"
                >Wohnzimmer</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: {
                    room: 'DININGROOM',
                    productType: 'all',
                    name: 'none',
                  },
                }"
                @click="closeSearch()"
                >Esszimmer</router-link
              >
            </li>
            <li id="link">
              <router-link
                :to="{
                  path: '/product',
                  query: {
                    room: 'BUREAU',
                    productType: 'all',
                    name: 'none',
                  },
                }"
                @click="closeSearch()"
                >Arbeitszimmer</router-link
              >
            </li>
          </ul>
        </li>
        <div class="navright">
          <li>
            <div class="search-box">
              <input v-model="searchinput" class="search-txt" placeholder="Suchen" @keyup.enter="enterClicked()">
              <a class="search-btn" @click="search()">
                <img src="../assets/magnifyingglass.png" alt="" />
              </a>
            </div>
          </li>
          <li>
            <div id="margin">
              <router-link to="/cart" id="hitbox" @click="closeSearch()">
                <img src="../assets/warenkorb.png" alt="cart" id="icon" />
                <span v-if="amount > 0" class="total-amount">{{ amount }}</span>
              </router-link>
            </div>
          </li>
          <li>
            <div id="margin">
              <router-link to="/profil" id="hitbox" @click="closeSearch()">
                <img src="../assets/profil.png" alt="profile" id="icon" />
              </router-link>
            </div>            
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" >
    import {defineComponent, ref, watch, computed} from "vue";
    import {useFilterStore} from "../service/FilterStore";
    import {useSearchStore} from "../service/SearchStore"
    import {useRouter} from 'vue-router'
    import { useCartStore } from "@/service/CartStore.ts";

        export default defineComponent({
        name: "Navbar2",
         setup() {
            const {setFilterClose} = useFilterStore();
            const {setSearchactive, setSearchword, clearSearch, searchaktive} = useSearchStore();
            const router = useRouter();

            const { getCartAmount } = useCartStore();
            const amount = computed(() => getCartAmount());
            

            const searchinput = ref("");

            //close filter
            function closeFilter(): void{
                setFilterClose(true);
            }

            function search() {
                console.log("search: " + searchinput.value);
                setSearchactive(true);
                setSearchword(searchinput.value);
                router.push({ path: '/product', query: { room: 'all', productType: 'all', name: 'none' }});
            }

            function closeSearch() {
                clearSearch();
            }

            watch(searchaktive, (searchaktive) => {
                if (!searchaktive) {
                    searchinput.value = "";
                }
            })

            function enterClicked() {
                search();
            }

           return{
              amount,
               closeFilter,
               search,
               searchinput,
               closeSearch,
               enterClicked,
          };
        }
        
     });

</script>

<style scoped lang="scss">

#logo{
    height: 50px;
}
#icon{
    height: 24px;
    padding: 0px 10px 0px 10px;
}
#hitbox{
    padding: 0;
}
#margin{
    margin: 15px 10px 0px 10px;
}
nav{
    width: 100%;
    height: 60px;
    background-color: white;
    top:0;
    right:0;
    left:0;
    position: relative;
    z-index: 1!important;
}

.down nav {
  transform: translate3d(0, -60px, 0);
}

.up nav {
  position: fixed;
}

nav img {
    color: $color-dark;
    font-size: 24px;
    line-height: 55px;
    float: left;
    padding: 0px 20px;
}

nav ul li {
  float: left;
  list-style: none;
  position: relative;
}

nav ul li a {
    display: block;
    color: $color-dark;
    font-size: 14px;
    padding: 16px 14px;
    text-decoration: none;
}

nav ul li a:hover {
    color: $color-green;
    text-decoration: none;
}

nav ul li ul {
    display: none;
    position: absolute;
    background-color: white;
    padding: 10px ;
    border-radius: 0px 0px 4px 4px; 
}

nav ul li:hover ul {
  display: block;
}

nav ul li ul li {
  width: 180px;
  text-align: left;
}

nav ul li ul li #link {
  padding: 8px 14px;
}

nav ul li ul li a:hover {
    background-color: $color-grey;
    text-decoration: none;
}

nav ul li input {
  margin: 12px 10px 10px 10px;
}

.navright {
  float: right;
}

.search-box {  
    height: 26px;
    width: 250px;
    background: $color-grey;
    border-radius: 40px;
    padding: 10px;
    margin: 8px 0px 0px 0px;
}

.search-btn img {
  float: right;
  width: 20px;

  padding: 0px 0px 10px 0px;
}

.search-btn {
  padding: 0px 5px 10px 0px;
}

.search-txt {
    border:none;
    background:none;
    outline:none;
    float: left;
    color: $color-dark;
    font-size: 16px;
    transition: 0.4s;
    line-height: 20px;
    width: 80px;
    margin: 3px 0px 10px 10px;
}
.total-amount {
  align-items: center;
  background: #3ba07c;
  color: #f3f3f3;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  height: 1em;
  justify-content: center;
  padding: 0.25rem;
  position: absolute;
  right: 20px;
  top: 5px;
  width: 1em;
}
</style>