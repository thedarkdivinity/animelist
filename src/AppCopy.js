<Switch>
<Route exact path="/" component={Initial} />
<ProtectedRoute exact path="/profile" component={Profile}/>

<ProtectedRoute exact path="/details/:mal_id" component={Details}/>

</Switch>