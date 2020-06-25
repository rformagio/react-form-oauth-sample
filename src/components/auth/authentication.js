import React from 'react';
import Configuration from "../configuration";
import Token from "./token";
import '../../assets/css/spectre/spectre.min.css'
import '../../assets/css/spectre/spectre-exp.min.css'
import '../../assets/css/spectre/spectre-icons.min.css'

class Authentication extends React.Component{

    constructor(props) {
        super(props);
        this.config = new Configuration();
        this.getToken = this.getToken.bind(this);
        this.state = {token: ''};
    }

    getToken(event){
        event.preventDefault();
        const data = new FormData(event.target);
        const header = new Buffer(data.get("clientId") + ':' + data.get("clientSecret" )).toString('base64');
        const authbasic = "Basic " + header;
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', authbasic);
        return fetch(this.config.URL_AUTHSERVER_TOKEN + "?grant_type=password&username="+data.get("username")+"&password="+data.get("password"), {
            method: "POST",
            mode: "cors",
            headers: headers,
            body: JSON.stringify({grant_type:'password', username:data.get("username"), password:data.get("password") })
        })
            .then(response => {
                if (!response.ok) {
                    return response.body
                        .getReader()
                        .read()
                        .then(function(data) {
                            let fetched = String.fromCharCode.apply(null, data.value);
                            return JSON.parse(fetched);
                        });
                }
                return response.json();
            })
            .then(item => {
                this.setState({token: JSON.stringify(item)});
                console.log(item);
                return item;
                }
            )
            .catch(error => {
                this.handleError(error);
            });
    }

    handleResponseError(response) {
        console.log(response.text);
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.log(error.message);
    }

    render() {
        return (
            <div className="m-2">
                <header className="h2">OAUTH PERSON</header>
                <p className="h3">Get token:</p>
                <form className="form-horizontal" onSubmit={this.getToken}>
                    <div className="column col-3 bg-primary">
                        <label className="label-sm">Authentication Basic for Auth Server</label>
                    </div>
                    <p/>
                    <div className="form-group">
                        <div className="col-1 col-sm-3">
                            <label className="form-label label-sm">Client: </label>
                        </div>
                        <div className="col-2 col-sm-3">
                            <input className="form-input indent-sm" type="text" id="clientId" name="clientId" placeholder="Client Id"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-sm-3">
                            <label className="form-label label-sm">Secret: </label>
                        </div>
                        <div className="col-2 col-sm-3">
                            <input className="form-input indent-sm" type="text" id="clientSecret" name="clientSecret" placeholder="Client secret"/>
                        </div>
                    </div>
                    <div className="column col-3 bg-dark">
                        <label className="label-sm">Authentication for resource</label>
                    </div>
                    <p/>
                    <div className="form-group">
                        <div className="col-1 col-sm-3">
                            <label className="form-label label-sm">Username: </label>
                        </div>
                        <div className="col-2 col-sm-3">
                            <input className="form-input indent-sm" type="text" id="username" name="username" placeholder="Username"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-sm-3">
                            <label className="form-label label-sm">Password: </label>
                        </div>
                        <div className="col-2 col-sm-3">
                            <input className="form-input indent-sm" type="text" id="password" name="password" placeholder="Client secret"/>
                        </div>
                    </div>
                    <div className="col-1 col-sm-3">
                        <label className="label-rounded label-sm">Token:</label>
                    </div>

                   <Token content={this.state.token} />
                    <button className="btn">Get token</button>
                </form>
            </div>
        );
    }
}

export default Authentication;