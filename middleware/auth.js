export default function ({ store, route, redirect }){
  const user = store.state.users.user;

  if (!user && route.path !== '/login') {
    return redirect('/login')
  } else if (user && route.path === '/login') {
    return redirect('/')
  }
}
