import React from "react";

function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>About Us</h4>
                <ul>
                  <li>
                    <i className="ion-ios-arrow-forward" /> <a href="#">Home</a>
                  </li>
                  <li>
                    <i className="ion-ios-arrow-forward" />{" "}
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <i className="ion-ios-arrow-forward" />{" "}
                    <a href="#">Our services</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="ion-ios-arrow-forward" />{" "}
                    <a href="#">Lorem ipsum</a>
                  </li>
                  <li>
                    <i className="ion-ios-arrow-forward" />{" "}
                    <a href="#">Pellentesque</a>
                  </li>
                  <li>
                    <i className="ion-ios-arrow-forward" />{" "}
                    <a href="#">Suspendisse egestas</a>
                  </li>
                  <li>
                    <i className="ion-ios-arrow-forward" />{" "}
                    <a href="#">Nulla tristique</a>
                  </li>
                  <li>
                    <i className="ion-ios-arrow-forward" />{" "}
                    <a href="#">Phasellus leo</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 footer-contact">
                <h4>Contact Us</h4>
                <p>
                  PIPLANI PETROL PUMP
                  <br />
                  BHOPAL , MADHYA PRADESH
                  <br />
                  INDIA <br />
                  <strong>Phone:</strong> +123-456-7890
                  <br />
                  <strong>Email:</strong> info@example.com
                  <br />
                </p>
                <div className="social-links">
                  <a href="#">
                    <i className="ion-logo-twitter" />
                  </a>
                  <a href="#">
                    <i className="ion-logo-facebook" />
                  </a>
                  <a href="#">
                    <i className="ion-logo-linkedin" />
                  </a>
                  <a href="#">
                    <i className="ion-logo-instagram" />
                  </a>
                  <a href="#">
                    <i className="ion-logo-googleplus" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 footer-newsletter">
                <h4>Subscription</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type.
                </p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" defaultValue="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 copyright text-white">
              Copyright © 2045 <a href="#">ELMS</a>. All Rights Reserved
            </div>
            <div className="col-md-6 credit text-white">
              {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
              Designed by Arjun
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
