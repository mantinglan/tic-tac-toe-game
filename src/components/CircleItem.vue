<template>
  <div class="circle_box">
    <span class="circle" v-bind:style="circleSize">
    </span>
  </div>
</template>

<script>

const DEFAULT_GAME_SCALE = 3

export default {
  name: 'HelloWorld',
  data () {
    return {
      scale: DEFAULT_GAME_SCALE
    }
  },
  props: {
    size: 0
  },
  created () {
    // this.init()
  },
  methods: {
    init () {
      console.log(this.size)
    }
  },
  computed: {
    circleSize: function () {
      return {
        'border': `${4.5 / this.size}em solid white`
      }
    }
  },
  watch: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Circle Style */
.circle_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 80%;
}

.circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 100%;
}
</style>
