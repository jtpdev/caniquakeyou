export default class MatchService {

    constructor(resource) {
        this._resource = resource('https://seuprojeto.cloudfunctions.net/api/matches');
    }

    saveMatch(match) {
        return this._resource
            .save(match)
            .then(res => res.json(), err => {
                throw new Error('Problema ocorrido');
            });
    }


}