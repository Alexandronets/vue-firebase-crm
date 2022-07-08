export default {
    install: (app, options) => {
        app.config.globalProperties.$currency = function (value, currency = 'UAH') {
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency
            }).format(value)
        }
    }
}