export default {
   install: (app, options) => {
       app.config.globalProperties.$message = function (html) {
        M.toast({html})
    }
       app.config.globalProperties.$error = function (error) {
        M.toast({html: `[Error]: ${error}`})
    }
   }
}