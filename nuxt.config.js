export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "SBMP",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/custom.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: "~/plugins/sidebar",
      mode: "client"
    },
    {
      src: "@/plugins/vClickOutside",
      ssr: false
    },
    {
      src:"@/plugins/VuePhoneNumberInput"
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/date-fns"],
  /*
   ** Nuxt.js modules
   */

  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "@nuxtjs/auth",
    ["cookie-universal-nuxt", {
      alias: "cookiz"
    }]
  ],
  router: {
    middleware: ['test']
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  axios: {
    // baseURL: 'http://ec2-18-212-38-13.compute-1.amazonaws.com/backend/public/api'
    baseURL: "http://ec2-54-172-247-207.compute-1.amazonaws.com/"
  },
  auth: {
    // Options
    redirect: {
      login: "/sign_in"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "api/login",
            method: "post",
            propertyName: "token"
          },
          logout: {
            url: "api/logout",
            method: "post"
          },
          user: {
            url: "api/full-user-info",
            method: "post",
            propertyName: "user"
          }
        },
        // tokenRequired: true,
        tokenType: "Bearer"
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    }
  }
};
