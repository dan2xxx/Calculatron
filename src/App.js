import React from "react"
import "./App.css"
import Buttons from './Buttons'

const isOperator = /[*/+-]/


let operatorBind = false
let newExpression = false
let decimalEvent = false
let firstElementinNumber = true


class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      output: "0",
      currentInput: "",
      tempInput: "",
      link:
        "https://miro.medium.com/max/380/0*pDrYLvrZrFo6AWAG",
      showImage: false
    }

    this.addToInput = this.addToInput.bind(this)
    this.addOperator = this.addOperator.bind(this)
    this.reset = this.reset.bind(this)
    this.calculate = this.calculate.bind(this)
    this.addDecimal = this.addDecimal.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.state.output !== prevProps.output) {
      if (this.state.output === "5051") {
        this.setState({
          showImage: true,
          output: "0"
        })
      }
    }
  }

  reset(e) {
    //console.log(e)
    operatorBind = false
    decimalEvent = false
    newExpression = false
    firstElementinNumber = true
    this.setState({
      currentInput: e.target.value,
      output: "0"
    })
  }

  addToInput(e) {
    if (newExpression === false) {
      //console.log(e.target.value)
      //console.log("Number input")

      let expression = this.state.currentInput
      let last = expression.length - 1

      if (
        //Second 0 ban
        e.target.value === "0" &&
        expression[expression.length - 1] === "0" &&
        //expression.length == 1
        firstElementinNumber === true &&
        decimalEvent === false
      ) {
        //window.alert('banned')   // !!!!!!!!!!!!!!!!!!!!!!!!!!
        this.setState({
          output: "0"
        })
      } else {
        //Usual adding >>>
        if (
          firstElementinNumber === false ||
          isOperator.test(expression[last]) ||
          expression[last] === "."
        ) {
          //window.alert('not first el or previous was op or dot ')   // !!!!!!!!!!not first el or previous was op or dot!!!!!!!!!!!!!!!!
          this.setState({
            currentInput: this.state.currentInput.concat(e.target.value),
            output:
              this.state.output === "0" || isOperator.test(this.state.output)
                ? e.target.value
                : this.state.output + e.target.value
          })

          if (isOperator.test(expression[last]) && e.target.value === "0") {
            firstElementinNumber = true
          } else {
            firstElementinNumber = false
          }
          operatorBind = true
        } else if (
          e.target.value !== "0" &&
          this.state.currentInput[this.state.currentInput.length - 1] === "0"
        ) {
          //window.alert('first element removes 0')  // !!!!!!!!!!!!!!!!!!!!!!!!!!
          // first element removes 0
          let expression = this.state.currentInput.substring(
            0,
            this.state.currentInput.length - 1
          )
          this.setState({
            currentInput: expression.concat(e.target.value),
            output:
              this.state.output === "0" || isOperator.test(this.state.output)
                ? e.target.value
                : this.state.output + e.target.value
          })

          operatorBind = true
          firstElementinNumber = false
        } else if (firstElementinNumber === true) {
          //first element
          this.setState({
            currentInput: this.state.currentInput.concat(e.target.value),
            output:
              this.state.output === "0" || isOperator.test(this.state.output)
                ? e.target.value
                : this.state.output + e.target.value
          })
          operatorBind = true
          //window.alert('first element',)  // !!!!!!!!!!!!!!!!!!!!!!!!!!
          if (e.target.value !== "0") {
            firstElementinNumber = false
          }
        }
      }
    } else {
      this.setState({
        //new Expression
        currentInput: e.target.value,
        output: e.target.value
      })
      newExpression = false
    }
  }

  addOperator(e) {
    if (newExpression === false) {
      //console.log(e.target.value)
      //console.log("Operator input")
      if (operatorBind === true) {
        this.setState({
          currentInput: this.state.currentInput.concat(e.target.value),
          output: e.target.value
        })
        operatorBind = false
        decimalEvent = false

        //console.log(this.state.currentInput)
      } else {
        //Second operator:
        if (e.target.value !== "-") {
          let expression = this.state.currentInput
          let last = expression.length - 1

          if (expression[last - 1] !== " ") {
            expression = expression.substring(0, last)
            expression = expression.concat(e.target.value)
            this.setState({
              currentInput: expression,
              output: e.target.value
            })
            operatorBind = false
            decimalEvent = false
          } else {
            //if there are two "-" operator (- -)
            expression = expression.substring(0, last - 2)
            expression = expression.concat(e.target.value)
            this.setState({
              currentInput: expression,
              output: e.target.value
            })
            operatorBind = false
            decimalEvent = false
          }
        } else {
          //if 2nd is "-"
          let expression = this.state.currentInput
          let last = expression.length - 1
          // First time adding "-"
          if (expression[last - 1] !== " ") {
            expression = expression.concat(" ", e.target.value)
            this.setState({
              currentInput: expression,
              output: e.target.value
            })
            operatorBind = false
            decimalEvent = false
          }

          // ^^^^^^^^^^^^^^^
        }
      }
    } else {
      this.setState({
        currentInput: this.state.output.concat(e.target.value),
        output: e.target.value
      })
      newExpression = false
      operatorBind = false
      decimalEvent = false
    }
    firstElementinNumber = true
  }

  addDecimal(e) {
    //console.log(this.state.currentInput)
    if (operatorBind === true) {
      if (decimalEvent === false) {
        this.setState({
          currentInput: this.state.currentInput.concat(e.target.value),
          output: this.state.output + e.target.value
        })
        decimalEvent = true
      }
    }
    operatorBind = false
  }

  calculate() {


    if (newExpression === false) {
      //console.log("Calculating...")
      let expression = this.state.currentInput
      //console.log(expression)

      if (operatorBind === false) {
        expression = expression.slice(0, expression.length - 1)
      }
      //console.log(expression)

      let answer = Math.round(10000000 * eval(expression)) / 10000000
      //console.log(answer)

      this.setState({
        output: answer.toString(),
        currentInput:
          operatorBind === false
            ? expression.concat("=", answer)
            : this.state.currentInput.concat("=", answer)
      })
      newExpression = true
    }
  }

  render() {
    if (this.state.showImage === true) {
      return (
        <div>
          <h1> ПОПАВСЬ!!! </h1>
          <img src={this.state.link} alt='link' />
        </div>
      )
    } else {
      return (
        <div className="calculator">
          <h1>Calculatron</h1>
          <div className="displays">
            {this.state.currentInput
              ? <h3 className="display_top">{this.state.currentInput}</h3>
              : <h3 className="display_top">0</h3>
            }
            <h2 className="display_bottom" id="display">
              {this.state.output}
            </h2>
          </div>
          <Buttons
            id="buttons"
            numbers={this.addToInput}
            operators={this.addOperator}
            ac={this.reset}
            calculate={this.calculate}
            decimal={this.addDecimal}
          />
        </div>
      )
    }
  }
}



export default function App() {
  return (
    <div>
      <Calculator />
    </div>
  )
}
