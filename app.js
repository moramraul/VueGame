function getRandom(min, max) {
return Math.floor(Math.random() * (max -min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0)
            {
                return {width: '0%'}
            }
            else {
            return {width: this.monsterHealth + '%'}}
        },
        playerBarStyles() {
            if (this.playerHealth < 0)
            {
                return {width: '0%'}
            }
            else {
            return {width: this.playerHealth + '%'}}
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
        },
        healPlayer() {
            const healValue = getRandom(8, 20);
            
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            }
            else{
                this.playerHealth += healValue
            };
            this.attackPlayer();
            this.currentRound++
        },
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0
        },
        surrender() {
            this.playerHealth = 0
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0)
            {
                this.winner = 'draw'
            }
            else if (value <= 0)
            {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0)
            {
                this.winner = 'draw'
            }
            else if (value <= 0)
            {
                this.winner = 'player'
            }
        }
    }
})

app.mount('#game')