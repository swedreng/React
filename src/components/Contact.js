import React, {Component} from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as contactActions from "../actions/contact"
import './contact.scss'

const choose = [
    {
        name: 'Bir konu seç',
        value: 'empty',
    },
    {
        name: 'Hesabımla ilgi bir sorun',
        value: 'accountproblem',
    },
    {
        name: 'Tavsiye',
        value: 'advice',
    },
    {
        name: 'Reklam',
        value: 'advertisement',
    },
    {
        name: 'İletisim',
        value: 'contact',
    }
]


class Contact extends Component{
    constructor(props){
        super(props);
        this.state = {choose: 0,name:'',email:'',userMessage:''}
    }

    changeSubject(e){
        let index = e.target.value;
        this.setState({choose: index}) 
    }

    save(){
        let { getContact } = this.props.contactActions
        getContact({name:this.state.name,email:this.state.email,message:this.state.userMessage,choose:this.state.choose}).then(()=>{
            this.setState({choose:0,name:'',email:'',userMessage:''})
        })  
    }
  
    render(){
    const { result } = this.props.description
    const { message } = this.props.description
    const { name,email,userMessage} = this.state
    const isEnabled = (this.state.choose !==0  && name && email && userMessage)   
    const alertTrue = "alert alert-success"
    const alertFalse = "alert alert-danger"

    return(    
    <div className="row img-thumbnail">    
        <div class="col-md-12">
            <div class="row">
                <div class="well well-sm">
                    <form>
                    <div class="row">
                        <div class="col-md-5 col-lg-5">
                            <div class="form-group">
                                <label for="name">Adınız Soyadınız</label>
                                <input type="text" class="form-control" value={this.state.name} onChange={(e) => this.setState({name:e.target.value})} placeholder="Ad Soyad" />
                            </div>
                            <div class="form-group">
                                <label for="email">
                                    Email Adresiniz</label>
                                <div class="input-group">
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span>
                                    </span>
                                    <input type="email" class="form-control" value={this.state.email} onChange={(e) => this.setState({email:e.target.value})} placeholder="Email" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Konu</label>
                                <select class="form-control" value={this.state.choose}  onChange={(e) => this.changeSubject(e)}>
                                {choose.map((c,index) => {
                                    return (<option key={index} value={index}>{c.name}</option>)
                                })}
                                </select>
                            </div>
                        </div>
                        <div class="col-md-7 col-lg-7">
                            <div class="form-group">
                                <label htmlFor="name">Mesaj</label>
                                <textarea class="form-control" rows="9" cols="25" value={this.state.userMessage} onChange={(e) => this.setState({userMessage:e.target.value})} placeholder="Mesajınız giriniz"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <button type="text" class="btn btn-danger pull-right" disabled={!isEnabled} onClick={() => this.save()}>Gönder</button>
                        </div>
                        
                    </div>
                    </form>
                    <div>
                        {(message ? <p className={result === true ? alertTrue : result === false ? alertFalse: null}>{message}</p> :null)}
                    </div>
                </div>
            </div>  
        </div>

        <div class="col-md-5 col-lg-5">
                <form>
                    <legend><span class="glyphicon glyphicon-globe"></span> Bizim Ofis</legend>
                        <address>
                            <strong title="Adress">Adres: </strong>
                            Henüz ofis yok.
                        </address>
                        <adress>
                        <strong title="Phone">Tel: </strong>
                            Siz numaranızı mesajla bırakın biz sizi ararız :)
                        </adress>
                        <address>
                            <strong>E-mail: </strong>
                            <a href="mailto:#">opanc.info@gmail.com</a>
                        </address>
                </form>
         </div>
    </div>

        );
    }
}
const mapStateToProps = ({ auth,description }) => ({
    auth,description
})

const mapDispatchToProps = dispatch => ({
    contactActions: bindActionCreators(contactActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
  