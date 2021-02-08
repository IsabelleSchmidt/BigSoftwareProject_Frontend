<template>
  <ul class="productlistline">
    <a id="hitbox" @click="openproduct()" >
      <div class="productListObject">
        <img
          v-bind:src="'/api/picture/'+product.allPictures[0].id"
          alt="Picture"
          class="pic"
        />
        <div class="bg">
          <li>{{ product.name }}</li>
          <li>{{ product.price }} €</li>
        </div>
      </div>
    </a>
  </ul>
</template>

<script lang="ts">
import "../service/Product";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductListObject",
  props: {
    product: Object,
  },
  setup(props, context) {
    function openproduct(): void {
      // send event to component above (CompProduct)
      context.emit("open-prod", props.product);
    }

    return {
      openproduct,
    };
  },
});
</script>

<style scoped lang="scss">
.pic {
  border-radius: 10px 10px 0px 0px;
  width: 300px;
  height: 300px;
  object-fit: cover;
  object-position: bottom center;
}
.bg {
  border-radius: 0px 0px 10px 10px;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  background-color: $color-grey;
  width: 300px;
  text-align: center;
}
#hitbox{
  cursor: pointer;
}

ul {
  list-style-type: none;
}
</style>