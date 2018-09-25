import React, {Component} from "react";
import "../../css/Homepage/search.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageCard from "../template/ImageCard";
import axios from "axios/index";

class MostPopularInMyCountry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            webServer: "http://127.0.0.1:8889/",
            popularResorts: this.props.popularResorts
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="text-justify" style={{whiteSpace: "nowrap"}}>
                    Most Searched Resorts in My Country
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

export default MostPopularInMyCountry;
