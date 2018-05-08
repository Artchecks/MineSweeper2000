<template>
  <div
    :class="{ 'unrevealed': !revealed }"
    class="square"
    @click.left="reveal"
    @click.right="flag">
    <span v-show="revealed">{{ display }}</span>
    <span v-show="!revealed"/>
    <span v-show="flagged">🚩</span>
  </div>
</template>
<script>
import Square from '../Square.js'
export default {
  // create TheSquare element using data from Square.js
  name: 'TheSquare',
  props: {
    square: {
      type: Square,
      required: true
    }
  },
  computed: {
    content () {
      return this.square.getContents()
    },
    display () {
      if (this.content === null) {
        return ''
      } else if (this.content === 'M') {
        return '💣'
      } else {
        return this.content
      }
    },
    revealed () {
      return this.square.isRevealed
    },
    flagged () {
      return this.square.isFlagged && !this.revealed
    }
  },
  methods: {
    reveal () {
      this.$emit('reveal')
    },
    flag () {
      this.$emit('flag')
    }
  }
}
</script>

<style>
.square {
  height: 2em;
  width: 2em;
  border: 1px solid black;
  text-align: center;
  line-height: 2em;
  vertical-align: center;
}

.unrevealed {
  background-color: #aaaaaa;
}
</style>
