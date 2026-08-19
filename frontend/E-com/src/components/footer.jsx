

// function Footer (){

//     return(
//     <>
   
//     <footer className="d-flex justify-content-evenly bg-dark text-white py-3">

//  <div className="row">
//         <div className="col-12 col-md-6">
//   <div>
//     <h4>Contact Us</h4>

//     <p>📞 Phone : +91 6383461690</p>
//     <p>✉ Email : rjkumar1982kum@gmail.com</p>
//   </div>

//   <div>
//     <h4>Follow Me</h4>

//     <div className="d-flex gap-3" >
//         <a href="#" ><i className="bi bi-github fs-4"></i></a>
//         <a href="#"><i className="bi bi-linkedin  fs-4"></i></a>
//         <a href="#" ><i className="bi bi-youtube  fs-4"></i></a>
//         <a href="#"><i className="bi bi-instagram fs-4"></i></a>
//     </div>
//   </div>

//   <div>
//     <h4>About</h4>

//     <span className="d-flex flex-column">
//       Providing professional e-commerce solutions to
//       <span>help you grow your online business.</span>
//     </span>
//   </div>
//   </div>
// </div> 
// </footer>  

//     </>
//     )}

// export default Footer



function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">

      <div className="container">

        <div className="row text-center text-md-start">

          {/* Contact */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">

            <h5>Contact Us</h5>

            <p className="mb-2">
              📞 Phone : +91 6383461690
            </p>

            <p className="mb-2">
              ✉ Email : rjkumar1982kum@gmail.com
            </p>

          </div>


          {/* Social Media */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">

            <h5>Follow Me</h5>

            <div className="d-flex justify-content-center justify-content-md-start gap-3">

              <a href="#" className="text-white">
                <i className="bi bi-github fs-4"></i>
              </a>

              <a href="#" className="text-white">
                <i className="bi bi-linkedin fs-4"></i>
              </a>

              <a href="#" className="text-white">
                <i className="bi bi-youtube fs-4"></i>
              </a>

              <a href="#" className="text-white">
                <i className="bi bi-instagram fs-4"></i>
              </a>

            </div>

          </div>


          {/* About */}
          <div className="col-12 col-md-4">

            <h5>About</h5>

            <span className="d-flex flex-column">
              Providing professional e-commerce solutions to
              <span>
                help you grow your online business.
              </span>
            </span>

          </div>

        </div>

      </div>
    

      <div className="text-center border-top border-secondary pt-3 mt-4">
  <p className="mb-0">
    © 2026 Ramzon. All Rights Reserved.
  </p>
</div>
    </footer>
  );
}

export default Footer;