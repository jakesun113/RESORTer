import React from "react";
import BackTopBtn from "../template/BackTopBtn";
import FeedBackBtn from "../template/FeedBackBtn";
import ChatBtn from "../template/ChatBtn";
export default class GuestUserContent extends React.Component {
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
          <p class="h1">Terms of Use - Guests and Users</p>
          <br />
          <p>
            These Terms of Use (‘Terms’) apply to all guests and Users of these
            Services. We may modify and update these Terms at any time, without
            notice. You need to ensure you review the Terms from time to time.
            By using our Services, you agree to be bound by these Terms as well
            as any and all general terms and conditions and our privacy policy
            posted on our website from time to time. If you do not accept these
            Terms you are not permitted to use our Services.
          </p>
          <p>
            <strong>DEFINITIONS</strong>
          </p>
          <p>
            “Content” means anything the Resort or Service Provider submits as
            material to be included in the Services, including all material,
            links, words, images, photos, videos.
          </p>
          <p>
            "Intellectual Property Rights" means all intellectual property
            rights including rights in copyright works, registered and
            unregistered trademarks, brands, logos and devices, any design
            rights, inventions, and patents, trade secrets and confidential
            information.
          </p>
          <p>
            “Resort or Service Provider” means the Resort or Service Provider
            such as a provider of rental equipment or activities or lift passes
            that has been approved by us to place Content on or through the
            Services, and includes any person who uses the Services through that
            Resort or Service Provider account.
          </p>
          <p>
            “Services” means the RESORTer software application for mobile phones
            and tablet computers, computers, laptops, and the RESORTer web
            portal.
          </p>
          <p>
            “User/ you/ your” means anyone who uses the Services, or views or
            accesses the Services, and includes all guests.
          </p>
          <p>
            “User Content” means anything a User submits as material to be
            included in a comment or post which we may allow from time to time
            and including all material, links, words, images, photos, videos.
          </p>
          <p>
            “We”, “our” and “us” means RESORTer, including all directors,
            employees, and contractors
          </p>
          <p>
            <strong>HOW IT WORKS</strong>
          </p>
          <p>
            We are a directory and trip planner. Based on your choices and
            needs, we assist you to plan your trip and experience, and our
            Services generate an itinerary for your holiday. This then forms a
            booking request which is sent to the Resort or Service Provider in
            real time. The Resort or Service Provider inputs the order in their
            system, checks their availability, estimates the cost and will
            contact you to confirm availability, supply a quote and take
            payment. We receive a cost per enquiry and a commission from Resorts
            and Service Providers. We also receive a commission from you on a
            sale, the extent to which will be clearly visible prior to payment.
            however this will not be chargeable for a period of time as we test
            the Beta site. You may then submit User Content in the way of
            comments or posts in relation to your trip.
          </p>
          <p>
            <strong>YOUR ACCOUNT</strong>
          </p>
          <p>
            To be eligible to use our Services, you acknowledge and agree to the
            following:
          </p>
          <ul>
            <li>
              You are over 18 years of age and able to create a binding legal
              contract;
            </li>
            <li>
              You must treat your login and password as confidential, not
              disclosing it to any third party and only using the Services
              yourself in person;
            </li>
            <li>
              You agree to accept all risks of unauthorized access to your
              account and any other information you provide to us. You are
              responsible for all activity on your account in relation to any
              User; and
            </li>
            <li>
              You agree to keep all your information you use for the Services
              correct, current and complete.
            </li>
          </ul>
          <p>
            <strong>
              VISAS, TRAVEL INSURANCE, DEPOSIT & PAYMENTS, COMMISSION FEES
            </strong>
          </p>
          <p>
            <em>Visas and Travel:</em> In most instances, visas may be required
            for travel overseas. We are not responsible for any issues related
            to your inability to travel or enter any country or zone as a result
            of your citizenship or other status. You are responsible for
            ensuring you obtain all necessary entry requirements and have a
            valid passport prior to travel as well as ensuring you have
            appropriately booked your travel plans. We recommend you take out
            appropriate insurances to cover your travel, experience and any
            activities you may undertake.
          </p>
          <p>
            <em>Deposits and Payments:</em>Any deposits, payments, refunds, fees
            are made directly to and with the Resort or Service Providers. We at
            no time are involved in any payments, refunds, cancellations or
            disputes you may have in relation to your booking or travel
            experience. We are, however, happy to receive your feedback on any
            experience, travel, Resort or Service Provider to ensure we can make
            recommendations and limit any disappointing experiences.
          </p>
          <p>
            We do not recommend any one Resort or Service Provider over another
            and are not otherwise affiliated with any particular Resort or
            Service Provider.
          </p>
          <p>
            <strong>HEALTH AND MEDICAL ISSUES</strong>
          </p>
          <p>
            You are fully responsible for ensuring you have made all enquiries
            for all Services directly with the Resort or Service Provider to
            ensure you are not at risk for any medical or health related issues.
            This includes but is not limited to all food risks, fitness
            requirements and travel issues you may have or which may pose
            potential risk. You need to make your own enquiries and consult your
            medical professional prior to any travel or booking.
          </p>
          <p>
            <strong>CONTENT REQUIREMENTS</strong>
          </p>
          <p>
            We have high standards that you need to meet if you wish to post
            comments. The User Content must meet the standards below.
          </p>
          <p>
            <strong>User Content standards:</strong>
          </p>
          <p>Any User Content must:</p>
          <ul>
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
              regulations or that otherwise may be in conflict with these Terms.
            </li>
            <li>Not be likely to deceive any person.</li>
            <li>
              Not promote any illegal activity, or advocate, promote or assist
              any unlawful act.
            </li>
            <li>
              Not cause annoyance, inconvenience or needless anxiety or be
              likely to upset, embarrass, alarm or annoy any other person;
            </li>
            <li>
              Not be used to impersonate any person, or to misrepresent your
              identity or affiliation with any person or organisation.
            </li>
            <li>
              Not give the impression that they originate from us or any other
              person or entity, if this is not the case;
            </li>
            <li>
              Not follow commercial interests are spam or advertisements of any
              sort.
            </li>
          </ul>
          <p>
            In consideration for allowing you to post User Content, you grant us
            a royalty free perpetual non-exclusive license to use, copy edit
            change distribute, reproduce, make derivative works of and alter in
            whatever way we chose your User Content, including in promotional
            and commercial activities.
          </p>
          <p>
            We have similar high standards that Resort and Service Providers
            must meet to post Content on our Services. We try to ensure we
            review our Services on a regular basis to ensure our high standards
            are met, but we cannot be responsible for any Content that is posted
            by Resort or Service Providers or User Content that may not comply
            with the standards. We do not warrant that the Content or User
            Content is accurate, up to date, error free or true.
          </p>
          <p>
            <strong>ALTERATION, DELETION OF CONTENT</strong>
          </p>
          <p>
            We reserve the right at any time and from time to time to alter or
            delete any Content or User Content. In particular, if we believe the
            User Content does not comply with our standards, or breaches
            regulations, or we receive complaints, or for any other reason in
            our reasonable discretion, we may alter or delete Content or User
            Content at any time without notice. We shall not be liable to you or
            any third party for any alteration or deletion of Content or User
            Content.
          </p>
          <p>
            <strong>RESTRICTIONS ON YOUR USE</strong>
          </p>
          <p>
            Only guests and Resort or Service Providers may use or attempt to
            use our Services. We grant you the right to access and use the
            Services for the purpose of assisting with your trip planning. This
            right is non-exclusive, non-transferable and limited by these Terms.
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
              Not attempt to modify, copy adapt, scrap, reproduce, disassemble,
              decompile, or reverse engineer any computer programs, try to find
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
            unavailable.
          </p>
          <p>
            We take reliability and security seriously and put significant
            effort into ensuring that we maintain a secure environment for all
            data. However, no system is perfectly secure or reliable, and the
            reliability of hosting services, third party vendors, Internet
            intermediaries, your Internet service provider, and other service
            providers to provide software, hardware and storage cannot be
            assured. When you use our Services, you accept these risks.
          </p>
          <p>
            To avoid doubt, all implied conditions or warranties in relation to
            the Services are excluded so far as is permitted by law, and in
            particular under the Australian Consumer Law. We exclude all
            warranties of merchantability, fitness for purpose and
            non-infringement.
          </p>
          <p>
            We reserve the right at any time and from time to time to
            discontinue the Services either temporarily or permanently with or
            without notice. From time to time we may issue an update to the
            Services which may add, modify and/or remove features from the
            Services. These updates may be pushed out automatically with little
            or no notice. If there is a material change to the permissions
            required to run the Services, we will seek your agreement to the
            permissions at such time you may choose to accept or not. We shall
            not be liable to you or any third party for any modification,
            unavailability or discontinuance of the Services.
          </p>
          <p>
            <strong>INTELLECTUAL PROPERTY</strong>
          </p>
          <p>
            All custom graphics, icons, logos and service names are registered
            trademarks, copyright, trade or service marks of ours.
          </p>
          <p>
            All other trademarks or service marks within these Services are the
            property of their respective owners. Nothing in these Terms grants
            you any right to use any trademark, service mark, logo, and/or our
            name or to use any other member’s Content without their express
            permission.
          </p>
          <p>
            All Intellectual Property Rights in the Services including any
            material other than the Content is owned by us. You are solely
            responsible for obtaining our prior written permission before
            re-using any material that is available on the Services. All
            Intellectual Property Rights in the Content is owned by the Resort
            or Service Provider. You are solely responsible for obtaining their
            prior written permission before re-using any Content that is
            available on the Services. Any unauthorized use of the materials
            appearing on this Service may violate copyright, trademark and other
            applicable laws and could result in criminal or civil penalties. You
            must not modify, copy, distribute, transmit, display, perform,
            reproduce, publish, license, create derivative works from, transfer
            or sell any information, software or Content obtained from the
            Services which are not yours.
          </p>
          <p>
            All Intellectual Property Rights in the User Content is owned by
            you. You grant us an assignable, royalty free, worldwide,
            non-exclusive, transferable licence in perpetuity to copy,
            distribute, adapt, publish the User Content for the purpose of
            operating, developing and improving the Services and complying with
            these Terms.
          </p>
          <p>
            <strong>CANCELLATION AND TERMINATION</strong>
          </p>
          <p>
            TO CANCEL YOUR ACCOUNT: You are solely responsible for cancelling
            your account. You may cancel through the Services or by notifying us
            at our contact details provided
          </p>
          <p>
            WE MAY TERMINATE YOUR ACCOUNT AT ANY TIME: We have the right to
            terminate your account for any reason, at any time. You agree that
            we may, in our sole discretion, terminate or suspend your access to
            the Services with or without notice and for any reason, including,
            without limitation, a breach of these Terms. Any suspected
            fraudulent, abusive or illegal activity may be grounds for
            terminating your relationship and may be referred to the appropriate
            law enforcement authorities.
          </p>
          <p>
            If we have reasonable grounds to suspect you have breached any
            Terms, if your content is offensive, or for any other reason
            including if, in our opinion, you have breached the use of our
            Services or compromised its use for others, we have the right, in
            our sole discretion, to immediately withdraw your information and
            terminate your account. We may also deny the use of our Services to
            you in the future.
          </p>
          <p>
            Upon such termination, regardless of the reasons, your right to use
            the Services immediately ceases and you acknowledge and agree we may
            immediately deactivate or delete your account and all related
            information. We may also bar you from any further access to our
            Services. We shall not be liable to you or any third party for any
            claims or damages arising out of any termination or suspension or
            any other actions taken by us in connection with such termination or
            suspension.
          </p>
          <p>
            Any cancellation of trips or services must be referred directly to
            the Resort or Service Provider. We are at no time to be involved in
            any dispute nor are we responsible for any cancellation,
            unavailability, issues with your booking or other issues you may
            have with the Resort or Service Provider beyond functionality of the
            RESORTer app and website.
          </p>
          <p>
            <strong>COMPLAINTS</strong>
          </p>
          <p>
            We do our utmost to provide accurate information on our website and
            app, answer all your queries and ensure you enjoy using our
            Services. In the event there arises an instance where you may feel
            your accommodation level, food or room quality or another aspect of
            your booking or experience was not as advertised or was otherwise
            not matching your expectations, we ask that you address this, at the
            time, with the relevant Resort or Service Provider or operator
            (hotel, restaurant, tour guide, activity provider, instructor)
            directly. If no satisfactory resolution is reached please contact us
            with your feedback.
          </p>
          <p>
            We only facilitate the Services to enable you to book with the
            Resort or Service Provider, and are not responsible for the
            cleanliness, food quality or room quality of hotels or activities at
            venues including the accuracy of any third party offers or other
            such issues or claims you may have. While we endeavour to ensure
            your use of our Services is at all times of a high quality, we ask
            that if you have any issue with any Resort or Service Provider, you
            alert them immediately, to provide them with an opportunity to
            address your concerns. We do not have any control over this process
            apart from permitting them to advertise their services using our
            Services.
          </p>
          <p>
            It shall be your own responsibility to ensure that any products,
            Services or information available through this website, app or
            otherwise offered through RESORTer meets your specific, personal or
            commercial requirements. We do not warrant that any booking or
            experience you choose using our Services will be suitable or fit for
            your purpose or will correspond with the advertising by the Resort
            or Service Provider. You agree to make your own enquiries directly
            with the venue if required.
          </p>
          <p>
            <strong>DISCLAIMER FOR USE OF OUR SERVICES</strong>
          </p>
          <p>
            You are contracting directly with the Resort or Service Provider. We
            are a third party facilitator only to enable Users to connect with
            Resorts and Service Providers and book activities, accommodation and
            other forms of great entertainment using our Services. We do not
            guarantee any booking or reservation, availability of any booking,
            activity or experience, nor do we make any representations or
            warranties of any kind, express or implied, about the quality,
            quantity, suitability of any tour, experience, food, accommodation
            or anything accessed or advertised through or using our Services.
            Users must make their own enquiries to determine if the Resort or
            Service Provider is suitable for their needs, use and expectations.
          </p>
          <p>
            <strong>LIMITATION OF LIABILITY AND INDEMNITY</strong>
          </p>
          <p>You acknowledge and agree:</p>
          <ul>
            <li>
              We are a facilitator only for the purpose of permitting the Resort
              or Service Provider to post Content on our Services, and we do not
              provide any guarantees, warranties, representations of any type
              about any Resort or Service Provider or any of their Content or
              individual services;
            </li>
            <li>
              We are not affiliated with any particular Resort or Service
              Provider;
            </li>
            <li>
              We cannot guarantee that a Resort or Service Provider will contact
              you or that any booking will be successful;
            </li>
            <li>
              You are responsible for all your own visas, insurances and other
              travel requirements etc;
            </li>
            <li>
              All agreements for accommodation or activities are a contract
              between you and the Resort or Service Provider and we are not
              involved;
            </li>
            <li>
              Any cancellations and changes to itineraries must be made directly
              with the Resort or Service Provider and you are subject to their
              policies and terms and conditions;
            </li>
            <li>
              Any complaints, issues or disputes must be directed to the Resort
              or Service Provider. We are not responsible for resolving issues
              you have with the Resort or Service Provider; and
            </li>
            <li>Your use of the Services is done at your sole risk.</li>
          </ul>
          <p>
            You agree and acknowledge that we are not liable for any direct,
            indirect, consequential or incidental loss or damage which may
            result from your use of or reliance on our Services, the Content or
            any information contained on the Services or linked to it. This
            includes but is not limited to any loss, personal injury, illness,
            death, system and property damage, loss of profits, revenue, salary,
            reliance on the information on the Services, unavailability of
            accommodation or activities; access to or inability to use the
            Services, or inaccuracy or loss of Content from the Services or
            removal of the Services. Property damage includes damage to mobile
            phones and tablet computers, computers, laptops.{" "}
          </p>
          <p>
            We are not responsible for your User Content nor for your breach of
            any third party rights. You acknowledge, agree and undertake that
            you shall be the legally responsible party for any conduct by you in
            respect of any legal proceedings and you agree and undertake to
            indemnify us and keep us at all times fully indemnified from and
            against any claims, demands, costs, damages or awards whatsoever
            arising directly or indirectly as a result of any conduct by you in
            using our Services including but not limited to any third party
            claims.
          </p>
          <p>
            <strong>GENERAL</strong>
          </p>
          <p>
            <u>Waiver</u>
          </p>
          <p>
            Our failure to exercise or enforce any right or provision of these
            Terms shall not constitute a waiver of such right or provision.
          </p>
          <p>
            <u>Severability</u>
          </p>
          <p>
            In the event that any provision of these Terms is deemed unlawful or
            void for any reason unenforceable, then that provision is severed
            from this Agreement and will not affect the validity and
            enforceability of the remaining provisions.
          </p>
          <p>
            <strong>GOVERNING LAW</strong>
          </p>
          <p>
            These Terms are governed by the laws of Victoria, Australia, which
            are in force from time to time and both you and we agree to submit
            to the exclusive jurisdiction of the Courts of Victoria for
            determining any dispute concerning these Terms.
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
