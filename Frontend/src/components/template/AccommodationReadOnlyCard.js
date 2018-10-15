import React, {Component} from "react";

class AccommodationReadOnlyCard extends Component {
    render() {
        const {accommodation} = this.props;
        return (
            <React.Fragment>
                {/* title */}
                <div className="row">
                    <div className="mt-3"
                        style={{fontSize: "2rem", color: "#686369"}}
                    >
                        Accommodation Needs
                    </div>
                </div>
                {/* Accommodation list */}
                <div className="row">
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

                            <tr>
                                <td>{accommodation.type === null ? "N/A" : accommodation.type}</td>
                                <td>{accommodation.category === null ? "N/A" : accommodation.category}</td>
                                <td>{accommodation.adultNum === null ? "N/A" : accommodation.adultNum}</td>
                                <td>{accommodation.childNum === null ? "N/A" : accommodation.childNum}</td>
                                <td>{accommodation.todNum === null ? "N/A" : accommodation.todNum}</td>
                                <td>{accommodation.bedNum === null ? "N/A" : accommodation.bedNum}</td>
                                <td>{accommodation.bathNum === null ? "N/A" : accommodation.bathNum}</td>
                            </tr>
                        </table>
                </div>
                {/* Requests */}
                <div className="row">
                        <table className="table table-borderless">
                            <thead>
                            <tr style={{color: "#686369"}}>
                                <th scope="col">Specific Requests:</th>
                            </tr>
                            </thead>

                            <tbody/>
                            <tr>
                                <td>
                  <textarea
                      style={this.props.style}
                      readOnly={this.props.readOnly}
                      value={accommodation.requirement === null ? "N/A" : accommodation.requirement}
                  />

                                </td>
                            </tr>
                        </table>
                </div>
            </React.Fragment>
        );
    }
}

export default AccommodationReadOnlyCard;
