import React, { Component } from 'react'
import PropTypes from 'prop-types'
import refetch from 'refetch'
import { Mask, Spin } from 'rctui'

const PENDING = 0
const SUCCESS = 1
const FAILURE = 2

export default function(Origin){
  class Fetch extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data:null,
        status: props.fetch ? PENDING : SUCCESS,
      }
      this.fetchData = this.fetchData.bind(this)
    }
    fetchData(){


      
    }
  }
}
