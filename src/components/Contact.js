import React, {Component} from 'react';
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
        
        this.state = {choose: 0,name:'',email:'',message:''}

    }

    changeSubject(e){
        let index = e.target.value;
        this.setState({choose: index}) 
    }

    save(){
       
    }
  
    render(){
    //const { name,email,message} = this.state
    //const isEnabled = (name && email && message)   
    return(    
    <div className="row">    
        <div class="col-md-12">
            <div class="row">
                <div class="well well-sm">
                    <form>
                    <div class="row">
                        <div class="col-md-5 col-lg-5">
                            <div class="form-group">
                                <label for="name">Adınız Soyadınız</label>
                                <input type="text" class="form-control" id="name" placeholder="Ad Soyad" required="required"/>
                            </div>
                            <div class="form-group">
                                <label for="email">
                                    Email Adresiniz</label>
                                <div class="input-group">
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span>
                                    </span>
                                    <input type="email" class="form-control" id="email" placeholder="Email" required="required" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subject">Konu</label>
                                <select id="subject" name="subject" class="form-control" required="required" value={this.state.choose}  onChange={(e) => this.changeSubject(e)}>
                                {choose.map((c,index) => {
                                    return (<option key={index} value={index}>{c.name}</option>)
                                })}
                                </select>
                            </div>
                        </div>
                        <div class="col-md-7 col-lg-7">
                            <div class="form-group">
                                <label htmlFor="name">Mesaj</label>
                                <textarea id="message" class="form-control" rows="9" cols="25" required="required"placeholder="Mesajınız giriniz"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-warning pull-right" id="btnContactUs" onClick={() => this.save()}>Gönder</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>  
        </div>

        <div class="col-md-5 col-lg-5">
                <form>
                    <legend><span class="glyphicon glyphicon-globe"></span> Our office</legend>
                        <address>
                            <strong>Twitter, Inc.</strong>
                            795 Folsom Ave, Suite 600
                            San Francisco, CA 94107
                            <abbr title="Phone">P:</abbr>
                            (123) 456-7890
                        </address>
                        <address>
                            <strong>Full Name</strong>
                            <a href="mailto:#">first.last@example.com</a>
                        </address>
                </form>
         </div>
    </div>

        );
    }
}
export default Contact;