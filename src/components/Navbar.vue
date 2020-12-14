<template>
    <div class="navbar">
    <nav>
        <router-link to="/">
            <img src="@/assets/logoPFlAMOEHUS.jpg" alt="Logo" id="logo"/>
        </router-link>
        <ul>
            <li><router-link :to="{ path: '/product/alle', query: { room: 'alle', producttype: 'alle' }}">Produkte</router-link>
                <ul>
                    <li id="link"><router-link :to="{ path: '/product/Pflanzen', query: { room: 'alle', producttype: 'Pflanze'  }}">Pflanzen</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Tische', query: { room: 'alle', producttype: 'Tisch'  }}">Tische</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Stuehle', query: { room: 'alle', producttype: 'Stuhl'  }}">Stühle</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Betten', query: { room: 'alle', producttype: 'Bett'  }}">Betten</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Deko', query: { room: 'alle', producttype: 'Dekoration'  }}">Deko</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/SofaCouch', query: { room: 'alle', producttype: 'Sofa/Couch'  }}">Sofa/Couch</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/SchrankKommode', query: { room: 'alle', producttype: 'Schrank/Kommode'  }}">Schränke/Kommoden</router-link></li>
                </ul>
            </li>
            <li><router-link to="/rooms">Räume</router-link>
                <ul>
                    <li id="link"><router-link :to="{ path: '/product/Bad', query: { room: 'Bad', producttype: 'alle'  }}">Bad</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Schlafzimmer', query: { room: 'Schlafzimmer', producttype: 'alle'  }}">Schlafzimmer</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Kueche', query: { room: 'Kueche', producttype: 'alle'  }}">Küche</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Wohnzimmer', query: { room: 'Wohnzimmer', producttype: 'alle'  }}">Wohnzimmer</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Esszimmer', query: { room: 'Esszimmer', producttype: 'alle'  }}">Esszimmer</router-link></li>
                    <li id="link"><router-link :to="{ path: '/product/Arbeitszimmer', query: { room: 'Arbeitszimmer', producttype: 'alle'  }}">Arbeitszimmer</router-link></li>
                </ul>
            </li>
            <div class="navright">
                <li>
                    <div class="search-box">
                        <input class="search-txt" v-model="search" placeholder="Suchen">
                        <a class="search-btn" href="#">
                            <img src="../assets/magnifyingglass.png" alt="" >

                        </a>
                    </div> 
                </li>
                <li><router-link to="/cart">
                        <img src="../assets/warenkorb.png" alt="cart" id="icon"/>
                    </router-link></li>
                <li><router-link to="/favorits">
                        <img src="../assets/fav.png" alt="wishlist" id="icon"/>
                    </router-link></li>
                <li><router-link to="/profil">
                    <img src="../assets/profil.png" alt="profile" id="icon"/>
                </router-link></li>
            </div>
        </ul>
    </nav>
    </div>
</template>

<script lang="ts">

    // import {defineComponent, ref} from "@vue/composition-api";
    // export default defineComponent({
    //     name: "Navbar2",
    //     props:{},
    //     setup() {
    //         const zaehler = ref(0);
           
    //         function zaehlmal() {
      
    //             zaehler.value++;
    //         }

    //         return{
    //             zaehler,
    //         };
    //     }

       
    // });

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
    transition: transform .25s .1s ease-in-out;
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
    height: 30px;
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