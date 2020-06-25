import React from 'react'
import '../../assets/css/spectre/spectre.min.css'
import '../../assets/css/spectre/spectre-exp.min.css'
import '../../assets/css/spectre/spectre-icons.min.css'

class Token extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <fieldset>
                {this.props.content}
            </fieldset>
        );
    }
}

export default Token;