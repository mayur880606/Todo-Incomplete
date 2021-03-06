import React , {Component} from 'react';
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
              username : 'mayur30',
              password : '',
              hasLoginFailed : false,
              showSuccessMessage : false
        }
    
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        // console.log(event.target.name)
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }
        )
    }

    // handlePasswordChange(event){
    //     console.log(event.target.value)
    //     this.setState({password:event.target.value})
    // }

    loginClicked(){
        // console.log(this.state)
        // if(this.state.username === 'mayur30' && this.state.password === 'dummy'){
        //     AuthenticationService.registerSuccesfullLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     // this.setState({showSuccessMessage:true})
        //     // this.setState({hasLoginFailed:false})
        // }
        // else{
        //     // console.log("Failed")
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username,this.state.password)
            .then(() => {
                AuthenticationService.registerSuccesfullLogin(this.state.username,this.state.password)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch( () => {
                this.setState({showSuccessMessage:false})
                this.setState({hasLoginFailed:true})    
            })
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successfull</div>}
                    {/* <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                    UserName : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/><br/><br/>
                    Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/><br/><br/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>        
            </div>
        )
    }
}

// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowSuccessMessage(props){
//     if(props.showSuccessMessage){
//         return <div>Login Successfull</div>
//     }
//     return null
// }

export default LoginComponent