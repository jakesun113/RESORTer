import React, {Component} from "react";
import "../../css/Homepage/search.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageCard from "../template/ImageCard";

class MostPopular extends Component {
    state = {
        mostPopularPlace: [
            {
                id: "popular_1",
                imgSrc:
                    "https://static.wixstatic.com/media/25b4a3_1a4b1cf38dfe4b77ba41b706e1d2b348~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_1a4b1cf38dfe4b77ba41b706e1d2b348~mv2.webp",
                title: "Cardrona",
                subTitle: "New Zealand",
                text:
                    "Cardrona Alpine Resort is New Zealand’s most popular ski area, attracting all kinds of snow enthusiasts – from beginners & families, to Olympic & X Games athletes",
                btnText: "Plan Now"
            },
            {
                id: "popular_2",
                imgSrc:
                    "https://static.wixstatic.com/media/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.webp",
                title: "Coronet Peak",
                subTitle: "New Zealand",
                text:
                    "Spectacular roller coaster terrain makes Coronet Peak ski area one of New Zealand's most exciting ski resort destinations for snow lovers of any ability.",
                btnText: "Plan Now"
            },
            {
                id: "popular_3",
                imgSrc:
                    "https://static.wixstatic.com/media/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.webp",
                title: "Coronet Peak",
                subTitle: "New Zealand",
                text:
                    "Spectacular roller coaster terrain makes Coronet Peak ski area one of New Zealand's most exciting ski resort destinations for snow lovers of any ability.",
                btnText: "Plan Now"
            },
            {
                id: "popular_4",
                imgSrc:
                    "https://static.wixstatic.com/media/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.webp",
                title: "Coronet Peak",
                subTitle: "New Zealand",
                text:
                    "Spectacular roller coaster terrain makes Coronet Peak ski area one of New Zealand's most exciting ski resort destinations for snow lovers of any ability.",
                btnText: "Plan Now"
            },
            {
                id: "popular_5",
                imgSrc:
                    "https://static.wixstatic.com/media/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.webp",
                title: "Coronet Peak",
                subTitle: "New Zealand",
                text:
                    "Spectacular roller coaster terrain makes Coronet Peak ski area one of New Zealand's most exciting ski resort destinations for snow lovers of any ability.",
                btnText: "Plan Now"
            },
            {
                id: "popular_6",
                imgSrc:
                    "https://static.wixstatic.com/media/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.webp",
                title: "Coronet Peak",
                subTitle: "New Zealand",
                text:
                    "Spectacular roller coaster terrain makes Coronet Peak ski area one of New Zealand's most exciting ski resort destinations for snow lovers of any ability.",
                btnText: "Plan Now"
            }
        ]
    };

    render() {
        return (
            <React.Fragment>
                <div className="text-justify" style={{whiteSpace: "nowrap"}}>
                    Most Searched Resorts
                </div>

                <div className="row">
                    {this.state.mostPopularPlace.map(place => (
                        <div className="col-sm">
                            <ImageCard
                                key={place.id}
                                imgSrc={place.imgSrc}
                                title={place.title}
                                subTitle={place.subTitle}
                                text={place.text}
                                btnText={place.btnText}
                            />
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default MostPopular;
