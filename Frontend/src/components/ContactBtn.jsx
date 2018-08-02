import React, { Component } from "react";
import axios from "axios";
import "../css/ContactBtn.css";

class ContactBtn extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      telephone: "",
      email: "",
      message: "",
      invest: "",
      work: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleRadioChange(e) {
    if (e.target.checked) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, telephone, email, message, invest, work } = this.state;

    const form = await axios({
      method: "post",
      url: "http://127.0.0.1:3333/api/form",
      data: {
        name,
        telephone,
        email,
        message,
        invest,
        work
      }
    });

    window.alert("Thank you! We will contact you soon!");
  }
  render() {
    return (
      <React.Fragment>
        {/* title */}
        <a data-toggle="modal" data-target="#contactModal">
          <span style={{ textDecoration: this.props.isSHowUnderline }}>
            {this.props.buttonName}
          </span>
        </a>
        {/* body */}
        <div
          className="modal fade"
          id="contactModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="contact_window">
              <div className="modal-header modal_header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Contact Us
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {/* popup body */}

              <div className="modal-body">
                <form onSubmit={this.handleSubmit} data-toggle="validator">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput2"
                          name="name"
                          placeholder="Name"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div className="form-group ">
                        <label>Telephone</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput3"
                          required
                          name="telephone"
                          placeholder="Telephone number"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      required
                      name="email"
                      placeholder="Email address"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="message"
                      placeholder="Message"
                      onChange={this.handleChange}
                    />
                  </div>
                  {/* radio button */}

                  <div className="form-group">
                    <div
                      className="row"
                      style={{ marginRight: "300px", marginLeft: "50px" }}
                    >
                      <label className="col-sm">
                        Interested in investing with us?
                      </label>
                      <div className="custom-control custom-radio col-sm">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="invest"
                          id="inlineRadio1"
                          value="Yes"
                          onChange={this.handleRadioChange}
                          required
                        />
                        <label
                          className="custom-control-label"
                          for="inlineRadio1"
                        >
                          Yes
                        </label>
                      </div>

                      <div className="custom-control custom-radio col-sm">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="invest"
                          id="inlineRadio2"
                          value="No"
                          onChange={this.handleRadioChange}
                          required
                        />
                        <label
                          className="custom-control-label"
                          for="inlineRadio2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* second choose */}
                  <div className="form-group">
                    <div
                      className="row"
                      style={{ marginRight: "300px", marginLeft: "50px" }}
                    >
                      <label className="col-sm">
                        Interested in working with us?
                      </label>

                      <div className="custom-control custom-radio col-sm">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="work"
                          id="inlineRadio3"
                          value="Yes"
                          onChange={this.handleRadioChange}
                          required
                        />
                        <label
                          className="custom-control-label"
                          for="inlineRadio3"
                        >
                          Yes
                        </label>
                      </div>

                      <div className="custom-control custom-radio col-sm">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="work"
                          id="inlineRadio4"
                          value="No"
                          onChange={this.handleRadioChange}
                          required
                        />
                        <label
                          className="custom-control-label"
                          for="inlineRadio4"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* send button */}
                  <button type="submit" className="button">
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ContactBtn;
