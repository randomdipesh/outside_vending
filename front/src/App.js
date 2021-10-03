import { lazy, Suspense } from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
// page imports starts
const Index = lazy (()=>import("./pages/Index"))
const Refund = lazy (()=>import("./pages/Refund"))
// page imports ends
const App = ()=>{
	return(
		<BrowserRouter>
			<Suspense fallback = {<>Loading ....</>}>
			<Switch>
				<Route exact path = "/" component = {Index} />
				<Route exact path = "/refund" component = {Refund} />
			</Switch>
			</Suspense>
		</BrowserRouter>
	)
}
export default App