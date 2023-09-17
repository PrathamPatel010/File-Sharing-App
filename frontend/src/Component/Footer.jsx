/* eslint-disable react/no-unescaped-entities */
const Footer = () => {
    return (
        <footer className="container text-center my-5">
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h2>Made with ❤ by Pratham</h2>
                <h3>Let's connect on Socials</h3>
                <div className="col-12 col-md-4 my-3">
                    <a href="https://github.com/PrathamPatel010"><i className="fab fa-2x fa-github mx-2 mx-md-3"></i></a>
                    <a href="https://twitter.com/Prathamtwts"><i className="fab fa-2x fa-twitter mx-2 mx-md-3"></i></a>
                    <a href="https://www.linkedin.com/in/pratham-patel-08865821b"><i className="fab fa-2x fa-linkedin mx-2 mx-md-3"></i></a>
                </div>
            </div>
            <div className="col-12">
                <small>©2023 Pratham Patel</small>
            </div>
        </footer>
    );
}

export default Footer;
