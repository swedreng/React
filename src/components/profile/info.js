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
               <label class="col-md-3 control-label" for="tel">Telefon</label>  
               <div class="col-md-6">
                  <input id="tel" name="tel" type="text" placeholder="Telefon" class="form-control" required=""/>
               </div>
               <div className="col-md-3">
                  <button className="btn btn-danger">Ekle</button>
               </div> 
             </div>
             
             <div className="form-group">
               <label className="col-md-3 control-label" for="adres">Adres</label>  
               <div className="col-md-6">
                  <input type="text" placeholder="Adres" className="form-control"/>
               </div>
               <div className="col-md-3">
                 <button className="btn btn-danger">Ekle</button>
               </div> 
             </div>
             
             <div className="form-group">
               <label className="col-md-3 control-label" for="yazi">Yazı</label>
               <div className="col-md-6">                     
                  <input type="text" placeholder="Sizi anlatan birşey.." className="form-control"/>
               </div>
               <div className="col-md-3">
                 <button className="btn btn-danger">Ekle</button>
               </div>
             </div>
             
             </fieldset>
             </form>
             
             
            </div>
        );
    }
}
export default info;