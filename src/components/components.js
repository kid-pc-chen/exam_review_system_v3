/*
  For myself:
  Read this simple tutorial once you forget how react-redux works
  [用React+Redux+ES6寫一個最傻瓜的Hello World](https://segmentfault.com/a/1190000004355491)
*/

import React from 'react'
import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'

import {
  changeExamOption,
  changeSearchInput
} from '../actions/actions.js'

import exam1 from '../exam_data/exam1'
import exam2 from '../exam_data/exam2'
import exam3 from '../exam_data/exam3'

class ExamReviewer extends React.Component {
  render () {
    const examList = {
      'exam1': exam1,
      'exam2': exam2,
      'exam3': exam3
    }

    const {
      actions,
      keyword,
      examOption
    } = this.props

    return (
      <div >
        <ExamSelector actions={actions} />
        <SearchBox actions={actions} defaultKeyword={keyword} />
        <QuestionsList exam={examList[examOption]} keyword={keyword} />
      </div >
    )
  }
}

class ExamSelector extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.props.actions.changeExamOption(event.target.value)
  }

  render () {
    return (
      <div>
        <h1>試卷選擇 Choosing examination paper</h1>
        <select onChange={this.handleChange}>
          <option value='exam1'>試卷1</option>
          <option value='exam2'>試卷2</option>
          <option value='exam3'>試卷3</option>
        </select>
      </div>
    )
  }
}

class SearchBox extends React.Component {
  constructor (props) {
    super(props)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange (event) {
    this.props.actions.changeSearchInput(event.target.value)
  }

  render () {
    const {
      defaultKeyword
    } = this.props
    return (<div >
      <h1 > 關鍵字查詢 Keyword search </h1> <input type='text'
        placeholder='在此輸入關鍵字'
        value={
          defaultKeyword
        }
        onChange={
          this.handleTextChange
        }
      /> </div >
    )
  }
}

// https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
function getHighlightedText (text, higlight) {
  // Split on higlight term and include term into parts, ignore case
  let parts = text.split(new RegExp(`(${higlight})`, 'gi'))
  return <span> { parts.map((part, i) =>
    <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { backgroundColor: 'yellow' } : {}}>
      { part }
    </span>)
  } </span>
}

class QuestionsList extends React.Component {
  render () {
    const {
      keyword
    } = this.props
    const {
      exam
    } = this.props
    return (<div > {
      Object.keys(exam).map(function (k, i) {
        // console.log("this: " + this);
        return (<div key={
          'examType' + i
        } >
          <h1 key={
            'examType' + i
          } > {
              k
            } </h1> <div > {
            exam[k].map(function (question, j) {
              // console.log("keyword: " + keyword);
              return question.toLowerCase().includes(keyword.toLowerCase())
                ? (<div key={
                  'question' + j
                } > {
                    getHighlightedText(question, keyword)
                  } </div>) : (<div key={
                  'question' + j
                }
                />)
            })
          } </div> </div >
        )
      })
    } </div>)
  }
}

/*
  1. 將connect所傳入的store state轉換為component所需的props
    並且將props包裝成物件回傳
  2. 這個function其實就是替代componet的componentDidMount方法終訂閱的監聽器
*/
function mapStateToProps (state) {
  return {
    keyword: state.keyword,
    examOption: state.examOption
  }
}

// mapDispatchToProps的作用是把store中的dispatch方法注入給component
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      changeExamOption: changeExamOption,
      changeSearchInput: changeSearchInput
    }, dispatch)
  }
}

/*
  1. 比較exam_review_system_v2，可發現在v3 components都被設計為純元件
    (presentational component/functional component)，就是這些components只負責render，
    不帶有任何業務邏輯，並且沒有自己的state，所有資料都是由props提供
    業務邏輯靠mapStateToProps與mapDispatchToProps這兩個參數提供
  2. 使用connect產生新的component之後，需要讓新的component拿到store，
    這時要透過<Provider>標籤 (Refer to App.js:21)
*/
ExamReviewer = connect(mapStateToProps, mapDispatchToProps)(ExamReviewer)

export default ExamReviewer
