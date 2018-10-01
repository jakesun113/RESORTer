import React, {Component} from "react";
import {Title, HeaderLine, LeaveRow, BtmEllipseButton} from './BookingAccommodation'
import { Link } from "react-router-dom";

class PlanSummaryPage extends Component {
    goPrevious = () => {
        const {place, history, masterID, resortID, tripID} = this.props;
        const url = `/booking/${place}/learn`;
        history.push({
            pathname: url,
            state: {masterID: masterID, resortID: resortID, tripID: tripID},
        });
    };
    
    getQuate = () => {


    }

    render() {
        return (
          <React.Fragment>
            <div className='container' style={{marginTop: '20px'}}>
                <HeaderLine>
                    <Title>
                        <strong>6. PLAN SUMMARY</strong>
                    </Title>
                </HeaderLine>

                <LeaveRow>
                    <BtmEllipseButton onClick={this.goPrevious}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>Back
                        </div>
                    </BtmEllipseButton>
                  <Link to={`/successPage/${this.props.place}`}>
                    <BtmEllipseButton  onClick={this.getQuote}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>Get a Quote
                        </div>
                    </BtmEllipseButton>
                  </Link>
                    
               </LeaveRow>
            </div>
       
          </React.Fragment>

        );
    }

}

export default PlanSummaryPage;