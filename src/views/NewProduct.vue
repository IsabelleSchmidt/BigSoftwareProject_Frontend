<template>
    <div class="newProduct">
        <h1>Neues Produkt anlegen</h1>

        <form action="">
            <div class="row">
                <div class="col1"><label for="name" class="left">Produktname</label></div>
                <div class="col2"><input type="text" name="name" size="30" maxlength="50" class="right"></div>
            </div>
            
            
            <div class="row">
                <div class="col1"><label for="productType" class="left">Produktart</label></div>
                <div class="col2"><input type="text" name="productType" size="30" maxlength="50" class="right"></div>
            </div>
            
            <div class="row">
                <div class="col1"><label for="roomType" class="left">Raumart</label></div>
                <div class="col2"><input type="text" name="roomType" size="30" maxlength="50" class="right"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="price" class="left">Preis</label></div>
                <div class="col2"><input type="number" name="price" step="0.01" class="right"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="dimensions" class="left">Maße in cm</label></div>
                <div class="col2"><input type="number" name="width" step="0.01" class="right"> x <input type="number" name="height" step="0.01"> x <input type="number" name="depth" step="0.01"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="nrAvailableItems" class="left">Stückzahl</label></div>
                <div class="col2"><input type="number" name="nrAvailableItems" step="1" class="right"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="picture">Bilder</label></div>
                <div class="col2"><input type="file" name="picture" accept="image/png, image/jpg, image/jpeg"></div>
            </div>

            <input type="submit" name="safeProduct">
        </form>
    </div>
</template>

<script>
    export default {
        name:"newProduct"
    }
</script>

<style scoped lang="scss">
h1{
    text-align: center;
}
form{
    margin: 5% 0% 15% 20%;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
.col1{
    float: left;
    width: 25%;

}
.col2{
    float: left;
    width: 75%;

}
.row:after{
    content: "";
    display: table;
    clear: both;
}

input:focus{
    outline-color: #3BA07C;
}
input[type=text]{
  width: 30%;
  padding: 0.25em;
  border: 1px solid #ccc;
  border-radius: 3px;
  resize: vertical;
}
input[type=number]{
  width: 8%;
  padding: 0.25em;
  border: 1px solid #ccc;
  border-radius: 3px;
  resize: vertical;
}
input[type=image]{
    width: 20%;
    padding: 0.25em;
    border: 1px solid #ccc;
    border-radius: 3px;
    resize: vertical;
}
input[type=submit]{
    margin: 5% 0% 0% 0%;
    padding: 1% 5%; 
    background-color: black;
    border-style: none;
    color: #fff;
    &:hover{
        background-color: #3BA07C;
    } 
    &:focus{
        outline: none;
    } 
} 
</style>