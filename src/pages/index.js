import React, {useEffect, useState} from "react";
import AdviceDisplay from "./../components/AdviceDisplay";
import NewsletterSection from "./../components/NewsletterSection";
import Footer from "./../components/Footer";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function IndexPage(props) {
  const { height, width } = useWindowDimensions();
  var dateObject = new Date();
  var curentYear = dateObject.getFullYear();
  return (
    <>
      <AdviceDisplay
        bg="pink"
        textColor="light"
        buttonColor="primary"
        height={height}
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
