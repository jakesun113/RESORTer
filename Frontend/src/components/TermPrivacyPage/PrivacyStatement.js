import React from "react";
import BackTopBtn from "../template/BackTopBtn";
import FeedBackBtn from "../template/FeedBackBtn";
import ChatBtn from "../template/ChatBtn";
export default class PrivacyStatement extends React.Component {
  state = {
    currentScrollHeight: 0
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    window.onscroll = () => {
      const newHeight = Math.ceil(window.scrollY / 50) * 50;
      if (this.state.currentScrollHeight !== newHeight) {
        this.setState({ currentScrollHeight: window.scrollY });
      }
    };
  }
  render() {
    const opacity = Math.min(100 / this.state.currentScrollHeight, 1);
    return (
      <React.Fragment>
        <div
          className="container"
          style={{
            marginTop: "50px",
            marginBottom: "50px",
            fontSize: "15px",
            lineHeight: "1.5em",
            color: "rgb(62, 62, 65)"
          }}
        >
          <p className="h1">Privacy Statement</p>
          <br />
          <p>
            By providing RESORTer (ABN 64975305421) (“us”, “we”, “our”) with
            this personal information, you acknowledge and agree to the
            following:
          </p>
          <p>
            We only collect the information we need in order to perform our
            resort, activity and other booking services (“Services”). We comply
            at all times with the Privacy Act 1988 (Cth) (the ‘Act’) which
            regulates how personal information is handled including all your
            health details which are sensitive information (‘Personal Data’).
          </p>
          <p>
            You agree that the Personal Information you are providing is true
            and correct at the time you are providing it to us. You will notify
            us with any changes and keep it updated on a regular basis while you
            are using our Services. You can access your Personal Information by
            request at any time by contacting us here: (info@resorter.app).
          </p>
          <br />
          <p>
            <strong>1. What personal Information do we collect?</strong>
          </p>
          <p>
            In the course of your visits to our website or use of our products
            and services, we may obtain the following information about you:
            name, company name, email address, telephone number, credit card
            details, billing address, geographic location, IP address, survey
            responses, support queries, blog comments and social media handles
            (together ‘Personal Data’). RESORTer may ask for your Personal
            Information which is reasonably necessary to carry out and provide
            you with our Services. We may ask you for and collect the following
            types of information (depending on your choice of Service Provider
            and Service):
          </p>
          <ul>
            <li>Date of Birth</li>
            <li>Activity experience and level of ability</li>
            <li>Shoe and clothing size</li>
            <li>Fitness ability</li>
            <li>
              Health issues that should be disclosed to any of the RESORTer
              Service Provider
            </li>
            <li>Food, allergy or similar issues</li>
          </ul>
          <p>
            and other similar information that may be required to carry out and
            provide you with the Services.
          </p>
          <p>
            Our services are not directed to persons under 18 and we do not
            knowingly collect Personal Data from anyone under 18. If we become
            aware that a child under 18 has provided us with Personal Data, we
            will delete that information as quickly as possible. If you are the
            parent or guardian of a child and you believe they have provided us
            with Personal Data without your consent, then please contact us.
          </p>
          <p>
            You can review, correct, update or delete your Personal Data by
            either logging into your account and making the changes yourself or
            contacting us directly to do so.
          </p>
          <br />
          <p>
            <strong>
              2. How do we store, use and keep your Personal Information secure?
            </strong>
          </p>
          <p>
            Any Personal information we collect is stored in computer systems
            with limited access to anyone in our business and only if required
            to perform the Services. These computer systems may be operated by
            us or by our service providers. In all cases, we have rigorous
            information security requirements aimed at eliminating risks of
            unauthorised access to, and loss, misuse or wrongful alteration of,
            personal information.
          </p>
          <p>
            We may also engage third party service providers to assist in
            storing and processing certain types of personal information from
            us. Some of these service providers may be located overseas, or use
            facilities located overseas to provide us with services and they at
            all times agree to abide by the privacy laws and requirements in
            Australia.
          </p>
          <p>
            Personally Identifiable Information: We use the information we
            collect to deliver our services to you, including: communicating
            with you, providing technical support, notifying you of updates and
            offers, sharing useful content, measuring customer satisfaction,
            diagnosing problems and providing you with a personalised website
            experience.
          </p>
          <p>
            Marketing communications are only sent to you if you have requested
            or subscribed to them. You can opt out of our marketing
            communications at any time by unsubscribing or emailing us and your
            request will be actioned immediately.
          </p>
          <p>
            Non-Personally Identifiable Information: We also use the information
            we collect in aggregated and anonymized forms to improve our
            services, including: administering our website, producing reports
            and analytics, advertising our products and services, identifying
            user demands and assisting in meeting customer needs generally.
          </p>
          <p>
            Any information you choose to make publicly available, such as blog
            comments and testimonials on our website, will be available for
            others to see. If you subsequently remove this information, copies
            may remain viewable in cached and archived pages on other websites
            or if others have copied or saved the information.
          </p>
          <p>
            Credit card information is encrypted before transmission and is not
            stored by us on our servers.
          </p>
          <p>
            To enable us to deliver our services, we may transfer information
            that we collect about you, including Personal Data, across borders
            for storage and processing in countries other than Australia. If
            your Personal Data is transferred and processed outside Australia,
            it will only be transferred to countries that have adequate privacy
            protections.
          </p>
          <p>
            <strong>Information Records</strong>
          </p>
          <p>
            We retain information for as long as required, allowed or we believe
            it useful, but do not undertake retention obligations. We may
            dispose of information in our discretion without notice, subject to
            applicable law that specifically requires the handling or retention
            of information. You must keep your own, separate back-up records.
          </p>
          <p>
            We retain your personal information for as long as needed to provide
            services to you and as otherwise necessary to comply with our legal
            obligations, resolve disputes and enforce our agreements.
          </p>
          <p>
            In the event there is a breach of our security and your Personal
            Data is compromised, we will promptly notify you in compliance with
            the applicable law.
          </p>
          <p>
            We retain your personal information for as long as needed to provide
            services to you and as otherwise necessary to comply with our legal
            obligations, resolve disputes and enforce our agreements. We keep
            your personal information records secure and do not use it for any
            purposes unrelated to our Services. All our employees and any staff
            who may have access this personal information are under a strict
            duty of confidentiality and privacy practices are adhered to. Please
            note: we securely destroy all your personal information after 2
            years if you have ceased using our Services.
          </p>
          <p>
            <strong>Service Providers</strong>
          </p>
          <p>
            We employ third party companies and individuals to facilitate our
            Service, to provide the Service on our behalf, to perform
            Service-related services or to assist us in analysing how our
            service is used. These third parties have access to your Personal
            Information only to perform these Services on our behalf and are
            obligated not to disclose or use the information for any other
            purpose. We at all times ensure our contractors and service
            providers are under the same privacy requirements as we are. If your
            Personal Data is transferred and processed outside Australia, it
            will only be transferred to countries that have adequate privacy
            protections. In the event there is a breach of our security and your
            Personal Data is compromised, we will promptly notify you in
            compliance with the applicable law.
          </p>
          <br />
          <p>
            <strong>3. When do we disclose Your Personal Information</strong>
          </p>
          <p>
            We only collect the Personal Information from you that we need in
            order to perform our Services. We comply at all times with the Act
            which regulates how Personal Information is handled. In order to
            provide our Services, we may be required to provide your Personal
            Information to third parties, including but not limited to, resorts,
            hotels, activity centers, restaurants, and other relevant service
            providers. We will not disclose your Personal Information without
            your consent except to enable us to perform the Services, and unless
            required due to a medical emergency, legal requirement, law
            enforcement request or similar and we will only do so to a qualified
            professional who is under the same duty of confidentiality.
          </p>
          <p>
            Also, we may use your Personal Information to protect the rights,
            property or safety of RESORTer, our customers or third parties.
          </p>
          <p>
            If there is a change of control in one of our businesses (whether by
            merger, sale, transfer of assets or otherwise) customer information,
            which may include your Personal Information, could be disclosed to a
            potential purchaser under a confidentiality agreement. We would only
            disclose your information in good faith and where required by any of
            the above circumstances.
          </p>
          <p>
            We do not and will not sell or deal in Personal Data or any customer
            information.
          </p>
          <p>
            Your Personal Data details are only disclosed to third party
            suppliers when it is required by law, for goods or services which
            you have purchased, for payment processing or to protect our
            copyright, trademarks and other legal rights. To the extent that we
            do share your Personal Data with a service provider, we would only
            do so if that party has agreed to comply with our privacy standards
            as described in this privacy policy and in accordance with
            applicable law. Our contracts with third parties prohibit them from
            using any of your Personal Data for any purpose other than that for
            which it was shared.
          </p>
          <p>
            <strong>Links to other websites</strong>
          </p>
          <p>
            This website may contain links to other websites. These links are
            meant for your convenience only. Links to third party websites do
            not constitute sponsorship or endorsement or approval of these
            websites. Please be aware that we are not responsible for the
            privacy practices of such other websites. We encourage our users to
            be aware, when they leave our website, to read the privacy
            statements of each and every website that collects personally
            identifiable information. This privacy policy applies solely to
            information collected by this website.
          </p>
          <p>
            <strong>Change in privacy statement</strong>
          </p>
          <p>
            As we plan to ensure our privacy policy remains current, this policy
            is subject to change. We may modify this policy at any time, in our
            sole discretion and all modifications will be effective immediately
            upon our posting of the modifications on this website. Please return
            periodically to review our privacy policy.
          </p>
          <p>
            <strong>More information</strong>
          </p>
          <p>
            For more information about Privacy law, the APPs or if you are not
            satisfied with our response to your complaint, please contact the
            Office of the Australian Information Commissioner at
            http://www.oaic.gov.au.
          </p>
        </div>
        {opacity !== 1 ? (
          <BackTopBtn scrollStepInPx="50" delayInMs="16.66" />
        ) : (
          ""
        )}
        <FeedBackBtn />
        <ChatBtn />
      </React.Fragment>
    );
  }
}
