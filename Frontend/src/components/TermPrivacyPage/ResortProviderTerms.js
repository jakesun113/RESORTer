import React from "react";
import BackTopBtn from "../template/BackTopBtn";
import FeedBackBtn from "../template/FeedBackBtn";
import ChatBtn from "../template/ChatBtn";

export default class ResortProviderTerms extends React.Component {
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
          <p className="h1">Terms of Use - Resort and Service Providers</p>
          <br />
          <p>
            These Terms of Use (‘Resort Terms’) apply to all Resorts and Service
            Providers who are provided with our Services. We may modify and
            update these Resort Terms at any time so please review our terms
            from time to time. You may request to be removed from our website
            and not be provided with our Services at any time but if you decide
            to continue to receive our Services, you agree to be bound by these
            Resort Terms as well as any and all general terms and conditions and
            our privacy policy posted on our website from time to time.
          </p>
          <p>
            <strong>DEFINITIONS</strong>
          </p>
          <p>
            “Content” means anything the Resort or Service Provider submits as
            material to be included in the Services, including all material,
            links, words, images, photos, videos.{" "}
          </p>
          <p>
            “Fees” means the cost per booking enquiry or commission of
            successful sales payable monthly by you in accordance with our
            Resort Terms.
          </p>
          <p>
            “Plannable” and “Unplannable” means if you exercise your right not
            to be charged, RESORTer can remove the ability for your Resort to be
            plannable and make your Resort “unplannable”. The User would see
            that your Resort is not available to be “planned”.
          </p>
          <p>
            "Intellectual Property Rights" means all intellectual property
            rights including rights in copyright works, registered and
            unregistered trademarks, brands, logos and devices, any design
            rights, inventions, and patents, trade secrets and confidential
            information.
          </p>
          <p>
            “Resort or Service Provider/ You/ Your” means the resort,
            accommodation or service provider such as a provider of rental
            equipment or activities that has been approved by us to place
            Content on or through the Services, and includes any person who uses
            the Services through that Resort or Service Provider account.
          </p>
          <p>
            “Resort or Service Provider Representative” means a representative
            of the Resort or Service Provider who has been approved to place
            Content on or through the Services
          </p>
          <p>
            “Services” means the RESORTer software application for mobile phones
            and tablet computers, computer, laptop, and the RESORTer web portal.
          </p>
          <p>
            “User” means anyone who uses our Services, or views or access the
            Services, and includes guests and potential guests or clients or
            customers.
          </p>
          <p>
            “User Content” means anything a User submit as material to be
            included in a comment or post which we may allow from time to time
            and including all material, links, words, images, photos, videos.
          </p>
          <p>
            “We”, “our” and “us” means RESORTer, including its directors,
            employees and contractors.
          </p>
          <p>
            <strong>HOW IT WORKS</strong>
          </p>
          <p>
            We are a directory and trip planner. We enable you to provide
            Content for advertising your resort or accommodation or related trip
            services such as equipment rental or holiday activities. We assist
            guests to plan a trip and experience, and our Services generate an
            itinerary for their holiday. This then forms a booking request which
            is sent to you in real time to a portal accessible by you via a
            password link. We may provide training and support on our Services
            at your request. You can then input the order in your system, check
            your availability, estimate the cost and contact the guest to
            confirm availability and to provide them with a quote. At that point
            you deal directly with the guest and we are not involved. During
            ‘Beta’ testing stage there will be no charge to you. Post Beta, we
            charge you either a cost per booking enquiry that is made through
            our Services plus a sales commission. We may also allow User Content
            to be posted in relation to their trip experience.
          </p>
          <p>
            <strong>BOOKING ENQUIRY PAYMENT TERMS AND REFUNDS</strong>
          </p>
          <p>
            We are not charging Fees per booking enquiry during Beta phase. In
            the near future, we will be introducing a cost per booking enquiry
            to the Resorts and a sales commission. Both may vary depending upon
            the level of promotion you receive through our Services and the
            types of Services successfully sold in accordance with our package
            offers. We will advise you in advance and give you the option to
            opt-out and be removed when this period commences. We will take
            payment one of two ways, either debiting your Resort's credit card
            or we will request an amount is deposited to RESORTer as credit from
            which the cost of the number of trips will be debited. As long as
            there is credit above a certain limit, your Resort will remain
            plannable. If you fail to have credit at or above this limit we may
            suspend the ability for your Services to be planned by the user
            using our application. Refunds for cost per booking enquiry and
            sales commission will only be granted under exceptional
            circumstances.
          </p>
          <p>
            <strong>YOUR ACCOUNT</strong>
          </p>
          <p>
            To be eligible to access the booking enquiries to which we alert
            you, and to use our Services, you acknowledge and agree to the
            following:
          </p>
          <ul>
            <li>You must create an account with RESORTer</li>
            <li>
              You must treat the password issued for your account as
              confidential, not disclosing it to any third party.
              Confidentiality of your PIN and password is very important to
              protect your guests’ privacy;
            </li>
            <li>
              We highly recommend that you choose a strong password and that you
              log out from your account at the end of every session. There is
              also a password reset procedure in case you forget your password,
              but please notify us immediately if you become aware of any breach
              of security.{" "}
            </li>
            <li>
              You agree to accept all risks of unauthorized access to your
              account and any other information you provide to us. You are
              responsible for all activity on your account.
            </li>
            <li>
              You agree to keep all your account information you use for the
              Services correct, current and complete.
            </li>
            <li>
              You acknowledge and agree that it is integral to our Services that
              you inform us of all bookings by guests made through our Services.
              You must inform us of all bookings by guests made through our
              Services even if the booking is not fulfilled or cancelled.
            </li>
          </ul>
          <p>
            <strong>SUBMITTING CONTENT</strong>
          </p>
          <p>
            We agree to provide training to the Resort or Service Provider
            Representative to assist you in posting Content. We will also
            provide email support. Once Content is posted it cannot be deleted.
            If it needs to be deleted, you need to contact us immediately.
          </p>
          <p>
            By submitting any Content to the Services, you represent that you
            have the ownership rights and title to such Content, and have the
            right to present and publish it. You also agree to ensure that the
            Content is accurate and up-to-date and is a genuine offer to book or
            reserve your service.
          </p>
          <p>
            All Content posted, must comply with the following Content
            standards.
          </p>
          <p>
            <strong>Content Standards:</strong>
          </p>
          <ul>
            <li>
              Not contain your logo or trademark unless you are providing us
              with a license and authorisation to use it in providing our
              Services;
            </li>
            <li>
              Not contain any material which is defamatory, obscene, indecent,
              abusive, offensive, harassing, violent, hateful, inflammatory or
              otherwise objectionable.
            </li>
            <li>
              Not promote sexually explicit or pornographic material, violence,
              or discrimination based on race, sex, religion, nationality,
              disability, sexual orientation or age.
            </li>
            <li>
              Not infringe any patent, trademark, trade secret, copyright or
              other intellectual property rights of any other person.
            </li>
            <li>
              Not violate the legal rights (including the rights of publicity
              and privacy) of others or contain any material that could give
              rise to any civil or criminal liability under applicable laws or
              regulations or that otherwise may be in conflict with these Resort
              Terms.
            </li>
            <li>Not be likely to deceive any person.</li>
            <li>
              Not promote any illegal activity, or advocate, promote or assist
              any unlawful act.
            </li>
            <li>
              Not cause annoyance, inconvenience or needless anxiety or be
              likely to upset, embarrass, alarm or annoy any other person.
            </li>
            <li>
              Not be used to impersonate any person, or to misrepresent your
              identity or affiliation with any person or organization.
            </li>
            <li>
              Not give the impression that the Content originates from us or any
              other person or entity, if this is not the case.
            </li>
          </ul>
          <p>
            You warrant that the Content and all information or material you
            post or link to on the Services:
          </p>
          <ul>
            <li>Complies with the Content standards.</li>
            <li>
              Is genuine, true and accurate, reliable, up-to-date, lawful, and
              not misleading.
            </li>
            <li>Is fit for purpose, and in good taste; and</li>
            <li>
              Complies with applicable laws, codes and regulations including all
              Australian Consumer Law requirements.
            </li>
          </ul>
          <p>
            You further warrant that you will at all times abide by the
            Australian Consumer Law (ACL) requirements including but not limited
            to the re-supply or refund of any goods or services you supply or
            provide through our Services which do not meet ACL requirements.
          </p>
          <p>
            <strong>ALTERATION, DELETION OF CONTENT</strong>
          </p>
          <p>
            We reserve the right at any time and from time to time to alter and
            delete any Content. In particular, if we believe the Content does
            not comply with our Content standards or potentially breaches
            regulations, or we receive complaints or for any other reason and in
            our reasonable discretion, we may alter or delete Content at any
            time without notice. We shall not be liable to you or any third
            party for any alteration or deletion of Content.
          </p>
          <p>RESTRICTIONS ON YOUR USE</p>
          <p>
            Only guests, Users and Resort or Service Providers may use or
            attempt to use our Services. We grant you the right to access and
            use the Services for the purpose of advertising your resort or
            services. This right is non-exclusive, non-transferable and limited
            by these Resort Terms.
          </p>
          <p>When accessing and using the Services, you must:</p>
          <ul>
            <li>
              Not attempt to undermine the security or integrity of our
              computing system, or network, or where the Service is hosted by a
              third party; that party’s computing systems and networks;
            </li>
            <li>
              Not use, or misuse the Services in any way which may impair the
              functionality of the Services or other system used to deliver the
              Services, or impair the ability of any other User or Resort or
              Service Provider to use the Services;
            </li>
            <li>
              Not attempt to gain unauthorised access to any materials other
              than those to which you have been given express permission to
              access or to the computer system on which the Services are hosted;
            </li>
            <li>
              Not transmit, or input into the Services any files that may damage
              any other person’s computing devices or software, content that may
              be offensive, or material or data in violation of any law
              (including data or other material protected by copyright or trade
              secrets) which you do not have the right to use;
            </li>
            <li>
              Not transmit any viruses, malware, worms, spam, spiders, adware,
              spyware, Trojans, rootkits, backdoors, Ransomware, etc. of any
              kind and that you will not upload, post, host or transmit
              unsolicited material or messages to the Services; and
            </li>
            <li>
              Not attempt to modify, copy adapt, reproduce, disassemble,
              decompile, or reverse engineer any computer programs try to find
              or copy the source code, make a derivative copy of software or
              Content, used to deliver the Services except as is necessary to
              use for normal operation.
            </li>
          </ul>
          <p>
            <strong>AVAILABILITY OF SERVICES AND SECURITY</strong>
          </p>
          <p>
            We make no warranty that the Services will meet your requirements or
            be available on an uninterrupted, secure or error-free basis. We do
            not warrant that it will meet your requirements or that it will be
            suitable for any particular purpose. We will use our best endeavors
            to ensure the Services are always available and virus free but from
            time-to-time, and in some instances, this may not be the case as it
            may be out of our immediate control. We will endeavor to notify you
            if the Services become unavailable for any lengthy and unusual time
            period, but we are not responsible to you if the Services are
            unavailable
          </p>
          <p>
            We take reliability and security seriously and put significant
            effort into ensuring that our Services operates all the time, and
            that it is a secure environment for your data. However, no system is
            perfectly secure or reliable, and the reliability of hosting
            services, third party vendors, Internet intermediaries, your
            Internet service provider, and other service providers to provide
            software, hardware and storage cannot be assured. When you use our
            Services, you accept these risks.
          </p>
          <p>
            To avoid doubt, all implied conditions or warranties are excluded so
            far as is permitted by law, and in particular under the Australian
            Consumer Law. In particular, we exclude all warranties of
            merchantability, fitness for purpose and non-infringement.
          </p>
          <p>
            We reserve the right at any time and from time to time to
            discontinue the Services either temporarily or permanently with or
            without notice
          </p>
          <p>
            From time to time we may issue an update to the Services which may
            add, modify and/or remove features from the Services. These updates
            may be pushed out automatically with little or no notice. If there
            is a material change to the permissions required to run the
            Services, we will seek your agreement to the permissions at such
            time you may choose to accept or not. We shall not be liable to you
            or any third party for any modification, unavailability or
            discontinuance of the Services.
          </p>
          <p>
            <strong>INTELLECTUAL PROPERTY</strong>
          </p>
          <p>
            All custom graphics, icons, logos, service names, registered and
            unregistered trademarks belong to us.
          </p>
          <p>
            All other trademarks or service marks within these Services are the
            property of their respective owners. Nothing in these Resort Terms
            grants you any right to use any trademark, service mark, logo,
            and/or our name or that of any other owner.
          </p>
          <p>
            All Intellectual Property Rights in any material other than the
            Content is owned by us. You are solely responsible for obtaining
            prior written permission before re-using any material that is
            available on the Services. All Intellectual Property Rights in the
            User Content or other Content is owned by the respective User or
            Resort or Service Provider. You are solely responsible for obtaining
            their prior written permission before re-using any other content
            that is available on the Services. Any unauthorized use of the
            materials appearing on this Service may violate copyright, trademark
            and other applicable laws and could result in criminal or civil
            penalties. You must not modify, copy, distribute, transmit, display,
            perform, reproduce, publish, license, create derivative works from,
            transfer or sell any information, software or material obtained from
            the Services which are not yours.
          </p>
          <p>
            All Intellectual Property Rights in the Content is owned by you. You
            grant us an assignable, royalty free, worldwide, non-exclusive,
            transferable licence in perpetuity to copy, distribute, adapt,
            publish the Content for the purpose of operating, developing and
            improving the Services and complying with these Resort Terms.
          </p>
          <p>
            <strong>CANCELLATION AND TERMINATION</strong>
          </p>
          <p>
            TO CANCEL YOUR ACCOUNT: You are solely responsible for cancelling
            your account. You may cancel by notifying us at our contact details
            provided. You will remain liable for any commissions for bookings
            made whilst your account was active. On cancellation of your
            account, all of your Content, material and links will be deleted.{" "}
          </p>
          <p>
            WE MAY TERMINATE YOUR ACCOUNT AT ANY TIME: We have the right to
            terminate your account for any reason, at any time. You agree that
            we may, in our sole discretion, terminate or suspend your access to
            all or part of the Services with or without notice and for any
            reason, including, without limitation, breach of these Resort Terms.
            Any suspected fraudulent, abusive or illegal activity may be grounds
            for terminating your relationship and may be referred to the
            appropriate law enforcement authorities.
          </p>
          <p>
            If we have reasonable grounds to suspect you have breached any
            Resort Terms, if your content is offensive, or for any other reason
            including if, in our opinion, you have breached the use of our
            Services or compromised its use for others, we have the right, in
            our sole discretion, to immediately withdraw your information and
            terminate your account. We may also deny the use of our Services to
            you in the future and are not obligated to return any fees.
          </p>
          <p>
            Upon such termination, regardless of the reasons, your right to use
            the Services and related services immediately ceases and you
            acknowledge and agree we may immediately deactivate or delete your
            account and all related information. We may also bar you from any
            further access to our Services. We shall not be liable to you or any
            third party for any claims or damages arising out of any termination
            or suspension or any other actions taken by us in connection with
            such termination or suspension.
          </p>
          <p>
            <strong>LIMITATION OF LIABILITY AND INDEMNITY</strong>
          </p>
          <p>You acknowledge and agree:</p>
          <ul>
            <li>
              We are a facilitator only for the purposes of permitting Resorts
              and Service Providers to post Content and Users to plan and book
              trips;
            </li>
            <li>
              All agreements for accommodation or activities are a contract
              between you and the guest and we are not involved;
            </li>
            <li>
              Your guests and Users are responsible for their own travel, visas,
              insurances etc and we are not involved;
            </li>
            <li>
              Any complaints, issues or disputes with guests must be addressed
              in a timely manner by you, and that we are not responsible for
              resolving any issues you have with guests;
            </li>
            <li>Your use of the Services is done at your sole risk.</li>
          </ul>
          <p>
            You agree and acknowledge that we are not liable for any direct,
            indirect, consequential or incidental loss or damage which may
            result from your use of our Services, the Content the User Content
            or any information contained on the Services or linked to it. This
            includes but is not limited to any loss, personal injury, illness,
            death, system and property damage, loss of profits, revenue, salary,
            reliance on the information on the Services, access to or inability
            to use the Services, or inaccuracy or loss of Content from the
            Services or removal of the Services. In any event, any liability to
            you will not exceed the amount actually paid by you to us in the
            preceding six (6) month period.
          </p>
          <p>
            We are not responsible for your Content nor for your breach of any
            third party rights. We are also not responsible for any claim of any
            third party which may be a result of your links, material or Content
            on your website, business or otherwise. You acknowledge, agree and
            undertake that you shall be the legally responsible party for any
            conduct and contact by you in respect of any legal proceedings and
            you agree and undertake to indemnify us and keep us at all times
            fully indemnified from and against any claims, demands, costs,
            damages or awards whatsoever arising directly or indirectly as a
            result of any conduct by you in using our Services including but not
            limited to any User and third party claims.
          </p>
          <p>
            <strong>GENERAL</strong>
          </p>
          <p>
            <u>Independence</u>
          </p>
          <p>
            No agency, partnership, joint venture, or employment is created as a
            result of these Resort Terms and you do not have any authority of
            any kind to bind us in any respect whatsoever.
          </p>
          <p>
            <u>Waiver</u>
          </p>
          <p>
            Our failure to exercise or enforce any right or provision of these
            Resort Terms shall not constitute a waiver of such right or
            provision.
          </p>
          <p>
            <u>Severability</u>
          </p>
          <p>
            In the event that any provision of these Resort Terms is deemed
            unlawful or void or for any reason unenforceable, then that
            provision is severed from this Agreement and will not affect the
            validity and enforceability of the remaining provisions.
          </p>
          <p>
            <strong>GOVERNING LAW</strong>
          </p>
          <p>
            These Resort Terms are governed by the laws of Victoria which are in
            force from time to time and both you and we agree to submit to the
            non-exclusive jurisdiction of the Courts of Victoria for determining
            any dispute concerning these Resort Terms.
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
