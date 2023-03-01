import "./SectionCardContainer.css";
import SectionCard from "../SectionCard/SectionCard";
import jobImg from "../../assets/undraw_job_hunt_re_q203.svg";
import salaryImg from "../../assets/undraw_investing_re_bov7.svg";
import { motion } from "framer-motion";

function SectionCardContainer() {
  const jobSubs = [
    "Find your dream job, faster",
    "Whether you're looking for your first job or seeking a new career challenge, our job board has thousands of opportunities waiting for you. With a wide range of industries and positions available, you'll be able to find the perfect fit in no time.",
  ];
  const salarySubs = [
    "Take control of your salary negotiations.",
    "Wondering if you're being paid what you're worth? Our community of salary experts can help. Post and compare job salaries, ask questions, and get the information you need to negotiate the best possible salary for your skills and experience.",
  ];

  return (
    <div className="sectioncard-container">
      <SectionCard
        className="bg-orange"
        img={jobImg}
        header="Jobs Board"
        subtitle={jobSubs[0]}
        desc={jobSubs[1]}
      >
        <motion.button
          className="btn-orange"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Search for Jobs{<br></br>}(in progress)
        </motion.button>
      </SectionCard>
      <SectionCard
        className="bg-blue"
        img={salaryImg}
        header="Salary Search"
        subtitle={salarySubs[0]}
        desc={salarySubs[1]}
      >
        <motion.button
          className="btn-blue"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Find Salaries {<br></br>}(in progress)
        </motion.button>
      </SectionCard>
      {/* <SectionCard className='bg-green' /> */}
    </div>
  );
}

export default SectionCardContainer;
