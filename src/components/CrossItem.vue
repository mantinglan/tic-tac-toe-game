<template>
  <div class="cross_box">
    <span class="cross" :style="crossSize">
    </span>
  </div>
</template>

<script>

const DEFAULT_GAME_SCALE = 3

export default {
  name: 'HelloWorld',
  data () {
    return {
      bgColor: 'red',
      widthVar: "1.5em"
    }
  },
  props: {
    size: 0
  },
  created () {
    this.init()
  },
  methods: {
    init () {
    }
  },
  computed: {
    crossSize: function () {
      this.widthVar = `${4.5 / this.size}em`
      return {'--widthVar': `${4.5 / this.size}em`}
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*   cross Style */
.cross_box {
  height: 80%;
  width: 80%;
}

.cross {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cross::after {
  content: ' ';
  border-radius: 10px;
  width: 110%;
  background-color: black;
  position: absolute;
  height: var(--widthVar);
  transform: rotate(-45deg);
}

.cross::before {
  content: ' ';
  border-radius: 10px;
  width: 110%;
  background-color: black;
  position: absolute;
  height: var(--widthVar);
  transform: rotate(45deg);
}
</style>
