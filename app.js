const getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        };
    },
    methods: {
        startNewGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessages("Player", "attack", attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessages("Monster", "attack", attackValue);
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessages("Player", "S-attack", attackValue);

            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessages("Player", "heal", healValue);

            this.attackPlayer();
        },
        surrender() {
            this.winner = "Monster";
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });
        },
    },
    computed: {
        monsterLife() {
            if (this.monsterHealth <= 0) {
                return { width: "0%" };
            }
            return { width: this.monsterHealth + "%" };
        },
        playerLife() {
            if (this.playerHealth <= 0) {
                return { width: "0%" };
            }
            return { width: this.playerHealth + "%" };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "Draw";
            } else if (value <= 0) {
                this.winner = "Monster";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "Draw";
            } else if (value <= 0) {
                this.winner = "Player";
            }
        },
    },
});
app.mount("#game");
