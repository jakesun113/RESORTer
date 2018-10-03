import React, {Component} from "react";

class AccommodationCard extends Component {
    render() {
        const {accommodation} = this.props;
        return (
            <React.Fragment>
                {/* title */}
                <div className="row" style={{fontWeight: "bold"}}>
                    <div className="col-lg-1"/>
                    <div
                        className="col-6 col-lg-2"
                        style={{color: "black", fontSize: "23px"}}
                    >
                        Accommodation Needs
                    </div>
                    <div className="col-lg-7"/>
                </div>
                {/* Accommodation list */}
                <div className="row">
                    <div className="col-lg-1"/>
                    <div className="col-12 col-lg-10">
                        <table className="table table-borderless">
                            <thead>
                            <tr style={{color: "#686369"}}>
                                <th scope="col">Type</th>
                                <th scope="col">Category</th>
                                <th scope="col"># of adults</th>
                                <th scope="col"># of children</th>
                                <th scope="col"># of toddlers</th>
                                <th scope="col"># of bedroom</th>
                                <th scope="col"># of bathroom</th>
                            </tr>
                            </thead>

                            <tbody/>
                            {accommodation === null ? "" :
                                <tr
                                    style={{
                                        color: "#4682B3"
                                    }}
                                >
                                    <td>{accommodation.type}</td>
                                    <td>{accommodation.category}</td>
                                    <td>{accommodation.adultNum}</td>
                                    <td>{accommodation.childNum}</td>
                                    <td>{accommodation.todNum}</td>
                                    <td>{accommodation.bedNum}</td>
                                    <td>{accommodation.bathNum}</td>
                                </tr>
                            }

                        </table>
                    </div>
                    <div className="col-lg-1"/>
                </div>
                {/* Requests */}
                <div className="row">
                    <div className="col-lg-1"/>
                    <div className="col-12 col-lg-10">
                        <table className="table table-borderless">
                            <thead>
                            <tr style={{color: "#686369"}}>
                                <th scope="col">Specific Requests:</th>
                            </tr>
                            </thead>

                            <tbody/>
                            <tr
                                style={{
                                    color: "#4682B3"
                                }}
                            >
                                <td>
                  <textarea
                      style={this.props.style}
                      readOnly={this.props.readOnly}
                      value={accommodation === null ? "" : accommodation.requirement}
                  >
                  </textarea>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="col-lg-1"/>
                </div>
            </React.Fragment>
        );
    }
}

export default AccommodationCard;
