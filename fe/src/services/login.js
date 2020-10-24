export default class LoginService {

    constructor(resource) {
        this._resource = resource('https://seuprojeto.cloudfunctions.net/api/login');
    }

    login(credentials) {
        return this._resource
            .save(credentials)
            .then(res => {
                return res.json();
            }, err => {
                throw new Error('Problema ocorrido');
            });
    }


}