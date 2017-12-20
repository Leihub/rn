import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Table,Card} from 'rctui'
// import fetch from 'refetch'
import fetch from '_/hoc/fetch.js'

<<<<<<< current
// import authorlist from '../../data/authorlist.json'

function List (props) {
  const { data } = props
  return (
    <Card>
      <Card.Header>作者列表</Card.Header>
      <Table
        data={data.list}
        columns={[
          { name: 'id', header: 'ID' },
          { name: 'name', header: '姓名' },
          { name: 'nationality', header: '国籍' },
          { name: 'birthday', header: '生日' },
        ]}
      />
  </Card>
  )
}
List.PropTypes = {
  data:PropTypes.object.isRequired,
=======
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:{
        list:[],
      }
    }
  }
  componentWillMount(){
    fetch.get('../authorlist.json').then((res)=>{
      this.setState({
        data:res.data
      })
    }).catch((err)=>console.log(err))
  }
  render(){
    if (!this.state.data) {
      return <Loading/>
    }
    return (
      <Card>
        <Card.Header>作者列表</Card.Header>
        <Table
          data={this.state.data.list}
          columns={[
            { name: 'id', header: 'ID' },
            { name: 'name', header: '姓名' },
            { name: 'nationality', header: '国籍' },
            { name: 'birthday', header: '生日' },
          ]}
        />
    </Card>
    )
  }
>>>>>>> before discard
}
export default fetch(List)
