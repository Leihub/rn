import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Author from '_/components/author/index.js'
import Category from '_/components/category/index.js'
import Book from '_/components/book/index.js'

import '_/styles/index.scss'
import _header from '_/styles/header.scss'
import _menu from '_/styles/menu.scss'



function App() {
  return(
    <Router>
      <div>
        <div className = {_header.container}>react example</div>
        <div className = { _menu['container'] }>
          <Link to ='/author'>作者</Link>
          <Link to ='/category'>分类</Link>
          <Link to ='/book'>书籍</Link>
        </div>
        <div>
          <Route path= '/author' component={Author}/>
          <Route path= '/category' component={Category}/>
          <Route path= '/book' component={Book}/>
        </div>
      </div>
    </Router>
  )
}

export default App
