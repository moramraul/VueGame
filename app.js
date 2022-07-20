function getRandom(min, max) {
return Math.floor(Math.random() * (max -min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMsg: []
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
            const attackValue = getRandom(5, 12);
            this.monsterHealth -= attackValue
            this.attackPlayer();
            this.currentRound++;
            this.addLogMessage('player', 'attack', attackValue)
        },
        attackPlayer() {
            const attackValue = getRandom(8, 20);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue)
        },
        specialAttack() {
            const attackValue = getRandom(10, 25);
            this.monsterHealth -= attackValue
            this.attackPlayer();
            this.currentRound++;
            this.addLogMessage('player', 'attack', attackValue)
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
            this.currentRound++;
            this.addLogMessage('player', 'heal', healValue)
        },
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMsg = []
        },
        surrender() {
            this.playerHealth = 0
        },
        addLogMessage(who, what, value) {
            this.logMsg.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
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