import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import StylishButton from "../components/StylishButton/StylishButton";
import { gsap, CSSPlugin, Expo } from "gsap";
import Hero from "../components/HeroSection/Hero";
import Card from "../components/Cards/Card";

gsap.registerPlugin(CSSPlugin);

function Home() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {

    // const randomIncrement = Math.floor(Math.random() * 10) + 1;
    const randomIncrement = 40;
    const count = setInterval(() => {
      setCounter((counter) =>
        counter < 100
          ? counter + randomIncrement
          : (clearInterval(count), setCounter(100), reveal())
      );
    }, 25);
  }, []);

  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        console.log("completed");
      },
    });
    t1.to(".follow", {
      width: "100%",
      ease: Expo.easeInOut,
      duration: 1.2,
      delay: 0.7,
    })
      .to(".hide", { opacity: 0, duration: 0.3 })
      .to(".hide", { display: "none", duration: 0.3 })
      .to(".follow", {
        height: "100%",
        ease: Expo.easeInOut,
        duration: 0.7,
        delay: 0.5,
      })
      .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0.7 })
  };

  return (
    <AppContainer>
      <Loading>
        <Follow className="follow"></Follow>
        <ProgressBar
          className="hide"
          id="progress-bar"
          style={{ width: counter + "%" }}
        ></ProgressBar>
        <Count id="count" className="hide">
          {counter}%
        </Count>
      </Loading>

      <Content className="content bg-red-500 ">
        {/* <StylishButton text={"Start now"}/> */}
        <Hero />
        <Card />
      </Content>
    </AppContainer>
  );
}

export default Home;

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  color: #000000;
  position: relative;
  overflow-y: scroll; /* Enable vertical scrolling */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
  }
`;
const Loading = styled.div`
  height: 100%;
  width: 100%;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;
const Follow = styled.div`
  position: absolute;
  background-color: #3ECF8E;
  height: 2px;
  width: 0;
  left: 0;
  z-index: 2;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  background-color: #fff;
  height: 2px;
  width: 0;
  transition: 0.4s ease-out;
`;

const Count = styled.p`
  position: absolute;
  font-size: 130px;
  color: #fff;
  transform: translateY(-15px);
  font-weight: 500;
`;

const Content = styled.div`
  width: 0;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #1c1c1c;
  padding: auto;
  overflow: hidden;

  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  color: #fff;

  p {
    text-align: center;
    font-size: 104px;
    opacity: 0;
    display: none;
    font-weight: 500;
    margin: 0;
  }
`;