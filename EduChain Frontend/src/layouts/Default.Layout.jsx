import React from "react";
import Navbar from "../components/Navbar/Navbar.Component";
import Footer from "../components/Footer/Footer.Component";

const DefaultLayout = (props) => {
    return (
        <div>
            <Navbar />
            {props.children}
            <Footer />
        </div>
    );
};

export default DefaultLayout;
