// Inject HTML for the footer
window.addEventListener("load", function () {
  const footerHTML = `
      <section class="sectionFooter">
        <footer class="mainfooter" role="contentinfo">
          <div class="footer-middle">
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="footer-pad">                  
                      <ul class="footerlogo">
                        <img src="../images/tp-logo-footer.png" alt="TP Logo"/>
                      </ul>
                      <ul class="footerlogo-2">
                        <img src="../images/tp-logo-footer.png" alt="TP Logo"/>
                      </ul>                  
                  </div>
                </div>
                <div class="col">
                  <div class="footer-pad">
                    <ul class="list-unstyled">
                      <li><a href="https://www.tp.edu.sg/home.html">Main Website</a></li>
                      <li><a href="https://www.tp.edu.sg/informaticsandit">Our Courses</a></li>
                      <li><a href="https://www.tp.edu.sg/about-tp/media-centre.html">Media Centre</a></li>
                      <li><a href="https://www.tp.edu.sg/contactus">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-6">
                  <h4>Follow Us</h4>
                  <ul class="social-network social-circle">
                    <li><a href="https://www.facebook.com/iitsch/" class="icoFacebook" title="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.instagram.com/tpiit" class="icoInstagram" title="Instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.linkedin.com/school/temasek-polytechnic/" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.tiktok.com/@tp_iit" class="icoTiktok" title="Tiktok"><i class="fa fa-tiktok" aria-hidden="true"></i></a></li>
                    <li><a href="https://twitter.com/i/flow/login?redirect_after_login=%2Ftemasekpoly" class="icoTwitter" title="Twitter"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="https://t.me/temasekpolyofficial" class="icoTelegram" title="Telegram"><i class="fa fa-telegram" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.youtube.com/channel/UC6_sz8NUywF-G7g20amakyQ" class="icoYoutube" title="Youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 copy">
                  <p class="text-center">© Copyright 2024 - Temasek Polytechnic. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    `;
  document.body.insertAdjacentHTML("beforeend", footerHTML);
});
