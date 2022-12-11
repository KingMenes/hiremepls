import "./SectionCardContainer.css";
import SectionCard from "../SectionCard/SectionCard";
import jobImg from "../../assets/undraw_job_hunt_re_q203.svg";
import salaryImg from "../../assets/undraw_investing_re_bov7.svg";
import { motion } from "framer-motion";

function SectionCardContainer() {
  const jobSubs = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem unde rerum aut tenetur, commodi, voluptas pariatur totam ut fugiat, suscipit dolores exercitationem molestias?",
  ];
  const salarySubs = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem unde rerum aut tenetur, commodi, voluptas pariatur totam ut fugiat, suscipit dolores exercitationem molestias?",
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
          Search for Jobs
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
          Find Salaries
        </motion.button>
      </SectionCard>
      {/* <SectionCard className='bg-green' /> */}
    </div>
  );
}

export default SectionCardContainer;
