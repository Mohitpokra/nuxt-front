export default async function({$auth, redirect}){
    let isLoggedIn = $auth.loggedIn
    debugger
    if(!isLoggedIn){
        redirect('/sign_in')
    }
}