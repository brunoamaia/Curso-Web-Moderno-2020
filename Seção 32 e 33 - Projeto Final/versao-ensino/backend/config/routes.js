module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)    // Forma de "chamar" como o [consign]
}