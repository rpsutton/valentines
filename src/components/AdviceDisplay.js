import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Button from "react-bootstrap/Button";
import DisplaySection from "./DisplaySection";
import { backgrounds } from "../styles/backgrounds";
import { quotes } from '../components/quotes';
import Spinner from "react-bootstrap/Spinner";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function generateRandomNumber(num) {
  return Math.floor(Math.random() * Math.floor(num));
}

function HeroSection(props) {

  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState(quotes[generateRandomNumber(quotes.length)]);
  const [background, setBackground] = useState(backgrounds[generateRandomNumber(backgrounds.length)]);
  const [countdown, setCountdown] = useState(false);

 
  const getQuotes = () => {
    
    let background = backgrounds[generateRandomNumber(backgrounds.length)];
    let quote = quotes[generateRandomNumber(quotes.length)];
    console.log(quote);
    setTimeout(() => {
      setData(quote);
      setBackground(background);
      setIsLoaded(true);
    }, 1200);
  }

  if (!isLoaded) {
    return (
      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner variant="lavender" animation="grow" role="status" style={{ height: "10vh", width: "10vh" }} />
      </section>
    )
  }
  else {
    return (
      <DisplaySection
        height={props.height}
        bg={props.bg}
        textColor={props.textColor}
        size={props.size}
        bgImage={background}
        bgImageOpacity={"50%"}
      >
        <Container className="text-center">
          <SectionHeader
            title={data}
            size={1}
            spaced={true}
            giant={true}
          />
          <section className="d-flex flex-row justify-content-center align-content-center">
            <Button
              className="p-1 m-0"
              variant={props.buttonColor}
              disabled={(countdown ? true : false)}
              onClick={() => {
                getQuotes();
                setIsLoaded(false);
              }}
            >
              {countdown ? (
                <CountdownCircleTimer
                  isPlaying
                  duration={5}
                  colors={[
                    ['#fff', 0.33],
                  ]}
                  size={30}
                  strokeWidth={2}
                  onComplete={() => setCountdown(false)}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              ) : <p className="m-0 p-2">Generate new advice</p>}
            </Button>
          </section>
        </Container>
      </DisplaySection>
    );
  }
}

export default HeroSection;
