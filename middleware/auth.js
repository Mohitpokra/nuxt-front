export default function ({ $axios, store }) {
    $axios.onRequest( (config) => {
        debugger
      if (store.state.token) {
        config.headers.common['Authorization'] = `Bearer ${store.state.token}`
      }
    })
  }