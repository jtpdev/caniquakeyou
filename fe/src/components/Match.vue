<template>
    <div>
        Nome:
        <input type="text" v-model="match.name">
        Data:
        <input type="date" v-model="match.date">
        <div>
            <table>
                <tr>
                    <th>
                        <input type="text" v-model="player.name" placeholder="Nome do jogador">
                    </th>
                    <th>
                        <input type="number" v-model="player.points" placeholder="Pontos">
                    </th>
                    <th>
                        <input type="number" v-model="player.kills" placeholder="Kills">
                    </th>
                    <th>
                        <input type="number" v-model="player.deads" placeholder="Deads">
                    </th>
                    <th>
                        <button @click="clear()">Limpar</button>
                    </th>
                    <th>
                        <button @click="addPlayer()">+</button>
                    </th>
                </tr>
            </table>
        </div>
        <div>
            <table>
                <thead>
                 <tr>
                    <th>
                        Nome do jogador
                    </th>
                    <th>
                        Pontos
                    </th>
                    <th>
                        Kills
                    </th>
                    <th>
                        Deads
                    </th>
                    <th>
                        <button @click="deleteAll()">Excluir todos</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                     <tr v-for="player in match.players" @click="updatePlayer(player)">
                        <th>
                            {{player.name}}
                        </th>
                        <th>
                            {{player.points}}
                        </th>
                        <th>
                            {{player.kills}}
                        </th>
                        <th>
                            {{player.deads}}
                        </th>
                        <th>
                            <button @click="deletePlayer(player)">-</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="save()">Salvar</button>
    </div>
</template>

<script>
import MatchService from "../services/matches";

export default {
  data() {
    return {
      match: {},
      player: {}
    };
  },
  created() {
    this.service = new MatchService(this.$resource);
    this.match.players = [];
  },
  methods: {
    addPlayer() {
      let player = this.match.players.filter(p => p.name == this.player.name);
      if (player) {
        this.deletePlayer(player);
      }
      this.match.players.push(this.player);
      this.clear();
    },
    clear() {
      this.player = {};
    },
    updatePlayer(player) {
      this.player = {
        name: player.name,
        points: player.points,
        kills: player.kills,
        deads: player.deads
      };
    },
    deletePlayer(player) {
      this.match.players = this.match.players.filter(
        p => player.name != p.name
      );
    },
    deleteAll() {
      this.match.players = [];
    },
    save() {
        let match = this.match;
        let data = {
            match,
            user: {
                authKey: localStorage.authKey
            }
        }
        console.log(JSON.stringify(data))
        this.service.saveMatch(data).then(match => {
            this.match = {};
            this.match.players = [];
            this.player = {};
        })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

