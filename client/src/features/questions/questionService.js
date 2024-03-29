import axios from "axios";

const API_URL = "/api/questions/";

// Create new question
const createQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, questionData, config);

  return response.data;
};

// Get questions
const getQuestions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete question
const deleteQuestion = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + questionId, config);

  return response.data;
};

const questionService = {
  createQuestion,
  getQuestion,
  deleteQuestion,
};

export default questionService;
