import { useEffect, useState, useContext } from "react";
import QuestionBox from "../QuestionBox/QuestionBox";
import "./TestFetch.css";
import { getQuestions } from "../../store/questions";
import { useDispatch, useSelector } from "react-redux";
import { SortContext } from "../../context";

function TestFetch() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const { sortedState } = useContext(SortContext);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  // 👇 USED THIS TO GET QUESTIONS AS ARRAY 👇
  // useEffect(() => {
  //   let arr = [];
  //   Object.values(questions).map((question) => {
  //     arr.push(question.question)
  //   })
  //   console.log(arr);
  //   } ,[]
  // );

  // const questions = [
  //   "Where do you see yourself in 5/10 years?",
  //   "Why do you want to join our company?",
  //   "Tell me about yourself",
  //   "What is your greatest strength?",
  //   "What do you know about this company/organization?",
  //   "Why should we hire you?",
  //   "What can you bring to the company?",
  //   "What do you consider to be your weaknesses?",
  //   "What is a time you disagreed with a decision that was made at work?",
  //   "Tell me about a time you made a mistake",
  //   "Tell me about a time you failed",
  //   "Why are you leaving your current job?",
  //   "Why did you leave your previous job?",
  //   "Why were you fired?",
  //   "Why was there a gap in your employment?",
  //   "Can you explain why you changed career paths?",
  //   "What's your current salary?",
  //   "What did you like least about your last job?",
  //   "What do you like least about your current job?",
  //   "Why are you looking for a new position?",
  //   "What's your management style?",
  //   "What's your work style?",
  //   "What are you looking for in your new position?",
  //   "What type of work environment do you prefer?",
  //   "What's your work style?",
  //   "What's your management style?",
  //   "How would your boss and coworkers describe you?",
  //   "How do you deal with pressure or stressful situations?",
  //   "What do you like to do outside of work?",
  //   "Are you planning on having children?",
  //   "How do you stay organized?",
  //   "How do you prioritize your work?",
  //   "What are you passionate about?",
  //   "What motivates you?",
  //   "What are your pet peeves?",
  //   "How do you like to be managed?",
  //   "Do you consider yourself successful?",
  //   "How do you plan to achieve your career goals?",
  //   "What are your career aspirations?",
  //   "What's your dream job?",
  //   "What other companies are you interviewing with?",
  //   "What makes you unique?",
  //   "What should I know that's not on your resume?",
  //   "Do you have any questions for me?",
  //   "What would your first few months look like in this role?",
  //   "What are your salary expectations?",
  //   "What do you think we could do better or differently?",
  //   "When can you start?",
  //   "Are you willing to relocate?",
  //   "How many tennis balls can you fit into a limousine?",
  //   "If you were an animal, which one would you want to be?",
  //   "Sell me this pen",
  //   "Is there anything else you'd like us to know?",
  //   "What are some projects that you've worked on?",
  //   "When are you able to start?",
  //   "What is your favorite language?",
  // ]
  // const sessionUser = useSelector((state) => state.session.user);

  // const submitQuestion = async (q) => {
  //   const data = await dispatch(
  //     createQuestion({
  //       question: q,
  //       user: sessionUser,
  //       body: '',
  //       position: '',
  //       company: '',
  //       tags: '',
  //       date: new Date(),
  //       views: 0,
  //     })
  //   );
  // }

  // useEffect(() => {
  //   questions.map((question) => {
  //     submitQuestion(question)
  //   })
  // },[])

  function timeSince(date) {
    var date1 = new Date();
    var seconds = Math.floor((date1.getTime() - date.getTime()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  function calculateHotness(question) {
    const votes =
      question.reputation.likes.count - question.reputation.dislikes.count;
    const date = question.date;

    // calculate the difference in seconds between now and the post date
    const secondsSincePost = (new Date() - date) / 1000;

    // use the Reddit hotness formula to calculate the hotness score
    const hotness = votes / Math.pow(secondsSincePost + 2, 1.5);

    return hotness;
  }

  function sortByTop(questions) {
    return questions.sort((a, b) => {
      return (b.reputation.likes.count - b.reputation.dislikes.count) - (a.reputation.likes.count - a.reputation.dislikes.count)
    });
  }

  function sortByHot(questions) {
    return questions.sort((a, b) => {
      return (calculateHotness(b) - calculateHotness(a))
    })
  }

  function sortByNew(questions) {
    return questions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  function sortByViews(questions) {
    return questions.sort((a, b) => {
      return b.views - a.views;
    })
  }

  let questionsToSort = [];
  Object.values(questions).map((question) => {
    questionsToSort.push(question)
  });

  let sortedByTop = sortByTop(questionsToSort);
  let sortedByNew = sortByNew(questionsToSort);
  let sortedByViews = sortByViews(questionsToSort);
  let sortedByHot = sortByHot(questionsToSort);

  let sortedQuestions;

  switch (sortedState) {
    case 1: sortedQuestions = sortedByHot;
    case 2: sortedQuestions = sortedByNew;
    case 3: sortedQuestions = sortedByTop;
    case 4: sortedQuestions = sortedByViews;
    default:
      // do nothing
  }

  return (
    <div id="questionsContainer">
      {sortedQuestions
        ? sortedQuestions.map((question) => {
            return (
              <QuestionBox
                id={question?._id}
                question={question?.question}
                body={question?.body}
                author={question?.author}
                date={timeSince(new Date(question?.date))}
                rep={question?.reputation}
                tags={question?.tags}
                views={question?.views}
                key={question?._id}
                authorName={question?.authorName}
                comments={question?.comments}
              />
            );
          })
        : null}
    </div>
  );
}

export default TestFetch;
