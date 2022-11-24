let questions;

export default class DBDAO {
  static async injectDB(conn) {
    if (questions) {
      return;
    }
    try {
      questions = await conn
        .db(process.env.QUESTIONS_NS)
        .collection("questions");
      console.log(questions);
    } catch (e) {
      console.error("Unable to establish a collection handle in DBDAO: ", e);
    }
  }

  static async getQuestions({
    filters = null,
    page = 0,
    questionsPerPage = 20,
  } = {}) {
    let query;

    if (filters) {
      if ("question" in filters) {
        query = { question: { $eq: filters["question"] } };
      }
    }
    let cursor;
    try {
      cursor = await questions.find(query);
      console.log('does it hit this ntry')
    } catch (e) {
      console.error("Unable to issue find command, ", e);
      return { questionsList: [], totalNumQuestions: 0 };
    }
    console.log(cursor);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ let query", questions);

    const displayCursor = cursor; //.limit(questionsPerPage).skip(questionsPerPage * page)
    try {
      const questionsList = await displayCursor.toArray();
      const totalNumQuestions = await questions.countDocuments(query);
      return { questionsList, totalNumQuestions };
    } catch (e) {
      console.error(
        "Unable to convert cursor to array or problem counting documents, "
      );
      return { questionsList: [], totalNumQuestions: 0 };
    }
  }
}
