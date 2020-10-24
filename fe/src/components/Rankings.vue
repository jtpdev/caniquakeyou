<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Posição</th>
                    <th>Jogador</th>
                    <th>Pontuação</th>
                    <th>K/D</th>
                    <th>KDR</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(player, index) in ranking">
                    <th>{{ index + 1 }}</th>
                    <th>{{ player.name }}</th>
                    <th>{{ player.points }}</th>
                    <th>{{ player.kills + '/' +  player.deads}}</th>
                    <th>{{ Math.round(player.kills/player.deads*100)/100}}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import RankingService from "../services/ranking";

export default {
  data() {
    return {
      matches: [],
      filteredMatches: [],
      ranking: []
    };
  },
  created() {
    this.service = new RankingService(this.$resource);

    this.service.matches().then(ms => {
      if (ms) {
        this.matches = ms;
        this.overall();
      }
    });
  },
  methods: {
    overall() {
      console.log(this.matches);
      this.filteredMatches = this.matches;
      this.filteredMatches.forEach(m => {
        m.players.forEach(p => {
          let player = this.ranking.filter(pp => pp.name == p.name)[0];
          if (player) {
            player.points = Number(player.points) + Number(p.points);
            player.deads = Number(player.deads) + Number(p.deads);
            player.kills = Number(player.kills) + Number(p.kills);
            this.ranking = this.ranking.filter(pp => pp.name != p.name);
            this.ranking.push(player);
          } else {
            this.ranking.push(p);
          }
        });
      });
      this.ranking.sort((p1, p2) => {
        let points = p1.points - p2.points;
        let kdr = p1.kills / p1.deads - p2.kills / p2.deads;
        if (points !== 0) {
          return points * -1;
        }
        return kdr * -1;
      });
    },
    monthly() {
      let now = new Date();
      let oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      this.filteredMatches = this.matches.filter(m => {
        return (
          m.date.getTime() > oneMonthAgo.getTime() &&
          m.date.getTime() <= now.getTime()
        );
      });
      this.filteredMatches.forEach(m => {
        m.players.forEach(p => {
          let player = this.ranking.filter(pp => pp.name == p.name)[0];
          if (player) {
            player.points = Number(player.points) + Number(p.points);
            player.deads = Number(player.deads) + Number(p.deads);
            player.kills = Number(player.kills) + Number(p.kills);
            this.ranking = this.ranking.filter(pp => pp.name != p.name);
            this.ranking.push(player);
          } else {
            this.ranking.push(p);
          }
        });
      });
      this.ranking.sort((p1, p2) => {
        let points = p1.points - p2.points;
        let kdr = p1.kills / p1.deads - p2.kills / p2.deads;
        if (points !== 0) {
          return points * -1;
        }
        return kdr * -1;
      });
    },
    weekly() {
      let now = new Date();
      let oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      this.filteredMatches = this.matches.filter(m => {
        return (
          m.date.getTime() > oneWeekAgo.getTime() &&
          m.date.getTime() <= now.getTime()
        );
      });
     this.filteredMatches.forEach(m => {
        m.players.forEach(p => {
          let player = this.ranking.filter(pp => pp.name == p.name)[0];
          if (player) {
            player.points = Number(player.points) + Number(p.points);
            player.deads = Number(player.deads) + Number(p.deads);
            player.kills = Number(player.kills) + Number(p.kills);
            this.ranking = this.ranking.filter(pp => pp.name != p.name);
            this.ranking.push(player);
          } else {
            this.ranking.push(p);
          }
        });
      });
      this.ranking.sort((p1, p2) => {
        let points = p1.points - p2.points;
        let kdr = p1.kills / p1.deads - p2.kills / p2.deads;
        if (points !== 0) {
          return points * -1;
        }
        return kdr * -1;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

