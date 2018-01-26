import React, {Component} from 'react';
import './info.scss'

class info extends Component{
    render(){
        return(
            <div className="row">
             <form class="form-horizontal">
             <fieldset>
             
             <legend>Kişisel Bilgiler</legend>
             
             <div class="form-group">
               <label class="col-md-4 control-label" for="tel">Telefon</label>  
               <div class="col-md-5">
               <input id="tel" name="tel" type="text" placeholder="Telefon" class="form-control" required=""/>
                 
               </div>
             </div>
             
             <div className="form-group">
               <label className="col-md-4 control-label" for="adres">Adres</label>  
               <div className="col-md-5">
               <input type="text" placeholder="Adres" className="form-control"/>
                 
               </div>
             </div>
             
             <div className="form-group">
               <label className="col-md-4 control-label" for="yazi">Yazı</label>
               <div className="col-md-4">                     
                <textarea className="form-control textarea" col="27" placeholder="Sizi anlatan birşey"></textarea>
               </div>
             </div>
             
             
             <div className="form-group">
               <label className="col-md-4 control-label" for="singlebutton"></label>
               <div className="col-md-4">
                 <button className="btn btn-warning">Ekle</button>
               </div>
             </div>
             
             </fieldset>
             </form>
             
             
            </div>
        );
    }
}
export default info;