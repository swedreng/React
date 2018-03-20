import { createStore, applyMiddleware, compose } from "redux" // TODO: CreateStore: Store oluşturmanı sağlıyor 
                                                              // TODO: applyMiddleware: Reduxthunk ve history i ni store'un aracıgılıyla diğer komponentlere aktarıyor.
import ReduxThunk from 'redux-thunk' // TODO: Reducer'un daki değişkenleri aksiyonlarının içerisinde çağırıp kullanmanı sağlıyor.
import rootReducer from "../reducer"  // TODO: Senin kök reducer'un onu çağırıp aktarıp kullanmanı sağlıyor.
import logger from 'redux-logger' // TODO: console da logları gösteriyor state'indeki reducer'un daki actionlardan sonra olan değişiklikler.
import createHistory from 'history/createHashHistory'
// TODO: eski nesil tarayıcılarda kullanılabilmesi için createHashHistory paket'ini kullanırsın çünkü hashli location atıyor,eski tarayıcılar destekliyor.
import { routerMiddleware } from 'react-router-redux'

const history = createHistory() // TODO: Browser historysini react'in eklentisiyle bir değişkene aktarıyoruz.

const initialState = {} // TODO: Default olarak ilk açılırken reducer'a herhangi bir değişken aktarmak istersek kullanıyoruz.
const middleware = [ // TODO: ReduxThunk ve history'i middleware dizisine aktarıyoruz. en son export etmek amacıyla.
  ReduxThunk,
  routerMiddleware(history) // TODO: Burda oluşturduğumuz history'i react-router-redux in bize sağladığı bir middleware den geçirip,
                            // onun push gotoback go gibi fonksiyonlarına erişip react standartlarında kullanıyoruz.
]

if(process.env.NODE_ENV != "production"){ // TODO: Çalışma ortamındayken console'la logların düşmesini ve geliştiricinin görmesini sağlıyor.
  middleware.push(logger)                
}

const composeEnhancers = // TODO: Burada yaptığımız reduxtools aracında browserımızdaki store'u muzu görmemizi sağlayan kod.
process.env.NODE_ENV != "production"
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

  const store = createStore( // TODO: Ve artık store'umuzu kurup bütün işlemleri içerisine aktarıp export ediceğimiz değişkene aktarıyoruz.
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )
  

export { store, history }

// TODO: 3 Çeşit location değiştirme yöntemi var.
// 1-history push: History'i export edip diğer sayfalarda çağırıp onun fonksiyonlarıyla sayfa ve link geçişleri yapabiliriz.
// örn: history.push('/') bu sayfada store'u export edip actionumuzda import edip bu şekilde fonskiyonlarına erişebiliriz.
// 2-redux history push yani suan kullanılan bu projede bu, bu bize browser history'si içindeki fonsksiyonları react aracılığıyla,
// hem diğer componentlere yayıp kullanmamızı hemde sayfa geçişi yapmamızı sağlıyor,
// tanımladığımız app.js de ki router tanımlamalarını aktif ediyor ve kullanmamızı sağlıyor.
// 3-en standart olanı windows.location la yapılan location değişikliği burda linkler #hash li oluyor.

