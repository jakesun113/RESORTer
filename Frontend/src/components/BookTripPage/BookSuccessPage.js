import React, {Component} from "react";

class BookSuccessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const place = this.props.match.params.placeName;

        return (
          <React.Fragment>
          <div className='container' style={{marginTop: '20px', 'text-align':'center'}}>
            <h4 class="font_4">
              <span style={{'font-weight':'bold'}}>Success</span>
            </h4>
            <p>Thank you. We have sent your enquiry to</p>
            <span style={{'color':'#4682B4'}}>
              <span style={{'font-weight':'bold'}}>{place}</span>
            </span>           
          </div>
              

          </React.Fragment>

        );
    }

}

export default BookSuccessPage;

