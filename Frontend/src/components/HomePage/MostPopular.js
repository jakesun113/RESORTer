import React, {Component} from "react";
import "../../css/Homepage/search.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageCard from "../template/ImageCard";
import axios from "axios/index";
//TODO: add infinite scroll
class MostPopular extends Component {

    constructor(props) {
        super(props);
        this.state = {
            webServer: "http://127.0.0.1:8889/",
            popularResorts: []
        };

        this.getPopularResorts = this.getPopularResorts.bind(this);
    }

    async getPopularResorts() {
        let BaseURL = "http://127.0.0.1:3333/api/";
        //get the list of countries
        await axios.get(BaseURL + "getPopularResorts").then(
            response => {
                console.log("get popular resorts successfully");
                //console.log(response.data.popularResorts);
                this.setState({
                    popularResorts: response.data.popularResorts
                });
            });
    }

    componentDidMount() {

        this.getPopularResorts();

    }

    render() {
        return (
            <React.Fragment>
                <div className="text-justify" style={{whiteSpace: "nowrap"}}>
                    Most Searched Resorts
                </div>

                <div className="row">
                    {this.state.popularResorts.map(resort => (
                        <div className="col-sm">
                            <ImageCard
                                key={resort.id}
                                imgSrc={this.state.webServer + resort.image}
                                title={resort.name}
                                subTitle={resort.country}
                                text={resort.description}
                                btnText="Plan Now"
                                history={this.props.history}
                            />
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default MostPopular;
