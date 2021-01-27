<template>
  <div class="footer">
    <footer>
      <ul>
        <li>
          <h5>Adresse</h5>
          Unter den Eichen 5 <br />
          65195 Wiesbaden
        </li>
        <li>
          <h5>PflaMoeHus GmbH</h5>
          Geschäftsinhaber: Peter Pan <br />
          List-Id: 17171717171717
        </li>
        <li>
          <h5>E-Mail</h5>
          email@mail.de <br />
          Tel.: 01234 56789
        </li>
      </ul>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
.footer {
  clear: both;
}

footer {
    color:white;
    background-color: $color-green;
    height: 10%;
    font-size: 1em;
    
}

footer ul li {
  display: inline-block;
  list-style: none;
  padding: 5% 10%;
  text-align: center;
}
</style>