export default function ({
  store,
  route,
  redirect
}) {
  const loggedIn = store.state.auth.loggedIn
  const routeName = route.name
  
  if (loggedIn && (['sign_in','sign_up','sign_in-forgot_password','resetpassword'].indexOf(routeName) > -1)) {
    redirect('/exp-home')
  }
}
