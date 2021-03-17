<template>
  <div class="panel">
    <div class="borderStyle info_board">
      <span class="borderStyle info_text">{{infoString}}</span>
      <div class="borderStyle role_wrapper" v-show="!(isWin.isGameFinish&&isWin.winner=='')">
        <circle-item v-bind:size="scale" v-show="currentRole==1">
        </circle-item>
        <cross-item v-bind:size="scale" v-show="currentRole==-1">
        </cross-item>
      </div>
    </div>
    <div class="borderStyle block_wrapper" v-bind:style="gameScaleSize">
      <div v-for="(i, index) in (scale*scale)"
        v-bind:key="index"
        v-on:click="updateGameBlocks(index)"
        class="borderStyle game_item">
          <circle-item v-bind:size="scale" v-show="blocks[index].owner==1">
          </circle-item>
          <cross-item v-bind:size="scale" v-show="blocks[index].owner==-1">
          </cross-item>
      </div>
    </div>
    <button class="borderStyle restart_button" v-on:click="init(scale, condition)">Restart</button>
    <div class="borderStyle setting_group">
      <div class="borderStyle">
        <span> Scale </span>
        <select v-model.number="scale">
          <option v-for="(n, index) in 13" v-bind:key="index">
            {{ index + 3 }}
          </option>
        </select>
      </div>
      <div class="borderStyle">
        <span> Condition </span>
        <select v-model.number="condition">
          <option v-for="(n, index) in conditionArr" v-bind:key="index">
            {{ n }}
          </option>
        </select>
        {{condition}}
      </div>
    </div>
  </div>
</template>

<script>

const CIRCLE_DEF = 1
const CROSS_DEF = -1
const TOGGLE = -1
const DEFAULT_GAME_SCALE = 3

import CircleItem from '../components/CircleItem'
import CrossItem from '../components/CrossItem'
import * as CommonUtils from '../commonUtils'

export default {
  name: 'HelloWorld',
  data () {
    return {
      currentRole: CIRCLE_DEF,
      scale: DEFAULT_GAME_SCALE,
      condition: 3,
      blocks: {},
      conditionArr: [],
      winCaseArray: [],
      playerResult:{
        "1": [],
        "-1": []
      },
      isWin:{
        winner: "",
        winnerArray: [],
        isGameFinish: false
      }
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(scale, condition){
      this.scale = scale || DEFAULT_GAME_SCALE
      this.condition = condition || 3
      this.currentRole = CIRCLE_DEF
      this.blocks = {}
      this.conditionArr = _.range(3, Number(DEFAULT_GAME_SCALE) + 1, 1)
      this.playerResult = {
        "1": [],
        "-1": []
      }
      this.isWin = {
        winner: "",
        winnerArray: [],
        isGameFinish: false
      }
      this.createGameBlock()
      this.createWinCaseArray()
    },
    createWinCaseArray(){
      this.winCaseArray = []
      this.winCaseArray = CommonUtils.CreatewinArray(this.scale, this.condition)
      console.log("WinCase", this.winCaseArray)
    },
    createGameBlock(){
      this.blocks = _.range(0, this.scale*this.scale).map((value, index) =>({
          id: index,
          owner: 0,
        })
      );
    },
    updatePlayer(){
      this.currentRole = this.currentRole * TOGGLE
    },
    updateGameBlocks(index){
      if (this.blocks[index].owner !== 0 || this.isWin.isGameFinish) {
        return
      }
      console.log(index , " is hit")
      this.blocks[index].owner = this.currentRole
      this.playerResult[this.currentRole].push(index)
      this.checkWinner()
    },
    checkWinner(){
      let result = false
      let winnerArray = []
      let roleArr = this.playerResult[this.currentRole]
      this.winCaseArray.forEach(winArr => {
        result = winArr.every(val => roleArr.includes(val));
        if (result) {
          winnerArray.push(winArr)
        }
      });
      if (winnerArray.length > 0) {
        console.log("Winner is ",(this.currentRole))
        this.isWin.winner = this.currentRole
        this.isWin.winnerArray = winnerArray
        this.isWin.isGameFinish = true
      }
      else{
        this.isWin.isGameFinish = false
        this.updatePlayer()
      }

      if(!this.blocks.some(arr=> arr.owner == 0)) {
        this.isWin.isGameFinish = true
      }
    },
    updateCondition(){
      this.conditionArr = _.range(3, Number(this.scale) + 1, 1)
      
      if (Number(this.scale) < Number(this.condition)) {
        this.condition = this.scale
      }
      
      this.blocks = {}
      this.blocks = _.range(0, this.scale*this.scale).map((value, index) =>({
          id: index,
          owner: 0,
        })
      );
    }
  },
  computed:{
    gameScaleSize: function(){
      return {
        "grid-template-columns": `repeat(${this.scale},1fr)`,
        "grid-template-rows": `repeat(${this.scale},1fr)`,
        "grid-gap": `${45/this.scale}px  ${45/this.scale}px`,
      }
    },
    circleSize: function(){
      return {
        "border": `${4.5/this.scale}em solid white`,
      }
    },
    infoString: function(){
      if (this.isWin.isGameFinish) {
        if (this.isWin.winner != "") {
          return "Winner is"
        } else {
          return "Game Tie"
        }
      } else {
        return "Next Player"
      }
    }
  },
  watch:{
    scale(){
      this.init(this.scale, this.condition)
      this.updateCondition()
    },
    condition(){
      // this.createWinCaseArray()
      this.init(this.scale, this.condition)
      this.updateCondition()
    }
  },
  components:{
    CircleItem,
    CrossItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borderStyle{
  border: 1px solid red;
}
.panel {
  margin-top: 30px;
}

/* Info Board */
.info_board {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  font-weight: 900;
  text-shadow: 2px 0px white;
}

.role_wrapper {
  height: 100px;
  width: 100px;
  font-weight: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info_text {
  font-size: 2.5em;
  /* letter-spacing: 10px; */
}

/* Main Wrapper*/
.block_wrapper {
  width: 600px;
  height: 600px;
  display: grid;
}

@media only screen and (max-width: 600px) {
  .block_wrapper {
    width: calc(100vw - 20px);
    height: calc(100vw - 20px);
  }
}
/* Tic Tac Toe item */
.game_item{
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  height: 100%;
  background: rgb(255, 153, 171);
  cursor: pointer;
}
.game_item:hover{
  background: rgb(252, 130, 152);
}

/* Restart Button */
.restart_button {
  width: 100%;
  line-height: 50px;
  font-size: 1.5em;
  letter-spacing: 1px;
  background: white;
  cursor: pointer;
  outline: none;
  margin: 10px 0px;
  padding: 5px 0px;
  border-radius: 5px;
  border: none;
  transition: all 0.25s ease-out;
}

.restart_button:hover {
  box-shadow: 0 10px 20px 0 black;
  transform:  translateY(-1px);
  color: brown;
}

 /* Setting */
.setting_group {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: repeat(1, 40px);
}

.setting_group select {
  font-size: 1.2em;
  outline: none;
  background: white;
}
</style>
