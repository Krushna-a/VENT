import React from "react";
import { useState, useEffect } from "react";
import DragCarousel from "../components/DragCarousel";
import HomeSec from "../components/HomeSec";
import Cards from "../components/Cards";

const Home = () => {
  const slides = [
    {
      url: "https://media-hosting.imagekit.io/427539fabca84083/hackathon3.png?Expires=1840465400&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DqVaeshqQlwgmonujQYf3F2Ct3aCHGKGDjxyPW89tw-O3kR~BrRKV71lSCRUEgWwgt67dh0O7jifhAE3G6h5vGvhr0KbfmN0qaW1c6k0j3oAIR67NW-HLKIiDiusBfsgbggKZQ9qG7nFY1KB6k6RmYG9IEldvo-c-4CmlSNm5uExPw~Mol6Y0Lm9-UPvhQ~W1uOGm~u9kiwAOaYGtpnjTwYDv~tvH0M70p6qBGhP9muieKv9ZjKJN8cH2VFn4Q1RWy-6DfY1-eDAhNenJDmtLln-HsEh4ztO0zktlc3iusAvmBUa7rINEuzEREU3B757y4xNsPwH7C5L4wqXqhn~5Q__",
      text: "Bridging Students to Opportunities",
    },
    {
      url: "https://media-hosting.imagekit.io/0cfde9972ef34516/hackathon.png?Expires=1840464277&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gv8kBzxMwd9r7hftAK~lHit55fgSbeB0VIIROlk6v0rTE44ExndrFFlL0iwUz9kEzyJ65a52-Je4BQxKXSD63eiErNopqo0zzL0uWsXtFwbi5lTRp8OuiQgXitdDhsyngk-IeLNIaPdSrrqRi-PQOTixOXuRE4uoWVng2A7Q24h~v~qaCk8mum~-UvtYU4UcwKsF~DY5s41ifyr--5ZWotwtwur-MN4juajV0N6XctOW0tmXNNKizfbvqbcrTcQxd~-7MsCasEqVgMlDuZQhZ91TLhACeZOFWikb5N9jZrnW12X0~1X6~5LoVz-85RDpgE0vuorExa5R77G1oWmCbQ__",
      text: "VENT where Students Meet Opportunities",
    },
    {
      url: "https://media-hosting.imagekit.io/a795a4dd41a3434e/concert2.png?Expires=1840465156&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OoEV3IDT~oLP1jgT3S6XAiyqu1lOLiAgQ8Z8bDRqMDIKGpY7vx~4XeUWiEIw~8vJDIbjUk959GhJ2-nbBmFKQtVtYmWyPp04kyw4qygaPZJOjJWo5O-g9LTAJ1ZXj6xqQYxCBxaNxHlRFi6ApmeEVHwfinRnB3AcIsYNCnt2xI3GuvsvvZl13Zdt2KQG0xu7e9gLHSzThyokZPraQ53GKxVHtwtJmjUuwH90eFWDbyGQOBl1eEp55QSVUMI4tikXBFdC-0xieSjAHB8WXCD4lKer25v4EU8q3lIKjqeePbfTIJHlp5ZsdFiLfKPOeGjMEry7TteKjXDXBiw4B7BQZg__",
      text: "Events and Fun — All Near You",
    },
  ];
  

  return (
    <div className="flex flex-col gap-10">
      <DragCarousel slides={slides}></DragCarousel>
      <HomeSec text={"Bridging Students and Opportunities"} video={"/Web developer team working together.mp4"} layout={"flex-row"}></HomeSec>
      <Cards></Cards>
      <HomeSec text={"From Classrooms to Concerts || Find Your Next Adventure!"} video={"/Rockstar Playing guitar on concert.mp4"} layout={"sm:flex-row-reverse"}></HomeSec>
    </div>
  );
};

export default Home;
