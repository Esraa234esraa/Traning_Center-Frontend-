
import React from 'react';
import About from '../Pages/About';
import HomePage from '../Pages/Home';
import Courses from '../Pages/Courses';
import ReviewSection from '../Pages/Reviews';
import Activites from '../Pages/Activites';
import ExamIntro from '../Pages/ExamIntro';
import Roles from './Roles';

function Home() {
  return (
    <div className="scroll-smooth">
      <section id="home">
        <HomePage />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="courses">
        <Courses />
      </section>
      {/* <section id="reviews">
        <ReviewSection />
      </section> */}
      <section id="activities">
        <Activites />
      </section>
      {/* <section id="examintro">
        <ExamIntro />
      </section> */}
    </div>
  );
}

export default Home;
