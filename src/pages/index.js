import React from "react";
import AdviceDisplay from "./../components/AdviceDisplay";
import Footer from "./../components/Footer";

function IndexPage(props) {
  var dateObject = new Date();
  var curentYear = dateObject.getFullYear();
  return (
    <>
      <AdviceDisplay
        bg="pink"
        textColor="light"
        buttonColor="primary"
      />
      <Footer
        bg="lavender"
        textColor="light"
        size="sm"
        bgImage=""
        bgImageOpacity={1}
        description="A short description of what you do here"
        copyright={"© " + curentYear}
      />
    </>
  );
}

export default IndexPage;
