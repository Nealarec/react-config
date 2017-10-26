import React from 'react'
import actionCreators from 'store/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'sass'

var Hello = ({ user, changeName }) => (
  <div>
    <div>Hello, This is react!! and redux :D {user.name}</div>
    <input type='text' value={user.name} onChange={({ target }) => changeName(target.value)} />
  </div>
)

Hello.propTypes = {
  user: React.PropTypes.string,
  changeName: React.PropTypes.func
}

var mapStateToProps = (state) => ({ ...state })
var mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Hello)
