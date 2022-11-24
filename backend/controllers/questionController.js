import DBDAO from "../dao/questionsDAO.js";

export default class QuestionsController {
  static async apiGetQuestions(req, res, next) {
    const { questionsList, totalNumQuestions } = await DBDAO.getQuestions({});
    let response = {
      questions: questionsList,
      // page: page,
      // filters: filters,
      // entries_per_page: questionsPerPage,
      total_results: totalNumQuestions,
    };
    res.json(response);
  }
}
