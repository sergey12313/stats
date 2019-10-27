import React from 'react';
import { Helmet } from 'react-helmet'
import { Switch, Route, Redirect } from 'react-router-dom'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"
import "@blueprintjs/select/lib/css/blueprint-select.css"
import { Content, Header } from './components'
import { ATS } from './constants'


const defaultRoute = () => {
  const formatTime = date => (date.getTime() / 1000).toFixed()
  const endDate = new Date()
  const startDate = new Date(endDate)
  startDate.setMonth(startDate.getMonth() - 1)
  
  return {
    start: startDate,
    end: endDate,
    atsId: ATS[0].id,
    get url(){ return  `/${this.atsId}/${formatTime(this.start)}/${formatTime(this.end)}`} 
  }

}

const {start, end, atsId, url} = defaultRoute();

const App = () => {
  return (
    <>
      <Helmet>
        <title>Stats</title>
      </Helmet>
      
      <Header start={start} end={end} atsId={atsId}/>
      <main>
      <Switch>
        <Route exact path="/">
          <Redirect to={url} />
        </Route>
        <Route path="/:ats/:start/:stop">
          <Content />
        </Route>
      </Switch>
      </main>
    </>
  )
}

export { App }





export default App;


