export default class RankingService {

    constructor(resource) {
        this._resource = resource('https://seuprojeto.cloudfunctions.net/api/matches');
    }

    matches() {
        return this._resource
            .query()
            .then(res => res.json(), err => {
                throw new Error('Problema ocorrido');
            });
    }


}