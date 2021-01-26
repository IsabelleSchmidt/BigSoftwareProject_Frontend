<template>
    <div class="navbar">
    <nav @click="closeFilter()">
        <router-link to="/">
            <img src="@/assets/logoPFlAMOEHUS.jpg" alt="Logo" id="logo"/>
        </router-link>
        <ul>
            <li><router-link :to="{ path: '/product', query: { room: 'all', productType: 'all', name: 'none' }}" @click="closeSearch()">Produkte</router-link>
                <ul>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'all', productType: 'Pflanze', name: 'none'}}" @click="closeSearch()">Pflanzen</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'all', productType: 'Tisch', name: 'none'}}" @click="closeSearch()">Tische</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'all', productType: 'Stuhl', name: 'none' }}" @click="closeSearch()">Stühle</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'all', productType: 'Bett', name: 'none' }}" @click="closeSearch()">Betten</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'all', productType: 'Dekoration', name: 'none'}}" @click="closeSearch()">Deko</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'all', productType: 'Sofa/Couch',name: 'none' }}" @click="closeSearch()">Sofa/Couch</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'all', productType: 'Schrank/Kommode', name: 'none'}}" @click="closeSearch()">Schränke/Kommoden</router-link></li>
                </ul>
            </li>
            <li><router-link to="/rooms" @click="closeSearch()">Räume</router-link>
                <ul>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'Bad', productType: 'all', name: 'none' }}" @click="closeSearch()">Bad</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'Schlafzimmer', productType: 'all', name: 'none' }}" @click="closeSearch()">Schlafzimmer</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'Kueche', productType: 'all', name: 'none' }}" @click="closeSearch()">Küche</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'Wohnzimmer', productType: 'all', name: 'none'}}" @click="closeSearch()">Wohnzimmer</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'Esszimmer', productType: 'all', name: 'none'}}" @click="closeSearch()">Esszimmer</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product', query: { room: 'Arbeitszimmer', productType: 'all', name: 'none'}}" @click="closeSearch()">Arbeitszimmer</router-link></li>
                </ul>
            </li>
            <div class="navright">
                <li>
                    <div class="search-box">
                        <input v-model="searchinput" class="search-txt" placeholder="Suchen" @keyup.enter="enterClicked()">
                        <a class="search-btn" @click=search()>
                            <img src="../assets/magnifyingglass.png" alt="" >

                        </a>
                    </div> 
                </li>
                <li><router-link to="/cart" @click="closeSearch()">
                        <img src="../assets/warenkorb.png" alt="cart" id="icon"/>
                    </router-link></li>
                <li><router-link to="/favorits">
                        <img src="../assets/fav.png" alt="wishlist" id="icon"/>
                    </router-link></li>
                <li><router-link to="/profil" @click="closeSearch()">
                    <img src="../assets/profil.png" alt="profile" id="icon"/>
                </router-link></li>
            </div>
            
        </ul>
        
    </nav>
    </div>
</template>

<script lang="ts" >
    import {defineComponent, ref, watch} from "vue";
    import {useFilterStore} from "../service/FilterStore";
    import {useSearchStore} from "../service/SearchStore"
    import {useRouter} from 'vue-router'

        export default defineComponent({
        name: "Navbar2",
         setup() {
            const {setFilterClose} = useFilterStore();
            const {setSearchactive, setSearchword, clearSearch, searchaktive} = useSearchStore();
            const router = useRouter();
            

            const searchinput = ref("");

            //close filter
            function closeFilter(): void{
                setFilterClose(true);
            }

            function search() {
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
}
nav{
    width: 100%;
    height: 60px;
    background-color: #fff;
    top:0;
    right:0;
    left:0;
    position: relative;
    z-index: 1!important;
}

.down nav {
    transform: translate3d(0, -60px, 0);
 }

 .up nav{
    position: fixed;
 }

nav img {
    color: #222;
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
    color: #222;
    font-size: 14px;
    padding: 16px 14px;
    text-decoration: none;
}

nav ul li a:hover {
    color: #3BA07C;
    text-decoration: none;
}

nav ul li ul {
    display: none;
    position: absolute;
    background-color: #fff;
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
    background-color: #f3f3f3;
    text-decoration: none;
}

nav ul li input {
    margin: 12px 10px 10px 10px ;
}

.navright {
    float: right;
}

.search-box {  
    height: 26px;
    width: 250px;
    background: #f3f3f3;
    border-radius: 40px;
    padding: 10px;
    margin: 8px 0px 0px 0px;
}

.search-btn img{
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
    color: #000000;
    font-size: 16px;
    transition: 0.4s;
    line-height: 20px;
    width: 80px;
    margin: 3px 0px 10px 10px;
}
</style>