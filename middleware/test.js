export default function ({
  store,
  route,
  redirect
}) {
  const loggedIn = store.state.auth.loggedIn
  const routeName = route.name
  if (loggedIn && (['sign_up', 'forgot_password'].indexOf(routeName) > -1)) {
    redirect('/')
  }
}
