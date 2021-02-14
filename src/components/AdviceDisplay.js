import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Button from "react-bootstrap/Button";
import DisplaySection from "./DisplaySection";
import { backgrounds } from "../styles/backgrounds";
import { quotes } from '../components/quotes';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

let quotesLength = quotes.length;
let backgroundsLength = backgrounds.length;

function HeroSection(props) {

  function generateRandomNumber(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  const getQuotes = () => {
    let quoteIndex = generateRandomNumber(quotesLength);
    let bgIndex = generateRandomNumber(backgroundsLength);
    setQuote(quotes[quoteIndex]);
    setBackground(backgrounds[bgIndex]);
  }

  const [quote, setQuote] = useState(quotes[generateRandomNumber(quotesLength)]);
  const [background, setBackground] = useState(backgrounds[generateRandomNumber(backgroundsLength)]);
  const [countdown, setCountdown] = useState(false);
  console.log(background);
  
  return (
    <DisplaySection
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={background}
      bgImageOpacity={"70%"}
    >
      <Container className="text-center">
        <SectionHeader
          title={quote}
          size={1}
          spaced={true}
          giant={true}
        />

        <section className="d-flex flex-row justify-content-center align-content-center">

          <Button
            className="p-1 m-0"
            variant="lavender"
            disabled={(countdown ? true : false)}
            onClick={() => {
              getQuotes();
              //setIsLoaded(false);
            }}
          >
            {countdown ? (
              <CountdownCircleTimer
                isPlaying
                duration={8}
                colors={[
                  ['#fff', 0.33],
                ]}
                size={30}
                strokeWidth={2}
                onComplete={() => setCountdown(false)}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            ) : <p className="m-0 p-2">More pip and bean</p>}
          </Button>

        </section>
      </Container>
    </DisplaySection>
  );
}

export default HeroSection;
