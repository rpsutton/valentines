import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Button from "react-bootstrap/Button";
import DisplaySection from "./DisplaySection";
import { backgrounds } from "../styles/backgrounds";
import Spinner from "react-bootstrap/Spinner";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const API_URL = "https://api.adviceslip.com/advice";

function get(url) {
  return fetch(url)
    .then(resp => resp.json())
}
const API = { get }

function generateRandomNumber(num) {
  return Math.floor(Math.random() * Math.floor(num));
}

function HeroSection(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState("");
  const [background, setBackground] = useState("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1615&q=80");
  const [countdown, setCountdown] = useState(false);

  const getQuotes = useCallback(() => {
    API.get(API_URL)
      .then(data => {
        setData(data.slip.advice);
        setBackground(backgrounds[generateRandomNumber(26)]);
      })
      .then(() => {
        window.setTimeout(setIsLoaded(true), 3000);
        setCountdown(true);
      })
      .catch(error => console.log(error));
  }, [])

  useEffect(() => {
    getQuotes();
  }, [getQuotes])


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
