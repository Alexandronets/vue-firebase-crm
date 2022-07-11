export default {
    install: (app, options) => {
        app.config.globalProperties.$date = function (value, format = 'date') {
                let options= {},
                    date
                if (format.includes('date')) {
                    options.day = '2-digit'
                    options.month = 'long'
                    options.year = 'numeric'
                }

                if (format.includes('time')) {
                    options.hour = '2-digit'
                    options.minute = '2-digit'
                    options.second = '2-digit'
                }
                date = new Intl.DateTimeFormat('ua-UA', options)
                    .format(this.date, 'datetime')

                return date
        }
    }
}