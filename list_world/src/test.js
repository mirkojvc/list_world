import React from 'react';

class test extends React.Component {
constructor(props) {
    super(props);
        this.state = { apiResponse: "" };
        this.callAPI();
        this.callDB();
    }
    callAPI() {
        fetch("http://localhost:9000/")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    callDB() {
        fetch("http://localhost:9000/testDB")
            .then(res => res.text())
            .then(res => this.setState({ dbResponse: res }))
            .catch(err => err);
    }
    render() {
        return (
        <div>
            <div>{this.state.apiResponse}</div>
            <div>{this.state.dbResponse}</div>
        </div>
        );
    }
}

export default test;
