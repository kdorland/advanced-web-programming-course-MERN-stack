import React from "react";
import Questions from "./Questions";
import Question from "./Question";
import { Router, createHistory } from "@reach/router";
import AskQuestion from "./AskQuestion";
import PostAnswer from "./PostAnswer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    fetch("http://localhost:8080/api/questions")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          questions: data
        });
      });
  }

  getQuestion(slug) {
    return this.state.questions.find(question => question.slug === slug);
  }
  addQuestion(question) {
    fetch("http://localhost:8080/api/questions", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          questions: data
        });
      });
  }
  addAnswer(answer, slug) {
    this.setState(state => {
      let list = [...state.questions];
      let question = state.questions.find((question, index) => {
        if (question.slug === slug) {
          list.splice(index, 1);
          return question;
        }
      });
      question.answers.push(answer);
      list.push(question);
      return {
        questions: list
      };
    });
  }

  render() {
    return (
      <Router>
        <Questions path="/" questions={this.state.questions} />
        <Question
          path="/question/:questionSlug"
          getQuestion={slug => this.getQuestion(slug)}
        />
        <AskQuestion
          path="/question/ask"
          addQuestion={question => this.addQuestion(question)}
        />
        <PostAnswer
          path="/question/:questionSlug/post-answer"
          getQuestion={slug => this.getQuestion(slug)}
          addAnswer={(answer, slug) => this.addAnswer(answer, slug)}
        />
      </Router>
    );
  }
}

export default App;