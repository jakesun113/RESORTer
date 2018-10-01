import React, {Component} from "react";
import axios from "axios/index";


class MyTripPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: null
        };
        this.getTripSummary = this.getTripSummary.bind(this);
    }

    async getTripSummary(id) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        console.log(id);
        //get the summary information of specific trip
        // await axios.get(BaseURL + "getPopularResorts").then(response => {
        //     console.log("get popular resorts successfully");
        //     //console.log(response.data.popularResorts);
        //     this.setState({
        //         popularResorts: response.data.popularResorts
        //     });
        // });
    }

    componentDidMount() {
        const {match} = this.props;

        this.getTripSummary(match.params.id);

    }

    render() {

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="mt-3">
                            <h6>
                            <span style={{fontSize: "2rem", color: "#686369"}}>
                                My trip to:
                            </span>
                            </h6>
                        </div>
                        <div className="mt-3">
                            <h6>
                            <span style={{fontSize: "2rem", color: "#686369"}}>
                                {this.state.place}
                            </span>
                            </h6>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MyTripPage;
