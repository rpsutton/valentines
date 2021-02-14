import React, {useState, useEffect} from "react";
import AdviceDisplay from "./../components/AdviceDisplay";

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
  const { height} = useWindowDimensions();
  return (
    <>
      <AdviceDisplay
        bg="pink"
        textColor="light"
        buttonColor="lavender"
        height={height}
      />
    </>
  );
}

export default IndexPage;
