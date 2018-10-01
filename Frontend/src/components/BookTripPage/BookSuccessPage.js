import React, {Component} from "react";
import styled from "styled-components";

const Paragraph = styled.p`
  font-size: 20px

`;
class BookSuccessPage extends Component {

    render() {
        const place = this.props.match.params.placeName;

        return (
          <React.Fragment>
          <div className='container' style={{marginTop: '20px', 'text-align':'center'}}>
          <img id="comp-jehyob76imgimage" alt="" data-type="image" src="https://static.wixstatic.com/media/25b4a3_1322af67d33249569e09547f161280ff~mv2.png/v1/fill/w_288,h_182,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_1322af67d33249569e09547f161280ff~mv2.webp" style={{width: '144px', height: '91px', 'object-fit': 'cover'}}></img>
            <h3 class="font_4">
              <span style={{'font-weight':'bold'}}>Success</span>
            </h3>
            <Paragraph>Thank you. We have sent your enquiry to</Paragraph>
            <div style={{color:'#4682B4', 'font-size': '28px', 'font-weight':'bold'}}>
              {place}
            </div>  
            <div data-packed="false">
             <Paragraph>They will be in touch to take payment once your order has been processed and available deals have been applied.</Paragraph>
             <Paragraph>Credit card payments coming soon!</Paragraph>
            </div>    
            <span>​</span>
            <div data-packed="false" data-min-height="18" class="txtNew" id="comp-jgpbcm9k">
            <Paragraph>Meanwhile, help us improve by &nbsp;
              <a href="https://www.surveymonkey.com/r/GX7X6LX">
              <span style={{color:'#4682B4', 'text-decoration':'underline'}}>
               filling in this survey
              </span>
              </a>
              .</Paragraph>
            <Paragraph>It won't take long, we promise!</Paragraph>
            </div>
            <span>​</span>
        <Paragraph className="row justify-content-between ">
          <div className="col-4">
            <a href="/my-trip" >
             <span style={{color:'#3D9BE9', 'text-decoration':'underline'}}>Review my trips</span>
            </a>
          </div>
          <div className="col-4">
            <a href="/">
             <span style={{color:'#3D9BE9', 'text-decoration':'underline'}}>Back to home page</span>
            </a>
          </div>

        </Paragraph>

            
         </div>
            
            
        


          </React.Fragment>

        );
    }

}

export default BookSuccessPage;

