function getRandom(min, max) {
return Math.floor(Math.random() * (max -min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        }
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    methods: {
        attackMonster() {
            this.monsterHealth -= getRandom(5, 12);
            this.attackPlayer();
            this.currentRound++
        },
        attackPlayer() {
            this.playerHealth -= getRandom(8, 20)
        },
        specialAttack() {
            this.monsterHealth -= getRandom(10, 25);
            this.attackPlayer();
            this.currentRound++
        }
    }
})

app.mount('#game')